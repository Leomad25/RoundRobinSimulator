const { spawn } = require('child_process');

const child = spawn('TASKLIST', ['/V', '/fi', 'STATUS eq  running']);
var listProcess;

child.stdout.on('data', (data) => {
    listProcess += data;
});

child.on('error', (error) => console.log(`error: ${error.message}`));

child.on('exit', (code, signal) => {
    if(code) console.log(`process exit whit code: ${code}`);
    if(signal) console.log(`process killed whit signal: ${signal}`);
    console.log(`Done...`);
});

function getListProcess() {
    return listProcess;
}

module.exports.getListProcess = getListProcess;