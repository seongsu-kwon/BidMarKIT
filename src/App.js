import React from 'react';
import './App.css';
import requestPermission from './firebase-messaging-sw';
import { subscribeTopic } from './firebase-messaging-sw';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from 'pages/mainpage/MainPage';
import SearchPage from 'pages/searchpage/SearchPage';
import ChatPage from 'pages/chatpage/ChatPage';
import NotiPage from 'pages/notipage/NotiPage';
import MyPage from 'pages/mypage/MyPage';
import MobilePage from 'layout/MobilePage';
import ProductListPage from 'pages/productpage/ProductLIstPage';
import ProductDetailPage from 'pages/productpage/ProductDetailPage';
import BidPage from 'pages/productpage/BidPage';
import PurchasePage from 'pages/productpage/PurchasePage';
import LoginPage from 'pages/authpage/LoginPage';
import OAuthLoginPage from 'pages/authpage/OAuthLoginPage';
import KakaoRedirectPage from 'pages/authpage/KakaoRedirectPage';
import ProductInfListPage from 'pages/productpage/ProductInfListPage';
import PurchaseListPage from 'pages/mypage/PurchaseListPage';
import SaleListPage from 'pages/mypage/SaleListPage';
import LikesListPage from 'pages/mypage/LikesListPage';
import ProductUploadPage from 'pages/productpage/ProductUploadPage';

function App() {
    const handleRequestPermission = () => {
        requestPermission();
    };

    const permission = Notification.permission;

    const handleSub = () => {
        subscribeTopic('test');
    };

    return (
        <Routes>
            <Route path="/" element={<MobilePage />}>
                <Route path="" element={<Navigate to="main" />} />
                <Route path="main" element={<MainPage />} />
                {/* <Route path="main" element={<Navigate to="/list/all" />} /> */}
                <Route path="list/:type" element={<ProductInfListPage />} />
                <Route path="infinite/:type" element={<ProductInfListPage />} />
                <Route path="detail/:id">
                    <Route path="" element={<ProductDetailPage />} />
                    <Route path="bid" element={<BidPage />} />
                    <Route path="purchase" element={<PurchasePage />} />
                </Route>
                <Route path="upload" element={<ProductUploadPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="noti" element={<NotiPage />} />
                <Route path="mypage">
                    <Route path="" element={<MyPage />} />
                    <Route path="likes" element={<LikesListPage />} />
                    <Route path="history">
                        <Route path="purchase" element={<PurchaseListPage />} />
                        <Route path="sale" element={<SaleListPage />} />
                    </Route>
                </Route>
                {/* <Route path="login" element={<OAuthLoginPage />} /> */}
                <Route path="login" element={<LoginPage />} />
                <Route
                    path="oauth/redirected/kakao"
                    element={<KakaoRedirectPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
