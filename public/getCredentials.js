'use strict';
const fs = require('fs');

const getCredentials = () =>{
    let rawData = fs.readFileSync('../chatCredentials.json');
    let myIp = JSON.parse(rawData);
    console.log('[GC]',myIp);
    return myIp.IpRoute;
}

module.exports = {
    getCredentials
}

