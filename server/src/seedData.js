export const INITIAL_RECIPES = [
  {
    id: 'chef-rec-1',
    name: "Chef's Signature Beef Rendang",
    category: 'Dinner',
    description: 'Slow-cooked caramelized beef simmered in rich coconut milk and aromatic Indonesian spices until extraordinarily tender and flavorful.',
    cookingTime: '45 mins',
    difficulty: 'Medium',
    rating: 4.9,
    calories: '420 kcal',
    servings: 4,
    image: '/images/recipes/rendang.jpg',
    ingredients: [
      '500g Beef chuck, cut into cubes',
      '400ml Thick coconut milk',
      '3 stalks Lemongrass, bruised',
      '4 Kaffir lime leaves',
      '2 Turmeric leaves',
      '6 Shallots & 4 Garlic cloves',
      '5 Red chilies & 3 Bird eye chilies',
      '2cm Ginger & 2cm Galangal',
      '1 tsp Salt & 1 tbsp Brown sugar'
    ],
    instructions: [
      'Blend shallots, garlic, chilies, ginger, and galangal into a smooth spice paste.',
      'Heat a heavy bottom skillet, saute the spice paste with lemongrass and kaffir lime leaves until deeply fragrant.',
      'Add beef cubes and toss until coated and browned on the outside.',
      'Pour in the thick coconut milk, bring to a gentle boil while stirring continuously.',
      'Reduce the heat to low, simmer gently for 40-45 minutes until the coconut milk evaporates and oils separate into a rich dark glaze.',
      'Serve warm with steamed jasmine rice.'
    ],
    isFeatured: true
  },
  {
    id: 'rec-nasi-goreng',
    name: 'Nasi Goreng',
    category: 'Lunch',
    description: 'Traditional aromatic Indonesian fried rice cooked with sweet soy sauce, garlic, shallots, and served with a sunny-side-up egg.',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    rating: 4.8,
    calories: '380 kcal',
    servings: 2,
    image: '/images/recipes/nasi_goreng.jpg',
    ingredients: [
      '3 cups Cold cooked jasmine rice',
      '2 Eggs (1 scrambled, 1 sunny-side up)',
      '100g Chicken breast, diced',
      '3 Shallots & 2 cloves Garlic, minced',
      '2 tbsp Sweet soy sauce (Kecap Manis)',
      '1 tbsp Oyster sauce & 1 tsp Sesame oil',
      'Sliced cucumber & tomato for garnish'
    ],
    instructions: [
      'Heat 2 tablespoons of oil in a wok over high heat.',
      'Saute minced shallots and garlic until aromatic.',
      'Add chicken pieces and cook until no longer pink.',
      'Push ingredients to the side and scramble one egg in the wok.',
      'Toss in cold jasmine rice, breaking up any clumps.',
      'Pour sweet soy sauce and oyster sauce over the rice, stirring vigorously over high heat.',
      'Top with a fried sunny-side-up egg and fresh cucumber slices.'
    ]
  },
  {
    id: 'rec-chicken-teriyaki',
    name: 'Chicken Teriyaki',
    category: 'Dinner',
    description: 'Crispy skin pan-seared chicken thighs glazed in a glossy, sweet, and savory homemade ginger teriyaki glaze.',
    cookingTime: '25 mins',
    difficulty: 'Easy',
    rating: 4.7,
    calories: '390 kcal',
    servings: 3,
    image: '/images/recipes/ayam_teriyaki.jpg',
    ingredients: [
      '400g Boneless chicken thighs with skin',
      '3 tbsp Soy sauce & 3 tbsp Mirin',
      '2 tbsp Brown sugar',
      '1 tbsp Minced fresh ginger',
      '1 clove Garlic, grated',
      '1 tsp Toasted sesame seeds',
      'Chopped scallions for garnish'
    ],
    instructions: [
      'Season chicken thighs with a pinch of salt and black pepper.',
      'Whisk soy sauce, mirin, brown sugar, grated ginger, and garlic in a small bowl.',
      'Pan-sear chicken skin-side down in a skillet until crisp and golden brown (about 6 minutes).',
      'Flip chicken and cook through for another 5 minutes.',
      'Pour teriyaki sauce into the pan, let it bubble and thicken into a shiny glaze coating the chicken.',
      'Slice into bite-sized pieces and sprinkle with sesame seeds and scallions.'
    ]
  },
  {
    id: 'rec-spaghetti-carbonara',
    name: 'Spaghetti Carbonara',
    category: 'Dinner',
    description: 'Authentic Roman pasta prepared with crispy cured guanciale or beef bacon, egg yolks, freshly cracked black pepper, and Pecorino Romano.',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    rating: 4.9,
    calories: '510 kcal',
    servings: 2,
    image: '/images/recipes/spageti_carbonara.jpg',
    ingredients: [
      '200g Spaghetti bronze-cut pasta',
      '100g Crispy beef bacon or pancetta, diced',
      '3 Fresh egg yolks + 1 whole egg',
      '50g Freshly grated Pecorino Romano or Parmesan',
      '1 tbsp Coarsely crushed black peppercorns',
      'Pinch of sea salt'
    ],
    instructions: [
      'Boil pasta in salted water until al dente; reserve 1/2 cup of starchy pasta water.',
      'In a bowl, whisk eggs, egg yolks, and grated Pecorino with black pepper until a thick paste forms.',
      'Fry bacon in a large skillet over medium heat until crispy; remove skillet from direct heat.',
      'Transfer hot pasta directly to the skillet and toss with bacon oil.',
      'Pour the egg-cheese mixture over pasta while tossing continuously, adding a splash of pasta water to emulsify into a silky sauce.',
      'Serve immediately with extra black pepper and cheese.'
    ]
  },
  {
    id: 'rec-pancake',
    name: 'Pancake',
    category: 'Breakfast',
    description: 'Golden, ultra-fluffy buttermilk pancakes stacked high, served with creamy butter, pure maple syrup, and fresh berries.',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    rating: 4.8,
    calories: '320 kcal',
    servings: 2,
    image: '/images/recipes/pancake.jpg',
    ingredients: [
      '1 1/2 cups All-purpose flour',
      '2 tbsp Granulated sugar & 2 tsp Baking powder',
      '1/2 tsp Salt',
      '1 1/4 cups Buttermilk or whole milk',
      '1 Large egg',
      '3 tbsp Melted unsalted butter',
      'Fresh blueberries and pure maple syrup'
    ],
    instructions: [
      'Whisk dry ingredients (flour, sugar, baking powder, salt) together in a bowl.',
      'In another bowl, whisk milk, egg, and melted butter.',
      'Combine wet and dry mixtures gently until just incorporated (small lumps are okay).',
      'Heat a lightly buttered non-stick griddle over medium-low heat.',
      'Pour 1/4 cup batter for each pancake; cook until bubbles surface and burst (2-3 mins).',
      'Flip gently and cook until golden brown on the underside (1-2 mins).',
      'Stack on a warm plate, top with butter cubes, berries, and maple syrup.'
    ]
  },
  {
    id: 'rec-beef-burger',
    name: 'Beef Burger',
    category: 'Lunch',
    description: 'Gourmet smashed beef burger with melted aged cheddar, crisp lettuce, juicy tomato, and tangy house sauce inside a toasted brioche bun.',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    rating: 4.9,
    calories: '550 kcal',
    servings: 2,
    image: '/images/recipes/burger.jpg',
    ingredients: [
      '300g Ground chuck beef (80/20 fat ratio)',
      '2 Brioche buns, halved and lightly buttered',
      '2 slices Aged cheddar cheese',
      'Crisp romaine lettuce & ripe tomato slices',
      'Pickles & thinly sliced red onion',
      'House sauce: 2 tbsp mayonnaise, 1 tbsp ketchup, 1 tsp relish',
      'Sea salt & coarsely ground black pepper'
    ],
    instructions: [
      'Shape beef into two loose round balls without overworking.',
      'Toast the brioche buns on a hot cast iron skillet until golden.',
      'Place beef balls onto the smoking hot skillet and smash down firmly with a spatula.',
      'Season generously with salt and black pepper; cook undisturbed for 2-3 minutes for a crispy crust.',
      'Flip the patties, immediately drape with cheddar cheese, and cover with a lid for 1 minute to melt.',
      'Spread house sauce on bun bottoms, layer with lettuce, tomato, cheesy beef patty, pickles, and top bun.'
    ]
  },
  {
    id: 'rec-chocolate-cake',
    name: 'Chocolate Cake',
    category: 'Dessert',
    description: 'Decadent, rich dark chocolate fudge cake layered with silky Belgian chocolate ganache and chocolate curls.',
    cookingTime: '40 mins',
    difficulty: 'Medium',
    rating: 4.9,
    calories: '450 kcal',
    servings: 6,
    image: '/images/recipes/kue_coklat.jpg',
    ingredients: [
      '1 3/4 cups All-purpose flour',
      '3/4 cup Dutch-process cocoa powder',
      '1 1/2 cups Granulated sugar',
      '1 1/2 tsp Baking powder & 1 1/2 tsp Baking soda',
      '2 Large eggs & 1 cup Whole milk',
      '1/2 cup Vegetable oil & 1 tsp Vanilla extract',
      '1 cup Freshly brewed hot coffee (enhances chocolate flavor)',
      '150g Dark chocolate chips & 100ml Heavy cream for ganache'
    ],
    instructions: [
      'Preheat oven to 175°C (350°F) and grease cake pans.',
      'Whisk flour, cocoa powder, sugar, baking powder, and baking soda in a large bowl.',
      'Add eggs, milk, oil, and vanilla extract; beat with a mixer for 2 minutes on medium speed.',
      'Stir in hot brewed coffee until batter is smooth and liquid.',
      'Pour into pans and bake for 30-35 minutes until a toothpick inserted in the center comes out clean.',
      'Heat heavy cream and pour over chopped chocolate to make glossy ganache, then frost the cooled cake.'
    ]
  },
  {
    id: 'rec-fruit-smoothie',
    name: 'Fruit Smoothie',
    category: 'Drinks',
    description: 'Refreshing tropical wellness smoothie loaded with ripe mango, strawberries, banana, greek yogurt, and a sprinkle of chia seeds.',
    cookingTime: '10 mins',
    difficulty: 'Easy',
    rating: 4.7,
    calories: '210 kcal',
    servings: 2,
    image: '/images/recipes/fruit_smoothies.jpg',
    ingredients: [
      '1 cup Frozen strawberries',
      '1 cup Sweet ripe mango cubes',
      '1 Medium frozen banana',
      '1/2 cup Greek yogurt or almond milk',
      '1 tbsp Pure honey or agave nectar',
      '1 tbsp Chia seeds for topping',
      'Fresh mint sprigs for garnish'
    ],
    instructions: [
      'Add frozen strawberries, mango chunks, and sliced banana into a high-powered blender.',
      'Pour in Greek yogurt and honey or sweetener.',
      'Blend on high for 60-90 seconds until thick, silky, and creamy.',
      'Pour into chilled glass tumblers.',
      'Garnish top with chia seeds, strawberry slices, and fresh mint.'
    ]
  },
  {
    id: 'rec-ayam-goreng-bawang-putih',
    name: 'Ayam Goreng Bawang Putih',
    category: 'Dinner',
    description: 'Ayam goreng renyah dengan bumbu bawang putih yang harum dan gurih, digoreng hingga kulit keemasan dan daging tetap juicy.',
    cookingTime: '30 mins',
    difficulty: 'Easy',
    rating: 4.8,
    calories: '380 kcal',
    servings: 3,
    image: '/images/recipes/ayam_goreng_bawang.jpeg',
    ingredients: [
      '500g Ayam potong (paha & dada)',
      '8 siung Bawang putih, haluskan',
      '1 sdt Merica bubuk',
      '1 sdt Garam',
      '1 sdm Kecap manis',
      '1 sdm Tepung maizena',
      '2 sdm Tepung terigu',
      'Minyak goreng secukupnya',
      'Bawang putih goreng untuk taburan'
    ],
    instructions: [
      'Haluskan bawang putih, campurkan dengan merica, garam, dan kecap manis sebagai bumbu marinasi.',
      'Lumuri ayam dengan bumbu marinasi secara merata, diamkan minimal 30 menit di kulkas.',
      'Campurkan tepung maizena dan tepung terigu, lalu balurkan ke ayam yang sudah dimarinasi.',
      'Panaskan minyak goreng dalam wajan dengan api sedang.',
      'Goreng ayam hingga berwarna kuning keemasan dan matang merata (sekitar 8-10 menit per sisi).',
      'Angkat dan tiriskan. Taburi dengan bawang putih goreng dan sajikan hangat dengan nasi putih.'
    ]
  }
];

export const INITIAL_PREFERENCES = [
  { id: 'spicy', name: 'Spicy Delights', description: 'Love extra chili, sambal & pepper', icon: 'flame-outline', selected: true },
  { id: 'halal', name: 'Halal Certified', description: 'Strictly halal ingredients', icon: 'shield-checkmark-outline', selected: true },
  { id: 'quick', name: 'Quick & Under 30 Mins', description: 'Fast meals for busy days', icon: 'time-outline', selected: false },
  { id: 'vegetarian', name: 'Vegetarian Friendly', description: 'Plant-powered delicious recipes', icon: 'leaf-outline', selected: false },
  { id: 'desserts', name: 'Sweet Tooth', description: 'Cakes, pastries & smoothies', icon: 'ice-cream-outline', selected: true },
  { id: 'asian', name: 'Asian Cuisine', description: 'Noodles, rice, stir-fries & curries', icon: 'restaurant-outline', selected: true }
];
