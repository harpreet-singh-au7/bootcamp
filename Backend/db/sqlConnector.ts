import mysql from 'mysql';

var pool = mysql.createPool({
    host: process.env.SQLDATABASEHOST,
    user: process.env.SQLDATABASEUSER,
    password: process.env.SQLDATABASEPASSWORD,
    database: process.env.SQLDATABASENAME,
    connectionLimit: 500,
    queueLimit: 0,
    waitForConnections: true,
});

export const sqlDbConnection = function () {
    return new Promise<mysql.PoolConnection>((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection);
            //connection.release();
        });
    });
};

export default function mySqlDbConnection() {
    const connection = mysql.createConnection({
        host: process.env.SQLDATABASEHOST,
        user: process.env.SQLDATABASEUSER,
        password: process.env.SQLDATABASEPASSWORD,
        database: process.env.SQLDATABASENAME,
    });
    connection.connect();
    return connection;
}
