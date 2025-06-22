import { useState } from 'react';
import { carbonCategories, findActivityDetails } from '../data/carbonFactors';

function ActivityLog({ addActivity }) {
  const [selectedCategory, setSelectedCategory] = useState(carbonCategories[0].id);
  const [selectedActivity, setSelectedActivity] = useState(carbonCategories[0].activities[0].id);
  const [amount, setAmount] = useState('');

  const currentCategory = carbonCategories.find(cat => cat.id === selectedCategory);
  const currentActivity = currentCategory?.activities.find(act => act.id === selectedActivity);

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    setSelectedCategory(newCategoryId);
    
    // Set the first activity of the new category as selected
    const newCategory = carbonCategories.find(cat => cat.id === newCategoryId);
    if (newCategory && newCategory.activities.length > 0) {
      setSelectedActivity(newCategory.activities[0].id);
    }
  };

  const calculateEmission = () => {
    if (!currentActivity || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return 0;
    }
    
    return currentActivity.factor * parseFloat(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0 || !currentActivity) return;

    const emission = calculateEmission();
    const activity = {
      categoryId: selectedCategory,
      activityId: selectedActivity,
      category: currentCategory.name,
      activity: currentActivity.name,
      amount: numAmount,
      unit: currentActivity.unit,
      emission,
      date: new Date().toISOString(),
    };

    addActivity(activity);
    setAmount('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Log Carbon Activity</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
        <div>
          <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {carbonCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="activity" className="block text-gray-700 mb-2 font-medium">
            Activity
          </label>
          <select
            id="activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {currentCategory?.activities.map(activity => (
              <option key={activity.id} value={activity.id}>
                {activity.name} ({activity.factor} kg CO₂/{activity.unit})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-gray-700 mb-2 font-medium">
            Amount ({currentActivity?.unit})
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.1"
            step="0.1"
            placeholder={`e.g., 10 ${currentActivity?.unit}`}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        {amount && parseFloat(amount) > 0 && (
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-sm">Estimated Carbon Emission:</p>
            <p className="font-bold text-lg">{calculateEmission().toFixed(2)} kg CO₂</p>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition duration-200 text-lg font-medium"
        >
          Log Activity
        </button>
      </form>
      
      <div className="mt-10 w-full">
        <h3 className="font-semibold text-xl text-green-700 mb-6 text-center">Carbon Factors Used:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carbonCategories.map(category => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-green-600 text-white py-2 px-3">
                <h4 className="font-bold text-center">{category.name}</h4>
              </div>
              <div className="p-3">
                {category.activities.map(activity => (
                  <div key={activity.id} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0 text-sm">
                    <span className="text-gray-800">{activity.name}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs ml-1 whitespace-nowrap">
                      {activity.factor} kg CO₂/{activity.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;






