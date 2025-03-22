import { useState } from 'react';
import Webcam from "react-webcam";
import instance from "./helpers/instance.js";
import { useNavigate } from "react-router-dom";

function App() {
    
  const [imageCaptured, setImageCaptured] = useState(false);


  const handleCaptureStart = (screenshot) => {
    setImageCaptured(screenshot);
  };

  const handleRetake = () => {
    setImageCaptured(false);
  };


const navigate = useNavigate();
const handleSubmit = (e) => {
  e.preventDefault();
  const formdata = new FormData(e.target);
  formdata.append('Image', imageCaptured);

  // Send form data to the server
  instance.post('api/register', formdata)
    .then((response) => {
      // Success alert and refresh
      alert('User registered successfully!');
      navigate("/challenge");
    })
    .catch((error) => {
      // Handle any error during submission
      console.error('There was an error!', error);
      alert('Failed to register the user. Please try again!');
    });
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side: Form */}
        <div className="p-8 md:w-3/5">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create your account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                // value={formData.name}
                // onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                // value={formData.password}
                // onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                // value={formData.confirmPassword}
                // onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${imageCaptured 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-300/50 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!imageCaptured}
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account? <a href="#" className="text-blue-600 hover:underline">Sign In</a>
          </p>
        </div>

        {/* Right side: Image capture */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 md:w-2/5 p-8 flex flex-col items-center justify-center text-white">
          <h3 className="text-xl font-bold mb-6">Profile Photo</h3>

          {!imageCaptured ? (
            <div className="text-center">
                {/*<Camera size={48} className="mb-2" />*/}
                <Webcam
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 160,
                    height: 160,
                    facingMode: 'user',
                  }}
                  // st
                  className="rounded-full object-cover mb-5"
                >
                  {({ getScreenshot }) => (
              <button
                onClick={() => handleCaptureStart(getScreenshot())}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
              >
                <p>Take a Photo</p>
              </button>
    )}
                </Webcam>
              {/*<p className="mt-4 text-sm opacity-75">Click to start camera</p>*/}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 shadow-xl overflow-hidden">
                <img src={imageCaptured}
                     alt="Profile preview" className="object-cover w-full h-full" />
              </div>
              <p className="mt-4 text-sm opacity-75">Looking good!</p>
            </div>
          )}

          <div className="mt-6 flex space-x-4">
            {/*{isCapturing && (*/}
            {/*  <button onClick={handleCaptureClick} className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium">*/}
            {/*    Capture*/}
            {/*  </button>*/}
            {/*)}*/}

            {imageCaptured && (
              <button onClick={handleRetake} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                Retake Photo
              </button>
            )}
          </div>
        </div>
      </div>
      {/*<div className={'hidden'}><Webcam /></div>*/}
    </div>
  );
}

export default App;
