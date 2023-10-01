const express = require('express');
const app = express();

app.use(express.json());

let issues = [
    { id: 1, title: 'Issue 1', description: 'This is issue 1' },
    { id: 2, title: 'Issue 2', description: 'This is issue 2' }
];

app.get('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issues.find(issue => issue.id === id);

    if (issue) {
        res.status(200).json(issue);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
});

app.post('/issues', (req, res) => {
    const id = issues.length + 1;
    const issue = { id: id, title: req.body.title, description: req.body.description };
    issues.push(issue);

    res.status(201).json(issue);
});

app.put('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issueIndex = issues.findIndex(issue => issue.id === id);

    if (issueIndex !== -1) {
        issues[issueIndex].title = req.body.title;
        issues[issueIndex].description = req.body.description;

        res.status(200).json(issues[issueIndex]);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
});

app.delete('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issueIndex = issues.findIndex(issue => issue.id === id);

    if (issueIndex !== -1) {
        issues.splice(issueIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});