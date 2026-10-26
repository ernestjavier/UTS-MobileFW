import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonIcon
} from '@ionic/react';
import {
  restaurantOutline,
  mailOutline,
  lockClosedOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
  sparkles
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../components/AppContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useApp();

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === 'register';

  const switchMode = () => {
    setMode(isRegister ? 'login' : 'register');
    setErrorMessage(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRegister && !name.trim()) {
      setErrorMessage('Name is required.');
      return;
    }

    if (!emailTrimmed) {
      setErrorMessage('Email address is required.');
      return;
    }

    if (!emailRegex.test(emailTrimmed)) {
      setErrorMessage('Please enter a valid email address (e.g., alex@example.com).');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Password cannot be empty.');
      return;
    }

    if (isRegister && password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    const result = isRegister
      ? await register(name.trim(), emailTrimmed, password)
      : await login(emailTrimmed, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(result.error);
      return;
    }

    setPassword('');
    navigate('/dashboard');
  };

  return (
    <IonPage>
      {/* Top Bar */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="cookpedia-header-toolbar">
          <div className="cookpedia-brand">
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FFE6D2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F47C38'
              }}
            >
              <IonIcon icon={restaurantOutline} style={{ fontSize: '20px' }} />
            </div>
            <IonTitle style={{ padding: 0, fontWeight: 800, fontSize: '20px', color: '#F47C38', flex: 'none' }}>
              Cookpedia
            </IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      {/* Main Content */}
      <IonContent fullscreen className="cookpedia-content">
        <div
          style={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '24px 24px',
            maxWidth: '420px',
            margin: '0 auto'
          }}
        >
          <div className="cookpedia-auth-card">
            {/* Logo Illustration */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '28px',
                  background: 'linear-gradient(135deg, #FFE6D2 0%, #FFFFFF 100%)',
                  boxShadow: '0 8px 24px rgba(244, 124, 56, 0.18)',
                  border: '2px solid rgba(244, 124, 56, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  position: 'relative'
                }}
              >
                <IonIcon icon={restaurantOutline} style={{ fontSize: '46px', color: '#F47C38' }} />
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#F47C38',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <IonIcon icon={sparkles} style={{ fontSize: '13px' }} />
                </div>
              </div>
  
              <h1
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#34302D',
                  letterSpacing: '-0.3px'
                }}
              >
                {isRegister ? 'Join Cookpedia!' : 'Welcome Back, Food Lover!'}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#8A817A',
                  lineHeight: 1.5
                }}
              >
                {isRegister
                  ? 'Create an account to save your favorite recipes.'
                  : 'Sign in to discover your next favorite meal.'}
              </p>
            </div>
  
            {/* Error Feedback */}
            {errorMessage && (
              <div
                style={{
                  backgroundColor: '#FDECEC',
                  border: '1px solid #D64545',
                  color: '#D64545',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{errorMessage}</span>
              </div>
            )}
  
            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isRegister && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#34302D',
                      marginBottom: '6px'
                    }}
                  >
                    Full Name
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1.5px solid rgba(244, 124, 56, 0.2)',
                      padding: '6px 14px',
                      boxShadow: '0 2px 8px rgba(52, 48, 45, 0.03)'
                    }}
                  >
                    <IonIcon icon={personOutline} style={{ color: '#F47C38', fontSize: '20px', marginRight: '10px' }} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '14px',
                        color: '#34302D',
                        padding: '8px 0'
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#34302D',
                    marginBottom: '6px'
                  }}
                >
                  Email Address
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(244, 124, 56, 0.2)',
                    padding: '6px 14px',
                    boxShadow: '0 2px 8px rgba(52, 48, 45, 0.03)'
                  }}
                >
                  <IonIcon icon={mailOutline} style={{ color: '#F47C38', fontSize: '20px', marginRight: '10px' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      color: '#34302D',
                      padding: '8px 0'
                    }}
                    autoCapitalize="off"
                  />
                </div>
              </div>
  
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#34302D',
                    marginBottom: '6px'
                  }}
                >
                  Password
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(244, 124, 56, 0.2)',
                    padding: '6px 14px',
                    boxShadow: '0 2px 8px rgba(52, 48, 45, 0.03)'
                  }}
                >
                  <IonIcon icon={lockClosedOutline} style={{ color: '#F47C38', fontSize: '20px', marginRight: '10px' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      color: '#34302D',
                      padding: '8px 0'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#8A817A',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px',
                      outline: 'none'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} style={{ fontSize: '20px' }} />
                  </button>
                </div>
              </div>
  
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '10px',
                  height: '48px',
                  backgroundColor: '#F47C38',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(244, 124, 56, 0.35)',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {isSubmitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
              </button>
            </form>
  
            {/* Switch between Login and Sign Up */}
            <div style={{ textAlign: 'center', marginTop: '22px' }}>
              <span style={{ fontSize: '14px', color: '#8A817A' }}>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              </span>
              <button
                type="button"
                onClick={switchMode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F47C38',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline'
                }}
              >
                {isRegister ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      </IonContent>

      {/* Simple Footer */}
      <IonFooter className="ion-no-border">
        <IonToolbar className="cookpedia-footer-toolbar" style={{ textAlign: 'center' }}>
          <p style={{ margin: '8px 0', fontSize: '12px', color: '#8A817A', fontStyle: 'italic' }}>
            Made with love for food lovers
          </p>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Login;

