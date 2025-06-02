import { useEffect, useState } from "react";
import instance from "./helpers/instance.js";
// import axios from "axios";

const Logs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        instance.get("/get-logs")  
            .then(response => setLogs(response.data))
            .catch(error => console.error("Error fetching logs:", error));
    }, []);

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.email}</td>
                            <td>{log.status}</td>
                            <td>{log.detail}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Logs;
