(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/emailAPI.ts":
/*!*****************************!*\
  !*** ./src/api/emailAPI.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n// Set variable for this project\n// firebase functions:config:set gmail.email=\"myusername@gmail.com\" gmail.password=\"secretpassword\"\nconst gmailEmail = functions.config().gmail.email;\nconst gmailPassword = functions.config().gmail.password;\nconst mailTransport = nodemailer.createTransport({\n    service: \"gmail\",\n    auth: {\n        user: gmailEmail,\n        pass: gmailPassword\n    }\n});\n/**\n * Send email\n */\nconst sendEmail = (email) => {\n    return new Promise((resolve, reject) => {\n        const mailOptions = {\n            from: email.from,\n            to: email.to,\n            subject: email.subject,\n            html: email.html\n        };\n        mailTransport\n            .sendMail(mailOptions)\n            .then(() => {\n            console.log(`New subscription confirmation email sent to: ${email.to}`);\n            resolve();\n        })\n            .catch((error) => {\n            console.error(\"There was an error while sending the email:\", error);\n            reject(error);\n        });\n    });\n};\nexports.emailAPI = {\n    sendEmail\n};\n\n\n//# sourceURL=webpack:///./src/api/emailAPI.ts?");

/***/ }),

/***/ "./src/data/httpStatusCode.ts":
/*!************************************!*\
  !*** ./src/data/httpStatusCode.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Http status codes\n * Thanks to https://msdn.microsoft.com/en-us/library/ee434093.aspx\n */\nvar HttpStatusCode;\n(function (HttpStatusCode) {\n    HttpStatusCode[HttpStatusCode[\"Accepted\"] = 202] = \"Accepted\";\n    HttpStatusCode[HttpStatusCode[\"Ambiguous\"] = 300] = \"Ambiguous\";\n    HttpStatusCode[HttpStatusCode[\"BadGateway\"] = 502] = \"BadGateway\";\n    HttpStatusCode[HttpStatusCode[\"BadRequest\"] = 400] = \"BadRequest\";\n    HttpStatusCode[HttpStatusCode[\"Conflict\"] = 409] = \"Conflict\";\n    HttpStatusCode[HttpStatusCode[\"Continue\"] = 100] = \"Continue\";\n    HttpStatusCode[HttpStatusCode[\"Created\"] = 201] = \"Created\";\n    HttpStatusCode[HttpStatusCode[\"ExpectationFailed\"] = 417] = \"ExpectationFailed\";\n    HttpStatusCode[HttpStatusCode[\"Forbidden\"] = 403] = \"Forbidden\";\n    HttpStatusCode[HttpStatusCode[\"Found\"] = 302] = \"Found\";\n    HttpStatusCode[HttpStatusCode[\"GatewayTimeout\"] = 504] = \"GatewayTimeout\";\n    HttpStatusCode[HttpStatusCode[\"Gone\"] = 410] = \"Gone\";\n    HttpStatusCode[HttpStatusCode[\"HttpVersionNotSupported\"] = 505] = \"HttpVersionNotSupported\";\n    HttpStatusCode[HttpStatusCode[\"InternalServerError\"] = 500] = \"InternalServerError\";\n    HttpStatusCode[HttpStatusCode[\"LengthRequired\"] = 411] = \"LengthRequired\";\n    HttpStatusCode[HttpStatusCode[\"MethodNotAllowed\"] = 405] = \"MethodNotAllowed\";\n    HttpStatusCode[HttpStatusCode[\"Moved\"] = 301] = \"Moved\";\n    HttpStatusCode[HttpStatusCode[\"MovedPermanently\"] = 301] = \"MovedPermanently\";\n    HttpStatusCode[HttpStatusCode[\"MultipleChoices\"] = 300] = \"MultipleChoices\";\n    HttpStatusCode[HttpStatusCode[\"NoContent\"] = 204] = \"NoContent\";\n    HttpStatusCode[HttpStatusCode[\"NonAuthoritativeInformation\"] = 203] = \"NonAuthoritativeInformation\";\n    HttpStatusCode[HttpStatusCode[\"NotAcceptable\"] = 406] = \"NotAcceptable\";\n    HttpStatusCode[HttpStatusCode[\"NotFound\"] = 404] = \"NotFound\";\n    HttpStatusCode[HttpStatusCode[\"NotImplemented\"] = 501] = \"NotImplemented\";\n    HttpStatusCode[HttpStatusCode[\"NotModified\"] = 304] = \"NotModified\";\n    HttpStatusCode[HttpStatusCode[\"OK\"] = 200] = \"OK\";\n    HttpStatusCode[HttpStatusCode[\"PartialContent\"] = 206] = \"PartialContent\";\n    HttpStatusCode[HttpStatusCode[\"PaymentRequired\"] = 402] = \"PaymentRequired\";\n    HttpStatusCode[HttpStatusCode[\"PreconditionFailed\"] = 412] = \"PreconditionFailed\";\n    HttpStatusCode[HttpStatusCode[\"ProxyAuthenticationRequired\"] = 407] = \"ProxyAuthenticationRequired\";\n    HttpStatusCode[HttpStatusCode[\"Redirect\"] = 302] = \"Redirect\";\n    HttpStatusCode[HttpStatusCode[\"RedirectKeepVerb\"] = 307] = \"RedirectKeepVerb\";\n    HttpStatusCode[HttpStatusCode[\"RedirectMethod\"] = 303] = \"RedirectMethod\";\n    HttpStatusCode[HttpStatusCode[\"RequestedRangeNotSatisfiable\"] = 416] = \"RequestedRangeNotSatisfiable\";\n    HttpStatusCode[HttpStatusCode[\"RequestEntityTooLarge\"] = 413] = \"RequestEntityTooLarge\";\n    HttpStatusCode[HttpStatusCode[\"RequestTimeout\"] = 408] = \"RequestTimeout\";\n    HttpStatusCode[HttpStatusCode[\"RequestUriTooLong\"] = 414] = \"RequestUriTooLong\";\n    HttpStatusCode[HttpStatusCode[\"ResetContent\"] = 205] = \"ResetContent\";\n    HttpStatusCode[HttpStatusCode[\"SeeOther\"] = 303] = \"SeeOther\";\n    HttpStatusCode[HttpStatusCode[\"ServiceUnavailable\"] = 503] = \"ServiceUnavailable\";\n    HttpStatusCode[HttpStatusCode[\"SwitchingProtocols\"] = 101] = \"SwitchingProtocols\";\n    HttpStatusCode[HttpStatusCode[\"TemporaryRedirect\"] = 307] = \"TemporaryRedirect\";\n    HttpStatusCode[HttpStatusCode[\"Unauthorized\"] = 401] = \"Unauthorized\";\n    HttpStatusCode[HttpStatusCode[\"UnsupportedMediaType\"] = 415] = \"UnsupportedMediaType\";\n    HttpStatusCode[HttpStatusCode[\"Unused\"] = 306] = \"Unused\";\n    HttpStatusCode[HttpStatusCode[\"UpgradeRequired\"] = 426] = \"UpgradeRequired\";\n    HttpStatusCode[HttpStatusCode[\"UseProxy\"] = 305] = \"UseProxy\";\n})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));\n\n\n//# sourceURL=webpack:///./src/data/httpStatusCode.ts?");

/***/ }),

/***/ "./src/data/index.ts":
/*!***************************!*\
  !*** ./src/data/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst admin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\nexports.adminDB = admin.initializeApp();\nexports.firestoreDB = exports.adminDB.firestore();\n\n\n//# sourceURL=webpack:///./src/data/index.ts?");

/***/ }),

/***/ "./src/domain/authorize/Verification.ts":
/*!**********************************************!*\
  !*** ./src/domain/authorize/Verification.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Verification {\n    constructor(id, code, target, creationDate, remoteIpAddress, userId, isVerified = false) {\n        this.id = id;\n        this.code = code;\n        this.target = target;\n        this.creationDate = creationDate;\n        this.remoteIpAddress = remoteIpAddress;\n        this.userId = userId;\n        this.isVerified = isVerified;\n    }\n}\nexports.Verification = Verification;\n\n\n//# sourceURL=webpack:///./src/domain/authorize/Verification.ts?");

/***/ }),

/***/ "./src/domain/circles/circle.ts":
/*!**************************************!*\
  !*** ./src/domain/circles/circle.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! ../common */ \"./src/domain/common/index.ts\");\nclass Circle extends common_1.BaseDomain {\n}\nexports.Circle = Circle;\n\n\n//# sourceURL=webpack:///./src/domain/circles/circle.ts?");

