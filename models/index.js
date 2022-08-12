
// getting modules
const {Sequelize, DataTypes} = require('sequelize') // need DataTypes to define model
const mysql = require('mysql2')



// set up connection using Sequelize constructor
const sequelize = new Sequelize(
    'library_db',
    'root',
    'mysqlishan99',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        // if we wanted to specify freezeTableName: true and timestamps: false for all models we create, we can just write an object here, and all models created from this 'sequelize' will have those options applied to them
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
)



// a model is just an object that represents a table in your database
// usually, models have singular names (book) whereas tables have pluralized names (books)

// to create a model, you can use init() or define(), we will use define()
// this takes three arguments, the first is the model name, second is an object where you define all the columns and their properties, the third argument is another object of options
// sequelize automatically pluralizes the model name (book becomes books)

// An `id` primary key that auto-increments from starting value 1 is automatically created by sequelize, though best practice would be to define the primary key ourselves
const Book = sequelize.define('book', {
    // here we define a columns

    book_id: {
        // here we give it some properties, specify it's an INT, it's the primary key, and it autoincrements
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING
    },
    isbn: {
        type: DataTypes.STRING
    },
    pages: {
        type: DataTypes.INTEGER
    },
    edition: {
        type: DataTypes.INTEGER,
        // the default value is NULL if it's not specified
        defaultValue: 1
    },
    // Will automatically be converted to `is_paperback` in table
    isPaperback: {
        type: DataTypes.BOOLEAN
      }
}, 
// options object as third argument
{
    // if you want to stop pluralizing the model names, you use the following
    // freezeTableName: true

    // by default, sequelize adds the columns createdAt and updatedAt to every model we create, to turn this off we use the following
    timestamps: false,

    // the only reason isPaperback is converted to is_paperback is because this is set to true
    underscored: true,
})



// STRING = VARCHAR(255)
// TEXT = TEXT
// BOOLEAN = TINYINT(1)
// INTEGER = INTEGER
// FLOAT = FLOAT
// STRING(1234) = VARCHAR(1234)
// DATE = DATE



// how to actually insert a table into our mysql database, we have defined one but it doesn't exist in the database yet

// .sync() returns a promise
// by using {force: true}, drops table if it already exists, then creates the table
Book.sync({force: true})
.then(() => console.log('table and model synced'))
.catch((err) => console.log(err))



// if you have more than one model, you can sync all those models at once
// just call sync() on sequelize object, can chain .then() and .catch()
// sequelize.sync({force: true})



// can drop tables as well
// Book.drop()
// this returns a promise as well, can chain .then() and .catch()

// can drop all tables by calling .drop() on sequelize
// sequelize.drop()



// if we want to access a model we created in the code, it's in sequelize.models.book 
// (book not Book, it's the name of the model that you defined in the second argument)






