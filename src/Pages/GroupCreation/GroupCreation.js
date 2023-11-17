import React, { useEffect, useState } from 'react';
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

  const addMember = (member) => {
    if (member && !selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const deleteMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName) {
      alert('Please enter a group name.');
      return;
    }

    try {
      await createGroup(groupName, selectedMembers);
      navigate('/groups',{state:{
        link: "hiii"
      }});
    } catch (error) {
      alert('Group creation failed. Please try again.');
    }
  };

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
              <select
                id="members"
                className="field-input"
                onChange={(e) => addMember(e.target.value)}
                value=""
              >
                <option value="">Add Members</option>
                {availableMembers.map((user, index) => (
                  <option key={index} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
              <div className="member-chips">
                {selectedMembers.map((member, index) => (
                  <div key={index} className="member-chip">
                    {member}
                    {member !== user.email && (
                      <span className="chip-delete-btn" onClick={() => deleteMember(member)}>
                        ×
                      </span>
                    )}
                  </div>
                ))}
              </div>

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
                  <option value="60sec">60seconds</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
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
