// Importing necessary modules and functions for testing expenseController.
const {
  addExpense,
  deleteExpense,
  viewGroupExpense,
  viewUserExpense,
  viewUserGroupExpense,
  viewExpense,
  categoryExpense,
  monthlyExpense,
  userCategoryExpense,
  userMonthlyExpense,
  recentUserExpenses
} = require('../../Controller/expenseController');

// Importing the addExpenseList function from the groupController for mocking purposes.
const { addExpenseList } = require('../../Controller/groupController');

// Importing Expense model for mocking database interactions.
const Expense = require('../../Models/expenseModel');

// Importing GroupModal and Group for mocking group-related interactions.
const GroupModal = require('../../Models/groupModel');
const Group = require ('../../Controller/groupController')

const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

  // Mocking the external modules and functions for testing.
  jest.mock('../../Models/expenseModel');
  jest.mock('../../Models/groupModel');
  jest.mock('../../Controller/groupController');
  
  // Describe block for testing the addExpense function.
  describe('addExpense', () => {
    // Test case for successful addition of a new expense.
    it('should add a new expense', async () => {
      // Test request with valid expense details.
      const req = {
        body: {
          groupId: "654fdb594512ad992d3285e1",
          name: "Groceries",
          description: "wallmart banana",
          amount: 100,
          expenseCurrency: "CAD",
          category: "Groceries",
          ownerOfExpense: "Test1@gmail.com",
          involved: [
            "test@gmail.com",
            "Test1@gmail.com"
          ]
        },
      };

      // Mock response object.
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    
      // Mock response for adding expense list.
      const mockAddExpenseListResponse = {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      };
    
      // Mocking the GroupModal.findOne method
      GroupModal.findOne.mockResolvedValueOnce({
        _id: "654fdb594512ad992d3285e1",
        name: 'testbalance',
        members: [ 'test@gmail.com', 'Test1@gmail.com' ],
        groupExpensesList: [
          {
            'test@gmail.com': -388,
            'Test1@gmail.com': 488,
            'Test@gmail.com': 0
          }
        ],
        groupTotal: 1524,
        __v: 0
      });
    
      // Mocking the Group.addExpenseList method
      Group.addExpenseList.mockResolvedValueOnce(mockAddExpenseListResponse);
    
      // Mocking the Expense.create method
      Expense.create.mockResolvedValueOnce({ _id: '65575fa3ef40b537298f4b75' });
    
      // Invoking the addExpense function.
      await addExpense(req, res);
    
      // Assertions to check if the expected functions were called with the correct parameters.
      expect(Group.addExpenseList).toHaveBeenCalledWith(
        '654fdb594512ad992d3285e1',
        100,
        'Test1@gmail.com',
        ['test@gmail.com', 'Test1@gmail.com']
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        "status": "Success",
        "message": "New expenses added",
        "Id": '65575fa3ef40b537298f4b75',
        "splitUpdateResponse": mockAddExpenseListResponse,
      });
    });
    
    // Test case for handling an invalid group id.
    it('should handle invalid group id', async () => {
      // Test request with an invalid group id.
      const req = {
        body: {
          groupId: '654fdb594512ad992d3285e2',
          amount: 100,
          ownerOfExpense: 'Test1@gmail.com',
          involved: ['test@gmail.com', 'Test1@gmail.com'],
        },
      };

      // Mock response object.
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock response object.
      GroupModal.findOne.mockResolvedValueOnce(null);
  
      // Invoking the addExpense function.
      await addExpense(req, res);
  
      // Assertions to check if the expected functions were called with the correct parameters.
      expect(GroupModal.findOne).toHaveBeenCalledWith({ _id: '654fdb594512ad992d3285e2' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid Group Id',
      });
    });
  
    // Test case for handling errors during expense creation.
    it('should handle errors during expense creation', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          groupId: '654fdb594512ad992d3285e1',
          amount: 100,
          ownerOfExpense: 'Test1@gmail.com',
          involved: ['test@gmail.com', 'Test1@gmail.com'],
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding a group
      GroupModal.findOne.mockResolvedValueOnce({ _id: '654fdb594512ad992d3285e1' });
      
      // Mocking an error during expense creation
      Expense.create.mockRejectedValueOnce(new Error('Expense creation error'));
  
      // Calling the function to add an expense
      await addExpense(req, res);
  
      // Asserting that the appropriate response status and JSON are set
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Expense creation error',
      });
    });
  
    // Testing error handling during group expense update
    it('should handle errors during group expense update', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          groupId: '654fdb594512ad992d3285e1',
          amount: 100,
          ownerOfExpense: 'Test1@gmail.com',
          involved: ['test@gmail.com', 'Test1@gmail.com'],
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding a group
      GroupModal.findOne.mockResolvedValueOnce({ _id: '654fdb594512ad992d3285e1' });
      // Mocking successful expense creation
      Expense.create.mockResolvedValueOnce({ _id: 'expense123' });
      // Mocking an error during group expense update
      addExpenseList.mockRejectedValueOnce(new Error('Group expense update error'));
  
      // Calling the function to add an expense
      await addExpense(req, res);
  
      // Asserting that the appropriate response status and JSON are set
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Group expense update error',
      });
    });
  });
  
  // Group of tests for the viewGroupExpense function
  describe('viewGroupExpense', () => {
    // Testing the successful viewing of expenses for a group
    it('should view expenses for a group', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          id: '65565f5cc3bfbce951b49ea2',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding expenses for a group
      Expense.find.mockResolvedValueOnce([{ expenseAmount: 50 }, { expenseAmount: 75 }]);
      
      // Calling the function to view group expenses
      await viewGroupExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({ id: '65565f5cc3bfbce951b49ea2' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        expense: [{ expenseAmount: 50 }, { expenseAmount: 75 }],
        total: 125,
      });
    });
  
    // Testing error handling when no expenses are present for the group
    it('should handle no expenses present for the group', async () => {
      const req = {
        body: {
          groupId: '65591efb1b715fe84d192783',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding no expenses for a group
      Expense.find.mockResolvedValueOnce([]);
  
      // Calling the function to view group expenses
      await viewGroupExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({ id: '65591efb1b715fe84d192783' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No expense present for the group',
      });
    });
  
    // Testing error handling during viewing group expenses
    it('should handle errors during viewing group expenses', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          id: '65591efb1b715fe84d192783',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
     // // Instead of using mockRejectedValueOnce, use mockImplementationOnce to simulate an error during database query
Expense.find.mockImplementationOnce(() => {
  throw new Error('Group expense view error');
});

      // Calling the function to view group expenses
      await viewGroupExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({ id: '65591efb1b715fe84d192783' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Group expense view error',
      });
    });
  });
  
  // Group of tests for the viewUserExpense function
  describe('viewUserExpense', () => {
    // Testing the successful viewing of expenses for a user
    it('should view expenses for a user', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          email: 'test@gmail.com',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding expenses for a user
      Expense.find.mockResolvedValueOnce([{ expenseDistribution: 30 }, { expenseDistribution: 50 }]);
      
      // Calling the function to view user expenses
      await viewUserExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({ involved: 'test@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        expense: [{ expenseDistribution: 30 }, { expenseDistribution: 50 }],
        total: 80,
      });
    });
  
    // Testing error handling when no expenses are present for the user
    it('should handle no expenses present for the user', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          email: 'test@gmail.com',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding no expenses for a user
      Expense.find.mockResolvedValueOnce([]);
  
      // Calling the function to view user expenses
      await viewUserExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({ involved: 'test@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No expense present',
      });
    });
  
    // Testing error handling during viewing user expenses
    it('should handle errors during viewing user expenses', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          email: 'test@gmail.com',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      // Mocking an error during database query for user expenses
      Expense.find.mockRejectedValueOnce(new Error('User expense view error'));
  
      // Calling the function to view user expenses
      await viewUserExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({ involved: 'test@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User expense view error',
      });
    });
  });
  
  // Group of tests for the viewUserGroupExpense function
  describe('viewUserGroupExpense', () => {
    // Testing the successful viewing of expenses for a user in a specific group
    it('should view expenses for a user in a specific group', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          email: 'test@gmail.com',
          id: '6556d7eb0d8d449f343c725c',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding expenses for a user in a specific group
      Expense.find.mockResolvedValueOnce([{ expenseDistribution: 20 }, { expenseDistribution: 30 }]);
      
      // Calling the function to view user group expenses
      await viewUserGroupExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({
        involved: 'test@gmail.com',
        groupId: '6556d7eb0d8d449f343c725c',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        expense: [{ expenseDistribution: 20 }, { expenseDistribution: 30 }],
        total: 50,
      });
    });
  
    // Testing error handling when no expenses are present for the user in the group
    it('should handle no expenses present for the user in the group', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          email: 'test@gmail.com',
          id: '6556d7eb0d8d449f343c725c',
        },
      };

      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database response for finding no expenses for a user in the group
      Expense.find.mockResolvedValueOnce([]);
  
      // Calling the function to view user group expenses
      await viewUserGroupExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({
        involved: 'test@gmail.com',
        groupId: '6556d7eb0d8d449f343c725c',
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No expense present',
      });
    });
  
    // Testing error handling during viewing user group expenses
    it('should handle errors during viewing user group expenses', async () => {
      // Mocked request object with necessary data
      const req = {
        body: {
          email: 'test@gmail.com',
          id: '6556d7eb0d8d449f343c725c',
        },
      };
      // Mocked response object with jest functions
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking an error during database
      Expense.find.mockRejectedValueOnce(new Error('User group expense view error'));
  
      // Calling the function to view user group expenses
      await viewUserGroupExpense(req, res);
  
      // Asserting that the appropriate database query and response data are set
      expect(Expense.find).toHaveBeenCalledWith({
        involved: 'test@gmail.com',
        groupId: '6556d7eb0d8d449f343c725c',
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User group expense view error',
      });
    });
  });

  describe('categoryExpense', () => {
    it('should return success with category expenses', async () => {
      const req = mockRequest({ id: 'your-group-id' });
      const res = mockResponse();
  
      // Mock the Expense.aggregate method
      Expense.aggregate.mockResolvedValueOnce([
        { _id: 'Home', amount: 100 },
        { _id: 'Entertainment', amount: 150 },
      ]);
  
      await categoryExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: [
          { _id: 'Home', amount: 100 },
          { _id: 'Entertainment', amount: 150 },
        ],
      });
    });
  
    it('should handle errors during category expense retrieval', async () => {
      const req = mockRequest({ id: '65565f5cc3bfbce951b49ea2' });
      const res = mockResponse();
  
      // Mock the Expense.aggregate method to throw an error
      Expense.aggregate.mockRejectedValueOnce(new Error('Category expense retrieval error'));
  
      await categoryExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Category expense retrieval error',
      });
    });
  });

  describe('monthlyExpense', () => {
    it('should return success with monthly expenses', async () => {
      const req = mockRequest({ id: 'your-group-id' });
      const res = mockResponse();
  
      Expense.aggregate.mockResolvedValueOnce([
        { _id: { month: 1, year: 2023 }, amount: 100 },
        { _id: { month: 2, year: 2023 }, amount: 150 },
      ]);
  
      await monthlyExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: [
          { _id: { month: 1, year: 2023 }, amount: 100 },
          { _id: { month: 2, year: 2023 }, amount: 150 },
        ],
      });
    });
  
    it('should handle errors during monthly expense retrieval', async () => {
      const req = mockRequest({ id: '65565f5cc3bfbce951b49ea2' });
      const res = mockResponse();
  
      Expense.aggregate.mockRejectedValueOnce(new Error('Monthly expense retrieval error'));
  
      await monthlyExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Monthly expense retrieval error',
      });
    });
  });
  
  describe('userCategoryExpense', () => {
    it('should return success with user category expenses', async () => {
      const req = mockRequest({ user: 'your-user-id' });
      const res = mockResponse();
  
      // Mock the Expense.aggregate method
      Expense.aggregate.mockResolvedValueOnce([
        { _id: 'Home', amount: 100 },
        { _id: 'Entertainment', amount: 150 },
      ]);
  
      await userCategoryExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: [
          { _id: 'Home', amount: 100 },
          { _id: 'Entertainment', amount: 150 },
        ],
      });
    });
  
    it('should handle errors during user category expense retrieval', async () => {
      const req = mockRequest({ user: '65565f5cc3bfbce951b49ea2' });
      const res = mockResponse();
  
      // Mock the Expense.aggregate method to throw an error
      Expense.aggregate.mockRejectedValueOnce(new Error('User category expense retrieval error'));
  
      await userCategoryExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User category expense retrieval error',
      });
    });
  });
  
  describe('userMonthlyExpense', () => {
    it('should return success with user monthly expenses', async () => {
      const req = mockRequest({ user: '65565f5cc3bfbce951b49ea2' });
      const res = mockResponse();
  
      Expense.aggregate.mockResolvedValueOnce([
        { _id: { month: 1, year: 2023 }, amount: 100 },
        { _id: { month: 2, year: 2023 }, amount: 150 },
      ]);
  
      await userMonthlyExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: [
          { _id: { month: 1, year: 2023 }, amount: 100 },
          { _id: { month: 2, year: 2023 }, amount: 150 },
        ],
      });
    });
  
    it('should handle errors during user monthly expense retrieval', async () => {
      const req = mockRequest({ user: '65565f5cc3bfbce951b49ea2' });
      const res = mockResponse();
  
      Expense.aggregate.mockRejectedValueOnce(new Error('User monthly expense retrieval error'));
  
      await userMonthlyExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User monthly expense retrieval error',
      });
    });
  });
describe('viewExpense', () => {
    it('should return a success response with the expense details', async () => {

      const mockExpenseData = {
        _id: '6556942f35d88d9a95ef104a',
        groupId: '6556941a35d88d9a95ef103d',
        name: 'sneh',
        description: 'sneh',
        amount: 1000,
        expenseCurrency: 'CAD',
        category: 'Entertainment',
        ownerOfExpense: 'test@gmail.com',
        involved: ['test@gmail.com', 'snehpatel903@gmail.com', 'krisha@gmail.com'],
        expenseDistribution: '333.3333333333333',
        dateOfExpense: '2023-11-16T22:14:07.452Z',
        __v: 0,
      };
  
      
      Expense.findOne.mockResolvedValue(mockExpenseData);
  
     
      const req = {
        body: {
          id: '6556942f35d88d9a95ef104a', 
        },
      };
  
     
      const res = mockResponse();
  
      
      await viewExpense(req, res);
  
     
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        expense: mockExpenseData,
      });
    });
  
  });
  
    