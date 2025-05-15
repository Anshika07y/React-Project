import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import Chatbot from "../components/Chatbot";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [goalProgress, setGoalProgress] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedGoalTitle, setEditedGoalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load goals and progress from localStorage for the current user
  useEffect(() => {
    if (user?.email) {
      try {
        const storedGoals =
          JSON.parse(localStorage.getItem(`goals_${user.email}`)) || [];
        const storedProgress =
          JSON.parse(localStorage.getItem(`goalProgress_${user.email}`)) || {};
        setGoals(storedGoals);
        setGoalProgress(storedProgress);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  // Save goals and progress to localStorage when they change
  useEffect(() => {
    if (user?.email) {
      try {
        localStorage.setItem(`goals_${user.email}`, JSON.stringify(goals));
        localStorage.setItem(
          `goalProgress_${user.email}`,
          JSON.stringify(goalProgress)
        );
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    }
  }, [goals, goalProgress, user]);

  // Add new goal
  const handleAddGoal = useCallback(() => {
    const trimmedGoal = newGoal.trim();
    if (!trimmedGoal) return;

    if (
      goals.some(
        (goal) => goal.title.toLowerCase() === trimmedGoal.toLowerCase()
      )
    ) {
      alert("Goal already exists.");
      return;
    }

    setGoals((prev) => [...prev, { title: trimmedGoal }]);
    setGoalProgress((prev) => ({ ...prev, [trimmedGoal]: 0 }));
    setNewGoal("");
  }, [newGoal, goals]);

  // Remove goal
  const handleRemoveGoal = (index) => {
    const goalToRemove = goals[index].title;
    setGoals((prev) => prev.filter((_, i) => i !== index));

    setGoalProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[goalToRemove];
      return newProgress;
    });
  };

  // Start editing a goal title
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedGoalTitle(goals[index].title);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedGoalTitle("");
  };

  // Save edited goal title
  const saveEditedGoal = () => {
    const trimmedTitle = editedGoalTitle.trim();
    if (!trimmedTitle) {
      alert("Goal title cannot be empty.");
      return;
    }

    if (
      goals.some(
        (goal, i) =>
          goal.title.toLowerCase() === trimmedTitle.toLowerCase() &&
          i !== editingIndex
      )
    ) {
      alert("Another goal with this title already exists.");
      return;
    }

    setGoals((prev) => {
      const updatedGoals = [...prev];
      const oldTitle = updatedGoals[editingIndex].title;
      updatedGoals[editingIndex].title = trimmedTitle;

      // Update progress key if title changed
      if (oldTitle !== trimmedTitle) {
        setGoalProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          updatedProgress[trimmedTitle] = updatedProgress[oldTitle] || 0;
          delete updatedProgress[oldTitle];
          return updatedProgress;
        });
      }
      return updatedGoals;
    });

    setEditingIndex(null);
    setEditedGoalTitle("");
  };

  // Change progress value for a goal
  const handleProgressChange = (goalTitle, value) => {
    let progressValue = Number(value);
    if (isNaN(progressValue)) progressValue = 0;
    if (progressValue < 0) progressValue = 0;
    if (progressValue > 100) progressValue = 100;

    setGoalProgress((prev) => ({
      ...prev,
      [goalTitle]: progressValue,
    }));
  };

  if (!user || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-blue-700">Loading...</div>
      </div>
    );
  }

  // Prepare data for chart (show progress over goals)
  const chartData = goals.map((goal) => ({
    name: goal.title,
    progress: goalProgress[goal.title] || 0,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome, {user.name}
      </h2>

      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">Learning Goals</h3>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Add new goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
          />
          <button
            onClick={handleAddGoal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>

        {goals.length === 0 && (
          <p className="text-gray-500">No goals added yet.</p>
        )}

        <ul>
          {goals.map((goal, index) => (
            <li
              key={goal.title}
              className="flex items-center justify-between border-b py-2"
            >
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full mr-2"
                    value={editedGoalTitle}
                    onChange={(e) => setEditedGoalTitle(e.target.value)}
                  />
                  <button
                    onClick={saveEditedGoal}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{goal.title}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-16 border px-2 py-1 rounded"
                      value={goalProgress[goal.title] || 0}
                      onChange={(e) =>
                        handleProgressChange(goal.title, e.target.value)
                      }
                      title="Progress (%)"
                    />
                    <button
                      onClick={() => startEditing(index)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveGoal(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Progress Chart</h3>
        {goals.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#3182ce"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Add goals to see progress chart.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Chatbot Assistant</h3>
        <Chatbot />
      </div>
    </div>
  );
};

export default Dashboard;
