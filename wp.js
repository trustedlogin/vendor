#!/usr/bin/env node

//Load environment variables
require('dotenv').config();

const shell = require('shelljs');

//console.log(process.env) // remove this after you've confirmed it working

const {NGROK_WP_URL,NGROK_USERS} = process.env;


const log = ( ...args ) => {
   // shell.echo(...args);
    console.log(...args);
}

const exitSuccess = () => {
    log('All done!');
    //barrel roll
    shell.exit(0);
}


const exitError = () => {
    log('Exitting With Error!');
    shell.exit(1);
}


/**
 * Run a WP CLI command in Docker containr
 */
const wp = (command) => {
    command = `docker-compose run wpcli wp ${command}`
    return new Promise( async (resolve, reject) => {
        if (shell.exec(command).code !== 0) {
            reject();
        }else{
            resolve();
        }
    });
}

/**
 * Install WordPress for the WordPress site.
 */
const install = async ({url,title}) => {
    log('Installing WordPress');
    //This user is intentionally fake
    await wp(`core install --url=${url} --title="${title}" --admin_user=admin0 --admin_email=something@example.com`);
}

/**
 * Create an admin user
 */
const createAdminUser = async ({username,email,password}) =>{
    log('Creating admin user');
    await wp(`user create ${username} ${email} --role=administrator --user_pass=${password}`)
        .catch( ()=> {
            log('Admin user already exists');
            log('This is OK');

        })
}

//Reset the WordPress Database
const resetWordPress = async () => {

    log('Resetting WordPress');
    await wp('db reset --yes');
}

//Create all users in the NGROK_USERS env var
const createUsers = async () => {
    await JSON.parse(NGROK_USERS).forEach( async (user) => {
        await createAdminUser(user);
    });
}

if( 3 === process.argv.length ){
    switch(process.argv[2]){
        case '--reset':
            resetWordPress()
                .then(exitSuccess).catch(exitError);
        break;
        default:
            break;
    }
    exitSuccess();
}else{
    install({url: NGROK_WP_URL, title: 'Trusted Login Vendor Test'})
    .then( createUsers)
    .then( () => {
        log('Done')
        //log(`Username`)
    })

}
