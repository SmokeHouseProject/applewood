module.exports = {
    networkError: {code: 5000, message: 'error.network-problem'},
    duplicateUser: {code: 5001, message: 'error.duplicate-user'},
    unknownUser: {code: 5002, message: 'error.bad-user'},
    wrongPassword: {code: 5003, message: 'error.bad-password'},
    missingAuthHeader: {code: 5004, message: 'error.missing-auth-header'},
    tokenExpired: {code: 5005, message: 'error.token-expired'}
}