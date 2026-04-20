import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginScreen from './screens/LoginScreen';
import MyApplications from './screens/MyApplications';
import ListingDetail from './screens/ListingDetail';
import SubmissionConfirmation from './screens/SubmissionConfirmation';
import BottomNav from './components/BottomNav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('MyApplications');
  const [screenProps, setScreenProps] = useState({});

  const navigate = (screen, props = {}) => {
    setScreenProps(props);
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-start justify-center">
      {/* Mobile device frame */}
      <div className="w-full max-w-[375px] min-h-screen bg-bg-page relative shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {!loggedIn ? (
            <LoginScreen key="login" onLogin={() => setLoggedIn(true)} />
          ) : (
            <>
              {currentScreen === 'MyApplications' && (
                <MyApplications key="apps" onNavigate={navigate} />
              )}
              {currentScreen === 'ListingDetail' && (
                <ListingDetail
                  key="listing"
                  listing={screenProps.listing}
                  onApply={(listing) => navigate('SubmissionConfirmation', { listing })}
                  onBack={() => navigate('MyApplications')}
                />
              )}
              {currentScreen === 'SubmissionConfirmation' && (
                <SubmissionConfirmation
                  key="confirm"
                  listing={screenProps.listing}
                  onBack={() => navigate('MyApplications')}
                />
              )}
            </>
          )}
        </AnimatePresence>

        {loggedIn && <BottomNav currentScreen={currentScreen} onNavigate={(screen) => navigate(screen)} />}
      </div>
    </div>
  );
}
