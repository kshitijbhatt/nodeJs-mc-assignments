/*
Request Handlers 
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
// Define the handlers
const handlers = {};

// Define ping handler
handlers.ping = function (data, callback) {
  // Callback a http status code, and a payload object
  callback(200);
};

handlers.hello = function (data, callback) {
  // Callback a http status code, and a payload object
  callback(200,{
    'name' : 'Hello world handler',
    'message' : 'Welcome to nodeJs master class'
  });
};

handlers.users = function(data, callback){
    //List of acceptable methods
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback);
    } else {
        callback(405);
    }

};

// Container for user handlers
handlers._users = {};

// Users - post
// Required Data: First Name, Last Name, Phone, Password, tosAgreement
// Optional Data: None
handlers._users.post = function(data, callback){

    // Check if all required fields are filled out
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phoneNumber = typeof(data.payload.phoneNumber) == 'string' && data.payload.phoneNumber.trim().length == 10 ? data.payload.phoneNumber.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if(firstName && lastName && phoneNumber && password && tosAgreement){
      //Make sure user does not already exists
      _data.read('users',phoneNumber,function(err,data){
        if(err){
          //Hash the password
          const hashedPassword = helpers.hash(password);

          //Create the user object
          if(hashedPassword){
          const userObject = {
            'fistName' : firstName,
            'lastName' : lastName,
            'phoneNumber' : phoneNumber,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true

          };

          //Store the user 
          _data.create('users',phoneNumber,userObject,function(err){
            if(!err){
              callback(200);
            }else{
              callback(500,{'Error' : 'Could not create the new user'})
            }
          });
        } else {
          // User already exists
              callback(400,{'Error' : 'A user with the same phone number already exists'});       
        }

      }else{
        callback(500,{'Error' : 'Could not hash the user\'s password'});
      }
      });
    }else {
      callback(400,{'Error' : 'Missing required fields'});
    }
};

// Users - get
handlers._users.get = function(data, callback){

};


// Users - put
handlers._users.put = function(data, callback){

};


// Users - delete
handlers._users.delete = function(data, callback){

};

// Define not found handler
handlers.notFound = function(data, callback){
  callback(404);
};
