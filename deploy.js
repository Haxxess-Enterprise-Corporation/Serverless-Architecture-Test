const { exec } = require('child_process');

// Function to execute CLI command and retrieve output
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

// Get AWS access key and secret from ~/.aws/credentials file
async function getAWSCredentials() {
    try {
        const accessKeyId = await executeCommand('aws configure get aws_access_key_id');
        const secretAccessKey = await executeCommand('aws configure get aws_secret_access_key');
        return { accessKeyId, secretAccessKey };
    } catch (error) {
        console.error('Error retrieving AWS credentials:', error);
        throw error;
    }
}

// Get AWS account ID from AWS credentials
async function getAWSAccountId() {
    try {
        const accountId = await executeCommand('aws sts get-caller-identity --query "Account"');
        return accountId;
    } catch (error) {
        console.error('Error retrieving AWS account ID:', error);
        throw error;
    }
}

// Deploy serverless application using Serverless Framework
async function deployServerlessApplication() {
    try {
        const { accessKeyId, secretAccessKey } = await getAWSCredentials();
        const accountId = await getAWSAccountId();
        console.log('Deploying serverless application...');
        // Replace 'YOUR_SERVERLESS_COMMAND' with the actual Serverless Framework command
        // Example: 'sls deploy --aws-profile default'
        const command = `YOUR_SERVERLESS_COMMAND --aws-profile default`;
        const output = await executeCommand(command);
        console.log('Serverless deployment successful:', output);
    } catch (error) {
        console.error('Error deploying serverless application:', error);
    }
}

// Execute serverless deployment
deployServerlessApplication();
