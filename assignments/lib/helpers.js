/*
Helpers for various tasks
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config');



// Container for all the helpers

const helpers = {};

// Create a SHA256 hash
helpers.hash = function(str){

    if(typeof(str) == 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Parse a json string to an object in all cases without throwing error 
helpers.parseJsonToObject = function(err){
    try{
        const obj = JSON.parse(str);
        return obj;
    }catch(e){
        return{}
    }
}


// Export helpers
module.exports = helpers;