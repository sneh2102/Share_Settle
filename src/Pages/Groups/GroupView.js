import React, { useEffect, useState } from 'react';
import { useGroup } from '../../Hooks/useGroup';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import './GroupView.css'; 
import '../../PagesCommonCSS/PagesCommonCSS.css';

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
    <>
    <Navbar />
      <div className='page-layout-container'>
        <div className="page-layout-card">
          {groupDetails ? (
            <div className="page-layout-header" id="group-header">
              <h2>{groupDetails.group.name}</h2>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div className="page-layout-fields">

          <div className='member-emails'>
          <p><strong>Members :</strong></p>
            {groupDetails && groupDetails.group && Array.isArray(groupDetails.group.members) ? (
              <ul>
                {groupDetails.group.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            ) : (
              <p>No members found</p>
            )}
          </div>

          <button className='bordered-btn' id="add-expense-btn" onClick={openAddExpenseModal}>Add Expense</button>
        

        {isAddingExpense && (
          <div>
            <input 
              type="text" 
              placeholder="Expense Name" 
              className='expense-input-field'
            />
            <input 
              type="number" 
              placeholder="Amount" 
              className='expense-input-field'
            />
            <button className="small-submit-buttons" type="submit">Submit Expense</button>
          </div>
        )}
        </div>
      </div>
      </div>
  </>
  );
}

export default GroupView;
