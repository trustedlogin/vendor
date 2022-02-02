require('dotenv').config()

//Setup env variables
//See: https://docs.cypress.io/guides/guides/environment-variables#Option-5-Plugins
module.exports = (on, config) => {
//Copy each of these system env variables set with Github secrets or .env file.
[
    'NGROK_AUTH_TOKEN',
    'NGROK_URL',
    'NGROK_USERS',
    'NGROK_WP_URL',
    'CLIENT_WP_URL',
    'CLIENT_WP_USER',
    'CLIENT_WP_PASSWORD',
    'TL_VENDOR_ENCRYTPTION_KEY'
].forEach(key => {
    //To Cypress env.
    //if set
    if(!process.env[key]){
        //else throw error, environment variables are documented in README.md
        throw new Error(`Missing env variable: ${key}`)
    }
    config.env[key] = process.env[key]
})
// do not forget to return the changed config object!
return config
}
