/*
|--------------------------------------------------------------------------
| Packages Namespaces
|--------------------------------------------------------------------------
*/
const Database = use("Database");
const Name = use("App/Models/Name");

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

    /*
    |--------------------------------------------------------------------------
    | Create new user in database
    |--------------------------------------------------------------------------
    */
    async findWhere(field, data) {
        return await Name.query().where(field, data).fetch();
    }

    /*
    |--------------------------------------------------------------------------
    | Create new user in database
    |--------------------------------------------------------------------------
    */
    async create(data) {
        const name = new Name()

        Object.keys(data).forEach(fieldName => {
            if (fieldName != "user_id" && data[fieldName] != "") {
                name[fieldName] = data[fieldName];
            }
        });

        await name.save()

        return await this.findNameBy('name', data.name)
    }

    async bulkUploadNames(data){

        const names = await Database.select('*').from('names');

        let valid_names = [];
        const new_name = {}
        const save = []
        const duplicate = []

        names.forEach(key => {
            valid_names.push(key.name.toLowerCase())
        })

        Object.keys(data).forEach(fieldName => {
            if (data[fieldName].status == 0 || data[fieldName].status == 1) {
                new_name[fieldName] = data[fieldName];
            }
        });

        Object.keys(new_name).forEach(fieldName => {

            if (!valid_names[valid_names.findIndex(i => i == new_name[fieldName].name.toLowerCase())]) {
                save.push({
                    name: new_name[fieldName].name,
                    status: new_name[fieldName].status
                });
            }

            if (valid_names[valid_names.findIndex(i => i == new_name[fieldName].name.toLowerCase())]) {
                duplicate.push({
                    name: new_name[fieldName].name,
                    status: new_name[fieldName].status
                });
            }
        });

        await Database.from('names').insert(save)

        return {
            duplicate,
            saved: save
        }
    }

}


module.exports = NameService;
