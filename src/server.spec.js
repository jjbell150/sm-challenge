const axios = require('axios');

describe('Issue API', () => {
    const baseUrl = 'http://localhost:3000';

    // GET /issues/:id
    describe('GET /issues/:id', () => {
        it('should return the issue with the specified id', async () => {
            const response = await axios.get(`${baseUrl}/issues/1`);
            expect(response.status).toBe(200);
            expect(response.data).toEqual({
                id: 1,
                title: 'Issue 1',
                description: 'This is issue 1'
            });
        });

        it('should return 404 when the issue with the specified id does not exist', async () => {
            try {
                await axios.get(`${baseUrl}/issues/999`);
            } catch (error) {
                expect(error.response.status).toBe(404);
                expect(error.response.data).toEqual({ message: 'Issue not found' });
            }
        });
    });

    // POST /issues
    describe('POST /issues', () => {
        it('should create a new issue and return it', async () => {
            const newIssue = {
                title: 'New Issue',
                description: 'This is a new issue'
            };

            const response = await axios.post(`${baseUrl}/issues`, newIssue);
            expect(response.status).toBe(201);
            expect(response.data).toEqual({
                id: 3,
                title: 'New Issue',
                description: 'This is a new issue'
            });
        });
    });

    // PUT /issues/:id
    describe('PUT /issues/:id', () => {
        it('should update the issue with the specified id and return it', async () => {
            const updatedIssue = {
                title: 'Updated Issue',
                description: 'This is the updated issue'
            };

            const response = await axios.put(`${baseUrl}/issues/1`, updatedIssue);
            expect(response.status).toBe(200);
            expect(response.data).toEqual({
                id: 1,
                title: 'Updated Issue',
                description: 'This is the updated issue'
            });
        });

        it('should return 404 when the issue with the specified id does not exist', async () => {
            try {
                await axios.put(`${baseUrl}/issues/999`, { title: 'Update Title' });
            } catch (error) {
                expect(error.response.status).toBe(404);
                expect(error.response.data).toEqual({ message: 'Issue not found' });
            }
        });
    });

    // DELETE /issues/:id
    describe('DELETE /issues/:id', () => {
        it('should delete the issue with the specified id', async () => {
            const response = await axios.delete(`${baseUrl}/issues/2`);
            expect(response.status).toBe(204);
        });

        it('should return 404 when the issue with the specified id does not exist', async () => {
            try {
                await axios.delete(`${baseUrl}/issues/999`);
            } catch (error) {
                expect(error.response.status).toBe(404);
                expect(error.response.data).toEqual({ message: 'Issue not found' });
            }
        });
    });
});