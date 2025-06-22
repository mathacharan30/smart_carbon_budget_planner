import { Link } from 'react-router-dom';
import { carbonCategories, getGreenTips } from '../data/carbonFactors';

function Tips({ activities, budget }) {
  // Calculate total emissions
  const totalEmissions = activities.reduce((sum, activity) => sum + activity.emission, 0);
  const remaining = budget - totalEmissions;
  const isOverBudget = remaining < 0;

  // Calculate category-wise emissions
  const categoryEmissions = activities.reduce((acc, activity) => {
    const categoryId = activity.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name: activity.category,
        value: 0
      };
    }
    acc[categoryId].value += activity.emission;
    return acc;
  }, {});

  // Sort categories by emission
  const sortedCategories = Object.values(categoryEmissions)
    .sort((a, b) => b.value - a.value)
    .map(cat => ({
      ...cat,
      percentage: (cat.value / totalEmissions * 100).toFixed(1)
    }));

  // Get top 3 categories
  const topCategories = sortedCategories.slice(0, 3);

  // Get general tips
  const generalTips = [
    'Set realistic carbon reduction goals',
    'Track your emissions regularly',
    'Share your journey with friends and family to inspire them',
    'Celebrate your progress, no matter how small',
    'Remember that small changes add up to big impacts over time'
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Green Tips & Suggestions</h2>
        
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">You haven't logged any activities yet.</p>
            <Link to="/log" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
              Start Logging Activities
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Your Carbon Status</h3>
              <div className={`p-3 rounded ${isOverBudget ? 'bg-red-100' : 'bg-green-100'} mb-4`}>
                <p className="font-medium">
                  {isOverBudget 
                    ? `You've exceeded your budget by ${Math.abs(remaining).toFixed(2)} kg CO₂.` 
                    : `You're under budget by ${remaining.toFixed(2)} kg CO₂. Great job!`}
                </p>
                <p className="mt-1 text-sm">
                  {isOverBudget 
                    ? 'Here are some tips to help reduce your carbon footprint.' 
                    : 'Here are some tips to help you maintain your low carbon footprint.'}
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">General Tips</h3>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <ul className="list-disc pl-5">
                  {generalTips.map((tip, index) => (
                    <li key={index} className="text-gray-700 mt-1">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {topCategories.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Tips for Your Top Carbon Categories</h3>
                <div className="space-y-3">
                  {topCategories.map(category => (
                    <div key={category.id} className="bg-gray-100 p-3 rounded">
                      <h4 className="font-medium text-lg">{category.name} ({category.percentage}% of your emissions)</h4>
                      <ul className="list-disc pl-5 mt-1">
                        {getGreenTips(category.id).map((tip, index) => (
                          <li key={index} className="text-gray-700 mt-1">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="lg:col-span-2 text-center mt-4">
              <Link to="/log" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
                Log More Activities
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tips;


