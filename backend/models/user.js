module.exports = function(req, provider)
{
	let module = {};

    module._queries = require('./queries')(req, provider);

    module._table = 'users';

    module.dbSchema = 
    {
        address: null,
        firstname: null,
        lastname: null,
        email: null,
        wallet: 'undefined',
        art_name: 'unnamed',
        avatar: null,
        status: 1
    };

    module.authSchema = 
    {
        address: null,
        firstname: null,
        lastname: null,
        email: null,
        wallet: 'undefined',
        art_name: 'unnamed',
        avatar: null,
        status: 1,
        particle_token: null,
        particle_uuid: null,
        //jwt_data: null
    };

    module.formSchema = 
    {
        //address: null,
        firstname: null,
        lastname: null,
        email: null,
        wallet: 'undefined',
        art_name: 'unnamed',
        avatar: null,
        status: 1,
        phone: null
    };

    module.sanitize = function(data, schema = module.authSchema) 
    {
        return module._queries.sanitize(schema, data);
    };

    module.create = async function(data) 
    {
        let record;
        if (typeof data === 'string') 
        {
            data = { "address": data };
        } 
        record = await module._queries.select(module._table, { "address": data['address'] });
        if (record)
        {
            return record; // user exists
        } 
        const mergedData = { ...module.dbSchema, ...data };
        if (!mergedData.avatar)
        {
            const randomNumber = Math.floor(Math.random() * 8) + 1;
            mergedData.avatar = `${randomNumber}.jpg`;
        }
        const result = await module._queries.insert(module._table, mergedData);
        if (result)
        {
            record = module._queries.select(module._table, { "address": data['address'] });
            return record;
        }
        return result; // user created
    };
	
    module.single = async function(data) 
    {
        if (typeof data === 'string') 
        {
            data = { "address": data };
        } 
        const record = await module._queries.select(module._table, data);
        return record;
    };

    module.update = async function(whereData, updateData) 
    {
        const record = await module._queries.update(module._table, whereData, updateData);
        return record;
    };
	
	return module;
};