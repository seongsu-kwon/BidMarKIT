// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  // eslint-disable-next-line no-restricted-globals
  self.skipWaiting();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  let resultData;
  let notificationTitle;
  let notificationOptions;

  e.data.json().notification
    ? (resultData = e.data.json().notification)
    : (resultData = e.data.json().data);

  if (e.data.json().notification) {
    console.log("notification: ", e.data.json().notification);
    resultData = e.data.json().notification;
    notificationTitle = resultData?.title;
    notificationOptions = {
      body: resultData?.body,
      icon: resultData?.image,
      tag: resultData?.tag,
      ...resultData,
    };
  } else {
    console.log("data", e.data.json().data);
    resultData = e.data.json().data;
    notificationTitle = resultData?.title;
    let body;

    const type = resultData?.type;

    let typeText = "";

    // if (type == 1) {
    //   typeText = "새 QnA 알림";
    // } else if (type == 2) {
    //   typeText = "QnA 답변 알림";
    // } else if (type == 3) {
    //   typeText = "상위입찰 알림";
    // } else if (type == 4) {
    //   typeText = "자동입찰 종료 알림";
    // } else if (type == 5) {
    //   typeText = "채팅 알림";
    // } else {
    //   typeText = "알림";
    // }

    switch (type) {
      case "1":
        typeText = "새 QnA 알림";
        break;
      case "2":
        typeText = "QnA 답변 알림";
        break;
      case "3":
        typeText = "상위입찰 알림";
        break;
      case "4":
        typeText = "자동입찰 종료 알림";
        break;
      case "5":
        typeText = "채팅 알림";
        break;
      default:
        typeText = "알림";
        break;
    }

    if (resultData?.content) {
      body = `[${typeText}] \n상품명 : ${resultData?.productName} \n${resultData?.content}`;
    } else {
      body = `[${typeText}] \n${resultData?.productName}`;
    }

    notificationOptions = {
      body: body,
      icon: resultData?.imgurl,
      tag: resultData?.tag,
      ...resultData,
    };
  }

  console.log("push: ", {
    resultData,
    notificationTitle,
    notificationOptions,
  });

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(url));
});
