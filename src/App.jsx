import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonSpinner,
  IonToast,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './variables.css';

import { AppProvider, useApp } from './components/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

setupIonicReact({
  mode: 'md'
});

const LoadingPage = () => (
  <IonPage>
    <IonContent className="cookpedia-content">
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <IonSpinner name="crescent" color="warning" />
      </div>
    </IonContent>
  </IonPage>
);

const AppRoutes = () => {
  const { toast, hideToast, isAuthenticated, isAuthChecking } = useApp();

  // IonRouterOutlet menyimpan halaman yang pernah dibuka. Kalau status login berubah,
  // halaman lama itu bisa tersangkut (URL pindah tapi layar tidak berganti).
  // Karena itu outlet dibuat ulang lewat `key` setiap status login berubah.
  const authState = isAuthenticated ? 'user' : isAuthChecking ? 'checking' : 'guest';

  return (
    <div className="app-viewport-wrapper">
      <IonReactRouter>
        {authState === 'user' && (
          <IonRouterOutlet key="user">
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </IonRouterOutlet>
        )}

        {authState === 'checking' && (
          <IonRouterOutlet key="checking">
            <Route path="*" element={<LoadingPage />} />
          </IonRouterOutlet>
        )}

        {authState === 'guest' && (
          <IonRouterOutlet key="guest">
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>
        )}
      </IonReactRouter>

      <IonToast
        isOpen={toast.isOpen}
        message={toast.message}
        duration={2500}
        onDidDismiss={hideToast}
        color={toast.color || 'primary'}
        position="top"
        style={{ '--border-radius': '12px' }}
      />
    </div>
  );
};

const App = () => {
  return (
    <IonApp>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </IonApp>
  );
};

export default App;

