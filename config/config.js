module.exports = 
{
    authApi: {
        baseUrl: 'http://192.168.1.11:8050',
        tokenPrefix: 'Applewood',
        tokenName: 'token',
        signupUrl: '',
        loginOnSignup: false,
        loginUrl: 'auth',
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
        baseUrl: 'http://192.168.1.11:8050/api/'
    },
    defaultFormats : {
        date: 'MMM DD YYYY',
        number: '$0,0.00'
    }


}
