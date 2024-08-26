const mysql = require('mysql');

class Database 
{
    constructor(config) 
    {
        this.config = config;
        this.connection = null;
        //this.createConnection();
        this.createTables();
    }

    createConnection() 
    {
        this.connection = mysql.createConnection(this.config);
        this.connection.connect(err => 
        {
            if (err) 
            {
                console.error('Error connecting to MySQL database:', err);
                setTimeout(this.createConnection.bind(this), 5000); // Retry connection after 5 seconds
            } 
            else 
            {
                console.log('Connected to MySQL database!');
            }
        });

        this.connection.on('error', err => 
        {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') 
            {
                console.error('MySQL connection lost. Attempting to reconnect...');
                this.createConnection();
            } 
            else 
            {
                console.error('Error with mysql connection:', err);
                throw err;
            }
        });
    }

    async createTables() 
    {
        let connection;
        try 
        {
            connection = mysql.createConnection(this.config);
            await this.query(`CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                token VARCHAR(255) DEFAULT NULL,
                address VARCHAR(255) DEFAULT NULL,
                wallet VARCHAR(255) DEFAULT NULL,
                firstname VARCHAR(255) DEFAULT NULL,
                lastname VARCHAR(255) DEFAULT NULL,
                email VARCHAR(255) DEFAULT NULL,
                avatar VARCHAR(255) DEFAULT NULL,
                art_name VARCHAR(255) DEFAULT NULL,
                description LONGTEXT DEFAULT NULL,
                phone VARCHAR(255) DEFAULT NULL,
                website VARCHAR(255) DEFAULT NULL,
                date_inserted DATETIME DEFAULT CURRENT_TIMESTAMP,
                status TINYINT(1) DEFAULT 0
            )`);
            console.log('Tables created or already exist.');
        } 
        catch (err) 
        {
            console.error('Error creating tables:', err);
        }
        finally
        {
            if (connection)
            {
                await connection.end();
                console.log('Connection to MySQL database closed.');
            }
        }
    }

    async query(sql, values) 
    {
        let connection;
        try 
        {
            connection = mysql.createConnection(this.config);
            const result = await this.executeQuery(connection, sql, values);
            connection.end();
            return result;
        } 
        catch (err) 
        {
            console.error('Error executing query:', err);
            if (connection) connection.end();
            throw err;
        }
    }

    async executeQuery(connection, sql, values) 
    {
        return new Promise((resolve, reject) => 
        {
            connection.query(sql, values, (err, result) => 
            {
                if (err) 
                {
                    console.error('Error executing query:', err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    close() 
    {
        try 
        {
            this.connection.end();
            console.log('Connection to MySQL database closed.');
        } 
        catch (err) 
        {
            console.error('Error closing MySQL database connection:', err);
        }
    }
}

module.exports = Database;
