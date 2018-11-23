/*
|--------------------------------------------------------------------------
| Packages Namespaces
|--------------------------------------------------------------------------
*/
const { validate, validateAll, formatters } = use("Validator");

class NameValidation {

    async createNameValidation(data){

        let validation = await validate(data, {
            name: 'required|string',
            status: 'required|integer',
        })

        return validation;
    }
}

module.exports = NameValidation;
