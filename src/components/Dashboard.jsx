import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { carbonCategories, getCategoryColor } from '../data/carbonFactors';

function Dashboard({ budget, activities }) {
  const [chartType, setChartType] = useState('pie');
  
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
        value: 0,
        color: getCategoryColor(categoryId).replace('bg-', '')
      };
    }
    acc[categoryId].value += activity.emission;
    return acc;
  }, {});

  const categoryData = Object.values(categoryEmissions).map(cat => ({
    ...cat,
    percentage: (cat.value / totalEmissions * 100).toFixed(1)
  }));

  // Get top 3 categories by emission
  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get activity description
  const getActivityDescription = (activity) => {
    return `${activity.activity}: ${activity.amount} ${activity.unit}`;
  };

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Carbon Budget Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-gray-700">Total Budget</h3>
            <p className="text-2xl font-bold">{budget.toFixed(2)} kg CO₂</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-gray-700">Emitted So Far</h3>
            <p className="text-2xl font-bold">{totalEmissions.toFixed(2)} kg CO₂</p>
          </div>
          
          <div className={`p-4 rounded ${isOverBudget ? 'bg-red-100' : 'bg-green-100'}`}>
            <h3 className="text-lg font-semibold text-gray-700">Remaining</h3>
            <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {remaining.toFixed(2)} kg CO₂
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(100, (totalEmissions / budget) * 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {isOverBudget 
              ? `You've exceeded your budget by ${Math.abs(remaining).toFixed(2)} kg CO₂` 
              : `You've used ${((totalEmissions / budget) * 100).toFixed(1)}% of your budget`}
          </p>
        </div>
      </div>
      
      {/* Category breakdown */}
      {activities.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-700">Category Breakdown</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setChartType('pie')} 
                className={`px-3 py-1 rounded ${chartType === 'pie' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                Pie Chart
              </button>
              <button 
                onClick={() => setChartType('bar')} 
                className={`px-3 py-1 rounded ${chartType === 'bar' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                Bar Chart
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart */}
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂`} />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart
                    data={categoryData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂`} />
                    <Legend />
                    <Bar dataKey="value" name="Emissions (kg CO₂)">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
            
            {/* Top categories */}
            <div>
              <h4 className="font-semibold mb-2">Top Contributing Categories:</h4>
              <div className="space-y-3">
                {topCategories.map((category) => (
                  <div key={category.id} className="bg-gray-100 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-gray-700">{category.value.toFixed(2)} kg CO₂</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-1">
                      <div 
                        className={`h-2.5 rounded-full ${getCategoryColor(category.id)}`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{category.percentage}% of total emissions</p>
                  </div>
                ))}
              </div>
              
              {isOverBudget && (
                <div className="mt-4">
                  <Link to="/tips" className="block w-full text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">
                    Get Tips to Reduce Emissions
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Activity list */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-green-700">Activity Log</h3>
        
        {activities.length === 0 ? (
          <p className="text-gray-600">No activities logged yet. Go to the Activity Log to add some!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Activity</th>
                  <th className="py-2 px-4 text-right">Emissions (kg CO₂)</th>
                </tr>
              </thead>
              <tbody>
                {[...activities].reverse().map((activity) => (
                  <tr key={activity.id} className="border-t">
                    <td className="py-2 px-4">{formatDate(activity.date)}</td>
                    <td className="py-2 px-4">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getCategoryColor(activity.categoryId)}`}></span>
                      {activity.category}
                    </td>
                    <td className="py-2 px-4">{getActivityDescription(activity)}</td>
                    <td className="py-2 px-4 text-right font-medium">{activity.emission.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t font-bold">
                  <td className="py-2 px-4" colSpan="3">Total</td>
                  <td className="py-2 px-4 text-right">{totalEmissions.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