/***/ }),

/***/ "./src/domain/common/baseDomain.ts":
/*!*****************************************!*\
  !*** ./src/domain/common/baseDomain.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass BaseDomain {\n}\nexports.BaseDomain = BaseDomain;\n\n\n//# sourceURL=webpack:///./src/domain/common/baseDomain.ts?");

/***/ }),

/***/ "./src/domain/common/email.ts":
/*!************************************!*\
  !*** ./src/domain/common/email.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Email {\n    constructor(from, to, subject, html, text) {\n        this.from = from;\n        this.to = to;\n        this.subject = subject;\n        this.html = html;\n        this.text = text;\n    }\n}\nexports.Email = Email;\n\n\n//# sourceURL=webpack:///./src/domain/common/email.ts?");

/***/ }),

/***/ "./src/domain/common/feed.ts":
/*!***********************************!*\
  !*** ./src/domain/common/feed.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Feed {\n    /**\n     * Constructor\n     */\n    constructor(\n    /**\n     * Feed identifier\n     */\n    id, \n    /**\n     * Feed text\n     */\n    text, \n    /**\n     * Feed type\n     */\n    feedType, \n    /**\n     * The user who send the feedback\n     */\n    user) {\n        this.id = id;\n        this.text = text;\n        this.feedType = feedType;\n        this.user = user;\n    }\n}\nexports.Feed = Feed;\n\n\n//# sourceURL=webpack:///./src/domain/common/feed.ts?");

/***/ }),

/***/ "./src/domain/common/index.ts":
/*!************************************!*\
  !*** ./src/domain/common/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst socialError_1 = __webpack_require__(/*! ./socialError */ \"./src/domain/common/socialError.ts\");\nexports.SocialError = socialError_1.SocialError;\nconst baseDomain_1 = __webpack_require__(/*! ./baseDomain */ \"./src/domain/common/baseDomain.ts\");\nexports.BaseDomain = baseDomain_1.BaseDomain;\nconst feed_1 = __webpack_require__(/*! ./feed */ \"./src/domain/common/feed.ts\");\nexports.Feed = feed_1.Feed;\n\n\n//# sourceURL=webpack:///./src/domain/common/index.ts?");

/***/ }),

