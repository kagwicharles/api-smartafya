import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDKml4u3afNqYqy4YQPWW8rqU0B9XEK6Cc",
    authDomain: "afya-legit-auth.firebaseapp.com",
    projectId: "afya-legit-auth",
    storageBucket: "afya-legit-auth.appspot.com",
    messagingSenderId: "588627123008",
    appId: "1:588627123008:web:0ffb822a6e44cb677ff8a5",
    measurementId: "G-R1G0DEQ2MW"
};

export const app = initializeApp(firebaseConfig);
