import React, { useEffect, useState } from 'react';
import { useGroup } from '../../Hooks/useGroup';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import './GroupView.css';
import { useExpense } from '../../Hooks/useExpense';
import { toast } from 'react-toastify';
import { Typography, Button, Paper, Grid, Container, Box, Tabs, Tab } from '@mui/material';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';
import ExpensePopUp from '../../Components/ExpensePopUp/ExpensePopUp';
import { useNavigate } from 'react-router-dom';



const GroupView = () => {
  const { fetchGroup, leaveGroup, makeSettlement } = useGroup();
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
  const Navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('group');


  useEffect(() => {
    const getGroupDetails = async (e) => {
      try {
        const data = await fetchGroup(id);
        setGroupDetails(data);
        setAvailableMembers(data.group.members)
      } catch (error) {

      }
    };
    const fetchGroupExpenses = async (e) => {
      // e.preventDefault();
      try {
        const data = await fetchGroupExpense(id);
        setExpense(data.expense)

      } catch (error) {

      }
    };
    const fetchGroupBalanceSheet = async (e) => {
      // e.preventDefault();
      try {
        const data = await groupBalanceSheet(id);
        setBalanceSheet(data.data)
      } catch (error) {

      }
    };
    const fetchUserExpenses = async (e) => {
      // e.preventDefault();
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


  const handleLeaveGroup = async () => {
    try {
      console.log(user.email, id);
      await leaveGroup(user.email, id);
      Navigate('/groups')
      toast.success("Leaved Succesfully")
    }
    catch (err) {
      toast.error(err.message)
    }
  }


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

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!expenseName || !expenseDescription || !expenseAmount || !category || !expenseOwner || selectedMembers.length === 0) {
      toast.error("All fields must be filled");
      return;
    }

    if (isNaN(parseFloat(expenseAmount)) || !isFinite(expenseAmount)) {
      toast.error('Please enter a valid number for the expense amount.');
      return;
    }

    try {
      // Add expense
      await addExpense(id, expenseName, expenseDescription, parseFloat(expenseAmount), "CAD", category, expenseOwner, selectedMembers);

      // Fetch and update group expenses
      const groupExpenses = await fetchGroupExpense(id);
      setExpense(groupExpenses.expense);

      setIsAddingExpense(false);
      setExpenseName('');
      setExpenseDescription('');
      setExpenseAmount('');
      setCategory('');
      setExpenseOwner('');
      setSelectedMembers([]);

      toast.success('Expense added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add expense. Please try again.');
    }
  };
  const handleSettlement = async (From, To, Amount) => {
    try {

      await makeSettlement(id, From, To, Amount);
      toast.success("Settlement Done")
    }
    catch (err) {
      toast.error(err.message)
    }
  }



  return (
    <Container>

      <Grid className='groupView-container'>
        <Paper elevation={3} style={{ margin: '20px', padding: '20px', borderRadius: '15px', background: '#ffffff', }}>
          <Navbar />
          <div>
            <Paper elevation={3} style={{ margin: '20px', padding: '20px', borderRadius: '15px', background: '#f0f0f0' }}>
              {/* -----------Group Details-------- */}
              {groupDetails ? (
                <>
                  <Typography variant="h4" gutterBottom style={{ color: '#4CAF50', marginBottom: '20px' }}>
                    Group Details
                  </Typography>
                  <div>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#2196f3', marginBottom: '10px' }}>
                      Group Name: {groupDetails.group.name}
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: '10px', color: '#777' }}>
                      🌟 Group Members 🌟
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                      {groupDetails.group.members.map((member, index) => (
                        <Typography key={index} variant="subtitle1" style={{ marginBottom: '5px', color: '#333' }}>
                          {member}
                        </Typography>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '10px', background: '#FFD700', color: '#333' }}
                      onClick={openAddExpenseModal}
                    >
                      🚀 Add Expense
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ background: '#FF6347', color: '#fff' }}
                      onClick={handleLeaveGroup}
                    >
                      🚪 Leave Group
                    </Button>
                  </div>
                </>
              ) : (
                <div>Loading</div>
              )}
            </Paper>
          </div>
          <div className='group-balance-sheet'>
            <Paper elevation={3} style={{ margin: '20px', padding: '20px', borderRadius: '15px', background: '#f0f0f0' }}>
              {/* --------Who Owe Who ------------ */}
              <Typography variant="h4" style={{ marginTop: '20px', color: '#4CAF50', marginBottom: '20px' }}>
                💸 Group Balance Sheet 💸
              </Typography>
              {balanceSheet ? (
                <>
                  {balanceSheet.map((relationship, index) => (
                    
                    (relationship[0] === user.email || relationship[1] === user.email) && relationship[2] !== 0 ? (
                      <div key={index} style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', borderRadius: '10px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Typography variant="h6" style={{ marginBottom: '8px', color: '#333' }}>
                            {relationship[0]}
                          </Typography>
                          <Typography variant="body1" style={{ color: '#777' }}>
                            owes {relationship[2]} to {relationship[1]}
                          </Typography>
                        </div>
                        <div>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ background: '#FF6347', color: '#fff' }}
                            onClick={() => handleSettlement(relationship[0], relationship[1], relationship[2])}
                          >
                            Settle
                          </Button>

                        </div>
                      </div>
                    ) : null
                  ))}
                </>
              ) : <>
                <div>No Settlements to Show</div>
              </>
              }
            </Paper>
          </div>


          {/* -------Expense--------- */}
          {/* Toggle between "Group Expenses" and "User Expenses" */}
          <Paper elevation={3} style={{ margin: '20px', padding: '20px', borderRadius: '15px', background: '#f0f0f0' }}>
            <Box mb={2} display="flex" justifyContent="center">

              <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                <Tab label="Group Expenses" value="group" />
                <Tab label="User Expenses" value="user" />
              </Tabs>
            </Box>

            {/* Display Expenses based on the selected tab */}
            <div>
              <Typography variant="h4" gutterBottom>
                {selectedTab === 'group' ? 'Group Expenses' : 'User Expenses'}
              </Typography>

              {selectedTab === 'group' && expenses ? (
                <Grid container spacing={2}>
                  {expenses.map((expense) => (
                    <Grid item key={expense._id} xs={12} sm={6} md={4}>
                      <ExpenseCard expense={expense} onClick={openExpenseModal} />
                    </Grid>
                  ))}
                </Grid>
              ) : null}

              {selectedTab === 'user' && userExpenses ? (
                <Grid container spacing={2}>
                  {userExpenses.map((expense) => (
                    <Grid item key={expense._id} xs={12} sm={6} md={4}>
                      <ExpenseCard expense={expense} onClick={openExpenseModal} />
                    </Grid>
                  ))}
                </Grid>
              ) : null}

              {(!selectedTab || (!expenses && selectedTab === 'group') || (!userExpenses && selectedTab === 'user')) && (
                <div>No Expenses to Show</div>
              )}
            </div>
          </Paper>


          {/* ------------Expense Floadting Window---------------- */}

          {isExpenseModalOpen && (
            <ExpensePopUp
              expense={selectedExpense}
              onClose={() => setIsExpenseModalOpen(false)}
            />
          )}

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
        </Paper>
      </Grid>
    </Container>
  );
};

export default GroupView;

