import { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import instance from "./helpers/instance.js";
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie';

function App() {
  const [frontImage, setFrontImage] = useState(null);
  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);
  const [imageStep, setImageStep] = useState(0);  // 0 - Front, 1 - Left, 2 - Right
  const [capturing, setCapturing] = useState(false);  // To track whether we're in the middle of taking a photo
  const navigate = useNavigate();
  const [location, setLocation] = useState({latitude:"", longitude:""});


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    cookie.set("latitude", latitude);
                    cookie.set("longitude", longitude);
                    setLocation({ latitude, longitude });
                },
                (error) => console.error("Error getting location:", error),
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);


  const handleCaptureStart = (screenshot) => {
    // Depending on the current step, set the appropriate image state
    if (imageStep === 0) {
      setFrontImage(screenshot);
    } else if (imageStep === 1) {
      setLeftImage(screenshot);
    } else if (imageStep === 2) {
      setRightImage(screenshot);
    }

    // Proceed to the next step after capturing the image
    if (imageStep < 2) {
      setImageStep(imageStep + 1);
    }
  };

  const handleRetake = () => {
    // Allow user to retake the current image
    if (imageStep === 0) {
      setFrontImage(null);
    } else if (imageStep === 1) {
      setLeftImage(null);
    } else if (imageStep === 2) {
      setRightImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    cookie.set('email', formdata.get('email'));

    // Append all images to the form data
    formdata.append('frontImage', frontImage);
    formdata.append('leftImage', leftImage);
    formdata.append('rightImage', rightImage);
    formdata.append('latitude', location.latitude);
    formdata.append('longitude', location.longitude);


    // Send form data to the server
    instance.post('api/register', formdata)
      .then((response) => {
        // Success alert and redirect
        alert('User registered successfully!');
        navigate("/challenge");
      })
      .catch((error) => {
        console.error('There was an error!', error);
        alert('Failed to register the user. Please try again!');
      });
  };

  const instructions = [
    "Please look at the camera directly for the front photo.",
    "Please look to the left for the left photo.",
    "Please look to the right for the right photo."
  ];

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
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${(frontImage && leftImage && rightImage)
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-300/50 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!(frontImage && leftImage && rightImage)}
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
          </p>
        </div>

        {/* Right side: Image capture */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 md:w-2/5 p-3 flex flex-col items-center justify-center text-white">
          <h3 className="text-xl font-bold mb-6">Register Face</h3>
          <p className="text-center mb-4">{instructions[imageStep]}</p>

          {/* Webcam display */}
          <Webcam
            audio={false}
            mirrored={true}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 245,
              height: 245,
              facingMode: 'user',
            }}
            className="rounded-full object-cover mb-5"
          >
            {({ getScreenshot }) => (
              <button
                onClick={() => {
                  setCapturing(true);  // Set capturing flag to true
                  const screenshot = getScreenshot();
                  handleCaptureStart(screenshot);  // Capture and store the screenshot
                  setCapturing(false);  // Reset the capturing flag after the screenshot is taken
                }}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
                disabled={capturing}  // Disable the button while capturing
              >
                {capturing ? "Capturing..." : imageStep < 2 ? "Take Photo" : "Next"}
              </button>
            )}
          </Webcam>

          {/* Preview the captured images */}
          {frontImage && leftImage && rightImage && (
            <div className="flex space-x-4 mt-4">
              <div className="w-20 h-20 rounded-full border-2 border-white/50 overflow-hidden">
                <img src={frontImage} alt="Front" className="object-cover w-full h-full" />
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-white/50 overflow-hidden">
                <img src={leftImage} alt="Left" className="object-cover w-full h-full" />
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-white/50 overflow-hidden">
                <img src={rightImage} alt="Right" className="object-cover w-full h-full" />
              </div>
            </div>
          )}

          {/* Buttons */}
          {imageStep < 2 && (
            <button onClick={handleRetake} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm mt-4">
              Retake Photo
            </button>
          )}

          {/* Next Step or Submit */}
          {imageStep === 2 && (
            <button onClick={handleSubmit} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm mt-4">
              Submit Photos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
