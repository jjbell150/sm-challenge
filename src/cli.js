const readline = require('readline');
const { createIssue, readIssue, updateIssue, deleteIssue } = require('./client');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function promptForAction() {
    rl.question('Enter an action (create, read, update, delete): ', async (action) => {
        switch (action) {
            case 'create':
                await promptForCreate();
                break;
            case 'read':
                await promptForRead();
                break;
            case 'update':
                await promptForUpdate();
                break;
            case 'delete':
                await promptForDelete();
                break;
            default:
                console.log('Invalid action. Please try again.');
                break;
        }
        promptForAction();
    });
}

async function promptForCreate() {
    const title = await promptInput('Enter issue title: ');
    const description = await promptInput('Enter issue description: ');
    await createIssue({ title, description });
}

async function promptForRead() {
    const id = await promptInput('Enter issue ID: ');
    try {
        const issue = await readIssue(id);
        if (!issue) {
            console.log('Issue does not exist.');
        } else {
            console.log(issue);
        }
    } catch (error) {
        console.log('Failed to fetch issue.', error.message);
    }
}

async function promptForUpdate() {
    const id = await promptInput('Enter issue ID: ');
    try {
        const title = await promptInput('Enter new issue title (leave blank to skip): ');
        const description = await promptInput('Enter new issue description (leave blank to skip): ');
        const updates = {};
        if (title) {
            updates.title = title;
        }
        if (description) {
            updates.description = description;
        }
        const response = await updateIssue(id, updates);
        if (!response) {
            console.log('Issue does not exist.');
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log('Failed to update issue.', error.message);
    }
}

async function promptForDelete() {
    const id = await promptInput('Enter issue ID: ');
    try {
        const isDeleted = await deleteIssue(id);
        if (!isDeleted) {
            console.log('Issue does not exist.');
        } else {
            console.log(`Deleted issue with ID ${id}.`);
        }
    } catch (error) {
        console.log('Failed to delete issue.', error.message);
    }
}

function promptInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (input) => {
            resolve(input);
        });
    });
}

promptForAction();