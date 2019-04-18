import { LanguageType } from "store/reducers/locale/langugeType";
import { VerificationType } from "core/domain/authorize/verificationType";

export const environment = {
	firebase: {
		apiKey: "AIzaSyAnfR3FToiQlYcpiixtCLYHK1cCB4UjdFo",
		authDomain: "social-network-6c052.firebaseapp.com",
		databaseURL: "https://social-network-6c052.firebaseio.com",
		projectId: "social-network-6c052",
		storageBucket: "social-network-6c052.appspot.com",
		messagingSenderId: "318123676020"
	},
	algolia: {
		appId: "TOS20M7VT1",
		apiKey: "c283440030db1f9446e8b410f7352479"
	},
	data: {
		imageFolderPath: "images",
		videoFolderPath: "videos",
		avatarFolderPath: "avatar",
		coverFolderPath: "cover",
		thumbnailFolderPath: "thumbnail",
		videoThumbnailPath: "video_thumbnail",
		locale:
			"https://raw.githubusercontent.com/red-gold/react-social-locales/master/src/social"
	},
	dataFormat: {
		postVersion: "1.0.0"
	},
	exteranlSocial: {
		instagramClientId: "1b410d1afea843eeacf00e3507621683"
	},
	settings: {
		enabledOAuthLogin: true,
		appName: "React Social Network",
		supportEmail: "marko.b.stanicic@gmail.com",
		appIcon: require("assets/images/appIcon.png"),
		logo: require("assets/images/logo.png"),
		defaultLanguage: LanguageType.English,
		defaultVideoThumbnails: require("assets/images/defaultVideoThumbnails.png"),
		verificationType: VerificationType.email,
		companyName: "Red Gold",
		defaultProfileCover: require("assets/images/coversocial.png"),
		publicCover: require("assets/images/public-cover.jpg"),
		raisedLogo: require("assets/images/raised-logo.png"),
		loginCover: require("assets/images/login-cover.jpg"),
		signupCover: require("assets/images/signup-cover.jpg"),
		logoHead: require("assets/images/logo-head.png"),
		androidAppLink: "",
		iosAppLink: "",
		api: "https://social-network-6c052.firebaseapp.com/api/",
		maxVideoFileSize: 20,
		maxGalley: 10
	},
	header: {
		title: "React Social Network",
		meta: [
			{
				name: "description",
				content:
					"The React Social Network is an open source project relying on React a powerful javascript library for building the user interface. In this project, I tried to show some features of react/react components as a social network. The structure of this project give the ability to developer to develop their project on their own idea and environment."
			}
		]
	}
};