/***/ "./src/domain/common/socialError.ts":
/*!******************************************!*\
  !*** ./src/domain/common/socialError.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass SocialError extends Error {\n    constructor(_code, _message) {\n        super(_message);\n        this._code = _code;\n        this._message = _message;\n        this._isError = true;\n    }\n    /**\n     * Error code\n     *\n     * @type {string}\n     * @memberof SocialError\n     */\n    get code() {\n        return this._code;\n    }\n    /**\n     * Error message\n     *\n     * @type {string}\n     * @memberof SocialError\n     */\n    get message() {\n        return this._message;\n    }\n    /**\n     * If is error {true} if not {false}\n     *\n     * @type {Boolean}\n     * @memberof SocialError\n     */\n    get isError() {\n        return this._isError;\n    }\n}\nexports.SocialError = SocialError;\n\n\n//# sourceURL=webpack:///./src/domain/common/socialError.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Authorize\n */\nvar authorizeService_1 = __webpack_require__(/*! ./services/authorize/authorizeService */ \"./src/services/authorize/authorizeService.ts\");\nexports.onUserCreate = authorizeService_1.onUserCreate;\nexports.auth = authorizeService_1.auth;\nvar publicAuthService_1 = __webpack_require__(/*! ./services/authorize/publicAuthService */ \"./src/services/authorize/publicAuthService.ts\");\nexports.publicAuth = publicAuthService_1.publicAuth;\n/**\n * Users\n */\nvar userService_1 = __webpack_require__(/*! ./services/users/userService */ \"./src/services/users/userService.ts\");\nexports.users = userService_1.users;\nexports.onUpdateUserInfo = userService_1.onUpdateUserInfo;\n/**\n * Common\n */\nvar mailService_1 = __webpack_require__(/*! ./services/common/mailService */ \"./src/services/common/mailService.ts\");\nexports.onCreateFeedback = mailService_1.onCreateFeedback;\n/**\n * Comments\n */\nvar commentService_1 = __webpack_require__(/*! ./services/comments/commentService */ \"./src/services/comments/commentService.ts\");\nexports.onAddComment = commentService_1.onAddComment;\nexports.onDeleteComment = commentService_1.onDeleteComment;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/services/authorize/authorizeService.ts":
