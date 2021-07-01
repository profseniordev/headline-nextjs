require('dotenv').config();
const { exec } = require('child_process');

/**
 * Running this file will look at the variables starting with APP___ defined in the .env file. These
 * variables are then added to the current Zeit account that is logged in via Now.
 */

const appVars = Object.entries(process.env).filter(([key, value]) => key.match(/^APP__.*/));

let registerVarCommand = '';

appVars.forEach(([key, value]) => {
    registerVarCommand += `now secret add ${key} ${value}; `;
});

exec(registerVarCommand, (error, stdout, stderr) => {
    console.log(`Output: ${stdout}`);
});

