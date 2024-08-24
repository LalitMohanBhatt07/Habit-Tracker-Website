import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../slices/habitSlice';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const HabitForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetDaysPerWeek, setTargetDaysPerWeek] = useState(1);
  const dispatch = useDispatch();
  const {habits} = useSelector((store) => store.habits.habits) 
  console.log("habits form ",habits);

  const createHabit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/createHabit',
        {
          name,
          description,
          target_days_per_week: targetDaysPerWeek,
        },
        { withCredentials: true }
      );

      

      console.log('Response:', res);

      const newHabit = res.data;

      const updatedHabits = Array.isArray(habits) ? [...habits, newHabit] : [newHabit];

      // Update the state with the new habit
      dispatch(setHabits(updatedHabits));
      localStorage.setItem('habits', JSON.stringify(updatedHabits));
      


      setName('');
      setDescription('');
      setTargetDaysPerWeek(1);
      toast.success("Successfully Created Post")
      Navigate()
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };

  return (
    <>
    <img className="img" src="https://media.istockphoto.com/id/915097804/photo/black-brick-wall-background-texture-dark-masonry.webp?b=1&s=612x612&w=0&k=20&c=QqQqb7im5ae4h5q4rnjz8tnnodgCm4tVSxrkvYY9zMc=" />
    <div className='hello'>
    <h1>Habit Tracker</h1>
      <form onSubmit={createHabit} style={formStyle}>
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
      <button type="submit" style={buttonStyle}>Add Habit</button>
    </form>
    </div>
    </>
    
  );
};

// Basic styles for the form elements
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '500px',
  height:"300px",
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const inputStyle = {
  marginBottom: '20px',
  padding: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  marginBottom: '10px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  height: '80px',
};

const buttonStyle = {
  padding: '18px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
};

export default HabitForm;
