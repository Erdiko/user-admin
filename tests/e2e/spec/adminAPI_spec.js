var frisby = require('../node_modules/frisby/lib/frisby');

var baseURL = process.env.baseURL + '/ajax/erdiko/users/admin/';
var authURL = process.env.baseURL + '/ajax/users/authentication/';

var post_header = { headers: { 'Content-Type': 'application/json' }};
var newUser = {"email":"test_email@email.com",
               "password":"asdf1234",
               "name":"test_user", 
               "role":2};

var updatedUser = {"email":"update_email@email.com",
                   "password":"1234asdf",
                   "name":"updated_user", 
                   "role":1};               

describe('Admin api test suite', function() {
    beforeEach(function() {

    });

    afterEach(function() {

    });

   /**----------------------------------------------------------------*/
  /**-----------------User not found---------------------------------*/
  frisby.create('User with ID 999999999 not found')
              .get(baseURL + 'retrieve?id=999999999')
              .expectStatus(200)
              .afterJSON(function (response) {
                  expect(response.body.method).toBe('retrieve');
                  expect(response.body.success).toBe(false);
                  expect(response.body.error_message).toBe('User not found.');
              })
              .toss()

  /**----------------------------------------------------------------*/
  /**-----------------Get All Admins----------------------------------*/
  frisby.create('Get all admins')
      .get(baseURL + 'list')
      .expectStatus(200)
      .expectHeader('Content-Type', 'application/json')
      .afterJSON(function (response) {
         expect(response.body.method).toBe('list');
         expect(response.body.success).toBe(true);
         expect(response.errors).toBe(false);
         expect(response.body.users).toBeDefined();
      })
      .toss()

  /**----------------------------------------------------------------*/
  /**-----------------Create User fail -------------------------------*/
  frisby.create('Creation will fail.')
      .post(baseURL + 'create',
          { },
          { json: true },
          post_header)
      .expectStatus(200)
      .afterJSON(function (response) {
          expect(response.body.method).toBe('create');
          expect(response.body.success).toBe(false);
          expect(response.body.error_message).toBe('Email is required.');
      })
      .toss()


  /**----------------------------------------------------------------*/
  /**-----------------Create Admin success --------------------------*/
  frisby.create('Creation will success.')
      .post(baseURL + 'create',
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
          expect(response.body.method).toBe('create');
          expect(response.body.success).toBe(true);
          var USER_ID = response.body.user.id.toString();
          /**--checking creation --*/
          frisby.create('Checking user created exist.')
              .get(baseURL + 'retrieve?id=' + USER_ID)
              .expectStatus(200)
              .afterJSON(function (response) {
                 expect(response.body.method).toBe('retrieve');
                 expect(response.body.success).toBe(true);
                 expect(response.body.user.id).toBe(response.body.user.id);
                 expect(response.body.user.email).toBe(newUser.email);
                 expect(response.body.user.name).toBe(newUser.name);
                 expect(response.body.user.role.id).toBe(newUser.role);
              })
              .toss()
          /**--delete user created --*/
          frisby.create('removing user created.')
              .get(baseURL + 'delete?id=' + USER_ID)
              .expectStatus(200)
              .afterJSON(function (response) {
                  expect(response.body.method).toBe('delete');
                  expect(response.body.success).toBe(true);
                  expect(response.body.user.id).toBe(USER_ID);
              })
              .toss()
      })
      .toss()

    /**----------------------------------------------------------------*/
    /**-----------------Update user fail, ID required------------------*/
    frisby.create('Update user without required id.')
        .post(baseURL + 'update',
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
            expect(response.body.method).toBe('update');
            expect(response.body.success).toBe(false);
            expect(response.body.error_message).toBe('Id is required.');
            expect(response.body.user).toBe('');
        })
        .toss()

    /**----------------------------------------------------------------*/
    /**-----------------Create user success ---------------------------*/
    frisby.create('Update user data will success.')
        .post(baseURL + 'create',
            newUser,
            { json: true },
            post_header)
        .expectStatus(200)
        .afterJSON(function (response) {
            expect(response.body.method).toBe('create');
            expect(response.body.success).toBe(true);
            /**--keep user.id created --*/
            var USER_ID = response.body.user.id.toString();
            updatedUser.id = USER_ID;
            /**--update created user --*/
            frisby.create('Updating user created.')
                .post(baseURL + 'update',
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
                    expect(response.body.method).toBe('update');
                    expect(response.body.success).toBe(true);
                    expect(response.body.user.id).toBe(response.body.user.id);
                    expect(response.body.user.email).toBe(updatedUser.email);
                    expect(response.body.user.name).toBe(updatedUser.name);
                    expect(response.body.user.role.id).toBe(updatedUser.role);
                })
                .toss()
            /**--delete user created --*/
            frisby.create('removing user created.')
                .get(baseURL + 'delete?id=' + USER_ID)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('delete');
                    expect(response.body.success).toBe(true);
                    expect(response.body.user.id).toBe(USER_ID);
                })
                .toss()
        })
        .toss()

    /**----------------------------------------------------------------*/
    /**--------Get All Admins using pagination passing:
     *         'page=0',
     *         'sort=id' and
     *         'pagesize=1' -------------------------------------------*/
    /**----------------------------------------------------------------*/

    frisby.create('Create user data to get something to paginate.')
        .post(baseURL + 'create',
            newUser,
            { json: true },
            post_header)
        .expectStatus(200)
        .afterJSON(function (response) {
            expect(response.body.method).toBe('create');
            expect(response.body.success).toBe(true);
            /**--keep user.id created --*/
            var USER_ID = response.body.user.id.toString();

            /**--then, get first page with the only one user --*/
            frisby.create('Get all users')
                .get(baseURL + 'list?page=0&pagesize=1&sort=id')
                .expectStatus(200)
                .expectHeader('Content-Type','application/json')
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('list');
                    expect(response.body.success).toBe(true);
                    expect(response.errors).toBe(false);
                    expect(response.body.users).toBeDefined();
                })
                .toss();
            /**--delete user created --*/
            frisby.create('removing user created.')
                .get(baseURL + 'delete?id=' + USER_ID)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('delete');
                    expect(response.body.success).toBe(true);
                    expect(response.body.user.id).toBe(USER_ID);
                })
                .toss()
        })
        .toss()

    /**-----------------------------------------------------------------------------*/
    /**---Get All users using pagination passing 'sort' not allowed-----------------*/
    /**---'sort' allowed are attributes: id, email, name, created_at and updated_at-*/
    /**-----------------------------------------------------------------------------*/
    frisby.create('Create admin data to get something to paginate.')
        .post(baseURL + 'create',
            newUser,
            { json: true },
            post_header)
        .expectStatus(200)
        .afterJSON(function (response) {
            expect(response.body.method).toBe('create');
            expect(response.body.success).toBe(true);
            /**--keep user.id created --*/
            var USER_ID = response.body.user.id.toString();

            /**--then, get first page passing erroneus sort attribute --*/
            frisby.create('Get all users')
                .get(baseURL + 'list?page=0&pagesize=1&sort=method_sort')
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('list');
                    expect(response.body.success).toBe(false);
                    expect(response.body.users).toBe('');
                    expect(response.body.error_message).toBe('The attribute used to sort is invalid.');
                })
                .toss();
            /**--delete user created --*/
            frisby.create('removing users created.')
                .get(baseURL + 'delete?id=' + USER_ID)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('delete');
                    expect(response.body.success).toBe(true);
                    expect(response.body.user.id).toBe(USER_ID);
                })
                .toss()
        })
        .toss()
});