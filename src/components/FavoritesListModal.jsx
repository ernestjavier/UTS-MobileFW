import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent
} from '@ionic/react';
import { closeOutline, bookmark, trashOutline, timeOutline } from 'ionicons/icons';
import { useApp } from './AppContext';
import { ImageWithFallback } from './ImageWithFallback';

export const FavoritesListModal = ({
  isOpen,
  onClose,
  onSelectRecipe
}) => {
  const { getFavoriteRecipes, toggleFavorite } = useApp();
  const favoriteRecipes = getFavoriteRecipes();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader className="ion-no-border">
        <IonToolbar className="cookpedia-modal-toolbar">
          <IonTitle style={{ color: '#34302D', fontWeight: 700, fontSize: '18px' }}>
            Favorite Recipes ({favoriteRecipes.length})
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} style={{ color: '#8A817A' }}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="cookpedia-content">
        <div style={{ padding: '16px 20px 30px' }}>
          {favoriteRecipes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE6D2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#F47C38'
                }}
              >
                <IonIcon icon={bookmark} style={{ fontSize: '32px' }} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700, color: '#34302D' }}>
                No Favorites Saved Yet
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#8A817A', lineHeight: 1.5 }}>
                Explore recipes from the Dashboard and tap the bookmark icon on dishes you love!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => {
                    onClose();
                    onSelectRecipe(recipe);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: '1px solid #FFE6D2',
                    boxShadow: '0 2px 8px rgba(52, 48, 45, 0.04)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ width: '70px', height: '70px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                    <ImageWithFallback
                      src={recipe.image}
                      alt={recipe.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        backgroundColor: '#FFE6D2',
                        color: '#F47C38',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        display: 'inline-block',
                        marginBottom: '4px'
                      }}
                    >
                      {recipe.category}
                    </span>
                    <h4
                      style={{
                        margin: '0 0 4px 0',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#34302D',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {recipe.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8A817A', fontSize: '11px' }}>
                      <IonIcon icon={timeOutline} style={{ color: '#F47C38' }} />
                      <span>{recipe.cookingTime}</span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D64545',
                      padding: '8px',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                    title="Remove from favorites"
                    aria-label="Remove from favorites"
                  >
                    <IonIcon icon={trashOutline} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

