import * as functions from "firebase-functions";
import { adminDB, firestoreDB } from "../../data/index";
import { Comment } from "../../domain/comments/comment";
import * as _ from "lodash";
import { Circle } from "../../domain/circles/circle";
import * as moment from "moment";
import * as express from "express";
import * as bodyParser from "body-parser";
import { SocialError } from "../../domain/common/index";
import { Verification } from "../../domain/authorize/Verification";
import { UserStateType } from "../../domain/authorize/userStateType";
import { HttpStatusCode } from "../../data/httpStatusCode";

const plivo = require("plivo");
const request = require("request");
const cookieParser = require("cookie-parser")();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const appName = functions.config().setting.appname;

/**
 * Handle on user create
 */
export const onUserCreate = functions.auth
	.user()
	.onCreate((change, context) => {
		return new Promise<void>((resolve, reject) => {
			const user = change;
			const followingCircle = new Circle();
			followingCircle.creationDate = moment().unix();
			followingCircle.name = `Following`;
			followingCircle.ownerId = user.uid;
			followingCircle.isSystem = true;
			return firestoreDB
				.collection(`users`)
				.doc(user.uid)
				.collection(`circles`)
				.add({ ...followingCircle })
				.then(result => {
					resolve();
				})
				.catch(reject);
		});
	});

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = (req: any, res: any, next: any) => {
	console.log("Check if request is authorized with Firebase ID token");

	if (
		(!req.headers.authorization ||
			!req.headers.authorization.startsWith("Bearer ")) &&
		!req.cookies.__session
	) {
		console.error(
			"No Firebase ID token was passed as a Bearer token in the Authorization header.",
			"Make sure you authorize your request by providing the following HTTP header:",
			"Authorization: Bearer <Firebase ID Token>",
			'or by passing a "__session" cookie.'
		);
		res
			.status(HttpStatusCode.Forbidden)
			.send(
				new SocialError("ServerError/Unauthorized", "User is Unauthorized!")
			);
		return;
	}

	let idToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		console.log('Found "Authorization" header');
		// Read the ID Token from the Authorization header.
		idToken = req.headers.authorization.split("Bearer ")[1];
	} else {
		console.log('Found "__session" cookie');
		// Read the ID Token from cookie.
		idToken = req.cookies.__session;
	}
	adminDB
		.auth()
		.verifyIdToken(idToken)
		.then(decodedIdToken => {
			console.log("ID Token correctly decoded", decodedIdToken);
			req.user = decodedIdToken;
			return next();
		})
		.catch(error => {
			console.error("Error while verifying Firebase ID token:", error);
			res
				.status(HttpStatusCode.Forbidden)
				.send(
					new SocialError("ServerError/Unauthorized", "User is Unauthorized!")
				);
		});
};

const app = express();
const cors = require("cors")({ origin: true });
app.disable("x-powered-by");
app.use(cors);
app.use(bodyParser.json());
app.use(cookieParser);
app.use(validateFirebaseIdToken);

app.post("/api/sms-verification", async (req, res) => {
	const remoteIpAddress = req.connection.remoteAddress;
	const gReCaptcha = req.body["g-recaptcha-response"];
	const code = Math.floor(1000 + Math.random() * 9000);
	const sourcePhoneNumber = "+111111";
	const targetPhoneNumber = req.body["phoneNumber"];
	const phoneMessage = `Verification code from ${appName} : <CODE>`;
	const secretKey = functions.config().recaptcha.secretkey;
	const userId = (req as any).user.uid;

	if (gReCaptcha === undefined || gReCaptcha === "" || gReCaptcha === null) {
		return res.json(
			new SocialError(
				"ServerError/NullCaptchaValue",
				"Please select captcha first"
			)
		);
	}
	const verificationURL =
		"https://www.google.com/recaptcha/api/siteverify?secret=" +
		secretKey +
		"&response=" +
		gReCaptcha +
		"&remoteip=" +
		remoteIpAddress;

	request(verificationURL, (error: any, response: any, body: any) => {
		body = JSON.parse(body);
		if (body.success !== undefined && !body.success) {
			console.log("Captha/responseError", error);
			console.log("Captha/responseError", response);
			console.log("Captha/responseError", body);
			res
				.status(HttpStatusCode.BadRequest)
				.json(
					new SocialError(
						"ServerError/ResponseCaptchaError",
						"Failed captcha verification"
					)
				);
		}
		console.log("Captha/responseSuccess");
		const client = new plivo.Client(
			functions.config().plivo.authid,
			functions.config().plivo.authtoken
		);
		client.messages
			.create(
				sourcePhoneNumber,
				targetPhoneNumber,
				phoneMessage.replace("<CODE>", String(code))
			)
			.then((messageCreated: any) => {
				const verifyRef = firestoreDB
					.collection("verification")
					.doc(userId)
					.collection("phone")
					.doc();
				const phoneVerification = new Verification(
					verifyRef.id,
					String(code),
					targetPhoneNumber,
					moment().unix(),
					remoteIpAddress,
					userId
				);
				verifyRef.set({ ...phoneVerification });
				return res.status(HttpStatusCode.OK).json({ verifyId: verifyRef.id });
			});
	});
});

/**
 * Verify phone code
 */
