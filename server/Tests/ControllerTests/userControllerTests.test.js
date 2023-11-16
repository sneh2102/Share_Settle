const {
    signupUser,
    loginUser,
    forgotPassUser,
    resetPassUser,
    changeUsername,
    changePassword,
    getUser,
  } = require('../../Controller/userController');
  
  jest.mock('../../Models/userModel', () => ({
    signup: jest.fn(),
    login: jest.fn(),
    forgotpass: jest.fn(),
    resetpass: jest.fn(),
    changeUsername: jest.fn(),
    changePassword: jest.fn(),
    getUser: jest.fn(),
  }));
  
  jest.mock('nodemailer');
  
  describe('User Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should sign up a user and return a success response', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      require('../../Models/userModel').signup.mockResolvedValue({
        _id: 'userId123',
        name: 'Test User',
        email: 'test@example.com',
      });
  
      await signupUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: 'test@example.com',
        token: expect.any(String),
        user: {
          _id: 'userId123',
          name: 'Test User',
          email: 'test@example.com',
        },
      });
    });
});  