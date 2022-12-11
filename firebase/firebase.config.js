// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDhS3q_l0yfCoFslFY0qTpbdXl_hOdiq_M",
	authDomain: "shukran-erp-v2.firebaseapp.com",
	databaseURL: "https://shukran-erp-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "shukran-erp-v2",
	storageBucket: "shukran-erp-v2.appspot.com",
	messagingSenderId: "106340456866",
	appId: "1:106340456866:web:c8d1d24c7f548e947a3afb",
	measurementId: "G-VJ6TJ4PVP9",
};

// Initialize Firebase
export default app = () => initializeApp(firebaseConfig);
const analytics = () => getAnalytics(app);
