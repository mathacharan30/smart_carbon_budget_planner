import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ActivityLog from './components/ActivityLog';
import Dashboard from './components/Dashboard';
import Tips from './components/Tips';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('carbonBudget');
    return savedBudget ? parseFloat(savedBudget) : 0;
  });
  
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('carbonActivities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    localStorage.setItem('carbonBudget', budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('carbonActivities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity) => {
    setActivities([...activities, { ...activity, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home budget={budget} setBudget={setBudget} />} />
            <Route path="/log" element={<ActivityLog addActivity={addActivity} />} />
            <Route path="/dashboard" element={<Dashboard budget={budget} activities={activities} />} />
            <Route path="/tips" element={<Tips activities={activities} budget={budget} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


