const axios = require('axios');

// Create test
describe('POST /issues', () => {
  it('should create a new issue', async () => {
    const issue = {
      title: 'Bug',
      description: 'This is a bug.',
    };
    const response = await axios.post('http://localhost:3000/issues', issue);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(expect.objectContaining(issue));
  });
});

// Read test
describe('GET /issues', () => {
  it('should get all issues', async () => {
    const response = await axios.get('http://localhost:3000/issues');
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.arrayContaining([]));
  });
});

// Update test
describe('PUT /issues/:id', () => {
  it('should update an existing issue', async () => {
    const updatedIssue = {
      title: 'Bug',
      description: 'This is an updated bug.',
    };
    const response = await axios.put('http://localhost:3000/issues/1', updatedIssue);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.objectContaining(updatedIssue));
  });
});

// Delete test
describe('DELETE /issues/:id', () => {
  it('should delete an issue by ID', async () => {
    const response = await axios.delete('http://localhost:3000/issues/1');
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.stringContaining('Deleted issue'));
  });
});