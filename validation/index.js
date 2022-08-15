
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

// defining model
// here is where we add validations
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
    // when we insert rows into our model, all author values passed in must pass the condition specified in validate:
    // there are many different conditions you can come up with, in this case, we will check that the length is between 5 and 20 characters
    // if you try and insert a row that does not satisfy this condition, it just won't be inserted
    // bulkCreate ignores it
    author: {
        type: DataTypes.STRING,
        validate: {
            len: [5, 20]
        }
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



// adding three rows to Book model/database
Book.sync({force: true})
.then(() => {
    return Book.create({
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    isPaperback: true
   })
})
.then(() => {
    return Book.create({
    title: 'The Communist Manifesto',
    author: 'Karl Marx',
    isPaperback: true
   })
})
.then(() => {
    return Book.create({
    title: 'The Moral Equivalent of War',
    author: 'William James',
    isPaperback: false
   })
})
.catch((err) => console.log(err))



// if you want bulkCreate to take into account validations, the last argument you pass into bulkCreate() needs to be another options object, which is {validate: true}