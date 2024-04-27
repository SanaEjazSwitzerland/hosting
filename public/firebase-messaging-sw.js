// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCeRJ4IyUWRYSNlPV8M8KTsvJo_lBNFaOg",
    authDomain: "ecommerce-32ea8.firebaseapp.com",
    projectId: "ecommerce-32ea8",
    storageBucket: "ecommerce-32ea8.appspot.com",
    messagingSenderId: "1060648258935",
    appId: "1:1060648258935:web:5a24255b748212abe16572",
    measurementId: "G-P423W6FW2J"
  
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    console.log(notificationTitle)
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });