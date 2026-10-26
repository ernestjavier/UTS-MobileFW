import React from 'react';
import { IonIcon } from '@ionic/react';
import { bookmark, bookmarkOutline, timeOutline, star } from 'ionicons/icons';
import { useApp } from './AppContext';
import { ImageWithFallback } from './ImageWithFallback';

export const RecipeCard = ({ recipe, onSelect }) => {
  const { isFavorite, toggleFavorite } = useApp();
  const favorited = isFavorite(recipe.id);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  return (
    <div
      onClick={() => onSelect(recipe)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(52, 48, 45, 0.06)',
        border: '1px solid rgba(244, 124, 56, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        position: 'relative'
      }}
      className="recipe-card"
    >
      {/* Image and Floating Badges */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Category Pill Tag */}
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            color: '#F47C38',
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          {recipe.category}
        </span>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label={`Bookmark ${recipe.name}`}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            outline: 'none',
            transition: 'transform 0.1s ease'
          }}
        >
          <IonIcon
            icon={favorited ? bookmark : bookmarkOutline}
            style={{
              color: favorited ? '#F47C38' : '#8A817A',
              fontSize: '17px'
            }}
          />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3
            style={{
              margin: '0 0 6px 0',
              fontSize: '14px',
              fontWeight: 700,
              color: '#34302D',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {recipe.name}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8A817A', fontSize: '11px', fontWeight: 500 }}>
            <IonIcon icon={timeOutline} style={{ color: '#F47C38', fontSize: '14px' }} />
            <span>{recipe.cookingTime}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#34302D', fontSize: '11px', fontWeight: 700 }}>
            <IonIcon icon={star} style={{ color: '#F47C38', fontSize: '13px' }} />
            <span>{recipe.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

