import React from "react";
import "./App.css";
import requestPermission from "./firebase-messaging-sw";
import { subscribeTopic } from "./firebase-messaging-sw";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "pages/mainpage/MainPage";
import SearchPage from "pages/searchpage/SearchPage";
import ChatPage from "pages/chatpage/ChatPage";
import NotiPage from "pages/notipage/NotiPage";
import MyPage from "pages/mypage/MyPage";
import MobilePage from "layout/MobilePage";

function App() {
  const handleRequestPermission = () => {
    requestPermission();
  };

  const permission = Notification.permission;

  const handleSub = () => {
    subscribeTopic("test");
  };

  return (
    <Routes>
      <Route path="/" element={<MobilePage />}>
        <Route path="" element={<Navigate to="main" />} />
        <Route path="main" element={<MainPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="noti" element={<NotiPage />} />
        <Route path="my" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
