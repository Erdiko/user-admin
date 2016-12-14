var frisby = require('../node_modules/frisby/lib/frisby');

var baseURL = 'http://docker.local:8088/ajax/users/';

describe('Role api test suite', function() {
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
      .expectHeader('Content-Type', 'text/html; charset=utf-8')      
      .afterJSON(function (response) {          
          expect(response.body.method).toBe('roles');
          expect(response.body.success).toBe(true);          
          expect(response.errors).toBe(false);
          expect(response.body.roles).toBeDefined();
       })     
      .toss()
});
