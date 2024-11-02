import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/bglog4.json';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    temzId: '',
    name: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.temzId) {
      setError('TEMZ ID is required');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Success:', response.data); // Handle success
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('An error occurred while connecting.'); // Handle error
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
        <h2 className="text-3xl font-semibold font-arima text-center text-white">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="temz-id">
              TEMZ ID
            </label>
            <input
              type="text"
              id="temz-id"
              name="temzId"
              value={formData.temzId}
              onChange={handleChange}
              className="w-full p-3 mt-3 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Temz ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-3 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-3 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Email"
            />
          </div>

          <fieldset className="flex items-center mt-3">
            <label className="block text-sm font-medium text-white" htmlFor="phone">
              Phone Number
            </label>
            <div className="ml-3 flex-grow flex items-center">
              <select
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="bg-white border border-white rounded-lg text-black mr-2 p-1 w-24 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" disabled>Select country code</option>
                {/* Other options remain the same */}
              </select>
              <input
                type="text"
                id="phone"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-transparent border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Number"
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 rounded-lg text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700"
          >
            Connect Wallet
          </button>
          <p className="mt-4 text-center text-sm text-white">
          Already have an account?{' '}
          <a href="login" className="font-medium text-orange-500 hover:underline">Login</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
