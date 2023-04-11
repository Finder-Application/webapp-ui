/* eslint-disable */
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyADH2hVN9VG_tWkKWb9YEMj9wYUe3oH7gQ',
  authDomain: 'nckh-login.firebaseapp.com',
  projectId: 'nckh-login',
  storageBucket: 'nckh-login.appspot.com',
  messagingSenderId: '415963339747',
  appId: '1:415963339747:web:89faf2f7d766bdb9079ed6',
  measurementId: 'G-GF53CT3BLZ',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      console.log('----->', payload);
      // const data = JSON.parse(payload?.data?.payload);
      // const type = payload?.data?.type;
      // const redirectUrl = handleRedirectNotification(type, data);
      // const options = {
      //   body: notificationBody(type, data),
      //   icon: '/src/assets/images/logo.png',
      //   actions: [{ action: redirectUrl, title: 'View' }],
      // };
      // return self.registration.showNotification('SmartOS Admin', options);
    });
  return promiseChain;
});

// self.onnotificationclick = function (event) {
//   event.notification.close();

//   event.waitUntil(
//     clients
//       .matchAll({
//         type: 'window',
//       })
//       .then(function (clientList) {
//         for (var i = 0; i < clientList.length; i++) {
//           var client = clientList[i];
//           if (client.url == '/' && 'focus' in client) return client.focus();
//         }
//         if (clients.openWindow)
//           return clients.openWindow(
//             event?.notification?.actions?.[0]?.action ?? event?.action
//           );
//       })
//   );
// };
