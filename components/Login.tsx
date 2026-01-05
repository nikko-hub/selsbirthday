
import React, { useState } from 'react';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Rosell') {
      onSuccess();
    } else {
      setError(true);
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 p-4">
      <div className={`max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 ${isJiggling ? 'animate-bounce' : ''}`}>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-heart text-rose-500 text-3xl"></i>
          </div>
          <h1 className="text-2xl font-serif text-gray-800">Secret Access</h1>
          <p className="text-gray-500 text-sm mt-2">ENTER THE MAGIC NAME</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-5 py-4 bg-gray-50 border ${error ? 'border-rose-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all text-center text-lg text-black placeholder-gray-400`}
              placeholder="Who is this surprise for?"
            />
          </div>
          
          {error && (
            <p className="text-rose-500 text-xs text-center font-medium animate-pulse">
              That's not the name we're looking for! Hint: Capital 'R'
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-rose-200 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            Unlock <i className="fa-solid fa-unlock text-sm"></i>
          </button>
        </form>

        <p className="mt-8 text-center text-gray-300 text-xs uppercase tracking-widest font-semibold">
          Rosell's Private Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
