import React from 'react';

const LogsPage = () => {
  // Sample log data
  const logs = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "089 Kutch Green Apt. 448",
      date: "14 Feb 2019",
      time: "6:00 PM",
      status: "Completed"
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "14 Feb 2019",
      time: "5:30 PM",
      status: "Processing"
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "14 Feb 2019",
      time: "5:13 PM",
      status: "Rejected"
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      address: "768 Destiny Lake Suite 600",
      date: "14 Feb 2019",
      time: "4:51 PM",
      status: "Completed"
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "14 Feb 2019",
      time: "4:15 PM",
      status: "Processing"
    },
    {
      id: "00006",
      name: "Alfred Murray",
      address: "543 Weimann Mountain",
      date: "14 Feb 2019",
      time: "4:06 PM",
      status: "Completed"
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "14 Feb 2019",
      time: "4:15 PM",
      status: "Processing"
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "14 Feb 2019",
      time: "4:15 PM",
      status: "Processing"
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "14 Feb 2019",
      time: "4:15 PM",
      status: "Processing"
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "14 Feb 2019",
      time: "4:15 PM",
      status: "Processing"
    }
  ];

  // Function to determine status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-teal-100 text-teal-800";
      case "Processing":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-slate-700 mb-6">Logs</h1>
      
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">NAME</th>
              <th className="py-3 px-4 text-left">ADDRESS</th>
              <th className="py-3 px-4 text-left">DATE</th>
              <th className="py-3 px-4 text-left">TIME</th>
              <th className="py-3 px-4 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr 
                key={index} 
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700">{log.id}</td>
                <td className="py-3 px-4 text-gray-700">{log.name}</td>
                <td className="py-3 px-4 text-gray-700">{log.address}</td>
                <td className="py-3 px-4 text-gray-700">{log.date}</td>
                <td className="py-3 px-4 text-gray-700">{log.time}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;