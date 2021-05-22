import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBznL2LZ4Bzgk-VJp0GQfaIfFP9DWFea2I",
  authDomain: "depstar-pms-91a1c.firebaseapp.com",
  projectId: "depstar-pms-91a1c",
  storageBucket: "depstar-pms-91a1c.appspot.com",
  messagingSenderId: "386830044639",
  appId: "1:386830044639:web:c7351ef5b56cbfb4bf486a"
};

  const fire = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const storage = fire.storage();

  export {auth, storage};
 

  