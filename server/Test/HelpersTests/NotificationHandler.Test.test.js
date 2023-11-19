const nodemailerMock = require('nodemailer-mock');
const notificationHandler = require('../../helper/NotificationHandler'); 
const emailTemplates = require('../../emailTemplates.json');


process.env.SHARESETTLE_EMAIL = 'sharesettle@outlook.com';
process.env.CONTACTUS_PASSWORD = 'Group1asdc';

jest.mock('../../emailTemplates.json', () => ({
  userSignin: {
    subject: 'Sign-in Notification',
    text: 'Hello {userName},\n\nYou have successfully signed in.'
  }

}));

describe('notificationHandler', () => {
  beforeAll(() => {
    nodemailerMock.mock.reset(); 
  });

  afterAll(() => {
    nodemailerMock.mock.reset(); 
  });

  it('should send an email successfully', async () => {
    const email = 'snehpatel903@gmail.com';
    const userName = 'Test User';
    const groupName = 'Test Group';
    const action = 'userSignin';

    
    const result = await notificationHandler(email, userName, groupName, action);


    expect(result.success).toBe(true);
    expect(result.message).toBe('Email sent successfully');

  },10000);

 
});
