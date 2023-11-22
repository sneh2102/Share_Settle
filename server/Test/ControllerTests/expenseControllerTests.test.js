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
const { addExpenseList } = require('../../Controller/groupController');


const Expense = require('../../Models/expenseModel');
const GroupModal = require('../../Models/groupModel');
const Group = require ('../../Controller/groupController')

const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
  jest.mock('../../Models/expenseModel');
  jest.mock('../../Models/groupModel');
  jest.mock('../../Controller/groupController');
  
  describe('addExpense', () => {
    it('should add a new expense', async () => {
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
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    
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
    
      await addExpense(req, res);
    
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
    
  
    it('should handle invalid group id', async () => {
      const req = {
        body: {
          groupId: '654fdb594512ad992d3285e2',
          amount: 100,
          ownerOfExpense: 'Test1@gmail.com',
          involved: ['test@gmail.com', 'Test1@gmail.com'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      GroupModal.findOne.mockResolvedValueOnce(null);
  
      await addExpense(req, res);
  
      expect(GroupModal.findOne).toHaveBeenCalledWith({ _id: '654fdb594512ad992d3285e2' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid Group Id',
      });
    });
  
    it('should handle errors during expense creation', async () => {
      const req = {
        body: {
          groupId: '654fdb594512ad992d3285e1',
          amount: 100,
          ownerOfExpense: 'Test1@gmail.com',
          involved: ['test@gmail.com', 'Test1@gmail.com'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      GroupModal.findOne.mockResolvedValueOnce({ _id: '654fdb594512ad992d3285e1' });
      Expense.create.mockRejectedValueOnce(new Error('Expense creation error'));
  
      await addExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Expense creation error',
      });
    });
  
    it('should handle errors during group expense update', async () => {
      const req = {
        body: {
          groupId: '654fdb594512ad992d3285e1',
          amount: 100,
          ownerOfExpense: 'Test1@gmail.com',
          involved: ['test@gmail.com', 'Test1@gmail.com'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      GroupModal.findOne.mockResolvedValueOnce({ _id: '654fdb594512ad992d3285e1' });
      Expense.create.mockResolvedValueOnce({ _id: 'expense123' });
      addExpenseList.mockRejectedValueOnce(new Error('Group expense update error'));
  
      await addExpense(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Group expense update error',
      });
    });
  });
  
  
  describe('viewGroupExpense', () => {
    it('should view expenses for a group', async () => {
      const req = {
        body: {
          id: '65565f5cc3bfbce951b49ea2',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockResolvedValueOnce([{ expenseAmount: 50 }, { expenseAmount: 75 }]);
      
      await viewGroupExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({ id: '65565f5cc3bfbce951b49ea2' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        expense: [{ expenseAmount: 50 }, { expenseAmount: 75 }],
        total: 125,
      });
    });
  
    it('should handle no expenses present for the group', async () => {
      const req = {
        body: {
          groupId: '65591efb1b715fe84d192783',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockResolvedValueOnce([]);
  
      await viewGroupExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({ id: '65591efb1b715fe84d192783' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No expense present for the group',
      });
    });
  
    it('should handle errors during viewing group expenses', async () => {
      const req = {
        body: {
          id: '65591efb1b715fe84d192783',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
     // Instead of using mockRejectedValueOnce, use mockImplementationOnce
Expense.find.mockImplementationOnce(() => {
  throw new Error('Group expense view error');
});

  
      await viewGroupExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({ id: '65591efb1b715fe84d192783' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Group expense view error',
      });
    });
  });
  
  describe('viewUserExpense', () => {
    it('should view expenses for a user', async () => {
      const req = {
        body: {
          email: 'test@gmail.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockResolvedValueOnce([{ expenseDistribution: 30 }, { expenseDistribution: 50 }]);
      
      await viewUserExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({ involved: 'test@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        expense: [{ expenseDistribution: 30 }, { expenseDistribution: 50 }],
        total: 80,
      });
    });
  
    it('should handle no expenses present for the user', async () => {
      const req = {
        body: {
          email: 'test@gmail.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockResolvedValueOnce([]);
  
      await viewUserExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({ involved: 'test@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No expense present',
      });
    });
  
    it('should handle errors during viewing user expenses', async () => {
      const req = {
        body: {
          email: 'test@gmail.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockRejectedValueOnce(new Error('User expense view error'));
  
      await viewUserExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({ involved: 'test@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User expense view error',
      });
    });
  });
  
  describe('viewUserGroupExpense', () => {
    it('should view expenses for a user in a specific group', async () => {
      const req = {
        body: {
          email: 'test@gmail.com',
          id: '6556d7eb0d8d449f343c725c',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockResolvedValueOnce([{ expenseDistribution: 20 }, { expenseDistribution: 30 }]);
      
      await viewUserGroupExpense(req, res);
  
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
  
    it('should handle no expenses present for the user in the group', async () => {
      const req = {
        body: {
          email: 'test@gmail.com',
          id: '6556d7eb0d8d449f343c725c',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockResolvedValueOnce([]);
  
      await viewUserGroupExpense(req, res);
  
      expect(Expense.find).toHaveBeenCalledWith({
        involved: 'test@gmail.com',
        groupId: '6556d7eb0d8d449f343c725c',
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No expense present',
      });
    });
  
    it('should handle errors during viewing user group expenses', async () => {
      const req = {
        body: {
          email: 'test@gmail.com',
          id: '6556d7eb0d8d449f343c725c',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Expense.find.mockRejectedValueOnce(new Error('User group expense view error'));
  
      await viewUserGroupExpense(req, res);
  
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
  
    