// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function (e) {
    console.log('fcm sw install..');
    // eslint-disable-next-line no-restricted-globals
    self.skipWaiting();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', function (e) {
    console.log('fcm sw activate..');
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', function (e) {
    console.log('push: ', e.data.json());
    if (!e.data.json()) return;

    let resultData;
    let notificationTitle;
    let notificationOptions;

    e.data.json().notification
        ? (resultData = e.data.json().notification)
        : (resultData = e.data.json().data);

    if (e.data.json().notification) {
        console.log('notification: ', e.data.json().notification);
        resultData = e.data.json().notification;
        notificationTitle = resultData?.title;
        notificationOptions = {
            body: resultData?.body,
            icon: resultData?.image,
            tag: resultData?.tag,
            ...resultData,
        };
    } else {
        console.log('data', e.data.json().data);
        resultData = e.data.json().data;
        notificationTitle = resultData?.title;
        notificationOptions = {
            body: `${resultData?.productName} : ${resultData?.content}`,
            icon: resultData?.image,
            tag: resultData?.tag,
            ...resultData,
        };
    }

    console.log('push: ', {
        resultData,
        notificationTitle,
        notificationOptions,
    });

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function (event) {
    console.log('notification click');
    const url = '/';
    event.notification.close();
    // eslint-disable-next-line no-undef
    event.waitUntil(clients.openWindow(url));
});
