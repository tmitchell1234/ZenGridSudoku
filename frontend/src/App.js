import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import LandingPage from './pages/LandingPage';


function App()
{
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" index element={<LoginPage />} />
			<Route path="/cards" index element={<CardPage />} />
			<Route path="/LandingPage" index element={<LandingPage />} />
		</Routes>
		</BrowserRouter>
	);
}

export default App;
