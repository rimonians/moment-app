import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Initialize Database
export const db = getFirestore();

// Collection Ref
export const colRef = collection(db, "moment");

// Moment add
export const momentAdd = async (data, cb) => {
  try {
    await addDoc(colRef, {
      ...data,
      createAt: serverTimestamp(),
    });
    cb(200, "সফলভাবে নতুন মোমেন্ট যোগ করা হয়েছে");
  } catch (err) {
    cb(500, "নতুন মোমেন্ট যোগ করতে সমস্যা হয়েছে");
  }
};

// Moment delete
export const momentDelete = async (id, cb) => {
  try {
    const docRef = doc(db, "moment", id);
    await deleteDoc(docRef);
    cb(200, "সফলভাবে বাজেট মুছে ফেলা হয়েছে");
  } catch (err) {
    cb(500, "মোমেন্ট মুছে ফেলতে সমস্যা হয়েছে");
  }
};