/*!****************************************************!*\
  !*** ./src/services/authorize/authorizeService.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst index_1 = __webpack_require__(/*! ../../data/index */ \"./src/data/index.ts\");\nconst circle_1 = __webpack_require__(/*! ../../domain/circles/circle */ \"./src/domain/circles/circle.ts\");\nconst moment = __webpack_require__(/*! moment */ \"moment\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst index_2 = __webpack_require__(/*! ../../domain/common/index */ \"./src/domain/common/index.ts\");\nconst Verification_1 = __webpack_require__(/*! ../../domain/authorize/Verification */ \"./src/domain/authorize/Verification.ts\");\nconst httpStatusCode_1 = __webpack_require__(/*! ../../data/httpStatusCode */ \"./src/data/httpStatusCode.ts\");\nconst plivo = __webpack_require__(/*! plivo */ \"plivo\");\nconst request = __webpack_require__(/*! request */ \"request\");\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\")();\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst saltRounds = 10;\nconst appName = functions.config().setting.appname;\n/**\n * Handle on user create\n */\nexports.onUserCreate = functions.auth\n    .user()\n    .onCreate((change, context) => {\n    return new Promise((resolve, reject) => {\n        const user = change;\n        const followingCircle = new circle_1.Circle();\n        followingCircle.creationDate = moment().unix();\n        followingCircle.name = `Following`;\n        followingCircle.ownerId = user.uid;\n        followingCircle.isSystem = true;\n        return index_1.firestoreDB\n            .collection(`users`)\n            .doc(user.uid)\n            .collection(`circles`)\n            .add(Object.assign({}, followingCircle))\n            .then(result => {\n            resolve();\n        })\n            .catch(reject);\n    });\n});\n// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.\n// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:\n// `Authorization: Bearer <Firebase ID Token>`.\n// when decoded successfully, the ID Token content will be added as `req.user`.\nconst validateFirebaseIdToken = (req, res, next) => {\n    console.log(\"Check if request is authorized with Firebase ID token\");\n    if ((!req.headers.authorization ||\n        !req.headers.authorization.startsWith(\"Bearer \")) &&\n        !req.cookies.__session) {\n        console.error(\"No Firebase ID token was passed as a Bearer token in the Authorization header.\", \"Make sure you authorize your request by providing the following HTTP header:\", \"Authorization: Bearer <Firebase ID Token>\", 'or by passing a \"__session\" cookie.');\n        res\n            .status(httpStatusCode_1.HttpStatusCode.Forbidden)\n            .send(new index_2.SocialError(\"ServerError/Unauthorized\", \"User is Unauthorized!\"));\n        return;\n    }\n    let idToken;\n    if (req.headers.authorization &&\n        req.headers.authorization.startsWith(\"Bearer \")) {\n        console.log('Found \"Authorization\" header');\n        // Read the ID Token from the Authorization header.\n        idToken = req.headers.authorization.split(\"Bearer \")[1];\n    }\n    else {\n        console.log('Found \"__session\" cookie');\n        // Read the ID Token from cookie.\n        idToken = req.cookies.__session;\n    }\n    index_1.adminDB\n        .auth()\n        .verifyIdToken(idToken)\n        .then(decodedIdToken => {\n        console.log(\"ID Token correctly decoded\", decodedIdToken);\n        req.user = decodedIdToken;\n        return next();\n    })\n        .catch(error => {\n        console.error(\"Error while verifying Firebase ID token:\", error);\n        res\n            .status(httpStatusCode_1.HttpStatusCode.Forbidden)\n            .send(new index_2.SocialError(\"ServerError/Unauthorized\", \"User is Unauthorized!\"));\n    });\n};\nconst app = express();\nconst cors = __webpack_require__(/*! cors */ \"cors\")({ origin: true });\napp.disable(\"x-powered-by\");\napp.use(cors);\napp.use(bodyParser.json());\napp.use(cookieParser);\napp.use(validateFirebaseIdToken);\napp.post(\"/api/sms-verification\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const gReCaptcha = req.body[\"g-recaptcha-response\"];\n    const code = Math.floor(1000 + Math.random() * 9000);\n    const sourcePhoneNumber = \"+111111\";\n    const targetPhoneNumber = req.body[\"phoneNumber\"];\n    const phoneMessage = `Verification code from ${appName} : <CODE>`;\n    const secretKey = functions.config().recaptcha.secretkey;\n    const userId = req.user.uid;\n    if (gReCaptcha === undefined || gReCaptcha === \"\" || gReCaptcha === null) {\n        return res.json(new index_2.SocialError(\"ServerError/NullCaptchaValue\", \"Please select captcha first\"));\n    }\n    const verificationURL = \"https://www.google.com/recaptcha/api/siteverify?secret=\" +\n        secretKey +\n        \"&response=\" +\n        gReCaptcha +\n        \"&remoteip=\" +\n        remoteIpAddress;\n    request(verificationURL, (error, response, body) => {\n        body = JSON.parse(body);\n        if (body.success !== undefined && !body.success) {\n            console.log(\"Captha/responseError\", error);\n            console.log(\"Captha/responseError\", response);\n            console.log(\"Captha/responseError\", body);\n            res\n                .status(httpStatusCode_1.HttpStatusCode.BadRequest)\n                .json(new index_2.SocialError(\"ServerError/ResponseCaptchaError\", \"Failed captcha verification\"));\n        }\n        console.log(\"Captha/responseSuccess\");\n        const client = new plivo.Client(functions.config().plivo.authid, functions.config().plivo.authtoken);\n        client.messages\n            .create(sourcePhoneNumber, targetPhoneNumber, phoneMessage.replace(\"<CODE>\", String(code)))\n            .then((messageCreated) => {\n            const verifyRef = index_1.firestoreDB\n                .collection(\"verification\")\n                .doc(userId)\n                .collection(\"phone\")\n                .doc();\n            const phoneVerification = new Verification_1.Verification(verifyRef.id, String(code), targetPhoneNumber, moment().unix(), remoteIpAddress, userId);\n            verifyRef.set(Object.assign({}, phoneVerification));\n            return res.status(httpStatusCode_1.HttpStatusCode.OK).json({ verifyId: verifyRef.id });\n        });\n    });\n}));\n/**\n * Verify phone code\n */\napp.post(\"/api/verify-phone\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const code = req.body[\"code\"];\n    const verifyId = req.body[\"verifyId\"];\n    const targetPhoneNumber = req.body[\"phoneNumber\"];\n    const userId = req.user.uid;\n    const verifyRef = index_1.firestoreDB\n        .collection(\"verification\")\n        .doc(userId)\n        .collection(\"phone\")\n        .doc(verifyId);\n    return verifyRef\n        .get()\n        .then(result => {\n        const phoneVerification = result.data();\n        console.log(phoneVerification, req.body, !phoneVerification.isVerified, remoteIpAddress === phoneVerification.remoteIpAddress, targetPhoneNumber === phoneVerification.target, userId === phoneVerification.userId);\n        if (!phoneVerification.isVerified &&\n            remoteIpAddress === phoneVerification.remoteIpAddress &&\n            targetPhoneNumber === phoneVerification.target &&\n            userId === phoneVerification.userId) {\n            if (Number(phoneVerification.code) === Number(code)) {\n                const batch = index_1.firestoreDB.batch();\n                batch.update(result.ref, { isVerified: true });\n                const protectedUserRef = index_1.firestoreDB\n                    .collection(\"protectedUser\")\n                    .doc(userId);\n                batch.update(protectedUserRef, { phoneVerified: true });\n                batch\n                    .commit()\n                    .then(() => {\n                    console.log(\"ServerSuccess/CodeAccepted\", \"CodeAccepted\");\n                    const additionalClaims = {\n                        phoneVerified: true\n                    };\n                    index_1.adminDB\n                        .auth()\n                        .createCustomToken(userId, additionalClaims)\n                        .then((token) => {\n                        // Send token back to client\n                        return res.status(httpStatusCode_1.HttpStatusCode.OK).json({ token });\n                    })\n                        .catch((error) => {\n                        console.log(\"Error creating custom token:\", error);\n                    });\n                })\n                    .catch(error => {\n                    console.log(\"ServerError/CanUpdateState\", error);\n                    res.json(new index_2.SocialError(\"ServerError/CanUpdateState\", \"Can not update user state!\"));\n                });\n            }\n            else {\n                res\n                    .status(httpStatusCode_1.HttpStatusCode.Forbidden)\n                    .json(new index_2.SocialError(\"ServerError/WrongCode\", \"The code is not correct!\"));\n            }\n        }\n        else {\n            res\n                .status(httpStatusCode_1.HttpStatusCode.Forbidden)\n                .send(new index_2.SocialError(\"ServerError/Unauthorized\", \"User is Unauthorized!\"));\n        }\n    })\n        .catch(error => {\n        console.log(\"ServerError/VerifyIdNotAccept\", error);\n        return res.json(new index_2.SocialError(\"ServerError/VerifyIdNotAccept\", \"We coudn't for you verification!\"));\n    });\n}));\n/**\n * Register user\n */\napp.post(\"/api/register\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const userName = req.body[\"userName\"];\n    const password = req.body[\"password\"];\n    const email = req.body[\"email\"];\n    const fullName = req.body[\"fullName\"];\n    const avatar = req.body[\"avatar\"];\n    const userId = req.user.uid;\n    index_1.firestoreDB\n        .doc(`userInfo/${userId}`)\n        .set({\n        id: userId,\n        state: \"active\",\n        avatar,\n        fullName,\n        creationDate: moment().unix(),\n        email\n    })\n        .then(() => {\n        bcrypt.hash(password, saltRounds, function (error, hash) {\n            // Store hash in your password DB.\n            index_1.firestoreDB\n                .collection(\"protectedUser\")\n                .doc(userId)\n                .set({\n                userName: userName,\n                password: hash,\n                phoneVerified: false\n            })\n                .then(() => {\n                return res.status(httpStatusCode_1.HttpStatusCode.OK).json({});\n            })\n                .catch((error) => {\n                res\n                    .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                    .send(new index_2.SocialError(\"ServerError/NotStoreProtectedUser\", \"Can not store protected user!\"));\n            });\n        });\n    })\n        .catch((error) => {\n        res\n            .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n            .send(new index_2.SocialError(\"ServerError/NotStoreUserInfo\", \"Can not store user info!\"));\n    });\n}));\n/**\n * Register user\n */\napp.post(\"/api/update-password\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const newPassword = req.body[\"newPassword\"];\n    const confirmPassword = req.body[\"confirmPassword\"];\n    const userId = req.user.uid;\n    console.log(\"userID: \", userId);\n    if (newPassword &&\n        confirmPassword &&\n        (newPassword.trim() !== \"\" && confirmPassword.trim() !== \"\") &&\n        confirmPassword === newPassword) {\n        index_1.adminDB\n            .auth()\n            .updateUser(userId, {\n            password: newPassword\n        })\n            .then(updateResult => {\n            bcrypt.hash(newPassword, saltRounds, function (error, hash) {\n                // Store hash in your password DB.\n                index_1.firestoreDB\n                    .collection(\"protectedUser\")\n                    .doc(userId)\n                    .update({\n                    password: hash\n                })\n                    .then(() => {\n                    return res.status(httpStatusCode_1.HttpStatusCode.OK).json({});\n                })\n                    .catch((error) => {\n                    console.log(\"ServerError/NotStoreProtectedUser\", error);\n                    res\n                        .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                        .send(new index_2.SocialError(\"ServerError/NotStoreProtectedUser\", \"Can not store protected user!\"));\n                });\n            });\n        })\n            .catch(error => {\n            console.log(\"UpdateUser/Password\", error);\n            res\n                .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                .send(new index_2.SocialError(\"ServerError/ErrorUpdateUser\", \"Can not update user!\"));\n        });\n    }\n    else {\n        res\n            .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n            .send(new index_2.SocialError(\"ServerError/NotEqualConfirmNewPassword\", \"Confirm password and new password are not equal!\"));\n    }\n}));\n/**\n * Phone verification\n */\nexports.auth = functions.https.onRequest(app);\n\n\n//# sourceURL=webpack:///./src/services/authorize/authorizeService.ts?");

