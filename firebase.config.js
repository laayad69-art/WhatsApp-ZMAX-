// إعدادات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBLOTRVui_Zdyl2_Hy",
    authDomain: "family-94192.firebaseapp.com",
    databaseURL: "https://family-94192-default-rtdb.firebaseio.com",
    projectId: "family-94192",
    storageBucket: "family-94192.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// تهيئة Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    console.log("Firebase already initialized");
}

// الحصول على المرجعيات
const database = firebase.database();
const storage = firebase.storage();

// تصدير للاستخدام
window.firebaseConfig = {
    database,
    storage,
    firebase
};