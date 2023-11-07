import React, { useEffect, useState } from 'react';
import './GroupCreation.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useGroup } from '../../Hooks/useGroup';

const GroupCreation = () => {
  const { getUser, createGroup } = useGroup();
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState(["sneh"]);

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
    try {
      await createGroup(selectedMembers);
      navigate('/groups');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <Navbar />
      <div className="gc-container">
        <div className="gc-card">
          <h2>Group Creation</h2>
          <form>
            <div className="gc-form-group">
              <label htmlFor="groupName">Group Name</label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="gc-form-group">
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
              <ul>
                {selectedMembers.map((member, index) => (
                  <li key={index}>
                    {member}
                    <span className="gc-delete-btn" onClick={() => deleteMember(member)}>
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <button onClick={handleCreateGroup}>Create Group</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GroupCreation;