/***/ }),

/***/ "./src/services/authorize/publicAuthService.ts":
/*!*****************************************************!*\
  !*** ./src/services/authorize/publicAuthService.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst index_1 = __webpack_require__(/*! ../../data/index */ \"./src/data/index.ts\");\nconst moment = __webpack_require__(/*! moment */ \"moment\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst index_2 = __webpack_require__(/*! ../../domain/common/index */ \"./src/domain/common/index.ts\");\nconst Verification_1 = __webpack_require__(/*! ../../domain/authorize/Verification */ \"./src/domain/authorize/Verification.ts\");\nconst emailAPI_1 = __webpack_require__(/*! ../../api/emailAPI */ \"./src/api/emailAPI.ts\");\nconst email_1 = __webpack_require__(/*! ../../domain/common/email */ \"./src/domain/common/email.ts\");\nconst httpStatusCode_1 = __webpack_require__(/*! ../../data/httpStatusCode */ \"./src/data/httpStatusCode.ts\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst request = __webpack_require__(/*! request */ \"request\");\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\")();\nconst app = express();\nconst cors = __webpack_require__(/*! cors */ \"cors\")({ origin: true });\napp.disable(\"x-powered-by\");\napp.use(cors);\napp.use(bodyParser.json());\napp.use(cookieParser);\nconst gmailEmail = functions.config().gmail.email;\nconst appName = functions.config().setting.appname;\n/**\n * Login user API\n */\napp.post(\"/api/login\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const userName = req.body[\"userName\"];\n    const password = req.body[\"password\"];\n    console.log(userName, password);\n    index_1.firestoreDB\n        .collection(\"protectedUser\")\n        .where(\"userName\", \"==\", userName)\n        .get()\n        .then(result => {\n        console.log(\"result\", result.size, result.empty);\n        if (result && !result.empty && result.size === 1) {\n            const doc = result.docs[0];\n            console.log(doc);\n            const data = doc.data();\n            console.log(\"data = \", data);\n            bcrypt.compare(password, data.password, (error, isSame) => {\n                if (isSame === true) {\n                    const additionalClaims = {\n                        phoneVerified: data.phoneVerified,\n                        userName: data.userName\n                    };\n                    index_1.adminDB\n                        .auth()\n                        .createCustomToken(doc.id, additionalClaims)\n                        .then(token => {\n                        // Send token back to client\n                        return res.status(httpStatusCode_1.HttpStatusCode.OK).json({ token });\n                    })\n                        .catch(error => {\n                        console.log(\"Error creating custom token:\", error);\n                        return res\n                            .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                            .send(new index_2.SocialError(\"ServerError/CreateToke\", \"Error on creating token!\"));\n                    });\n                }\n                else {\n                    return res\n                        .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                        .send(new index_2.SocialError(\"ServerError/WrongPassword\", \"Password is wrong!\"));\n                }\n            });\n        }\n        else {\n            return res\n                .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                .send(new index_2.SocialError(\"ServerError/WrongUserName\", \"User name is wrong!\"));\n        }\n    })\n        .catch(error => {\n        return res\n            .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n            .send(new index_2.SocialError(\"ServerError/FirestoreGetData\", error));\n    });\n}));\n/**\n * Verify phone code\n */\napp.post(\"/api/verify-email\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const code = req.body[\"code\"];\n    const verifyId = req.body[\"verifyId\"];\n    const targetEmail = req.body[\"email\"];\n    index_1.firestoreDB\n        .collection(\"userInfo\")\n        .where(\"email\", \"==\", targetEmail)\n        .get()\n        .then(userInfo => {\n        console.log(\"userInfo\", userInfo.size, userInfo.empty);\n        if (userInfo && !userInfo.empty && userInfo.size === 1) {\n            const doc = userInfo.docs[0];\n            const userId = doc.id;\n            console.log(doc);\n            const data = doc.data();\n            console.log(\"data = \", data);\n            const verifyRef = index_1.firestoreDB\n                .collection(\"verification\")\n                .doc(userId)\n                .collection(\"resetPassword\")\n                .doc(verifyId);\n            return verifyRef\n                .get()\n                .then(result => {\n                const verification = result.data();\n                console.log(verification, req.body, !verification.isVerified, remoteIpAddress === verification.remoteIpAddress, targetEmail === verification.target, userId === verification.userId);\n                if (!verification.isVerified &&\n                    remoteIpAddress === verification.remoteIpAddress &&\n                    targetEmail === verification.target &&\n                    userId === verification.userId) {\n                    if (Number(verification.code) === Number(code)) {\n                        index_1.firestoreDB\n                            .collection(\"protectedUser\")\n                            .doc(userId)\n                            .get()\n                            .then(protectedUserResult => {\n                            let phoneVerified = false;\n                            if (protectedUserResult.exists &&\n                                protectedUserResult.data().phoneVerified) {\n                                phoneVerified = true;\n                            }\n                            console.log(\"ServerSuccess/CodeAccepted\", \"CodeAccepted\", phoneVerified);\n                            const additionalClaims = {\n                                phoneVerified: phoneVerified,\n                                userName: data.email,\n                                resetPasswordVerified: true\n                            };\n                            index_1.adminDB\n                                .auth()\n                                .createCustomToken(userId, additionalClaims)\n                                .then(token => {\n                                // Send token back to client\n                                return res.status(httpStatusCode_1.HttpStatusCode.OK).json({ token });\n                            })\n                                .catch(error => {\n                                console.log(\"Error creating custom token:\", error);\n                                res\n                                    .status(httpStatusCode_1.HttpStatusCode.InternalServerError)\n                                    .json(new index_2.SocialError(\"ServerError/CreateCustomToken\", \"Create custom token error!\"));\n                            });\n                        });\n                    }\n                    else {\n                        res\n                            .status(httpStatusCode_1.HttpStatusCode.Forbidden)\n                            .json(new index_2.SocialError(\"ServerError/WrongCode\", \"The code is not correct!\"));\n                    }\n                }\n                else {\n                    res\n                        .status(httpStatusCode_1.HttpStatusCode.Forbidden)\n                        .send(new index_2.SocialError(\"ServerError/Unauthorized\", \"User is Unauthorized!\"));\n                }\n            })\n                .catch(error => {\n                console.log(\"ServerError/VerifyIdNotAccept\", error);\n                return res.json(new index_2.SocialError(\"ServerError/VerifyIdNotAccept\", \"We coudn't for you verification!\"));\n            });\n        }\n        else {\n            res\n                .status(httpStatusCode_1.HttpStatusCode.NotFound)\n                .send(new index_2.SocialError(\"ServerError/EmailNotFound\", \"Email not found!\"));\n        }\n    })\n        .catch(error => {\n        res\n            .status(httpStatusCode_1.HttpStatusCode.NotFound)\n            .send(new index_2.SocialError(\"ServerError/EmailNotFound\", \"Email not found!\"));\n    });\n}));\n/**\n * Reset password API\n */\napp.post(\"/api/email-verification-code\", (req, res) => __awaiter(this, void 0, void 0, function* () {\n    const remoteIpAddress = req.connection.remoteAddress;\n    const gReCaptcha = req.body[\"g-recaptcha-response\"];\n    const code = Math.floor(1000 + Math.random() * 9000);\n    const targetEmail = req.body[\"email\"];\n    const secretKey = functions.config().recaptcha.secretkey;\n    const from = `${appName} Reset Password <${gmailEmail}>`;\n    const to = targetEmail;\n    const subject = `Reset your password for ${appName}`;\n    index_1.firestoreDB\n        .collection(\"userInfo\")\n        .where(\"email\", \"==\", targetEmail)\n        .get()\n        .then(userInfoList => {\n        if (userInfoList.size === 1) {\n            const user = userInfoList.docs[0].data();\n            const userId = userInfoList.docs[0].id;\n            const html = `\n                <html xmlns=\"http://www.w3.org/1999/xhtml\">\n\n                <body>\n                <div>\n                    <h4>Hello ${user.fullName},</h4>\n\n                    <p>Enter verification code in your reset password page to reset your ${appName} password for your ${targetEmail} account.</p>\n\n                    <h3>Verification Code: ${code}</h3>\n\n                    <p>If you didn’t ask to reset your password, you can ignore this email.</p>\n\n                    <h4>Thanks,</h4>\n\n                    <h4>Your ${appName} team</h4>\n                </div>\n                </body>\n                </html>\n                        `;\n            if (gReCaptcha === undefined ||\n                gReCaptcha === \"\" ||\n                gReCaptcha === null) {\n                return res.json(new index_2.SocialError(\"ServerError/NullCaptchaValue\", \"Please select captcha first\"));\n            }\n            const verificationURL = \"https://www.google.com/recaptcha/api/siteverify?secret=\" +\n                secretKey +\n                \"&response=\" +\n                gReCaptcha +\n                \"&remoteip=\" +\n                remoteIpAddress;\n            request(verificationURL, (error, response, body) => {\n                body = JSON.parse(body);\n                if (body.success !== undefined && !body.success) {\n                    console.log(\"Captha/responseError\", error);\n                    return res.json(new index_2.SocialError(\"ServerError/ResponseCaptchaError\", \"Failed captcha verification\"));\n                }\n                console.log(\"Captha/responseSuccess\");\n                emailAPI_1.emailAPI\n                    .sendEmail(new email_1.Email(from, to, subject, html))\n                    .then(function (messageCreated) {\n                    const verifyRef = index_1.firestoreDB\n                        .collection(\"verification\")\n                        .doc(userId)\n                        .collection(\"resetPassword\")\n                        .doc();\n                    const resetPasswordVerification = new Verification_1.Verification(verifyRef.id, String(code), targetEmail, moment().unix(), remoteIpAddress, userId);\n                    verifyRef.set(Object.assign({}, resetPasswordVerification));\n                    return res\n                        .status(httpStatusCode_1.HttpStatusCode.OK)\n                        .json({ verifyId: verifyRef.id });\n                })\n                    .catch(error => {\n                    res\n                        .status(httpStatusCode_1.HttpStatusCode.ServiceUnavailable)\n                        .send(new index_2.SocialError(\"ServerError/EmailNotSent\", \"Email service error. Email has not sent!\"));\n                });\n            });\n        }\n        else {\n            res\n                .status(httpStatusCode_1.HttpStatusCode.NotFound)\n                .send(new index_2.SocialError(\"ServerError/EmailNotFound\", \"Email not found!\"));\n        }\n    })\n        .catch(error => {\n        res\n            .status(httpStatusCode_1.HttpStatusCode.NotFound)\n            .send(new index_2.SocialError(\"ServerError/EmailNotFound\", \"With DB error. Email not found!\"));\n    });\n}));\n/**\n * Phone verification\n */\nexports.publicAuth = functions.https.onRequest(app);\n\n\n//# sourceURL=webpack:///./src/services/authorize/publicAuthService.ts?");

