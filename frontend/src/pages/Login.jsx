import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/bglog4.json';
import axios from 'axios';

const generateCaptcha = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < length; i++) {
    captcha += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return captcha;
};

const Login = () => {
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha(6)); // Generate a new CAPTCHA when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      setCaptchaError(true);
      return;
    }

    // Prepare the login data
    const loginData = { memberId, password };

    try {
      const response = await axios.post('http://localhost:5000/login', loginData);
      alert('Login successful!'); // Handle successful login (e.g., redirect or store token)
      console.log(response.data); // Log response for debugging
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        alert('Login failed: ' + error.response.data.message); // Handle errors from the server
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-end overflow-hidden">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ position: 'absolute', width: '50vw', height: '50vh', top: 200, left: 60 }}
      />

      <div className="relative w-full max-w-lg p-8 bg-gray-500 bg-opacity-20 rounded-lg backdrop-blur-md shadow-lg mr-56">
        <h2 className="text-3xl font-semibold font-arima text-center text-white">Login</h2>

        <form className="mt-6 space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="member-id">
              Member-ID
            </label>
            <input
              type="text"
              id="member-id"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full p-3 mt-3 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Member ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-3 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Password"
              required
            />
          </div>

          {/* CAPTCHA Section */}
          <div className="mt-4 flex items-center">
            <label className="block text-sm font-medium text-white" style={{ fontSize: '0.9rem', marginRight: '0.5rem' }}>
              CAPTCHA: <span className="font-bold">{captcha}</span>
            </label>
            <input
              type="text"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className={`flex-1 p-2 bg-transparent border ${captchaError ? 'border-red-500' : 'border-white'} rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter CAPTCHA"
              required
              style={{ fontSize: '0.9rem' }}
            />
            {captchaError && <p className="text-red-500 text-sm ml-2">Incorrect CAPTCHA. Please try again.</p>}
          </div>

          <div className="flex items-center justify-between text-sm text-white">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-orange-500 rounded-lg text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don't have an account?{' '}
          <a href="register" className="font-medium text-orange-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
