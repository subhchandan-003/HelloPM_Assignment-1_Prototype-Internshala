import { useState } from 'react';
import { motion } from 'framer-motion';

const DEMO_EMAIL = 'arjun@example.com';
const DEMO_PASSWORD = 'demo1234';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onLogin(); }, 600);
    } else {
      setError('Invalid credentials. Use the demo account below.');
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col md:flex-row md:items-stretch"
    >
      {/* Left brand panel — desktop only */}
      <div className="hidden md:flex md:w-1/2 bg-primary flex-col items-center justify-center px-12 py-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-white text-[32px] font-bold leading-tight mb-3">Internshala</h2>
          <p className="text-blue-100 text-[16px] leading-relaxed max-w-xs">
            India's largest platform for internships and student jobs. Track every application in one place.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[['5L+', 'Students'], ['50K+', 'Companies'], ['95%', 'Success Rate']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="text-white text-[22px] font-bold">{val}</p>
                <p className="text-blue-200 text-[12px] mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right / mobile form panel */}
      <div className="flex-1 flex flex-col md:justify-center md:items-center md:bg-[#F8F9FA]">
        {/* Mobile top brand */}
        <div className="md:hidden bg-primary pt-14 pb-10 px-6 rounded-b-[32px]">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-white text-[20px] font-bold tracking-tight">Internshala</span>
          </motion.div>
          <h1 className="text-white text-[24px] font-bold leading-tight">Welcome back,<br />Arjun</h1>
          <p className="text-blue-100 text-[14px] mt-2">Sign in to check your application updates</p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full md:max-w-sm px-6 pt-8 md:bg-white md:rounded-2xl md:shadow-lg md:p-8 md:border md:border-border-default"
        >
          <div className="hidden md:block mb-6">
            <h2 className="text-[22px] font-bold text-text-primary">Sign in</h2>
            <p className="text-[14px] text-text-secondary mt-1">Use the demo credentials below</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Email</label>
              <div className="relative">
                <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="arjun@example.com"
                  className="w-full pl-10 pr-4 py-3 text-[14px] text-text-primary bg-white border border-border-default rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors placeholder:text-text-muted"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Password</label>
              <div className="relative">
                <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 text-[14px] text-text-primary bg-white border border-border-default rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors placeholder:text-text-muted"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-[12px] text-red-600">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 bg-primary text-white text-[14px] font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  />
                  Signing in...
                </>
              ) : 'Log In'}
            </motion.button>

            <div className="mt-5 p-3 bg-bg-info-soft border border-blue-200 rounded-xl">
              <p className="text-[12px] text-text-secondary mb-1"><strong>Demo Credentials</strong></p>
              <p className="text-[12px] text-text-secondary">Email: <span className="font-mono text-text-primary">arjun@example.com</span></p>
              <p className="text-[12px] text-text-secondary">Password: <span className="font-mono text-text-primary">demo1234</span></p>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={fillDemo}
                className="mt-2 text-[12px] font-semibold text-primary hover:underline cursor-pointer"
              >
                Auto-fill credentials →
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