/***/ }),

/***/ "./src/services/comments/commentService.ts":
/*!*************************************************!*\
  !*** ./src/services/comments/commentService.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst index_1 = __webpack_require__(/*! ../../data/index */ \"./src/data/index.ts\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\n/**\n * Add comment\n */\nexports.onAddComment = functions.firestore\n    .document(`comments/{commentId}`)\n    .onCreate((dataSnapshot, event) => {\n    var newComment = dataSnapshot.data();\n    const commentId = event.params.commentId;\n    if (newComment) {\n        const postRef = index_1.firestoreDB.doc(`posts/${newComment.postId}`);\n        // Get post\n        var postId = newComment.postId;\n        /**\n         * Increase comment counter and create three comments' slide preview\n         */\n        return index_1.firestoreDB.runTransaction((transaction) => {\n            return transaction.get(postRef).then((postDoc) => {\n                if (postDoc.exists) {\n                    const postData = postDoc.data();\n                    const commentCount = postData.commentCounter + 1;\n                    transaction.update(postRef, { commentCounter: commentCount });\n                    let comments = postData.comments;\n                    if (!comments) {\n                        comments = {};\n                    }\n                    if (commentCount < 4) {\n                        transaction.update(postRef, { comments: Object.assign({}, comments, { [commentId]: newComment }) });\n                    }\n                    else {\n                        let sortedObjects = Object.assign({}, comments, { [commentId]: newComment });\n                        // Sort posts with creation date\n                        sortedObjects = _.fromPairs(_.toPairs(sortedObjects)\n                            .sort((a, b) => parseInt(b[1].creationDate, 10) - parseInt(a[1].creationDate, 10)).slice(0, 3));\n                        transaction.update(postRef, { comments: Object.assign({}, sortedObjects) });\n                    }\n                }\n            });\n        });\n    }\n});\n/**\n * Delete comment\n */\nexports.onDeleteComment = functions.firestore\n    .document(`comments/{commentId}`)\n    .onDelete((dataSnapshot, context) => {\n    return new Promise((resolve, reject) => {\n        const deletedComment = dataSnapshot.data();\n        const commentId = context.params.commentId;\n        const postId = deletedComment.postId;\n        const postRef = index_1.firestoreDB.doc(`posts/${postId}`);\n        index_1.firestoreDB.collection(`comments`)\n            .where(`postId`, `==`, postId)\n            .orderBy('creationDate', 'desc')\n            .get().then((result) => {\n            let parsedData = {};\n            let index = 0;\n            result.forEach((comment) => {\n                if (index < 3) {\n                    const commentData = comment.data();\n                    commentData.id = comment.id;\n                    parsedData = Object.assign({}, parsedData, { [comment.id]: Object.assign({}, commentData) });\n                }\n                index++;\n            });\n            postRef.update({ comments: parsedData, commentCounter: result.size })\n                .then(() => {\n                resolve();\n            });\n        }).catch(reject);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/services/comments/commentService.ts?");

