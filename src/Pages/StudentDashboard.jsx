import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import './StudentDashboard.css';

const DomainCard = ({ domain, status, onClick }) => {
  return (
    <div className='card' onClick={onClick}>
      <div>{domain}</div>
      <div>Status: {status}</div>
    </div>
  );
};

const StudentDashboard = ({ domains }) => {
  const [user] = useState({ name: "John Doe", branch: "Computer Science" }); // Static user data
  const [domainRequests, setDomainRequests] = useState(new Array(domains.length).fill('pending'));
  const [showModal, setShowModal] = useState(false);

  const handleDomainRequest = (index) => {
    const updatedRequests = [...domainRequests];
    updatedRequests[index] = 'requested';
    setDomainRequests(updatedRequests);
  };

  const handleApplyAll = () => {
    const updatedRequests = new Array(domains.length).fill('requested');
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
          <img src="./image1.jpeg" alt="profile" />
        </div>
        <div>Dashboard</div>
        <div>Profile: {user.name} - {user.branch}</div>
        <button className='button' onClick={handleApplyAll}>
          Apply All
        </button>
        <button className='button' onClick={handleProfileClick}>View Profile</button>
        <button className='button' onClick={handleLogout}>Logout</button>
      </div>
      <div className='grid'>
        <div className='topbar'>
          <div>Hello, {user.name}</div>
          <div>Welcome back!!</div>
        </div>
        <div className='right-content'>
          <div className='card-container'>
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
        <h2>{user.name}'s Profile</h2>
        <p>Name: {user.name}</p>
        <p>Branch: {user.branch}</p>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
