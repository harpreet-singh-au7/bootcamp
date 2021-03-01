import mysql from 'mysql';

export var pool = mysql.createPool({
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

export function simpleStringify (object:any){
    var simpleObject:any = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

export default function mySqlDbConnection() {
    const connection = mysql.createConnection({
        host: process.env.SQLDATABASEHOST,
        user: process.env.SQLDATABASEUSER,
        password: process.env.SQLDATABASEPASSWORD,
        database: process.env.SQLDATABASENAME,
    });

        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        connection.query("select count(*) as total_property from property where property.for_rent = 1",function(err,result){
            if(err){
                console.log(err)
            }
            console.log(result + "result......")
        }
    )
        return connection;
        
})
}
