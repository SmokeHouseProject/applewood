export default
{
    authApi: {
        baseUrl: 'http://0.0.0.0:8050/',
        tokenPrefix: 'Applewood',
        tokenName: 'token',
        signupUrl: '',
        loginOnSignup: false,
        loginUrl: 'auth/',
        tokenName: 'token',
        loginRedirect: '#/home',
        loginRoute: '#/',
        logoutRedirect: '#/'
    },
    languages: [
        'en',
        'fr'
    ],
    webApi: {
        baseUrl: 'http://0.0.0.0:8050/api/'
    },
    defaultFormats: {
        date: 'MMM DD YYYY',
        number: '$0,0.00'
    }

};
