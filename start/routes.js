'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get("/", "NameController.index");

Route.group(() => {
    Route.get("/", "NameController.index");
    Route.get("/white_list", "NameController.getWhiteList");
    Route.get("/black_list", "NameController.getWhiteList");
    Route.post("create", "NameController.create");
    Route.post(":id/update", "NameController.update");
    Route.post(":id/delete", "NameController.delete");
    Route.post("upload", "NameController.update");
}).prefix("api/v1/name");
