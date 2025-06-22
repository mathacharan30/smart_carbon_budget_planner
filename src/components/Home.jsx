function Home({ budget, setBudget }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = parseFloat(e.target.budget.value);
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Set Your Carbon Budget</h2>
      
      {budget > 0 ? (
        <div className="mb-6">
          <p className="text-lg">Your current yearly carbon budget:</p>
          <p className="text-3xl font-bold text-green-600">{budget} kg CO₂</p>
          <p className="mt-4 text-sm text-gray-600">
            Want to change your budget? Fill out the form below.
          </p>
        </div>
      ) : (
        <p className="mb-4 text-gray-700">
          Set a yearly carbon budget to start tracking your carbon footprint.
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget" className="block text-gray-700 mb-1">
            Yearly Carbon Budget (kg CO₂)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            min="1"
            placeholder="e.g., 5000"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
        >
          Set Budget
        </button>
      </form>
      
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold">Did you know?</h3>
        <p>The average person's carbon footprint is about 5,000 kg CO₂ per year.</p>
      </div>
    </div>
  );
}

export default Home;