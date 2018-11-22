/*
|--------------------------------------------------------------------------
| Packages Namespaces
|--------------------------------------------------------------------------
*/
const Name = use("App/Models/Name");
const Database = use("Database");

class NameService {

    /*
    |--------------------------------------------------------------------------
    | Create new user in database
    |--------------------------------------------------------------------------
    */
    async getAllName(data) {
        return await Name.all()
    }

}

module.exports = NameService;
