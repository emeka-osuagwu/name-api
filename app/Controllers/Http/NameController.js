'use strict'

/*
|--------------------------------------------------------------------------
| Packages Namespaces
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Services Namespaces
|--------------------------------------------------------------------------
*/
const NameService = use("App/Services/NameService");

/*
|--------------------------------------------------------------------------
| Services initialization
|--------------------------------------------------------------------------
*/
const nameService = new NameService();

/*
|--------------------------------------------------------------------------
| User Controller
|--------------------------------------------------------------------------
*/
class NameController {

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async index({response}) {
        const names = await nameService.getAllName();

        return response.status(200).send({
            status: 200,
            data: names
        })
    }

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async create({request, response}) {

        const request_data = request.only([
            'name',
            'status',
        ])

        const create = await nameService.create(request_data);

        return response.status(200).send({
            status: 200,
            data: create
        })

        // const name = nameService.findNameBy('name', request.input('name'))
        // return name
        // if (name) {
        //     return response.status(400).send({
        //         status: 400,
        //         message: "name already exist"
        //     })
        // }
        // else{

        //     const create = await nameService.create(request_data);

        //     return response.status(200).send({
        //         status: 200,
        //         data: create
        //     })
        // }
    }

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async update({request, response, params: {id}}) {

        const name = await nameService.findNameBy('id', id);

        if (name) {
            name.status = request.input('status')
            name.save()

            return response.status(200).send({
                status: 200,
                message: "name updated"
            })
        }
        else{
            return response.status(400).send({
                status: 400,
                message: "invalid name id"
            })
        }
    }

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async delete({request, response, params: {id}}) {

        const name = await nameService.findNameBy('id', id);

        if (name) {

            name.delete()

            return response.status(200).send({
                status: 200,
                message: "name deleted"
            })
        }
        else{
            return response.status(400).send({
                status: 400,
                message: "invalid name id"
            })
        }
    }
}

module.exports = NameController
