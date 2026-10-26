import React, { useState, useMemo } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonAlert,
  IonSpinner
} from '@ionic/react';
import {
  restaurantOutline,
  notificationsOutline,
  searchOutline,
  sparklesOutline,
  flameOutline
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../components/AppContext';
import { FeaturedRecipeCard } from '../components/FeaturedRecipeCard';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { BottomNav } from '../components/BottomNav';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks'];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { recipes, recipesLoading, recipesError, reloadRecipes, user } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);

  // Chef's recommendation: Find featured recipe or fallback to first
  const featuredRecipe = useMemo(() => {
    return recipes.find(r => r.isFeatured) || recipes[0];
  }, [recipes]);

  // Filtered popular recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesCategory =
        selectedCategory === 'All'
          ? !recipe.isFeatured
          : recipe.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesQuery =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [recipes, selectedCategory, searchQuery]);

  return (
    <IonPage>
      {/* Top Bar */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="cookpedia-header-toolbar" style={{ padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* Logo and Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#FFE6D2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F47C38'
                }}
              >
                <IonIcon icon={restaurantOutline} style={{ fontSize: '20px' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '19px', color: '#F47C38', letterSpacing: '-0.3px' }}>
                Cookpedia
              </span>
            </div>

            {/* Right actions: Notification & Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowNotificationAlert(true)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #FFE6D2',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#34302D',
                  position: 'relative'
                }}
                aria-label="Notifications"
              >
                <IonIcon icon={notificationsOutline} style={{ fontSize: '20px' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#F47C38',
                    border: '1.5px solid #FFFFFF'
                  }}
                />
              </button>

              <div
                onClick={() => navigate('/profile')}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #F47C38',
                  boxShadow: '0 2px 8px rgba(244, 124, 56, 0.2)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="cookpedia-content">
        <div style={{ padding: '16px 16px 30px' }}>
          {/* Greeting Section */}
          <div style={{ marginBottom: '18px' }}>
            <h1
              style={{
                margin: '0 0 4px 0',
                fontSize: '22px',
                fontWeight: 800,
                color: '#34302D',
                letterSpacing: '-0.3px'
              }}
            >
              Hello, Chef!
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: '#8A817A',
                fontWeight: 500
              }}
            >
              What would you like to cook today?
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '4px 14px',
                border: '1.5px solid #FFE6D2',
                boxShadow: '0 2px 10px rgba(52, 48, 45, 0.04)'
              }}
            >
              <IonIcon icon={searchOutline} style={{ color: '#F47C38', fontSize: '20px', marginRight: '10px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  padding: '8px 0',
                  fontSize: '14px',
                  color: '#34302D'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8A817A',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: '4px 8px'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Food Categories */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '6px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      border: isActive ? 'none' : '1px solid #FFE6D2',
                      backgroundColor: isActive ? '#F47C38' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#34302D',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 4px 12px rgba(244, 124, 56, 0.3)' : 'none',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading / error saat mengambil resep dari API */}
          {recipesLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <IonSpinner name="crescent" color="warning" />
            </div>
          )}

          {!recipesLoading && recipesError && (
            <div
              style={{
                textAlign: 'center',
                padding: '24px 20px',
                backgroundColor: '#FDECEC',
                border: '1px solid #D64545',
                borderRadius: '16px',
                color: '#D64545',
                marginBottom: '20px'
              }}
            >
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 600 }}>{recipesError}</p>
              <button
                type="button"
                onClick={reloadRecipes}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D64545',
                  borderRadius: '12px',
                  color: '#D64545',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {!recipesLoading && !recipesError && (
          <>
          {/* Featured Recipe: Chef's Recommendation */}
          {featuredRecipe && !searchQuery && (selectedCategory === 'All' || selectedCategory === featuredRecipe.category) && (
            <div style={{ marginBottom: '26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <IonIcon icon={flameOutline} style={{ color: '#F47C38', fontSize: '20px' }} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#34302D' }}>
                  Chef's Recommendation
                </h2>
              </div>
              <FeaturedRecipeCard
                recipe={featuredRecipe}
                onSelect={(rec) => setSelectedRecipe(rec)}
              />
            </div>
          )}

          {/* Popular Recipes Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IonIcon icon={sparklesOutline} style={{ color: '#F47C38', fontSize: '18px' }} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#34302D' }}>
                  Popular Recipes
                </h2>
              </div>
              <span style={{ fontSize: '12px', color: '#8A817A', fontWeight: 600 }}>
                {filteredRecipes.length} dishes
              </span>
            </div>

            {/* 2-Column Responsive Grid */}
            {filteredRecipes.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '12px'
                }}
              >
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onSelect={(rec) => setSelectedRecipe(rec)}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #FFE6D2',
                  marginTop: '10px'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#FFE6D2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: '#F47C38',
                    fontSize: '28px'
                  }}
                >
                  <IonIcon icon={searchOutline} />
                </div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#34302D' }}>
                  No Recipes Found
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#8A817A' }}>
                  We couldn't find recipes matching "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  style={{
                    marginTop: '14px',
                    padding: '8px 16px',
                    backgroundColor: '#FFE6D2',
                    border: '1px solid #F47C38',
                    borderRadius: '12px',
                    color: '#F47C38',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
          </>
          )}
        </div>

        {/* Recipe Detail Modal */}
        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />

        {/* Notification Alert */}
        <IonAlert
          isOpen={showNotificationAlert}
          onDidDismiss={() => setShowNotificationAlert(false)}
          header="Notifications"
          subHeader="What's New in Cookpedia"
          message="🔔 Chef Maria just published 2 new weekend brunch recipes! Check them out in Breakfast category."
          buttons={['OK']}
        />
      </IonContent>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </IonPage>
  );
};

export default Dashboard;