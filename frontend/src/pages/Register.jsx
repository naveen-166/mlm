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
                <option value="+1">+1 (USA/Canada)</option>
                <option value="+91">+91 (India)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+33">+33 (France)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+86">+86 (China)</option>
                <option value="+7">+7 (Russia)</option>
                <option value="+39">+39 (Italy)</option>
                <option value="+34">+34 (Spain)</option>
                <option value="+55">+55 (Brazil)</option>
                <option value="+27">+27 (South Africa)</option>
                <option value="+82">+82 (South Korea)</option>
                <option value="+46">+46 (Sweden)</option>
                <option value="+31">+31 (Netherlands)</option>
                <option value="+61">+61 (New Zealand)</option>
                <option value="+353">+353 (Ireland)</option>
                <option value="+420">+420 (Czech Republic)</option>
                <option value="+45">+45 (Denmark)</option>
                <option value="+351">+351 (Portugal)</option>
                <option value="+47">+47 (Norway)</option>
                <option value="+41">+41 (Switzerland)</option>
                <option value="+43">+43 (Austria)</option>
                <option value="+48">+48 (Poland)</option>
                <option value="+30">+30 (Greece)</option>
                <option value="+41">+41 (Switzerland)</option>
                <option value="+886">+886 (Taiwan)</option>
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
