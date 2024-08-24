// App.js
import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import Navigation from './components/Navigation';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setHabits } from './slices/habitSlice';


const App = () => {
  const [allHabits,setAllHabits]=useState([])
  console.log("all",allHabits);
  const dispatch=useDispatch()

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HabitForm />} />
        <Route path="/habits" element={<HabitList habits={allHabits.habits} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
