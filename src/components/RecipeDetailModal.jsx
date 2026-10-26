import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonFooter
} from '@ionic/react';
import {
  closeOutline,
  bookmarkOutline,
  bookmark,
  timeOutline,
  flameOutline,
  star,
  peopleOutline,
  checkmarkCircle,
  ellipseOutline,
  sparklesOutline
} from 'ionicons/icons';
import { useApp } from './AppContext';
import { ImageWithFallback } from './ImageWithFallback';

export const RecipeDetailModal = ({
  recipe,
  isOpen,
  onClose
}) => {
  const { isFavorite, toggleFavorite, showToast } = useApp();
  const [checkedIngredients, setCheckedIngredients] = useState({});

  if (!recipe) return null;

  const favorited = isFavorite(recipe.id);

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleStartCooking = () => {
    showToast(`Great choice! Cooking timer started for ${recipe.cookingTime}. Happy cooking!`, 'success');
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="recipe-detail-modal">
      <IonHeader className="ion-no-border">
        <IonToolbar className="cookpedia-modal-toolbar">
          <IonTitle style={{ color: '#34302D', fontWeight: 700, fontSize: '18px' }}>
            Recipe Details
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} style={{ color: '#8A817A' }}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="cookpedia-content">
        <div style={{ paddingBottom: '30px' }}>
          {/* Hero Image Container */}
          <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Category Badge overlay */}
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <span
                style={{
                  backgroundColor: '#F47C38',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                {recipe.category}
              </span>
            </div>

            {/* Quick Bookmark Button overlay */}
            <div style={{ position: 'absolute', top: '14px', right: '16px' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  outline: 'none'
                }}
                aria-label="Toggle favorite"
              >
                <IonIcon
                  icon={favorited ? bookmark : bookmarkOutline}
                  style={{
                    color: favorited ? '#F47C38' : '#8A817A',
                    fontSize: '22px'
                  }}
                />
              </button>
            </div>
          </div>

          <div style={{ padding: '20px' }}>
            {/* Title and Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#34302D', lineHeight: 1.2 }}>
                {recipe.name}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <IonIcon icon={star} style={{ color: '#F47C38', fontSize: '18px' }} />
              <span style={{ fontWeight: 700, color: '#34302D', fontSize: '15px' }}>{recipe.rating}</span>
              <span style={{ color: '#8A817A', fontSize: '13px' }}>• (120+ reviews)</span>
            </div>

            {/* Meta tags card (Time, Difficulty, Servings, Calories) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                background: '#FFFFFF',
                padding: '14px 10px',
                borderRadius: '16px',
                border: '1px solid #FFE6D2',
                marginBottom: '20px',
                textAlign: 'center'
              }}
            >
              <div>
                <IonIcon icon={timeOutline} style={{ color: '#F47C38', fontSize: '18px', display: 'block', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', color: '#8A817A', textTransform: 'uppercase' }}>Time</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#34302D' }}>{recipe.cookingTime}</div>
              </div>
              <div>
                <IonIcon icon={flameOutline} style={{ color: '#F47C38', fontSize: '18px', display: 'block', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', color: '#8A817A', textTransform: 'uppercase' }}>Difficulty</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#34302D' }}>{recipe.difficulty}</div>
              </div>
              <div>
                <IonIcon icon={peopleOutline} style={{ color: '#F47C38', fontSize: '18px', display: 'block', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', color: '#8A817A', textTransform: 'uppercase' }}>Servings</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#34302D' }}>{recipe.servings} People</div>
              </div>
              <div>
                <IonIcon icon={sparklesOutline} style={{ color: '#F47C38', fontSize: '18px', display: 'block', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', color: '#8A817A', textTransform: 'uppercase' }}>Energy</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#34302D' }}>{recipe.calories}</div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#34302D', marginBottom: '8px' }}>
                About Recipe
              </h2>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#8A817A' }}>
                {recipe.description}
              </p>
            </div>

            {/* Ingredients */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#34302D', margin: 0 }}>
                  Ingredients
                </h2>
                <span style={{ fontSize: '12px', color: '#F47C38', fontWeight: 600 }}>
                  {recipe.ingredients.length} items
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recipe.ingredients.map((item, index) => {
                  const isChecked = !!checkedIngredients[index];
                  return (
                    <div
                      key={index}
                      onClick={() => toggleIngredient(index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        background: isChecked ? '#FFE6D2' : '#FFFFFF',
                        border: isChecked ? '1px solid #F47C38' : '1px solid rgba(244, 124, 56, 0.1)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <IonIcon
                        icon={isChecked ? checkmarkCircle : ellipseOutline}
                        style={{
                          color: isChecked ? '#F47C38' : '#8A817A',
                          fontSize: '20px',
                          flexShrink: 0
                        }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          color: isChecked ? '#8A817A' : '#34302D',
                          textDecoration: isChecked ? 'line-through' : 'none',
                          fontWeight: 500
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#34302D', marginBottom: '12px' }}>
                Cooking Instructions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {recipe.instructions.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      background: '#FFFFFF',
                      padding: '14px',
                      borderRadius: '14px',
                      border: '1px solid rgba(244, 124, 56, 0.1)'
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#FFE6D2',
                        color: '#F47C38',
                        fontWeight: 700,
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {index + 1}
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#34302D' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar className="cookpedia-modal-footer-toolbar" style={{ padding: '8px 12px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => toggleFavorite(recipe.id)}
              style={{
                flex: '1',
                height: '46px',
                borderRadius: '12px',
                border: '1.5px solid #F47C38',
                backgroundColor: favorited ? '#FFE6D2' : '#FFFFFF',
                color: '#F47C38',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <IonIcon icon={favorited ? bookmark : bookmarkOutline} style={{ fontSize: '18px' }} />
              {favorited ? 'Saved in Favorites' : 'Save to Favorites'}
            </button>

            <button
              type="button"
              onClick={handleStartCooking}
              style={{
                flex: '1',
                height: '46px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#F47C38',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(244, 124, 56, 0.3)'
              }}
            >
              Start Cooking
            </button>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

