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
    async createUser(data) {
        return await Name.all().fetch()
    }

}

module.exports = NameService;
