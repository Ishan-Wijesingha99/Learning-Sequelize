
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
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
)

const Book = sequelize.define('book', {
    book_id: {
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
    edition: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    isPaperback: {
        type: DataTypes.BOOLEAN
      }
},
{
    timestamps: false,
    underscored: true,
})



// to insert a single row into a model (table)
Book.sync({force: true})
.then(() => {
    // just insert something for every column
   return Book.create({
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    isPaperback: true
   }) 
})
.then((data) => {
    console.log('row added to books table')
    // if you want to see what was inserted into the table, use the following
    console.log(data.toJSON())
    })
.catch((err) => console.log(err))





