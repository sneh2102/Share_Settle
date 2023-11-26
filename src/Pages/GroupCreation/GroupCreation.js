import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './GroupCreation.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useGroup } from '../../Hooks/useGroup';
import '../../PagesCommonCSS/PagesCommonCSS.css';

const GroupCreation = () => {
  const { getUser, createGroup } = useGroup();
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [availableMembers, setAvailableMembers] = useState([]);
  const [settlementPeriod, setSettlementPeriod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const members = await getUser();
        setAvailableMembers(members);
        // Include the currently logged-in user in selectedMembers by default
        setSelectedMembers([user.email]);
      } catch (error) {
        // Handle any errors that occur during fetching the user data
      }
    };

    fetchUserData();
  }, []);

  const handleSettlementPeriodChange = (e) => {
    setSettlementPeriod(e.target.value);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName) {
      alert('Please enter a group name.');
      return;
    }

    try {
      await createGroup(groupName, selectedMembers, settlementPeriod);
      navigate('/groups');
    } catch (error) {
      alert('Group creation failed. Please try again.');
    }
  };

  const handleMembersChange = (selectedOptions) => {
    const members = selectedOptions.map((option) => option.value);
    
    // Ensure the currently logged-in user is always included
    if (!members.includes(user.email)) {
      members.push(user.email);
    }
  
    setSelectedMembers(members);
  };



  // Transform availableMembers into the format expected by react-select
  const options = availableMembers.map((member) => ({
    value: member.email,
    label: member.email,
    isDisabled: member.email === user.email, 
  }));

  return (
    <>
      <Navbar />
      <div className="page-layout-container">
        <div className="page-layout-card">
          <div className="page-layout-header" id="green-header">
            <h2>Group Creation</h2>
          </div>

          <form>
            <div className="page-layout-fields">
              <label htmlFor="groupName">Group Name</label>
              <input
                type="text"
                id="groupName"
                className="field-input"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />

              <label htmlFor="members">Members</label>
              <Select
                isMulti
                options={options}
                onChange={handleMembersChange}
                value={selectedMembers.map((member) => ({
                  value: member,
                  label: member,
                }))}
              />

              <div>
                <label htmlFor="settlementPeriod">Settlement Period</label>
                <select
                  id="settlementPeriod"
                  name="settlementPeriod"
                  className="field-input"
                  value={settlementPeriod}
                  onChange={handleSettlementPeriodChange}
                >
                  <option value="">Select Period</option>
                  <option value="3 minutes">3 minute</option>
                  <option value="1 week">Weekly</option>
                  <option value="2 weeks">Biweekly</option>
                  <option value="1 month">Monthly</option>
                </select>
              </div>

              <button className="submit-create-button" onClick={handleCreateGroup}>
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GroupCreation;
