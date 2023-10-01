const axios = require('axios');

async function createIssue(issue) {
    try {
        const response = await axios.post('http://localhost:3000/issues', issue);
        console.log(response.data);
    } catch (error) {
        console.error('Failed to create issue:', error.message);
    }
}

async function readIssue(id) {
    try {
        const response = await axios.get(`http://localhost:3000/issues/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error('Failed to read issue:', error.message);
    }
}

async function updateIssue(id, issue) {
    try {
        const response = await axios.put(`http://localhost:3000/issues/${id}`, issue);
        console.log(response.data);
    } catch (error) {
        console.error('Failed to update issue:', error.message);
    }
}

async function deleteIssue(id) {
    try {
        const response = await axios.delete(`http://localhost:3000/issues/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error('Failed to delete issue:', error.message);
    }
}

module.exports = {
    createIssue,
    readIssue,
    updateIssue,
    deleteIssue
};