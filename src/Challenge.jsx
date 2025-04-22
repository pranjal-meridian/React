import { useState, useEffect, useRef, useMemo } from "react";
import './App.css';
import Webcam from "react-webcam";
import instance from "./helpers/instance.js";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function App() {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(50);
  //const [triesLeft, setTriesLeft] = useState(3);
  const [challengeTriesLeft, setChallengeTriesLeft] = useState([3, 3, 3, 3]);
  const [isComplete, setIsComplete] = useState(false);
  const webcamRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);


  const challenges = useMemo(() => [
    "Front",
    // "Up",
    "Left",
    "Right"
  ].map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value), []);

  useEffect(() => {
    if (isCameraActive && !startTime) {
      setStartTime(new Date());
    }
    let timer;
    if (isCameraActive && timeLeft > 0 && !isComplete) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } 
    else if (timeLeft === 0) {
      alert("Time's up! Please try again.");
      markVerificationFail();
      logoutAndRedirect();
    }

    return () => clearInterval(timer);
  }, [isCameraActive, timeLeft, challengeTriesLeft[challengeIndex], isComplete]);

  const requestCameraPermission = () => {
    setHasPermission(true);
    setIsCameraActive(true);
  };

  const markVerificationFail = async () => {
    try {
      await axios.post("/api/log-verification", { email: cookie.get("email"), latitude: cookie.get("latitude"), longitude: cookie.get("longitude"), status: "Rejected", details: "Task Failure" });
      console.log("Verification marked as Failed in logs");
    } catch (error) {
      console.error("Error updating logs:", error);
    }
  };

  const markVerificationComplete = async (secondsTaken) => {
    console.log("timeTaken: ", secondsTaken);
    try {
      await axios.post("/api/log-verification", { email: cookie.get("email"), latitude: cookie.get("latitude"), longitude: cookie.get("longitude"), time_taken: secondsTaken });
      console.log("Verification marked as complete in logs");
    } catch (error) {
      console.error("Error updating logs:", error);
    }
  };

  const logoutAndRedirect = () => {
    cookie.remove("email");
    cookie.remove("latitude");
    cookie.remove("longitude");
    navigate("/");  
  };

  const handleFailure = (message) => {
    let newTriesLeft = [...challengeTriesLeft];
    newTriesLeft[challengeIndex] -= 1;
    setChallengeTriesLeft(newTriesLeft);
    alert(message);
    if (newTriesLeft[challengeIndex] === 0) {
      alert("No more tries left for this challenge. Redirecting to login.");
      markVerificationFail();
      logoutAndRedirect();
    }
  };
  

  const handleChallengeComplete = async () => {
    const img = webcamRef.current.getScreenshot();

    // Send the image to the server for verification
    const formData = new FormData();
    if (!cookie.get("email")) {
      alert("Email not found. Please register first.");
      navigate("/");
      return;
    }
    formData.append("email", cookie.get("email"));
    formData.append("image", img);
    formData.append("task", challenges[challengeIndex]);

    try {
      const res = await instance.post("/api/verify", formData);

      let newTriesLeft = [...challengeTriesLeft];

      if (res.data.face_match !== "Matched") {
        handleFailure("Face not matched. Please try again.");
        return;

      }
  
      else if (res.data.liveness_status === "Spoof") {
        handleFailure("Spoof detected. Please try again.");
        return;

      }
  
      else if (res.data.task_validity === "Incorrect") {
        handleFailure("Incorrect task. Please try again.");
        return;
      }

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
        return;
      }
      console.log(error);
    }

    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex(challengeIndex + 1);
    } else {
      setChallengeIndex(challengeIndex + 1);
      setIsComplete(true);
      const end = new Date();
      setEndTime(end);
      const seconds = Math.floor((end - startTime) / 1000);
      setTimeTaken(seconds);
      markVerificationComplete(seconds);
      console.log("Verification complete");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-50 p-4 md:p-8 space-y-6 lg:space-y-0 lg:space-x-8 w-full">
      <div className="flex flex-col items-start w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-md">
        <div className="flex w-full justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Live Verification</h1>
          <div className="flex space-x-4">
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-blue-700 font-medium">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
              <span className="text-amber-700 font-medium">{challengeTriesLeft[challengeIndex]} Tries Left</span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-4xl h-full sm:h-80 md:h-96 overflow-hidden rounded-lg mb-6">
          {hasPermission ? (
            <div className="w-full h-full bg-black rounded-lg relative">
              {!isComplete && (
                <>
                  <div
                    className="absolute inset-0 border-4 border-blue-400 rounded-lg flex items-center justify-center">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${(timeLeft / 50) * 100}%` }}
                      ></div>
                    </div>

                  </div>
                  <div className="text-center p-3 bg-black bg-opacity-30 w-full h-full">
                    {/*<p className="text-white text-xl font-bold mb-2">*/}
                    {/*  {challengeIndex < challenges.length ? challenges[challengeIndex] : "Complete!"}*/}
                    {/*</p>*/}

                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className={`w-full h-full `}
                      mirrored={true}
                    />
                    {/*<div className="w-full h-full bg-white text-gray-600"> sfsdf</div>*/}
                  </div>
                </>
              )}
              {isComplete && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-500 text-2xl">✓</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Verification Complete</h2>
                    <p className="text-gray-600">Thank you for completing the verification process.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Camera Access Required</h3>
              <p className="text-gray-500 mb-4">We need camera access to verify your identity</p>
              <button
                onClick={requestCameraPermission}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Turn On Camera
              </button>
            </div>
          )}
        </div>

        {isCameraActive && !isComplete && (
          <button
            className="mt-4 px-6 py-3 rounded-lg w-full md:w-2/3 lg:w-1/2 mx-auto bg-green-500 hover:bg-green-600 text-white text-lg font-medium transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleChallengeComplete}
          >
            Confirm {challenges[challengeIndex]}
          </button>
        )}
      </div>

      <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Verification Steps</h2>

        <div className="flex flex-col space-y-3 flex-grow">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={`w-full p-4 rounded-lg flex items-center justify-between transition duration-200 ${index === challengeIndex && isCameraActive
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : index < challengeIndex
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-gray-50 border-l-4 border-gray-300"
                }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index < challengeIndex
                    ? "bg-green-500 text-white"
                    : index === challengeIndex && isCameraActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                  {index < challengeIndex
                    ? "✓"
                    : index + 1}
                </div>
                <span className={`font-medium ${index === challengeIndex && isCameraActive
                    ? "text-blue-700"
                    : index < challengeIndex
                      ? "text-green-700"
                      : "text-gray-600"
                  }`}>Please Look {challenge}</span>
              </div>
              {index < challengeIndex && (
                <span className="text-green-500 text-lg">✓</span>
              )}
            </div>
          ))}
        </div>

        <div className={`flex items-center p-4 rounded-lg mt-6 ${isComplete
            ? "bg-green-50 border border-green-200"
            : "bg-amber-50 border border-amber-200"
          }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${isComplete ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
            }`}>
            {isComplete ? "✓" : "!"}
          </div>
          <div>
            <h3 className={`font-medium ${isComplete ? "text-green-700" : "text-amber-700"}`}>
              {isComplete ? "Verification Complete" : "Verification In Progress"}
            </h3>
            <p className="text-sm text-gray-600">
              {isComplete
                ? "All steps completed successfully"
                : `${challengeIndex}/${challenges.length} steps completed`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
