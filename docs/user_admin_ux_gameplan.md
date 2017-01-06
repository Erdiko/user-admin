# User Admin UX Gameplan

## Goals & Milestones

#### Create an Angular 2 Workflow & Build Process with Angular CLI

Create a development worfklow and build process with the (latest) version of Angular CLI. The latest version of this tool allows for easy creation of boilerplate Angular code along with the associated tests. 

Updating some key configs from the base package will allow us to control the build process and still provide us with some real time feedback while developing.

###### Key Configurations to ease development

In the past, developing with Angular CLI required us to jump through certain hoops and add extra steps to fit this into our development workflow. The latest version of Angular CLI allows us to configure some things that make local development much easier.

###### Update the API Proxy to Point to local development

Create a development config file to allow the application to proxy all API calls to the local server. This will allow us to develop local URLs in place of the production or staging URLs while using the 'development' server. 

A small update the the `package.json` file will allow this to affect changes in the development and testing workflows.

More information can be found here: https://github.com/angular/angular-cli#proxy-to-backend

###### Update the destination for the production build

We will also need to edit the destination for the production assets after the build step. Simply editing the `angular-cli.json` file's entry for `outDir` will allow us to set the Erdiko Theme path from which the assets will be served.

#### New Erdiko Theme

Create a new theme to provide structure from which to bootstrap an Angular 2 Application for the User Admin. This theme will be minimal but will include the required JS & CSS assets to bootstrap the Angular application.

This theme will require some additional routes to use the already built user authentication, as well as a route to host the User Admin SPA.

 * Estimate: 1h
    
#### Angular 2 SPA

Admin only, no front / end user facing routes yet. Use Angular2 CLI to create base app. 
#### Angular Routes & Components
  
##### User List - `/users/`

Display a sortable table showing a list of users, based on the provided filters. 

Route will require a 'default' user list resolved following a successful request to the `Get Users` AJAX endpoint.

* Route
* Users Component
  * Hosts the child components listed below
  * Button to Create a New User
    * Link to User Create route
* Users List Component
  * Sortable Table showing a row for each user record
  * Link to Edit User Record
  * Link to Delete a User Record
  * Search Input box
  * Pagination links
* Estimate: 13h 


![Users List Wireframe](https://raw.githubusercontent.com/Erdiko/user-admin/master/docs/users_list.png)

        
##### User Create / Edit / Delete - `/user/:id`

Editable form interface to edit an existing user for a provided ID or create a new one if lacking a user ID.

* Route
* User Edit Form Component
  * Form with validation feedback
  * Must provide validation of user input and handle error messages on failure
* Estimate: 8h 
      
![Users List Wireframe](https://raw.githubusercontent.com/Erdiko/user-admin/master/docs/user_crud.png)      
 
#### Angular Service - User Service
  
###### `getUsers`

  * Get ALL existing users based on a provided sorting param
    * `sort`
      * 'id'
      * 'created'
      * 'name'
    * `direction`
      * 'desc'
      * 'asc'
    * `page`
      * starting page for list
    * `size`
      * size of return results
  * Default get list of users sorted by ID descending
    * Estimate: 2h
    
###### `getUser`

  * Get an existing user by valid ID
    * Estimate: 2h
    
###### `createUser`

  * Create a new user with provided data 
    * Estimate: 5h
    
###### `updateUser`

  * Edit / Update an existing user for a provided ID
    * Estimate: 5h
    
##### `deleteUser`

  * Delete an existing user 
    * Estimate: 1h

      
##### Unit Testing - KarmaJS

Unit testing will be performed by Karma JS. Most of the boilerplate tests will be created via Angular CLI.  

Tests can easily be run via Angular CLI.

##### Functional Testing - ProtractorJS
  
Functional testing will be provided by ProtractorJS. Most of the boilerplate tests will be created via Angular CLI.  

Updating the API proxy config setting will allow us to point the API endpoints to a local or staging env bassed on the env under test.

Tests can easily be run via Angular CLI.
  
##### AJAX Testing - frisby.js

Create AJAX Testing suite with frisby.js. These can be run via NPM run script that we will add to the package.json file.

## AJAX Endpoints

Below is the minimum required list of AJAX endpoints for the User Admin application.

### Updates to Erdiko Core

We will need to update the Erdiko Core AJAX controller for the following items:

* Ensure the headers returned for a request return "application/json" for the response type
* Update the response to mimic the example responses
  * Get rid of the `results` key
  * Stop returing the HTTP code as a string, only return in the header
  * Only return an `errors` key if the `success` flag is FALSE

### Get Users

Return a list of active users found in the DB

* Entities 
  * User
* Method
  * GET 
* URL
  * /ajax/eridko/useradmin/list/ 
* Params
    * `sort` (String)
      * 'id'
      * 'name'
      * 'created'
    * `direction` (String)
      * 'desc'
      * 'asc'
    * `page` (Int)
    * `size` (String)
* Example Response

```
{
    "method": “list",
    "success": true,
    “users": [
        {
            "id": 42,
            "first_name": “John”,
            "last_name": "Smith",
            "email": "foo@example.com",
            ...
            "active": true
        },
        ... 
    ],
    "total": 30,
    "page": 1
}
```

### Search

TODO - Add this definition

### Get User 

Returns a JSON representation of a valid User for a provided ID 

* Entities
  * User 
* Method
  * GET 
* URL
  * /ajax/eridko/useradmin/get/ 
* Params
  * ID (Int) 
* Example Response

```
{
    "method": “get",
    "success": true,
    “user": {
        "id": 42,
        "first_name": “John”,
        "last_name": "Smith",
        "email": "foo@example.com",
        ...
        "active": true
    } 
}
```

## Create User 

Create a User record with the provided values 

* Entities
  * User 
* Method
  * POST 
* URL
  * /ajax/eridko/useradmin/create/
* Params
  * Name (String)
  * ...
  * Active (Boolean)
* Example Response

```
{
    "method": “create",
    "success": true,
    “user": {
        "id": 42,
        "first_name": “John”,
        "last_name": "Smith",
        "email": "foo@example.com",
        ...
        "active": true
    } 
}
```

### Update User

Update a User record for a provided ID with the provided value 

* Entities
  * User 
* Method
  * GET 
* URL
  * /ajax/eridko/useradmin/update/ 
* Params
  * Name (String) 
  * ...
  * Active (Boolean) 
* Example Response

```
{
    "method": "update",
    "success": true,
    “user”: {
        "id": 43,
        "first_name": “John”,
        "last_name": "Smith",
        "email": "foo@example.com",
        ...
        "active": true
    } 
}
```

### Delete User

Update a User record for a provided ID with the provided value 

* Entities
  * User 
* Method
  * POST 
* URL
  * /ajax/eridko/useradmin/delete/ 
* Params
  * ID (Int) 
* Example Response

```
{
    "method": “delete",
    "success": true,
    “user”: {
        "id": 42 
    }
}
```
