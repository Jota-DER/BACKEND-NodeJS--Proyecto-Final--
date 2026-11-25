import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const booksCollection = collection(db, "books");

export const getAllBooks = async () => {
  const snapshot = await getDocs(booksCollection);
    
  return snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
    }));

};