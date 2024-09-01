import mysql from "mysql";
import env from "dotenv";
env.config();

const sqlConnection = mysql.createConnection(
    {
        password: process.env.PASSWORD,
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USER,
        insecureAuth: true

    }
);

sqlConnection.connect((error) => {
    if (error) console.log(error)
    else {
        console.log("Connected with db.");
    }
});

export default sqlConnection;