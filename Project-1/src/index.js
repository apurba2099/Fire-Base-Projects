import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANvUXE-MG0vPqiZ7fRdm0shtA2HOmpO3k",
  authDomain: "fir-learning-1-d87ce.firebaseapp.com",
  projectId: "fir-learning-1-d87ce",
  storageBucket: "fir-learning-1-d87ce.appspot.com",
  messagingSenderId: "784231479282",
  appId: "1:784231479282:web:64acb1c0acad626ebf9d6b",
};

//init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

  
//add documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //arguments (books reference collection, {object: perticular collection with diffrent fields })
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});


//delete documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
