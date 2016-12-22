var frisby = require('../node_modules/frisby/lib/frisby');

var baseURL = process.env.baseURL;
var post_header = { headers: { 'Content-Type': 'application/json' }};
var newUser = {"email":"test_email@email.com",
               "password":"asdf1234",
               "name":"test_user", 
               "role":2};

var updatedUser = {"email":"update_email@email.com",
                   "password":"1234asdf",
                   "name":"updated_user", 
                   "role":1};               

describe('User api test suite', function() {

 
  /**----------------------------------------------------------------*/
  /**-----------------User not found---------------------------------*/
  frisby.create('User with ID 999999999 not found')
        .get(baseURL + 'user?id=999999999')
        .expectStatus(200)
        .afterJSON(function (response) {
       	  	expect(response.body.method).toBe('user');
       	  	expect(response.body.success).toBe(false);
       	  	expect(response.body.error_message).toBe('User not found.');       		
  	    })
  	       
        .toss()

  /**----------------------------------------------------------------*/
  /**-----------------Get All Users----------------------------------*/
  frisby.create('Get all users')
        .get(baseURL + 'users')
        .expectStatus(200)
        .expectHeader('Content-Type', 'text/html; charset=utf-8')          
        .afterJSON(function (response) {          
            expect(response.body.method).toBe('users');
            expect(response.body.success).toBe(true);          
            expect(response.errors).toBe(false);
            expect(response.body.users).toBeDefined();
        })     
        .toss()


  /**----------------------------------------------------------------*/
  /**-----------------Create User fail -------------------------------*/
  frisby.create('Creation will fail.')
        .post(baseURL + 'createuser',
         { },
         { json: true },
         post_header)
        .expectStatus(200)
        .afterJSON(function (response) {          
            expect(response.body.method).toBe('createuser');
            expect(response.body.success).toBe(false);
            expect(response.body.error_message).toBe('Email is required.');           
        })
        .toss()      



  /**----------------------------------------------------------------*/
  /**-----------------Create User success -------------------------------*/
  frisby.create('Creation will success.')
        .post(baseURL + 'createuser',
         newUser,
         { json: true },
         post_header)
        .expectStatus(200)
        .expectJSONTypes(
          {
            "status": Number,
            "body":{
                "method": String,
                "success": Boolean,
                "user":{
                "id":Number,
                  "email":String,
                  "password":String,
                  "name":String,
                  "last_login":null,
                  "gateway_customer_id":null              
                },
                "error_message": String,
                "error_code": Number
            },
            "errors": Boolean
          })      
        .afterJSON(function (response) {          
            expect(response.body.method).toBe('createuser');
            expect(response.body.success).toBe(true); 
            var USER_ID = response.body.user.id.toString();
            /**--checking creation --*/
            frisby.create('Checking user created exist.')
                .get(baseURL + 'user?id=' + USER_ID)        
                .expectStatus(200)      
                .afterJSON(function (response) {          
                    expect(response.body.method).toBe('user');
                    expect(response.body.success).toBe(true); 
                    expect(response.body.user.id).toBe(response.body.user.id);
                    expect(response.body.user.email).toBe(newUser.email);                    
                    expect(response.body.user.name).toBe(newUser.name);                                     
                    expect(response.body.user.role).toBe(newUser.role);
                })
                .toss()                 
            /**--delete user created --*/
            frisby.create('removing user created.')
                  .get(baseURL + 'deleteuser?id=' + USER_ID)        
                  .expectStatus(200)      
                  .afterJSON(function (response) {          
                      expect(response.body.method).toBe('deleteuser');
                      expect(response.body.success).toBe(true);                    
                      expect(response.body.user.id).toBe(USER_ID);
        })
        .toss()      
      })
      .toss() 


  /**----------------------------------------------------------------*/
  /**-----------------Update User fail, ID required-------------------------------*/
  frisby.create('Update user without required id.')
        .post(baseURL + 'updateuser',
            { },
            { json: true },
            post_header)
        .expectStatus(200)
        .expectJSONTypes(
           {
            "status": Number,
            "body":{
              "method": String,
              "success": Boolean,
              "error_message": String,
              "error_code": Number
            },
            "errors": Boolean
        })
        .afterJSON(function (response) {        
          expect(response.body.method).toBe('updateuser');
          expect(response.body.success).toBe(false);
          expect(response.body.error_message).toBe('Id is required.');
          expect(response.body.user).toBe('');          
        })
        .toss()


  /**----------------------------------------------------------------*/
  /**-----------------Create User success -------------------------------*/
  frisby.create('Update user data will success.')
        .post(baseURL + 'createuser',
            newUser,
            { json: true },
            post_header)
        .expectStatus(200)      
        .afterJSON(function (response) {
            expect(response.body.method).toBe('createuser');
            expect(response.body.success).toBe(true); 
            /**--keep user.id created --*/                  
            var USER_ID = response.body.user.id.toString();
            updatedUser.id = USER_ID;
            /**--update created user --*/
            frisby.create('Updating user created.')
                  .post(baseURL + 'updateuser',
                      updatedUser,
                      { json: true },
                      { headers: { 'Content-Type': 'application/json' }})       
                  .expectStatus(200)                
                  .expectJSONTypes(
                      {
                        "status": Number,
                        "body":{
                        "method": String,
                        "success": Boolean,
                        "user":{
                            "id":Number,
                            "email":String,
                            "password":String,
                            "name":String,
                            "last_login":null,
                            "gateway_customer_id":null              
                        },
                        "error_message": String,
                        "error_code": Number
                      },
                      "errors": Boolean
                  })            
                  .afterJSON(function (response) {          
                      expect(response.body.method).toBe('updateuser');
                      expect(response.body.success).toBe(true); 
                      expect(response.body.user.id).toBe(response.body.user.id);
                      expect(response.body.user.email).toBe(updatedUser.email);                    
                      expect(response.body.user.name).toBe(updatedUser.name);                                     
                      expect(response.body.user.role).toBe(updatedUser.role);
                  })
                  .toss()                 
            /**--delete user created --*/
            frisby.create('removing user created.')
                  .get(baseURL + 'deleteuser?id=' + USER_ID)        
                  .expectStatus(200)      
                  .afterJSON(function (response) {          
                      expect(response.body.method).toBe('deleteuser');
                      expect(response.body.success).toBe(true);                    
                      expect(response.body.user.id).toBe(USER_ID);
                  })
                  .toss()      
            })
        .toss() 
});