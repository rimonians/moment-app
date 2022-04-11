import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Initialize Storage
export const storage = getStorage();

export const uploadImage = (file, cb) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Handle uploading
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      cb(200, "আপলোড হচ্ছে", progress.toFixed(2));
    },
    (err) => {
      // Handle upload error
      cb(500, err.message);
    },
    () => {
      // Handle upload success
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        cb(201, "সফলভাবে আপলোড করা হয়েছে", downloadURL);
      });
    }
  );
};
