import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonAlert
} from '@ionic/react';
import {
  bookmarkOutline,
  settingsOutline,
  logOutOutline,
  chevronForwardOutline,
  sparklesOutline
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../components/AppContext';
import { FavoritesListModal } from '../components/FavoritesListModal';
import { SettingsModal } from '../components/SettingsModal';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { BottomNav } from '../components/BottomNav';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, favorites, logout } = useApp();

  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleConfirmLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <IonPage>
      {/* Top Bar */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="cookpedia-header-toolbar" style={{ padding: '0 8px' }}>
          <IonTitle style={{ fontWeight: 800, fontSize: '19px', color: '#34302D', padding: 0 }}>
            My Profile
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="cookpedia-content">
        <div style={{ padding: '20px 16px 30px' }}>
          {/* User Profile Header Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px 20px',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(244, 124, 56, 0.08)',
              border: '1.5px solid #FFE6D2',
              position: 'relative',
              marginBottom: '20px'
            }}
          >
            {/* Avatar */}
            <div
              style={{
                position: 'relative',
                width: '84px',
                height: '84px',
                margin: '0 auto 14px'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #F47C38',
                  boxShadow: '0 4px 14px rgba(244, 124, 56, 0.25)'
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <h2
              style={{
                margin: '0 0 4px 0',
                fontSize: '20px',
                fontWeight: 800,
                color: '#34302D'
              }}
            >
              {user.name}
            </h2>
            <p
              style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                color: '#8A817A'
              }}
            >
              {user.email}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFE6D2',
                color: '#F47C38',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '16px'
              }}
            >
              <IonIcon icon={sparklesOutline} />
              <span>Certified Home Chef</span>
            </div>
          </div>

          {/* Stat Summary Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '24px'
            }}
          >
            {/* Total Saved Recipes Card */}
            <div
              onClick={() => setShowFavoritesModal(true)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 10px',
                textAlign: 'center',
                border: '1.5px solid #FFE6D2',
                boxShadow: '0 4px 12px rgba(52, 48, 45, 0.04)',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#F47C38',
                  lineHeight: 1.2
                }}
              >
                {favorites.length}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#34302D',
                  marginTop: '4px'
                }}
              >
                Saved Recipes
              </div>
            </div>

            {/* Favorite Category Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 10px',
                textAlign: 'center',
                border: '1.5px solid #FFE6D2',
                boxShadow: '0 4px 12px rgba(52, 48, 45, 0.04)'
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#F47C38',
                  lineHeight: 1.6
                }}
              >
                {user.favoriteCategory}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#34302D',
                  marginTop: '4px'
                }}
              >
                Top Category
              </div>
            </div>

            {/* Member Since Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 10px',
                textAlign: 'center',
                border: '1.5px solid #FFE6D2',
                boxShadow: '0 4px 12px rgba(52, 48, 45, 0.04)'
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#F47C38',
                  lineHeight: 1.7
                }}
              >
                {user.memberSince}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#34302D',
                  marginTop: '4px'
                }}
              >
                Member Since
              </div>
            </div>
          </div>

          {/* Profile Menu Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                margin: '0 0 10px 4px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#8A817A',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Account
            </h3>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #FFE6D2',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(52, 48, 45, 0.04)'
              }}
            >

              <div
                onClick={() => setShowFavoritesModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255, 230, 210, 0.6)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: '#FFE6D2',
                      color: '#F47C38',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}
                  >
                    <IonIcon icon={bookmarkOutline} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#34302D' }}>
                      Favorite Recipes
                    </div>
                    <div style={{ fontSize: '12px', color: '#8A817A' }}>
                      {favorites.length} saved recipes ready to cook
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      backgroundColor: '#F47C38',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '10px',
                      padding: '2px 8px'
                    }}
                  >
                    {favorites.length}
                  </span>
                  <IonIcon icon={chevronForwardOutline} style={{ color: '#8A817A', fontSize: '18px' }} />
                </div>
              </div>


              <div
                onClick={() => setShowSettingsModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: '#FFE6D2',
                      color: '#F47C38',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}
                  >
                    <IonIcon icon={settingsOutline} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#34302D' }}>
                      Settings
                    </div>
                    <div style={{ fontSize: '12px', color: '#8A817A' }}>
                      Notifications, sound effects & app info
                    </div>
                  </div>
                </div>
                <IonIcon icon={chevronForwardOutline} style={{ color: '#8A817A', fontSize: '18px' }} />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => setShowLogoutAlert(true)}
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #D64545',
              borderRadius: '16px',
              color: '#D64545',
              fontWeight: 700,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(214, 69, 69, 0.08)'
            }}
          >
            <IonIcon icon={logOutOutline} style={{ fontSize: '20px' }} />
            <span>Log Out</span>
          </button>
        </div>

        {/* Modals */}
        <FavoritesListModal
          isOpen={showFavoritesModal}
          onClose={() => setShowFavoritesModal(false)}
          onSelectRecipe={(rec) => setSelectedRecipe(rec)}
        />

        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
        />

        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />

        {/* Logout Confirmation */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Confirm Logout"
          message="Are you sure you want to log out of Cookpedia?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Log Out',
              role: 'destructive',
              handler: handleConfirmLogout
            }
          ]}
        />
      </IonContent>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />
    </IonPage>
  );
};

export default Profile;

