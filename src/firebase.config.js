const config = {
    apiKey: "AIzaSyAsxkBx5GmLIUg3ckd4ZovjFDOfw0xWjHg",
    authDomain: "wheres-waldo-b1e4b.firebaseapp.com",
    projectId: "wheres-waldo-b1e4b",
    storageBucket: "wheres-waldo-b1e4b.appspot.com",
    messagingSenderId: "630110819939",
    appId: "1:630110819939:web:1e0a8de1c86b21a8ac4a56"
}

export default function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
}
