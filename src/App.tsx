import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ChatRoomsPage = lazy(() => import('./pages/ChatRoomsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const VRRoomPage = lazy(() => import('./pages/VRRoomPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat-rooms" element={<ChatRoomsPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="vr-room/:roomId" element={<VRRoomPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <LoadingSpinner size="large" />
    </div>
  );
};

export default App;