
// getting modules
const {Sequelize, DataTypes} = require('sequelize')
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



Book.sync({force: true})
.then(() => {
   return Book.bulkCreate([
        {
            title: 'Bible',
            author: 'Yahweh',
            isPaperback: true
        },
        {
            title: 'Animal Farm',
            author: 'George Orwell',
            isPaperback: true
        },
        {
            title: 'The Moral Equivalent Of War',
            author: 'William James',
            isPaperback: true
        },
    ]) 
})
.then(async () => {
    // findAll() mirrors the SELECT statement in MySQL
    // Book.findAll() returns a promise, so you need to wait until it's done fetching all the rows, and then only log it to the console
    // the result will be an array of objects, one for each row
    const arrayOfAllRows = await Book.findAll()
    console.log(arrayOfAllRows)

    // if we only want some columns, we can pass in an object into findAll()
    const array2 = await Book.findAll({attributes: ['title', 'author']})
    console.log(array2)

    // we can even return these values with another name
    // pass in nested arrays where first element is what you're getting out of the table and second element is what you want to name it
    const array3 = await Book.findAll({attributes: [['title', 'bookName'], ['author', 'authorName']]})
    console.log(array3)

    // if we want to fetch all the column values except some of them, we can use exclude: []
    const array4 = await Book.findAll({attributes: {exclude: ['title']}})
    console.log(array4)
})
.catch(err => console.log(err))