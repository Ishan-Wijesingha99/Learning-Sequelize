
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
    // findAll() mirrors the SELECT * statement in MySQL
    // Book.findAll() returns a promise, so you need to wait until it's done fetching all the rows, and then only log it to the console
    // the result will be an array of objects, one for each row
    const arrayOfAllRows = await Book.findAll().then(data => {
        // what is returned by Book.findAll() is an array, so you need to loop through that array and convert each element using toJSON() and then log that
        data.forEach(element => console.log(element.toJSON()))
    })



    // if we only want some columns, we can pass an object into findAll()
    const array2 = await Book.findAll({attributes: ['title', 'author']}).then(data => {
        // what is returned by Book.findAll() is an array, so you need to loop through that array and convert each element using toJSON() and then log that
        data.forEach(element => console.log(element.toJSON()))
    })



    // we can even return these values with another name
    // pass in nested arrays where first element is what you're getting out of the table and second element is what you want to name it
    const array3 = await Book.findAll({attributes: [['title', 'bookName'], ['author', 'authorName']]}).then(data => {
        // what is returned by Book.findAll() is an array, so you need to loop through that array and convert each element using toJSON() and then log that
        data.forEach(element => console.log(element.toJSON()))
    })


    // if we want to fetch all the column values except some of them, we can use exclude: []
    const array4 = await Book.findAll({attributes: {exclude: ['title']}}).then(data => {
        // what is returned by Book.findAll() is an array, so you need to loop through that array and convert each element using toJSON() and then log that
        data.forEach(element => console.log(element.toJSON()))
    })




    // findByPk
    // this returns a promise as well so we should wait for it
    // because we called findByPk on Book, sequelize knows what table we're dealing with
    // then we specify the value of the primary key, and what will be returned is the row corresponding to that primary key (the model instance)
    const object1 = await Book.findByPk(2).then(data => data.toJSON())
    console.log(object1)



    // findOne()
    // whatever is specified in the where: clause, the first row that matches that condition will be returned
    const object2 = await Book.findOne({where: {author: 'William James'}}).then(data => data.toJSON())
    console.log(object2)

})
.catch(err => console.log(err))


// sometimes when we try to store a row in a model as a variable or just log it to the console, it comes with a lot of additional properties, to get just the row itself, we use .get({plain: true})
// const dataWeWant = entireData.get({plain: true})