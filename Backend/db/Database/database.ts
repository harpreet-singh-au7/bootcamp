import { sqlDbConnection } from "./sqlConnector";



export default class DataBase {
    manageConnections(query: string) {
        return new Promise(async (resolve, reject) => {
            let connection = await sqlDbConnection();

            //create a query
            connection.query(query, function (error, results, fields) {
                connection.release();
                if (error) {
                   console.log(error);
                    reject(error);
                    return;
                }
                // connected!
                const rows = results;
                const rowCount = results.length ? results.length : results.affectedRows;

                resolve({ rows, rowCount });
            });
            
        });
    }

    async execute(query: string) {
        let result = await this.manageConnections(query);
        return result;
    }

    //Async Select function
    async select(tableName: string, columns?: string[], condition?: any) {
        let conditions = '';

        //If there is a condition object build query using keys and values
        if (condition) {
            const conditionKeys = Object.keys(condition);
            const conditionValues = Object.values(condition).map((value) => (typeof value === 'string' ? `'${value}'` : value));
            conditionKeys.forEach((key, index) => {
                conditions += `${key} = ${conditionValues[index]}${index === conditionKeys.length - 1 ? '' : ' AND '}`;
            });
        }

        let query = `SELECT ${columns ? columns.join() : '*'} FROM ${tableName}`;
        if (conditions) query += ` WHERE ${conditions}`;

        //Fire manageConnections function with query
        let result = await this.manageConnections(query);
        return result;
    }

    async insert(tableName: string, data: any) {
        //Get columns from keys and values from object values
        const columns = Object.keys(data);
        const values = Object.values(data).map((value) => (typeof value === 'string' ? `'${value}'` : value));

        //Build final query
        const query = `INSERT INTO ${tableName} (${columns.join()}) VALUES (${values.join()})`;

        //Fire manageConnections function with query
        let result = await this.manageConnections(query);
        return result;
    }

    async update(tableName: string, data: any, condition?: any) {
        //Get columns from keys and values from object values
        const columns = Object.keys(data);
        const values = Object.values(data).map((value) => (typeof value === 'string' ? `'${value}'` : value));
        let updates = '';
        columns.forEach((column, index) => {
            updates += `${column} = ${values[index]}${index === columns.length - 1 ? '' : ', '}`;
        });
        let conditions = '';

        //If there is a condition object build query using keys and values
        if (condition) {
            const conditionKeys = Object.keys(condition);
            const conditionValues = Object.values(condition).map((value) => (typeof value === 'string' ? `'${value}'` : value));
            conditionKeys.forEach((key, index) => {
                conditions += `${key} = ${conditionValues[index]}${index === conditionKeys.length - 1 ? '' : ' AND '}`;
            });
        }

        //Build final query
        let query = `UPDATE ${tableName} SET ${updates}`;
        if (conditions) query += ` WHERE ${conditions}`;

        //Fire manageConnections function with query
        let result = await this.manageConnections(query);
        return result;
    }
}
