import React, { useState } from 'react';
import './GroupCreation.css';

const GroupCreation = () => {
  const allMembers = ['Sneh', 'Priyatam', 'Jeet', 'Krisha'];
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState(allMembers);

  const addMember = (member) => {
    if (member) {
      setSelectedMembers([...selectedMembers, member]);
      setAvailableMembers(availableMembers.filter(m => m !== member));
    }
  };

  const deleteMember = (member) => {
    setSelectedMembers(selectedMembers.filter(m => m !== member));
    setAvailableMembers([...availableMembers, member]);
  };

  return (
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
              {availableMembers.map((member, index) => (
                <option key={index} value={member}>
                  {member}
                </option>
              ))}
            </select>
            <ul>
              {selectedMembers.map((member, index) => (
                <li key={index}>
                  {member}
                  <span className="gc-delete-btn" onClick={() => deleteMember(member)}>x</span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupCreation;
