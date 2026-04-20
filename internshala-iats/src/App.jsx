import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MyApplications from './screens/MyApplications';
import ListingDetail from './screens/ListingDetail';
import SubmissionConfirmation from './screens/SubmissionConfirmation';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [screenProps, setScreenProps] = useState({});

  const navigate = (screen, props = {}) => {
    setScreenProps(props);
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setCurrentScreen('Home');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentScreen('Home');
    setScreenProps({});
  };

  const renderScreen = (key) => {
    if (!loggedIn) {
      return <LoginScreen key="login" onLogin={handleLogin} />;
    }
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen key="home" onNavigate={navigate} />;
      case 'Search':
        return <SearchScreen key="search" onNavigate={navigate} />;
      case 'MyApplications':
        return <MyApplications key="apps" onNavigate={navigate} />;
      case 'ListingDetail':
        return (
          <ListingDetail
            key="listing"
            listing={screenProps.listing}
            onApply={(listing) => navigate('SubmissionConfirmation', { listing })}
            onBack={() => navigate(screenProps.from || 'MyApplications')}
          />
        );
      case 'SubmissionConfirmation':
        return (
          <SubmissionConfirmation
            key="confirm"
            listing={screenProps.listing}
            onBack={() => navigate('MyApplications')}
          />
        );
      case 'Profile':
        return <ProfileScreen key="profile" onLogout={handleLogout} />;
      default:
        return <HomeScreen key="home" onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">

      {/* ── Desktop layout (md+) ── */}
      <div className="hidden md:flex h-screen overflow-hidden bg-[#F0F2F5]">
        {loggedIn && (
          <Sidebar currentScreen={currentScreen} onNavigate={navigate} onLogout={handleLogout} />
        )}
        <div className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {renderScreen('desktop')}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile layout (<md) ── */}
      <div className="flex md:hidden justify-center bg-[#F0F2F5] min-h-screen">
        <div className="w-full max-w-[390px] h-screen flex flex-col bg-bg-page shadow-2xl overflow-hidden relative">
          {/* Screen area */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {renderScreen('mobile')}
            </AnimatePresence>
          </div>
          {/* Bottom nav sits outside screen area — no fixed needed */}
          {loggedIn && (
            <BottomNav currentScreen={currentScreen} onNavigate={navigate} />
          )}
        </div>
      </div>

    </div>
  );
}
