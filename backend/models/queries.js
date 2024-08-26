module.exports = function(req, provider)
{
	let module = {};

    module.sanitize = function(schema, data) {

        const sanitizedData = {}
        for (const key in schema) {

            if (data.hasOwnProperty(key)) {
                sanitizedData[key] = data[key];
            } else {
                sanitizedData[key] = schema[key];
            }

        }
        return sanitizedData;
    };
	
    module.select = async function(table, data) 
    {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const whereClause = columns.map(column => `${column} = ?`).join(' AND ');
        const queryString = `SELECT * FROM ${table} WHERE ${whereClause}`;
        try 
        {
            const records = await provider.query(queryString, values);
            return (records.length > 0) ? records[0] : null;
        } 
        catch (error) 
        {
            req.logger.error(`Error executing select query in ${table} table:`, error, data);
            //throw error;
            return null;
        }
    };

    module.insert = async function(table, data) 
    {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const insertColumns = columns.join(', ');
        const insertValuesPlaceholders = values.map(() => '?').join(', ');
        const queryString = `INSERT INTO ${table} (${insertColumns}) VALUES (${insertValuesPlaceholders})`;
        try 
        {
            await provider.query(queryString, values);
            //req.logger.msg(`New record inserted successfully in ${table} table`, data);
            return true;
        } 
        catch (error) 
        {
            req.logger.error(`Error executing insert query in ${table} table:`, error, data);
            return false;
        }
    };

    module.update = async function(table, whereData, updateData) 
    {
        const updateColumns = Object.keys(updateData);
        const updateValues = Object.values(updateData);
        if (!isNaN(whereData))
        {
            whereData = { "id": whereData };
        } 
        const whereColumns = Object.keys(whereData);
        const whereValues = Object.values(whereData);
        const setClause = updateColumns.map(column => `${column} = ?`).join(', ');
        const whereClause = whereColumns.map(column => `${column} = ?`).join(' AND ');
        const queryString = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        const values = [...updateValues, ...whereValues];
        try 
        {
            const result = await provider.query(queryString, values);
            //req.logger.msg(`Record updated successfully in ${table} table`);
            return result;
        } 
        catch (error) 
        {
            req.logger.error(`Error executing upate query in ${table} table:`, error, whereData, updateData);
            return false;
        }
    };
	
	return module;
};