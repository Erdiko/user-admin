var frisby = require('../node_modules/frisby/lib/frisby');

var baseURL = process.env.baseURL + '/ajax/users/authentication/';
var userURL = process.env.baseURL + '/ajax/erdiko/users/';

var post_header = { headers: { 'Content-Type': 'application/json' }};

var newUser = {"email":"test_email@email.com",
    "password":"asdf1234",
    "name":"test_user",
    "role":2};


describe('Authentication api test suite', function() {

  beforeEach(function() {
  });



  /**-----------------------------------------------------------*/
  /**-----------------Login test -------------------------------*/
  frisby.create('Login.')
      .post(userURL + 'register',
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
          expect(response.body.method).toBe('register');
          expect(response.body.success).toBe(true);
          var USER_ID = response.body.user.id.toString();
          var USER_EMAIL = newUser.email;
          var USER_PASS = newUser.password;
          /**--checking login --*/
          frisby.create('Login  user')
                .post(baseURL + 'login',
                    {"email":USER_EMAIL, "password":USER_PASS},
                    { json: true },
                    post_header)
                .expectStatus(200)
                .afterJSON(function (response) {
                  expect(response.body.method).toBe('login');
                  expect(response.body.success).toBe(true);
                  expect(response.body.error_message).toBe("");
                })
              .toss()
          /**--delete user created --*/
          frisby.create('removing user created.')
              .get(userURL + 'cancel?id=' + USER_ID)
              .expectStatus(200)
              .afterJSON(function (response) {
                  expect(response.body.method).toBe('cancel');
                  expect(response.body.success).toBe(true);
                  expect(response.body.user.id).toBe(USER_ID);
              })
              .toss()
      })
      .toss()



    /**------------------------------------------------------------*/
    /**-----------------Logout test -------------------------------*/
    frisby.create('Logout.')
        .get(baseURL + 'logout')
        .expectStatus(200)
        .afterJSON(function (response) {
            expect(response.body.method).toBe('logout');
            expect(response.body.success).toBe(true);
        })
        .toss()


    /**------------------------------------------------------------*/
    /**-----------------Change password test ----------------------*/
    frisby.create('Login.')
        .post(userURL + 'register',
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
            expect(response.body.method).toBe('register');
            expect(response.body.success).toBe(true);
            var USER_ID = response.body.user.id.toString();
            var USER_EMAIL = newUser.email;
            var USER_PASS = newUser.password;
            /**--checking login --*/
            frisby.create('change pass')
                .post(baseURL + 'changepass',
                    {"email":USER_EMAIL, "currentpass":USER_PASS, "newpass":USER_PASS+'5'},
                    { json: true },
                    post_header)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('changepass');
                    expect(response.body.success).toBe(true);
                    expect(response.body.error_message).toBe("");
                })
                .toss()
            /**--delete user created --*/
            frisby.create('removing user created.')
                .get(userURL + 'cancel?id=' + USER_ID)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('cancel');
                    expect(response.body.success).toBe(true);
                    expect(response.body.user.id).toBe(USER_ID);
                })
                .toss()
        })
        .toss()


    /**---------------------------------------------------------*/
    /**-----------------Forgot password test -------------------*/
    frisby.create('Login.')
        .post(userURL + 'register',
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
            expect(response.body.method).toBe('register');
            expect(response.body.success).toBe(true);
            var USER_ID = response.body.user.id.toString();
            var USER_EMAIL = newUser.email;
            var USER_PASS = newUser.password;
            /**--checking forgot --*/
            frisby.create('forgot pass')
                .post(baseURL + 'forgotpass',
                    {"email":USER_EMAIL},
                    { json: true },
                    post_header)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('forgotpass');
                    expect(response.body.success).toBe(true);
                    expect(response.body.error_message).toBe("");
                })
                .toss()
            /**--delete user created --*/
            frisby.create('removing user created.')
                .get(userURL + 'cancel?id=' + USER_ID)
                .expectStatus(200)
                .afterJSON(function (response) {
                    expect(response.body.method).toBe('cancel');
                    expect(response.body.success).toBe(true);
                    expect(response.body.user.id).toBe(USER_ID);
                })
                .toss()
        })
        .toss()
});
