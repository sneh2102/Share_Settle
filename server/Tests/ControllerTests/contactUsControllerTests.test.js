const nodemailer = require('nodemailer');
const { contactUs } = require('../../Controller/contactUsController');

jest.mock('nodemailer');

describe('contactUs function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send an email with valid input', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message content',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn((options, callback) => {
        callback(null, { response: 'Email sent' });
      }),
    });

    await contactUs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'Email sent' });
  });

  it('should handle email sending failure', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message content',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn((options, callback) => {
        callback(new Error('Email sending failed'), null);
      }),
    });

    await contactUs(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: expect.any(Error) });
  });

});