import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";


export async function getItems(userId) {
    const itemsRef = collection(db, `users/${userId}/items`);
    const querySnapshot = await getDocs(query(itemsRef));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


export async function addItem(userId, item) {
    const itemsRef = collection(db, `users/${userId}/items`);
    const docRef = await addDoc(itemsRef, item);
    return docRef.id;
}


export const loadItems = async (user, setItems) => {
    const items = await getItems(user.uid);
    setItems(items);
};