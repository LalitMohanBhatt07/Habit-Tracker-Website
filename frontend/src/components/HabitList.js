import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../slices/habitSlice';
import toast from 'react-hot-toast';

const HabitList = () => {
  const [habits, setHabitsState] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetDaysPerWeek, setTargetDaysPerWeek] = useState(1);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/habits?page=1&limit=9', {
        withCredentials: true,
      });

      console.log('Fetched Habits:', res.data.habits);
      dispatch(setHabits(res.data.habits));
      setHabitsState(res.data.habits);
      localStorage.setItem('habits', JSON.stringify(res.data.habits));
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/habits/${habitId}`, {
        withCredentials: true,
      });

      const updatedHabits = habits.filter(habit => habit.id !== habitId);
      setHabitsState(updatedHabits);
      dispatch(setHabits(updatedHabits));
      localStorage.setItem('habits', JSON.stringify(updatedHabits));
      console.log(`Habit with id ${habitId} deleted successfully.`);
      toast.success("Deleted")
    
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const startEditing = (habit) => {
    setEditingHabit(habit);
    setName(habit.name);
    setDescription(habit.description);
    setTargetDaysPerWeek(habit.target_days_per_week);
  };

  const updateHabit = async (e) => {
    e.preventDefault();
    if (editingHabit) {
      try {
        toast.success("Edit Completed")
        navigate("/")
      } catch (error) {
        console.error('Error updating habit:', error);
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>Habit List</h2>
      <div style={habitListStyle}>
        {habits.map((habit) => (
          <div key={habit.id} style={habitCardStyle}>
            <h3 style={habitNameStyle}>{habit.name}</h3>
            <p style={habitDescriptionStyle}>{habit.description}</p>
            <p style={habitTargetStyle}>
              Target Days per Week: <strong>{habit.target_days_per_week}</strong>
            </p>
            <div style={buttonContainerStyle}>
              <button
                style={editButtonStyle}
                onClick={() => startEditing(habit)}
              >
                Edit
              </button>
              <button
                style={deleteButtonStyle}
                onClick={() => deleteHabit(habit.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingHabit && (
        <div style={formOverlayStyle}>
          <div style={formContainerStyle}>
            <h2>Edit Habit</h2>
            <form onSubmit={updateHabit} style={formStyle}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Habit Name"
                required
                style={inputStyle}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                style={textareaStyle}
              />
              <input
                type="number"
                value={targetDaysPerWeek}
                onChange={(e) => setTargetDaysPerWeek(Number(e.target.value))}
                min="1"
                max="7"
                required
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>Update Habit</button>
              <button
                type="button"
                onClick={() => setEditingHabit(null)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic styles for the Habit List and Form
const pageStyle = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
};

const headerStyle = {
  fontSize: '2em',
  marginBottom: '20px',
  color: '#333',
};

const habitListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
};

const habitCardStyle = {
  width: '300px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
};

const habitNameStyle = {
  fontSize: '1.5em',
  color: '#28a745',
  marginBottom: '10px',
};

const habitDescriptionStyle = {
  fontSize: '1em',
  marginBottom: '10px',
  color: '#555',
};

const habitTargetStyle = {
  fontSize: '1em',
  marginBottom: '15px',
  color: '#555',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const editButtonStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#dc3545',
  color: '#fff',
  cursor: 'pointer',
};

const formOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const formContainerStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  height: '100px',
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
  marginTop: '10px',
};

const cancelButtonStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#6c757d',
  color: '#fff',
  cursor: 'pointer',
  marginTop: '10px',
};

export default HabitList;
