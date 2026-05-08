import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, LayoutDashboard, LogIn, LogOut, UserPlus, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black flex items-center gap-2 text-slate-900 group">
          <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
            <Activity size={24} />
          </div>
          <span className="tracking-tight">Health<span className="text-blue-600">AI</span></span>
        </Link>
        <div className="flex gap-8 items-center">
          <div className="hidden md:flex gap-8 items-center text-slate-600 font-semibold">
            <Link to="/" className="hover:text-blue-600 transition-colors">{t('home')}</Link>
            <Link to="/checker" className="hover:text-blue-200 transition-colors">{t('checker')}</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <LayoutDashboard size={18} /> {t('dashboard')}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all uppercase"
            >
              <Languages size={14} className="text-blue-500" /> {i18n.language === 'en' ? 'HI' : 'EN'}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Welcome</span>
                  <span className="font-bold text-slate-900 leading-tight">{user}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                  title={t('logout')}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="px-5 py-2.5 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all">
                  {t('login')}
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
