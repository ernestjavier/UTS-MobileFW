import React from 'react';
import { IonFooter, IonIcon } from '@ionic/react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

export const BottomNav = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <IonFooter className="ion-no-border" style={{ position: 'sticky', bottom: 0, zIndex: 100 }}>
      <div
        className="cookpedia-tab-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '60px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #FFE6D2',
          boxShadow: '0 -4px 16px rgba(52, 48, 45, 0.05)'
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            color: activeTab === 'home' ? '#F47C38' : '#8A817A',
            cursor: 'pointer',
            padding: '6px 24px',
            outline: 'none'
          }}
        >
          <IonIcon icon={homeOutline} style={{ fontSize: '22px' }} />
          <span style={{ fontSize: '11px', fontWeight: activeTab === 'home' ? 700 : 500 }}>
            Home
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/profile')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            color: activeTab === 'profile' ? '#F47C38' : '#8A817A',
            cursor: 'pointer',
            padding: '6px 24px',
            outline: 'none'
          }}
        >
          <IonIcon icon={personOutline} style={{ fontSize: '22px' }} />
          <span style={{ fontSize: '11px', fontWeight: activeTab === 'profile' ? 700 : 500 }}>
            Profile
          </span>
        </button>
      </div>
    </IonFooter>
  );
};

