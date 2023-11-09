import React, { useEffect, useState } from 'react';
import { useGroup } from '../../Hooks/useGroup';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import './GroupView.css'; 

const GroupView = () => {
  const { fetchGroup } = useGroup();
  const { id } = useParams();

  const [groupDetails, setGroupDetails] = useState(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  useEffect(() => {
    const getGroupDetails = async () => {
      try {
        const data = await fetchGroup(id);
        setGroupDetails(data);
      } catch (error) {
        // Handle errors, e.g., set an error state
      }
    };

    if (id) {
      getGroupDetails();
    }
  }, []);

  const openAddExpenseModal = () => {
    setIsAddingExpense(true);
  };

  const closeAddExpenseModal = () => {
    setIsAddingExpense(false);
  };

  return (
    <div className='groupView-container'>
      <Navbar />
      <div style={{ marginLeft: "300px" }}>
        <h1>Group Details</h1>
        {groupDetails ? (
          <div>
            <p>Group Name: {groupDetails.group.name}</p>
            <p>Group Members: {groupDetails.group.members}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={openAddExpenseModal}>Add Expense</button>
      </div>

      {isAddingExpense && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddExpenseModal}>&times;</span>
            <h2>Add Expense</h2>
            {/* Your form for adding an expense goes here */}
            {/* For example: */}
            <form>
              {/* Expense input fields */}
              <input type="text" placeholder="Expense Name" />
              <input type="number" placeholder="Amount" />
              <button type="submit">Submit Expense</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupView;
