import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './image1.jpeg';
import Popup from './Popup.jsx'; // Import the Popup component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Faculty1 = () => {
    const [students, setStudents] = useState([]);
    const [showPendingDetails, setShowPendingDetails] = useState(true);
    const [showAcceptedDetails, setShowAcceptedDetails] = useState(false);
    const [showRejectedDetails, setShowRejectedDetails] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [reason, setReason] = useState('');
    const navigate = useNavigate();
    
    
    useEffect(() => {
        fetchStudents('pending');
    }, []);

    const fetchStudents = async (status) => {
        try {
            const response = await axios.get(`http://localhost:3003/students/${status}`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handlePendingClick = () => {
        setShowPendingDetails(true);
        setShowAcceptedDetails(false);
        setShowRejectedDetails(false);
        fetchStudents('pending');
    };

    const handleAcceptedClick = () => {
        setShowPendingDetails(false);
        setShowAcceptedDetails(true);
        setShowRejectedDetails(false);
        fetchStudents('accepted');
    };

    const handleRejectedClick = () => {
        setShowPendingDetails(false);
        setShowAcceptedDetails(false);
        setShowRejectedDetails(true);
        fetchStudents('rejected');
    };

    const handleAccept = async (regdno) => {
        try {
            await axios.post('http://localhost:3003/accept', { regdno });
            fetchStudents('pending'); // Assuming you want to refresh the list of students
        } catch (error) {
            console.error('Error accepting student:', error);
        }
    };
    const handleLogout = () => {
        // Perform logout actions here
        // For example, clearing session/local storage, etc.
        // Then redirect to login page
        navigate('/'); // Redirect to login page
    };

    const handleReject = (regdno) => {
        const reason = prompt("Enter reason for rejection:");
        if (reason) {
            axios.post('http://localhost:3005/reject', { regdno, reason })
                .then((response) => {
                    alert("Request rejected successfully");
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    return (
        <div>
            <h1>Faculty Dashboard</h1>
            <div className='grid-container'>
                <div className='sidebar'>
                    <div className='image1'>
                        <img src={image1} alt="profile" />
                    </div>
                    <div>Dashboard</div>
                    <div><button onClick={handleAcceptedClick}>Accepted Requests</button></div>
                    <div><button onClick={handleRejectedClick}>Rejected Requests</button></div>
                    <div><button onClick={handlePendingClick}>Pending Requests</button></div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className='grid'>
                    <div className='topbar'>
                        <div>Hello</div>
                        <div>Welcome back!!</div>
                    </div>
                    <div className='requests'>
                        {showPendingDetails && (
                            <div className="pending-details">
                                <h2>Details of Pending Requests</h2>
                                {students.map((student) => (
                                    <div key={student.regdno}>
                                        <div>ID: {student.regdno}</div>
                                        <div>Name: {student.name}</div>
                                        <div>Age: {student.age}</div>
                                        <div>Course: {student.course}</div>
                                        <div className='buttons-grid'>
                                            <div><button onClick={() => handleAccept(student.regdno)}>Accept</button></div>
                                            <div><button onClick={() => { setShowPopup(true); }}>Reject</button></div>
                                        </div>
                                        {/* Render Popup component when showPopup is true */}
                                        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showAcceptedDetails && (
                            <div className="accepted-details">
                                <h2>Details of Accepted Requests</h2>
                                {students.map((student) => (
                                    <div key={student.regdno}>
                                        <div>ID: {student.regdno}</div>
                                        <div>Name: {student.name}</div>
                                        <div>Age: {student.age}</div>
                                        <div>Course: {student.course}</div>
                                        {/* Additional details if needed */}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showRejectedDetails && (
                            <div className="rejected-details">
                                <h2>Details of Rejected Requests</h2>
                                {students.map((student) => (
                                    <div key={student.regdno}>
                                        <div>ID: {student.regdno}</div>
                                        <div>Name: {student.name}</div>
                                        <div>Age: {student.age}</div>
                                        <div>Course: {student.course}</div>
                                        {/* Additional details if needed */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faculty1;
