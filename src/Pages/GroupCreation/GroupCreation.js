import React, { useEffect, useState } from 'react';
import './GroupCreation.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useGroup } from '../../Hooks/useGroup';


const GroupCreation = () => {
  const { getUser, createGroup } = useGroup();
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const user = JSON.parse(window.localStorage.getItem('user'))
  const [availableMembers, setAvailableMembers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const members = await getUser();  
        console.log(members);
        setAvailableMembers(members);
      } catch (error) {
        // Handle any errors that occur during fetching the user data
      }
    };
  
    fetchUserData();
    console.log(selectedMembers);
  }, []);
  

  const addMember = (member) => {
    if (member) {
      setSelectedMembers([...selectedMembers, member]);
      setAvailableMembers(availableMembers.filter((m) => m !== member));
    }
  };

  const deleteMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
    setAvailableMembers([...availableMembers, member]);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName){
      alert("Please enter a group name.");
      return;
    }

    if(selectedMembers.length === 0){
      alert("Please select at least one member.");
      return;
    }

    try {
      await createGroup(groupName,selectedMembers);
      navigate('/groups');
    } catch (error) {
      alert("Group creation failed. Please try again.")
    }
  };

  return (
    <>
      <Navbar />
      <div className="gc-container">
        <div className="gc-card">
          <div className="gc-header">
          <h2>Group Creation</h2>
          </div>
          <form>

            <div className="gc-form-group">
              <label htmlFor="groupName">Group Name</label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            
            
              <label htmlFor="members">Members</label>
              <select
                id="members"
                onChange={(e) => addMember(e.target.value)}
                value=""
              >
                <option value="">Select Members</option>
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
                    <span className="chip-delete-btn" onClick={() => deleteMember(member)}>×</span>
                  </div>
                ))}
              </div>
              <button onClick={handleCreateGroup}>Create Group</button>
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GroupCreation;
