'use strict'

/*
|--------------------------------------------------------------------------
| Packages Namespaces
|--------------------------------------------------------------------------
*/
const node_xj = require("xls-to-json");
const xlstojson = require("xls-to-json-lc");
const exceltojson = require("xlsx-to-json-lc");

/*
|--------------------------------------------------------------------------
| Services Namespaces
|--------------------------------------------------------------------------
*/
const NameService = use("App/Services/NameService");
const NameValidation = use("App/Validations/NameValidation");

/*
|--------------------------------------------------------------------------
| Services initialization
|--------------------------------------------------------------------------
*/
const nameService = new NameService();
const nameValidation = new NameValidation();

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

        let validation = await nameValidation.createNameValidation(request.all());

        if(validation.fails()) {
            return response.send({
                status: 400,
                data: validation.messages()
            });
        }

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
            console.log(name)
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

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async upload({request, response, params: {id}}) {
        const file = request.file('file')

        // node_xj({input: file.tmpPath})
        // .then( data => {
        //     console.log(data)
        // })
        // .catch( error => {
        //     console.log(error)
        // })
        //
        xlstojson({input: file.tmpPath, output: null, lowerCaseHeaders:true}, function(err, result) {
            if(err) {
                return response.send({
                    err
                })
            }
            else
            {
                return response.send({
                    result
                })
            }
        })
    }


}

module.exports = NameController
