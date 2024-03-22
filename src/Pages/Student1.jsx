import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
// import './StudentDashboard.css';
import image1 from './image1.jpeg';
import './Styles.css'
import axios from 'axios';

const DomainCard = ({ domain, status, onClick }) => {
  return (
    <div className='card' onClick={onClick}>
      <div>{domain}</div>
      <div>Status: {status}</div>
      <button className='status-button'>{status}</button>
    </div>
  );
};

const Student1 = ({ domains }) => {
    const [user, setUser] = useState(null);
    const [domainRequests, setDomainRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3003/students');
          setUser(response.data[0]); // Assuming only one user for simplicity
          setDomainRequests(response.data[0]?.requests?.map(request => request.status) ?? []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleDomainRequest = (index) => {
      const updatedRequests = [...domainRequests];
      updatedRequests[index] = 'requested';
      setDomainRequests(updatedRequests);
    };
  
    const handleApplyAll = () => {
      const updatedRequests = user.requests.map(() => 'requested');
      setDomainRequests(updatedRequests);
    };
  
    const handleProfileClick = () => {
      setShowModal(true);
    };
  
    const handleLogout = () => {
      sessionStorage.clear();
      window.location.href = '/'; // Redirect to the login page
    };
  
    return (
      <div className='grid-container'>
        <div className='sidebar'>
          <div className='image1'>
            <img src={image1} alt="profile" />
          </div>
          <div>Dashboard</div>
          <div>Profile</div>
          <div>
            <button className='button' onClick={handleApplyAll}>
              Apply All
            </button>
          </div>
          <div>
            <button className='button' onClick={handleProfileClick}>View Profile</button>
          </div>
          <div>
            <button className='button' onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className='grid'>
          <div className='topbar'>
            <div>Hello, {user?.name}</div>
            <div>Welcome back!!</div>
          </div>
          <div className='right-content'>
            <div className='right-content card-container'>
              {domains.map((domain, index) => (
                <DomainCard
                  key={index}
                  domain={domain}
                  status={domainRequests[index]}
                  onClick={() => handleDomainRequest(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
          <h2>{user?.name}'s Profile</h2>
          <p>Name: {user?.name}</p>
          <p>Branch: {user?.branch}</p>
        </Modal>
      </div>
    );
  };
export default Student1;  