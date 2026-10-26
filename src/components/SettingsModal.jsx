import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonToggle
} from '@ionic/react';
import {
  closeOutline,
  notificationsOutline,
  volumeHighOutline,
  mailOutline,
  informationCircleOutline,
  helpCircleOutline
} from 'ionicons/icons';
import { useApp } from './AppContext';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSettings, showToast } = useApp();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader className="ion-no-border">
        <IonToolbar className="cookpedia-modal-toolbar">
          <IonTitle style={{ color: '#34302D', fontWeight: 700, fontSize: '18px' }}>
            Settings
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} style={{ color: '#8A817A' }}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="cookpedia-content">
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Notification setting */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid #FFE6D2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#FFE6D2',
                    color: '#F47C38',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}
                >
                  <IonIcon icon={notificationsOutline} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#34302D' }}>
                    Push Notifications
                  </div>
                  <div style={{ fontSize: '12px', color: '#8A817A' }}>
                    Daily chef recommendations & updates
                  </div>
                </div>
              </div>
              <IonToggle
                color="warning"
                checked={settings.pushNotifications}
                onIonChange={(e) => updateSettings({ pushNotifications: e.detail.checked })}
              />
            </div>

            {/* Sound effects */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid #FFE6D2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#FFE6D2',
                    color: '#F47C38',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}
                >
                  <IonIcon icon={volumeHighOutline} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#34302D' }}>
                    Sound Effects
                  </div>
                  <div style={{ fontSize: '12px', color: '#8A817A' }}>
                    Audio feedback for timers and taps
                  </div>
                </div>
              </div>
              <IonToggle
                color="warning"
                checked={settings.soundEffects}
                onIonChange={(e) => updateSettings({ soundEffects: e.detail.checked })}
              />
            </div>

            {/* Email Digest */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid #FFE6D2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#FFE6D2',
                    color: '#F47C38',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}
                >
                  <IonIcon icon={mailOutline} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#34302D' }}>
                    Weekly Recipe Digest
                  </div>
                  <div style={{ fontSize: '12px', color: '#8A817A' }}>
                    Receive curated recipes in your email
                  </div>
                </div>
              </div>
              <IonToggle
                color="warning"
                checked={settings.emailDigest}
                onIonChange={(e) => updateSettings({ emailDigest: e.detail.checked })}
              />
            </div>

            {/* Help & Support */}
            <div
              onClick={() => showToast('Cookpedia Support: support@cookpedia.app')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid #FFE6D2',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#FFE6D2',
                  color: '#F47C38',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                <IonIcon icon={helpCircleOutline} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#34302D' }}>
                  Help & FAQs
                </div>
                <div style={{ fontSize: '12px', color: '#8A817A' }}>
                  Frequently asked questions & cooking tips
                </div>
              </div>
            </div>

            {/* App Info */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid #FFE6D2',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#FFE6D2',
                  color: '#F47C38',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                <IonIcon icon={informationCircleOutline} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#34302D' }}>
                  Cookpedia Version
                </div>
                <div style={{ fontSize: '12px', color: '#8A817A' }}>
                  v1.0.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

