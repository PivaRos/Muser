
// Get the adodb module
var ADODB = require('node-adodb');
var path = require('path');


class data
{
  connectionString;
  connection;
    // Connect to the MS Access DB

    constructor(filename)
    {
        this.connectionString = 'Provider=Microsoft.ACE.OLEDB.12.0;Data Source='+path.join(__dirname, '../data/'+filename+';');
        this.connection = ADODB.open(this.connectionString, true);
    }

    Query(queryString)
    {
        return new Promise((resolve, reject) => {
            this.connection
            .query(queryString)
            .then(data => {
                if(data)
                {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
                reject("Error: No Data Returned From Query");

            })
            .catch(error => {
                reject(error);
            });
        });
    }

    Execute(executeString)
    {
        return new Promise((resolve, reject) => {
            this.connection
            .execute(executeString)
            .then(data => {
                resolve(JSON.parse(JSON.stringify(data)));
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    Transaction(transactionString)
    {
        return new Promise((resolve, reject) => {
            this.connection
            .Transaction(transactionString)
            .then(data => {
                resolve(JSON.parse(JSON.stringify(data)));
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

module.exports = data;