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

    /*
    |--------------------------------------------------------------------------
    | Create new user in database
    |--------------------------------------------------------------------------
    */
    async updateName(data) {
        const name = await this.findNameBy('id', data.name_id)
        name.status = data.status
        return await name.save()
    }

    /*
    |--------------------------------------------------------------------------
    | Create new user in database
    |--------------------------------------------------------------------------
    */
    async findNameBy(field, data) {
        return await Name.findBy(field, data);
    }
}

module.exports = NameService;
