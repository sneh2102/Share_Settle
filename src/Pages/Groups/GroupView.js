import React, { useEffect, useState } from 'react';
import { useGroup } from '../../Hooks/useGroup';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import './GroupView.css';
import { useExpense } from '../../Hooks/useExpense';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';



const GroupView = () => {
  const { fetchGroup, getUser } = useGroup();
  const { addExpense, fetchGroupExpense, groupBalanceSheet, getUserGroupExpenses } = useExpense()
  const { id } = useParams();
  const user = JSON.parse(window.localStorage.getItem('user'))

  const [groupDetails, setGroupDetails] = useState(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [expenseOwner, setExpenseOwner] = useState();
  const [availableMembers, setAvailableMembers] = useState([]);
  const [expenseName, setExpenseName] = useState();
  const [expenseDescription, setExpenseDescription] = useState()
  const [expenseAmount, setExpenseAmount] = useState()
  const [category, setCategory] = useState();
  const [expenses, setExpense] = useState([]);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);


  useEffect(() => {
    const getGroupDetails = async () => {
      try {
        const data = await fetchGroup(id);
        setGroupDetails(data);
        setAvailableMembers(data.group.members)
      } catch (error) {

      }
    };
    const fetchGroupExpenses = async () => {
      try {
        const data = await fetchGroupExpense(id);
        setExpense(data.expense)
          
      } catch (error) {

      }
    };
    const fetchGroupBalanceSheet = async () => {
      try {
        const data = await groupBalanceSheet(id);
        setBalanceSheet(data.data)
      } catch (error) {

      }
    };
    const fetchUserExpenses = async () => {
      try {
        console.log(user);
        const data = await getUserGroupExpenses("test@gmail.com", id);
        setUserExpenses(data.expense)
      
      } catch (error) {

      }
    };

    if (id) {
      getGroupDetails();
      fetchGroupExpenses();
      fetchGroupBalanceSheet();
      fetchUserExpenses();
    }
  }, []);





  const openExpenseModal = (expense) => {
    setSelectedExpense(expense);
    setIsExpenseModalOpen(true);
  };
  

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

  const openAddExpenseModal = () => {
    setIsAddingExpense(true);
  };

  const closeAddExpenseModal = () => {
    setIsAddingExpense(false);
  };

  const handleAddExpense = async () => {
    if (!expenseName || !expenseDescription || !expenseAmount || !category || !expenseOwner || selectedMembers.length === 0) {
      toast.error("All field must be filled")
      return;
    }


    if (isNaN(parseFloat(expenseAmount)) || !isFinite(expenseAmount)) {
      toast.error('Please enter a valid number for the expense amount.');
      return;
    }
    const data = await addExpense(id, expenseName, expenseDescription, parseFloat(expenseAmount), "CAD", category, expenseOwner, selectedMembers)
    setIsAddingExpense(false)
    setIsAddingExpense(false);
    setExpenseName('');
    setExpenseDescription('');
    setExpenseAmount('');
    setCategory('');
    setExpenseOwner('');
    setSelectedMembers([]);
  }

  return (
    <div className='groupView-container'>
      <Navbar />
      <div style={{ marginLeft: "300px" }}>
        {/* -----------Group Details-------- */}
        {groupDetails ?
          <>

            <h1>Group Details</h1>
            <div>
              <p>Group Name: {groupDetails.group.name}</p>
              <p>Group Members: {groupDetails.group.members}</p>
            </div>
            <button onClick={openAddExpenseModal}>Add Expense</button>
          </> : <> <div>Loading</div>
          </>}
      </div>

      {/* --------Who Owe Who ------------ */}

      {balanceSheet ? <>
        <Typography variant="h4" style={{ marginTop: '20px', marginLeft: "300px" }}>Group Balance Sheet</Typography>
        {balanceSheet.map((relationship, index) => (
          relationship[2] !== 0 ? (
            <div key={index} style={{ marginTop: '20px', marginLeft: "300px" }}>
              <p>{relationship[0]} owes {relationship[2]} to {relationship[1]}</p>
            </div>
          ) : null
        ))}

      </> : <><div style={{ marginTop: '20px', marginLeft: "300px" }}>Loading</div></>
      }

      {/* -------Expense--------- */}
      <Typography variant="h4" style={{ marginTop: '20px', marginLeft: "300px" }}>Expense Details</Typography>
      {expenses ? <>
        <div style={{ marginTop: '20px', marginLeft: "300px", display: "flex" }}>
          {expenses.map((expense) => (
       
              <ExpenseCard key={expense._id} expense={expense} onClick={openExpenseModal} />
           
          ))}
        </div>
      </> : <><div>Loading</div></>
      }

      {/* -----------User Expenses------------------ */}
      <Typography variant="h4" style={{ marginTop: '20px', marginLeft: "300px" }}>User Expense Details</Typography>
      {userExpenses ? <>
        <div style={{ marginTop: '20px', marginLeft: "300px", display: "flex" }}>
          {userExpenses.map((expense) => (
           
              <ExpenseCard key={expense._id} expense={expense} onClick={openExpenseModal}/>
      
          ))}
        </div>
      </> : <><div>Loading</div></>
      }

      {/* ------------Expense Floadting Window---------------- */}



      {/* -----------AddExpense PopUp---------------- */}

      {isAddingExpense && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddExpenseModal}>&times;</span>
            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
              <input type="text" placeholder="Expense Name" onChange={(e) => setExpenseName(e.target.value)} />
              <input type="text" placeholder="Expense Description" onChange={(e) => setExpenseDescription(e.target.value)} />
              <input type="number" placeholder="Amount" onChange={(e) => setExpenseAmount(e.target.value)} />
              <select
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Groceries</option>
                <option>Home</option>
                <option>Entertainment</option>
                <option>Party</option>
                <option>Others</option>
              </select>
              <select
                id="members"
                className='field-input'
                onChange={(e) => setExpenseOwner(e.target.value)}
                value=""
              >
                <option value="">Select who paid</option>
                {availableMembers.map((members, index) => (
                  <option key={index} value={members}>
                    {members}
                  </option>
                ))}
              </select>
              <div className='member-chip'>
                {expenseOwner}
              </div>
              <select
                id="members"
                className='field-input'
                onChange={(e) => addMember(e.target.value)}
                value=""
              >
                <option value="">Select Members</option>
                {availableMembers.map((members, index) => (
                  <option key={index} value={members}>
                    {members}
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
              <button type="submit">Submit Expense</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupView;