/***/ }),

/***/ "./src/services/common/mailService.ts":
/*!********************************************!*\
  !*** ./src/services/common/mailService.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst emailAPI_1 = __webpack_require__(/*! ../../api/emailAPI */ \"./src/api/emailAPI.ts\");\nconst email_1 = __webpack_require__(/*! ../../domain/common/email */ \"./src/domain/common/email.ts\");\nconst gmailEmail = functions.config().gmail.email;\nconst appName = functions.config().setting.appname;\nexports.onCreateFeedback = functions.firestore\n    .document(`feeds/{feedId}`)\n    .onCreate((dataSnapshot, context) => {\n    return new Promise((resolve, reject) => {\n        const feed = dataSnapshot.data();\n        const from = `${appName} Feedback <${gmailEmail}>`;\n        const to = 'amir.gholzam@gmail.com';\n        const subject = `${feed.feedType} -${feed.user.email} - ${dataSnapshot.createTime}`;\n        const text = `\n    Feedback type: ${feed.feedType}\n    Feedback ID: ${feed.id}\n  \n    User Email: ${feed.user.email}\n    User Fullname: ${feed.user.fullName}\n    User ID: ${feed.user.userId}\n  \n    Feedback: ${feed.text}\n    `;\n        /**\n         * Send email\n         */\n        emailAPI_1.emailAPI.sendEmail(new email_1.Email(from, to, subject, text)).then(() => {\n            resolve();\n        }).catch((error) => {\n            reject();\n        });\n    });\n});\n\n\n//# sourceURL=webpack:///./src/services/common/mailService.ts?");

