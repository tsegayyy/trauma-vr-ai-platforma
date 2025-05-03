import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const location = useLocation();
  const isVRPage = location.pathname.includes('/vr-room');

  return (
    <div className="flex flex-col min-h-screen">
      {!isVRPage && <Header />}
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      {!isVRPage && <Footer />}
    </div>
  );
};

export default Layout;