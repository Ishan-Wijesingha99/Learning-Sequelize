
// Sequelize is just a module that allows you to write database queries in javascript more easily
// sort of like how jQuery helps you write javascript more easily

// Sequelize is an Object Relational Mapper (ORM), so it basically takes databases and creates objects for them. 
// You can write database queries in an object-oriented way



// getting modules
const Sequelize = require('sequelize') // this is actually a constructor function, that's why it starts with a capital letter
const mysql = require('mysql2')



// set up connection using Sequelize constructor
// this connection is usually set up in an external 'connection.js' file in a 'config' folder
const sequelize = new Sequelize(
    // database name
    'library_db',
    // user
    'root',
    // password
    'mysqlishan99',
    {
        // database location
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
)



// you can check if this connection was successful using .authenticate(), which returns a promise
sequelize.authenticate()
.then(() => console.log('Connection successful'))
.catch(() => console.log('Connection unsuccessful'))