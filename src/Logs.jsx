import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogsPage = () => {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("/api/get-logs")
      .then(response => setLogs(response.data))
      .catch(error => console.error("Error fetching logs:", error));
  }, []);


  // Function to determine status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Verified":
        return "bg-teal-100 text-teal-800";
      case "In Process":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">

      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-3xl font-bold text-slate-700 mb-6">Logs</h1>
        <button className="text-xl font-bold text-white bg-blue-600 px-5 py-3 rounded mb-6 shadow-lg hover:bg-blue-700 transition" onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>


      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">EMAIL</th>
              <th className="py-3 px-4 text-left">NAME</th>
              <th className="py-3 px-4 text-left">ADDRESS</th>
              <th className="py-3 px-4 text-left">DATE</th>
              <th className="py-3 px-4 text-left">TIME</th>
              <th className="py-3 px-4 text-left">STATUS</th>
              <th className="py-3 px-4 text-left">DETAILS</th>
              <th className="py-3 px-4 text-left">TIME TAKEN</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700">{log.email}</td>
                <td className="py-3 px-4 text-gray-700">{log.name}</td>
                <td className="py-3 px-4 text-gray-700">
                  {log.location
                    ? `${log.location.city}, ${log.location.state}, ${log.location.country}`
                    : "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {new Date(log.timestamp).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {log.timestamp.split(" ")[4]}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{log.detail}</td>
                <td className="py-3 px-4 text-gray-700">{log.time_taken ? log.time_taken : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
