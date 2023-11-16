const { createGroup } = require('../../Controller/groupController'); // Replace 'yourModule' with the actual module path

jest.mock('../../Models/groupModel', () => ({
  save: jest.fn(),
}));

describe('createGroup function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new group and return a success response', async () => {
    const req = {
      body: {
        name: 'Test Group',
        members: ['user1@example.com', 'user2@example.com'],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const savedGroup = {
      _id: 'someId',
      name: 'Test Group',
      members: ['user1@example.com', 'user2@example.com'],
    };
    require('../../Models/groupModel').save.mockResolvedValue(savedGroup);

    await createGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(savedGroup);
  });

  it('should handle invalid request body and return a 404 response', async () => {
    const req = {
      body: null,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await createGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ errorMessage: 'Invalid request body' });
  });

  it('should handle an error while saving the group and return a 500 response', async () => {
    const req = {
      body: {
        name: 'Test Group',
        members: ['user1@example.com', 'user2@example.com'],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const error = new Error('Error saving group');
    require('../../Models/groupModel').save.mockRejectedValue(error);

    await createGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      errorStatus: 500,
      errorMessage: 'Internal server error',
      cause: 'Error while saving group',
    });
  });
});


const { fetchUserGroups } = require('../../Controller/groupController');

jest.mock('../../Models/groupModel', () => ({
  find: jest.fn(),
}));

describe('fetchUserGroups function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user groups and return a success response', async () => {
    const req = {
      body: {
        email: 'user1@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mocking the find method of the Group model
    const queryResults = [
      { _id: 'group1', name: 'Group 1', members: ['user1@example.com'] },
      { _id: 'group2', name: 'Group 2', members: ['user1@example.com'] },
    ];
    require('../../Models/groupModel').find.mockResolvedValue(queryResults);

    await fetchUserGroups(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ groups: queryResults });
  });

  it('should handle invalid request body and return a 404 response', async () => {
    const req = {
      body: null,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await fetchUserGroups(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ errorMessage: 'Invalid request body' });
  });

  it('should handle an error while fetching user groups and return a 500 response', async () => {
    const req = {
      body: {
        email: 'user1@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const error = new Error('Error fetching user groups');
    require('../../Models/groupModel').find.mockRejectedValue(error);

    await fetchUserGroups(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      errorStatus: 500,
      errorMessage: 'Internal server error',
      cause: 'Error while fetching user groups',
    });
  });
});


const { fetchGroup } = require('../../Controller/groupController');

jest.mock('../../Models/groupModel', () => ({
  findById: jest.fn(),
}));

describe('fetchGroup function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a specific group and return a success response', async () => {
    const req = {
      params: {
        id: 'groupId123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const queryResults = {
      _id: 'groupId123',
      name: 'Test Group',
      members: ['user1@example.com', 'user2@example.com'],
    };
    require('../../Models/groupModel').findById.mockResolvedValue(queryResults);

    await fetchGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ group: queryResults });
  });

  it('should handle an error while fetching the group and return a 500 response', async () => {
    const req = {
      params: {
        id: 'invalidGroupId',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const error = new Error('Error fetching group');
    require('../../Models/groupModel').findById.mockRejectedValue(error);

    await fetchGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      errorStatus: 500,
      errorMessage: 'Internal server error',
      cause: 'Error while fetching user groups',
    });
  });
});