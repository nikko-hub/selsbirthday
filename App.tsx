
import React, { useState } from 'react';
import Login from './components/Login';
import BirthdayPage from './components/BirthdayPage';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LOGIN);

  const handleLoginSuccess = () => {
    setState(AppState.CELEBRATION);
  };

  return (
    <div className="min-h-screen transition-all duration-700">
      {state === AppState.LOGIN ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : (
        <BirthdayPage />
      )}
    </div>
  );
};

export default App;
