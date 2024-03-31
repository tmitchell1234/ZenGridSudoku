import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// new: verification page:
import VerificationPage from './pages/VerificationPage';

import LeaderboardPage from './pages/LeaderboardPage';
import ScrollToTop from './components/ScrollToTop';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App()
{
	return (
		<BrowserRouter>
			<ScrollToTop/>

		<Routes>
			<Route path="/" index element={<LandingPage />} />
			<Route path="/loginpage" index element={<LoginPage/>} />
			<Route path="/signuppage" index element={<SignUpPage/>} />
			<Route path="/verificationpage" index element={<VerificationPage/>} />
			<Route path="/leaderboardpage" index element={<LeaderboardPage/>} />
			<Route path="/forgotpasswordpage" index element={<ForgotPasswordPage/>} />
		</Routes>
		</BrowserRouter>
	);
}

export default App;
