import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import LandingPage from './pages/LandingPage';


function App()
{
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" index element={<LandingPage />} />
		</Routes>
		</BrowserRouter>
	);
}

export default App;
