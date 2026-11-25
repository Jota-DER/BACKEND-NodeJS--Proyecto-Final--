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

export const getBookById = async (id) => {
    const bookDoc = doc(db, "books", id);
    const snapshot = await getDoc(reference);

    if (!snapshot.exists()) {
        return null;    
}   

return {
    ...snapshot.data(),
    id: snapshot.id,    
};  
};