app.post("/api/verify-phone", async (req, res) => {
	const remoteIpAddress = req.connection.remoteAddress;
	const code = req.body["code"];
	const verifyId = req.body["verifyId"];
	const targetPhoneNumber = req.body["phoneNumber"];
	const userId = (req as any).user.uid;

	const verifyRef = firestoreDB
		.collection("verification")
		.doc(userId)
		.collection("phone")
		.doc(verifyId);

	return verifyRef
		.get()
		.then(result => {
			const phoneVerification = result.data() as Verification;
			console.log(
				phoneVerification,
				req.body,
				!phoneVerification.isVerified,
				remoteIpAddress === phoneVerification.remoteIpAddress,
				targetPhoneNumber === phoneVerification.target,
				userId === phoneVerification.userId
			);
			if (
				!phoneVerification.isVerified &&
				remoteIpAddress === phoneVerification.remoteIpAddress &&
				targetPhoneNumber === phoneVerification.target &&
				userId === phoneVerification.userId
			) {
				if (Number(phoneVerification.code) === Number(code)) {
					const batch = firestoreDB.batch();
					batch.update(result.ref, { isVerified: true });

					const protectedUserRef = firestoreDB
						.collection("protectedUser")
						.doc(userId);
					batch.update(protectedUserRef, { phoneVerified: true });
					batch
						.commit()
						.then(() => {
							console.log("ServerSuccess/CodeAccepted", "CodeAccepted");
							const additionalClaims = {
								phoneVerified: true
							};
							adminDB
								.auth()
								.createCustomToken(userId, additionalClaims)
								.then((token: any) => {
									// Send token back to client
									return res.status(HttpStatusCode.OK).json({ token });
								})
								.catch((error: any) => {
									console.log("Error creating custom token:", error);
								});
						})
						.catch(error => {
							console.log("ServerError/CanUpdateState", error);
							res.json(
								new SocialError(
									"ServerError/CanUpdateState",
									"Can not update user state!"
								)
							);
						});
				} else {
					res
						.status(HttpStatusCode.Forbidden)
						.json(
							new SocialError(
								"ServerError/WrongCode",
								"The code is not correct!"
							)
						);
				}
			} else {
				res
					.status(HttpStatusCode.Forbidden)
					.send(
						new SocialError("ServerError/Unauthorized", "User is Unauthorized!")
					);
			}
		})
		.catch(error => {
			console.log("ServerError/VerifyIdNotAccept", error);
			return res.json(
				new SocialError(
					"ServerError/VerifyIdNotAccept",
					"We coudn't for you verification!"
				)
			);
		});
});

/**
 * Register user
 */
app.post("/api/register", async (req, res) => {
	const remoteIpAddress = req.connection.remoteAddress;
	const userName = req.body["userName"];
	const password = req.body["password"];
	const email = req.body["email"];
	const fullName = req.body["fullName"];
	const avatar = req.body["avatar"];
	const userId = (req as any).user.uid;

	firestoreDB
		.doc(`userInfo/${userId}`)
		.set({
			id: userId,
			state: "active",
			avatar,
			fullName,
			creationDate: moment().unix(),
			email
		})
		.then(() => {
			bcrypt.hash(password, saltRounds, function(error: any, hash: any) {
				// Store hash in your password DB.
				firestoreDB
					.collection("protectedUser")
					.doc(userId)
					.set({
						userName: userName,
						password: hash,
						phoneVerified: false
					})
					.then(() => {
						return res.status(HttpStatusCode.OK).json({});
					})
					.catch((error: any) => {
						res
							.status(HttpStatusCode.InternalServerError)
							.send(
								new SocialError(
									"ServerError/NotStoreProtectedUser",
									"Can not store protected user!"
								)
							);
					});
			});
		})
		.catch((error: any) => {
			res
				.status(HttpStatusCode.InternalServerError)
				.send(
					new SocialError(
						"ServerError/NotStoreUserInfo",
						"Can not store user info!"
					)
				);
		});
});

/**
 * Register user
 */
app.post("/api/update-password", async (req, res) => {
	const remoteIpAddress = req.connection.remoteAddress;
	const newPassword = req.body["newPassword"] as string;
	const confirmPassword = req.body["confirmPassword"] as string;
	const userId = (req as any).user.uid as string;
	console.log("userID: ", userId);
	if (
		newPassword &&
		confirmPassword &&
		(newPassword.trim() !== "" && confirmPassword.trim() !== "") &&
		confirmPassword === newPassword
	) {
		adminDB
			.auth()
			.updateUser(userId, {
				password: newPassword
			})
			.then(updateResult => {
				bcrypt.hash(newPassword, saltRounds, function(error: any, hash: any) {
					// Store hash in your password DB.
					firestoreDB
						.collection("protectedUser")
						.doc(userId)
						.update({
							password: hash
						})
						.then(() => {
							return res.status(HttpStatusCode.OK).json({});
						})
						.catch((error: any) => {
							console.log("ServerError/NotStoreProtectedUser", error);
							res
								.status(HttpStatusCode.InternalServerError)
								.send(
									new SocialError(
										"ServerError/NotStoreProtectedUser",
										"Can not store protected user!"
									)
								);
						});
				});
			})
			.catch(error => {
				console.log("UpdateUser/Password", error);
				res
					.status(HttpStatusCode.InternalServerError)
					.send(
						new SocialError(
							"ServerError/ErrorUpdateUser",
							"Can not update user!"
						)
					);
			});
	} else {
		res
			.status(HttpStatusCode.InternalServerError)
			.send(
				new SocialError(
					"ServerError/NotEqualConfirmNewPassword",
					"Confirm password and new password are not equal!"
				)
			);
	}
});

/**
 * Phone verification
 */
export const auth = functions.https.onRequest(app);
