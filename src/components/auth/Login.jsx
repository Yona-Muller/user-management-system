import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../services/auth';
import { LanguageToggle } from '../LanguageToggle';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';


export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      
      if (!response.token) {
        setError('שגיאה בהתחברות: לא התקבל טוקן');
        return;
      }
  
      authLogin(response.token, response.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('שם משתמש או סיסמה שגויים');
    }
  };

  return (
    <div className="login-page">
      <LanguageToggle></LanguageToggle>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>{t.welcome}</h1>
            <p>התחבר למערכת ניהול המשתמשים</p>
          </div>

          {error && (
            <div className="login-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>{t.username}</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  placeholder= {t.insert_username}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
            </div>

            <div className="form-group">
              <label>{t.password}</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder={t.insert_password}
                  required
                />
                <i className="fas fa-lock"></i>
              </div>
            </div>

            <button type="submit" className="login-button">
              התחבר
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}