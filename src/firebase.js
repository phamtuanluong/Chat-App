import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHF433je1PF5ugqr7ZQ6uT2inu2UHykX0",
    authDomain: "chat-app-14bbe.firebaseapp.com",
    projectId: "chat-app-14bbe",
    storageBucket: "chat-app-14bbe.firebasestorage.app",
    messagingSenderId: "352348669537",
    appId: "1:352348669537:web:cdafd73e4fdebabdd34c20",
    measurementId: "G-N3G1XC64X3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Đăng nhập bằng Google
const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in: ", error);
    }
};

// Đăng xuất
const logOut = async () => {
    await signOut(auth);
};

// Thêm tin nhắn vào Firestore
const sendMessage = async (text, user) => {
    if (!text.trim()) return;
    await addDoc(collection(db, "messages"), {
        text,
        userName: user.displayName,
        userId: user.uid,
        createdAt: new Date()
    });
};

// Lắng nghe tin nhắn
const listenMessages = (callback) => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
};

export { auth, db, signInWithGoogle, logOut, sendMessage, listenMessages };