/***/ }),

/***/ "./src/services/users/userService.ts":
/*!*******************************************!*\
  !*** ./src/services/users/userService.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst index_1 = __webpack_require__(/*! ../../data/index */ \"./src/data/index.ts\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst httpStatusCode_1 = __webpack_require__(/*! ../../data/httpStatusCode */ \"./src/data/httpStatusCode.ts\");\nconst index_2 = __webpack_require__(/*! ../../domain/common/index */ \"./src/domain/common/index.ts\");\nconst app = express();\napp.disable(\"x-powered-by\");\n/**\n * Get users by user identifier list\n * @param userIdList A list of user key\n */\nconst getUserByListId = (userIdList) => __awaiter(this, void 0, void 0, function* () {\n    return new Promise((resolve, reject) => {\n        let users = {};\n        if (userIdList && userIdList.length > 0) {\n            userIdList.forEach((userId) => {\n                index_1.firestoreDB\n                    .collection(\"userInfo\")\n                    .doc(userId)\n                    .get()\n                    .then(result => {\n                    let user = result.data();\n                    users = Object.assign({}, users, { [userId]: Object.assign({}, user) });\n                })\n                    .catch(reject);\n            });\n            resolve(users);\n        }\n    });\n});\n/**\n * Get users by  http trigget\n * Route ['users/']\n * Method [POST]\n */\napp.post(\"/\", (request, response) => __awaiter(this, void 0, void 0, function* () {\n    const userIdList = JSON.parse(request.body);\n    if (userIdList && Array.isArray(userIdList) && userIdList.length > 0) {\n        getUserByListId(userIdList).then(users => {\n            response.status(httpStatusCode_1.HttpStatusCode.OK).send(users);\n        });\n    }\n    else {\n        // Send baack bad request happened\n        return response.status(httpStatusCode_1.HttpStatusCode.BadRequest).send(new index_2.SocialError(\"UserService/UserIdListNotValid\", `\n        User list is undefined or not array or the length of array is not grater than zero!\n        ${JSON.stringify(userIdList)}\n        `));\n    }\n}));\n/**\n * Routing posts\n */\nexports.users = functions.https.onRequest(app);\n/**\n * Handle on update user information\n */\nexports.onUpdateUserInfo = functions.firestore\n    .document(\"userInfo/{userId}\")\n    .onUpdate((dataSnapshot, context) => {\n    return new Promise((resolve, reject) => {\n        const userId = context.params.userId;\n        const previousUserInfo = dataSnapshot.before.data();\n        const userInfo = dataSnapshot.after.data();\n        if (previousUserInfo.avatar === userInfo.avatar &&\n            previousUserInfo.fullName === userInfo.fullName) {\n            resolve();\n        }\n        else {\n            const postsRef = index_1.firestoreDB\n                .collection(\"posts\")\n                .where(\"ownerUserId\", \"==\", userId);\n            const commentsRef = index_1.firestoreDB\n                .collection(\"comments\")\n                .where(\"userId\", \"==\", userId);\n            const leftUserTieRef = index_1.firestoreDB\n                .collection(\"graphs:users\")\n                .where(\"leftNode\", \"==\", userId);\n            const rightUserTieRef = index_1.firestoreDB\n                .collection(\"graphs:users\")\n                .where(\"rightNode\", \"==\", userId);\n            // Get a new write batch\n            var batch = index_1.firestoreDB.batch();\n            postsRef.get().then(posts => {\n                commentsRef.get().then(comments => {\n                    leftUserTieRef.get().then(leftTies => {\n                        rightUserTieRef.get().then(rightTies => {\n                            // Set update batch for posts\n                            posts.forEach(post => {\n                                const updatedPost = post.data();\n                                updatedPost.ownerAvatar = userInfo.avatar;\n                                updatedPost.ownerDisplayName = userInfo.fullName;\n                                batch.update(post.ref, updatedPost);\n                            });\n                            // Set update batch for comments\n                            comments.forEach(comment => {\n                                const updatedComment = comment.data();\n                                updatedComment.userDisplayName = userInfo.avatar;\n                                updatedComment.userDisplayName = userInfo.fullName;\n                                batch.update(comment.ref, updatedComment);\n                            });\n                            // Set update batch for leftTies\n                            leftTies.forEach(leftTie => {\n                                const updatedGraph = leftTie.data();\n                                const updatedLeftTie = updatedGraph.LeftMetadata;\n                                updatedLeftTie.avatar = userInfo.avatar;\n                                updatedLeftTie.fullName = userInfo.fullName;\n                                updatedGraph.LeftMetadata = updatedLeftTie;\n                                batch.update(leftTie.ref, updatedGraph);\n                            });\n                            // Set update batch for rightTies\n                            rightTies.forEach(rightTie => {\n                                const updatedGraph = rightTie.data();\n                                const updatedRightTie = updatedGraph.rightMetadata;\n                                updatedRightTie.avatar = userInfo.avatar;\n                                updatedRightTie.fullName = userInfo.fullName;\n                                updatedGraph.rightMetadata = updatedRightTie;\n                                batch.update(rightTie.ref, updatedGraph);\n                            });\n                            batch\n                                .commit()\n                                .then(() => {\n                                resolve();\n                            })\n                                .catch(reject);\n                        });\n                    });\n                });\n            });\n        }\n    });\n});\n\n\n//# sourceURL=webpack:///./src/services/users/userService.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-admin\");\n\n//# sourceURL=webpack:///external_%22firebase-admin%22?");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-functions\");\n\n//# sourceURL=webpack:///external_%22firebase-functions%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ }),

/***/ "plivo":
/*!************************!*\
  !*** external "plivo" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"plivo\");\n\n//# sourceURL=webpack:///external_%22plivo%22?");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request\");\n\n//# sourceURL=webpack:///external_%22request%22?");

/***/ })

/******/ })));