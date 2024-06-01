import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyDEW8GNqkpsSAWln6ThOTc4GWhD081XuyE',
    authDomain: 'bidmarkit.firebaseapp.com',
    projectId: 'bidmarkit',
    storageBucket: 'bidmarkit.appspot.com',
    messagingSenderId: '156532169791',
    appId: '1:156532169791:web:57d45505b056da13a72c8a',
    measurementId: 'G-1CVYY94LTT',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default async function requestPermission() {
    console.log('권한 요청 중...');

    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
        console.log('알림 권한 허용 안됨');
        return;
    }

    console.log('알림 권한이 허용됨');

    const token = await getToken(messaging, {
        vapidKey:
            'BA1OIw8xDDr9-ZSH2h2EFlqfoBLCIpvdYkVSYdryiAyvi0xyuEcSvPZHO3eUww368VdqWll3FemQLOUcjz0JDbQ',
    });

    if (token) {
        console.log('token: ', token);
        localStorage.setItem('fcmToken', token);
    } else console.log('Can not get Token');

    onMessage(messaging, (payload) => {
        console.log('메시지가 도착했습니다.', payload);
        // ...
    });
}

export function subscribeTopic(topic) {
    console.log('구독 중...');
}

requestPermission();
