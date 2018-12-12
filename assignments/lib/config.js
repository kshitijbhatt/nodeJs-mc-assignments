/*
*
Create and export configration variables
*
*/


// Container for all the enviornments 
const enviornments = {};


// Create Stagin (default) evniornment
enviornments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret'
};


// Production enviornment
enviornments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production',
    'hashingSecret' : 'thisIsASecret'

};


// Determine which enviornment was passed as a command-line argument 
const currentEnviornment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if current enviornment is one of the enviornments above, if not, default to stagin
const enviornmentToExport = typeof(enviornments[currentEnviornment]) == 'object' ? enviornments[currentEnviornment] : enviornments.staging;

// Export the module
module.exports = enviornmentToExport;