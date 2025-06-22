export const carbonCategories = [
  {
    id: 'travel',
    name: 'Travel',
    activities: [
      { id: 'car', name: 'Car', factor: 0.24, unit: 'km' },
      { id: 'bike', name: 'Bike', factor: 0.05, unit: 'km' },
      { id: 'bus', name: 'Bus', factor: 0.1, unit: 'km' },
      { id: 'train', name: 'Train', factor: 0.06, unit: 'km' },
      { id: 'shortFlight', name: 'Short Flight', factor: 250, unit: 'flight' },
      { id: 'longFlight', name: 'Long Flight', factor: 500, unit: 'flight' }
    ]
  },
  {
    id: 'utilities',
    name: 'Electricity & Utilities',
    activities: [
      { id: 'electricity', name: 'Electricity', factor: 0.82, unit: 'unit' },
      { id: 'water', name: 'Water Usage', factor: 0.003, unit: 'litre' },
      { id: 'lpg', name: 'LPG Gas', factor: 2.98, unit: 'kg' }
    ]
  },
  {
    id: 'food',
    name: 'Food',
    activities: [
      { id: 'vegetarianMeal', name: 'Vegetarian Meal', factor: 1.5, unit: 'meal' },
      { id: 'nonVegMeal', name: 'Non-Veg Meal', factor: 3.0, unit: 'meal' },
      { id: 'dairy', name: 'Dairy', factor: 1.2, unit: 'litre' }
    ]
  },
  {
    id: 'shopping',
    name: 'Shopping',
    activities: [
      { id: 'clothes', name: 'Clothes', factor: 25, unit: 'kg' },
      { id: 'gadgets', name: 'Gadgets', factor: 200, unit: 'item' },
      { id: 'plasticItems', name: 'Plastic Items', factor: 6, unit: 'kg' }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Use',
    activities: [
      { id: 'streaming', name: 'Streaming', factor: 0.06, unit: 'hour' },
      { id: 'gaming', name: 'Gaming', factor: 0.05, unit: 'hour' }
    ]
  }
];

export const findActivityDetails = (categoryId, activityId) => {
  const category = carbonCategories.find(cat => cat.id === categoryId);
  if (!category) return null;
  
  const activity = category.activities.find(act => act.id === activityId);
  return activity ? { ...activity, category: category.name } : null;
};

export const getCategoryColor = (categoryId) => {
  const colors = {
    travel: 'bg-blue-500',
    utilities: 'bg-yellow-500',
    food: 'bg-red-500',
    shopping: 'bg-purple-500',
    digital: 'bg-indigo-500'
  };
  
  return colors[categoryId] || 'bg-gray-500';
};

export const getGreenTips = (categoryId) => {
  const tips = {
    travel: [
      'Use public transportation instead of driving alone',
      'Consider carpooling for regular commutes',
      'For short distances, try walking or cycling',
      'Combine multiple errands into one trip',
      'Consider virtual meetings instead of traveling for business'
    ],
    utilities: [
      'Switch to energy-efficient LED bulbs',
      'Turn off lights and appliances when not in use',
      'Install a programmable thermostat',
      'Use cold water for laundry when possible',
      'Fix leaky faucets to save water'
    ],
    food: [
      'Try having meat-free days each week',
      'Buy local and seasonal produce',
      'Reduce food waste by planning meals',
      'Compost food scraps instead of throwing them away',
      'Choose foods with minimal packaging'
    ],
    shopping: [
      'Buy second-hand clothes and items when possible',
      'Choose products with less packaging',
      'Repair items instead of replacing them',
      'Borrow or rent items you use infrequently',
      'Choose durable products that will last longer'
    ],
    digital: [
      'Lower the resolution when streaming videos',
      'Unplug chargers when not in use',
      'Use WiFi instead of mobile data when possible',
      'Keep devices longer before upgrading',
      'Delete unnecessary emails and files from cloud storage'
    ]
  };
  
  return tips[categoryId] || [];
};