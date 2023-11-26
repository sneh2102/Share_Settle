const { makeSettlement } = require('../../helper/makeSettlement');
const Group = require('../../Models/groupModel');

jest.mock('../../Models/groupModel');

describe('makeSettlement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle invalid Group Id', async () => {
    const req = { body: { id: 'invalidId' } };

    Group.findOne.mockResolvedValue(null);

    const result = await makeSettlement(req);

    expect(result).toEqual({
      message: 'Invalid Group Id',
    });
    expect(Group.findOne).toHaveBeenCalledWith({
      _id: 'invalidId',
    });
  });

  it('should handle errors during settlement', async () => {
    const req = { body: { id: 'validGroupId' } };

    const mockError = new Error('Internal server error');

    Group.findOne.mockRejectedValue(mockError);

    const result = await makeSettlement(req);

    expect(result).toEqual({
      message: 'Internal server error',
    });

    expect(Group.findOne).toHaveBeenCalledWith({
      _id: 'validGroupId',
    });
  });
});

// Only one Concurrent use of SMTP mail for outlook can be used, as its already been used in deployed project this test case is failing hence we have commented it.


// const nodemailerMock = require('nodemailer-mock');
// const notificationHandler = require('../../helper/NotificationHandler');
// const emailTemplates = require('../../emailTemplates.json');

// process.env.SHARESETTLE_EMAIL = 'sneh.patel.canada@outlook.com';
// process.env.CONTACTUS_PASSWORD = 'Group1asdc';

// jest.mock('../../emailTemplates.json', () => ({
//   userSignin: {
//     subject: 'Sign-in Notification',
//     text: 'Hello {userName},\n\nYou have successfully signed in.'
//   }
// }));

// describe('notificationHandler', () => {
//   beforeAll(() => {
//     nodemailerMock.mock.reset();
//   });

//   afterAll(() => {
//     nodemailerMock.mock.reset();
//   });

//   it('should send an email successfully', async () => {
//     const params = {
//       email: 'snehpatel903@gmail.com',
//       user1: 'Test User',
//       groupName: 'Test Group',
//       action: 'userSignin',
//       user2: 'Another User',
//       status: 'Some Status',
//       amount: '100',
//       date: '2023-11-22'
//     };

//     const result = await notificationHandler(params);

//     expect(result.success).toBe(true);
//     expect(result.message).toBe('Email sent successfully');
//   }, 10000);
// });