'use strict'

/*
|--------------------------------------------------------------------------
| Packages Namespaces
|--------------------------------------------------------------------------
*/
const XLSX = require('xlsx');
const xlstojson = require("xls-to-json");
const xlsxtojson = require("xlsx-to-json");
const excelToJson = require('convert-excel-to-json');
const Helpers = use('Helpers')


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

        const name = await nameService.findNameBy('name', request.input('name'))

        if (name) {
                return response.status(400).send({
                        status: 400,
                        message: "name already exist"
                })
        }
        else{

                const create = await nameService.create(request_data);

                return response.status(200).send({
                        status: 200,
                        data: create
                })
        }
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
    async upload({request, response}) {

        const file = request.file('file')

        return file;

        // if (!file) {
        //     return response.status(400).send({
        //         status: 400,
        //         message: "invalid file"
        //     })
        // }

        // const publicPath = Helpers.appRoot()

        // const new_file_name = `${new Date().getTime()}.${file.subtype}`;

        // await file.move(Helpers.tmpPath('uploads'), {
        //     name: new_file_name,
        //     overwrite: true
        // })

        // const result = excelToJson({
        //     sourceFile: publicPath + "/tmp/uploads/" + new_file_name,
        //     columnToKey: {
        //         A: 'name',
        //         B: 'status'
        //     }
        // });

        // const saved = await nameService.bulkUploadNames(result['Sheet1']);

        // response.status(200).send({
        //     "status": 200,
        //     data: saved
        // })
    }

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async getWhiteList({request, response}) {
        const names = await nameService.findWhere('status', 1)

        return response.status(200).send({
            status: 200,
            names: names
        })
    }

    /*
    |--------------------------------------------------------------------------
    | index - Get all user from database
    |--------------------------------------------------------------------------
    */
    async getBlackList({request, response}) {
        const names = await nameService.findWhere('status', 0)

        return response.status(200).send({
            status: 200,
            names: names
        })
    }


}

module.exports = NameController
