
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

    return Book.create({
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    isPaperback: true
   })

})
.then((data) => {

    // this will destroy the ROW you just inserted, because data is the row in this case
    return data.destroy()

    // you can also destroy all rows in the Book model by calling destroy() on Book instead
    // use truncate: true to destroy all rows in model/table
    // the table will itself still exist
    Book.destroy({truncate: true})

})
.then((data) => {
    console.log('row destroyed')
    console.log(data.toJSON())
})
.catch((err) => console.log(err))



// can also destroy a particular row like this
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
.then(() => {
    // like this
    // destroy() takes an object as an argument, that object has the where: property
    // for the where: property, you put in one of the column entrees of the row you want to delete
    // sequelize will know to delete 
    // {
    //     title: 'Animal Farm',
    //     author: 'George Orwell',
    //     isPaperback: true
    // }
    return Book.destroy(
        {where: {title: 'Animal farm'}}
    )
})
.catch(err => console.log(err))