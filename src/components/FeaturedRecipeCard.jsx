import React from 'react';
import { IonIcon } from '@ionic/react';
import { bookmark, bookmarkOutline, timeOutline, flameOutline, star, sparkles } from 'ionicons/icons';
import { useApp } from './AppContext';
import { ImageWithFallback } from './ImageWithFallback';

export const FeaturedRecipeCard = ({ recipe, onSelect }) => {
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
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(244, 124, 56, 0.12)',
        border: '1.5px solid #FFE6D2',
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
        position: 'relative'
      }}
    >
      {/* Large Food Image */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Chef's Pick Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#F47C38',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '5px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <IonIcon icon={sparkles} style={{ fontSize: '13px' }} />
          Chef's Recommendation
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label="Bookmark Featured Recipe"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            outline: 'none'
          }}
        >
          <IonIcon
            icon={favorited ? bookmark : bookmarkOutline}
            style={{
              color: favorited ? '#F47C38' : '#8A817A',
              fontSize: '20px'
            }}
          />
        </button>
      </div>

      {/* Details */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '17px',
              fontWeight: 800,
              color: '#34302D',
              lineHeight: 1.3
            }}
          >
            {recipe.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#F47C38', fontWeight: 700, fontSize: '13px' }}>
            <IonIcon icon={star} />
            <span>{recipe.rating}</span>
          </div>
        </div>

        <p
          style={{
            margin: '0 0 14px 0',
            fontSize: '13px',
            color: '#8A817A',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {recipe.description}
        </p>

        {/* Info pills: Cooking Time & Difficulty */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#FFF8F0',
              padding: '6px 10px',
              borderRadius: '10px',
              color: '#34302D',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #FFE6D2'
            }}
          >
            <IonIcon icon={timeOutline} style={{ color: '#F47C38', fontSize: '15px' }} />
            <span>{recipe.cookingTime}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#FFF8F0',
              padding: '6px 10px',
              borderRadius: '10px',
              color: '#34302D',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #FFE6D2'
            }}
          >
            <IonIcon icon={flameOutline} style={{ color: '#F47C38', fontSize: '15px' }} />
            <span>{recipe.difficulty}</span>
          </div>

          <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#F47C38', fontWeight: 700 }}>
            View Recipe →
          </span>
        </div>
      </div>
    </div>
  );
};

