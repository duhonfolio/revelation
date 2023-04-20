import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()   //config the env variable

// connect to database

// the pool variable -is a pool of connections to database which can be reused. Instead of creating a new connection for each query, the pool of
// connections can be reused

const pool = mysql.createPool ({   //use local enviromental variables (.env) instead of hardcoding
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()      // this allows us to use the promise API version of mySQLj instead of having to use callback functions . We will be using ASYNC / AWAIT


// Queries to the Database ::

    // get all Notes
export async function getNotes(){
    const [rows] = await pool.query ("SELECT * FROM notes")  // return just the 1st item in the result array , not metadata
    return rows
}

    //get single Note
export async function getNote(id){
    const [rows] = await pool.query ('SELECT * FROM notes Where id = ?', [id])  // ? is used for untrusted values to prevent SQL injection attack.
    // id is second parm, this Syntax is called Prepared Statement (SQL and value are sent separately)
    return rows [0]   // to be cleaner, return the first object of the array [0], since Select always returns an Array anyway
}

// create a Note
export async function createNote(title, contents) {
    const [result] = await pool.query('INSERT INTO notes (title, contents)VALUES (?,?)', [title, contents])
    const id = result.insertId
    return getNote(id)  // return the object just created using the other getNote function
}

// const notes = await getNotes ()
// console.log (notes)  // result returned is an array of JS objects

// const note = await getNote(2)
// console.log (note)  // result returned is the 2nd element in the array of JS objects

// const result = await createNote('test','test')   //create new
// console.log (result)