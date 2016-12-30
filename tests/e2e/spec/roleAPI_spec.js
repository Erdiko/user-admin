var frisby = require('../node_modules/frisby/lib/frisby');

var baseURL = process.env.baseURL + '/ajax/users/roles/';


describe('Role api test suite', function() {

    beforeEach(function() {
    });

  /**----------------------------------------------------------------*/
  /**-----------------Role not found---------------------------------*/
  frisby.create('Role with ID 999999999 not found')
        .get(baseURL + 'role?id=999999999')
        .expectStatus(200)
        .afterJSON(function (response) {
       	  	expect(response.body.method).toMatch('role');
       		  expect(response.body.success).toMatch('false');
       		  expect(response.body.error_message).toMatch('Role not found.');       		
  	    })
  	       
        .toss()

  /**----------------------------------------------------------------*/
  /**-----------------Get all roles----------------------------------*/
  frisby.create('Get all roles')
        .get(baseURL + 'roles')
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json')
        .afterJSON(function (response) {          
            expect(response.body.method).toBe('roles');
            expect(response.body.success).toBe(true);          
            expect(response.errors).toBe(false);
            expect(response.body.roles).toBeDefined();
        })     
        .toss()
  });
