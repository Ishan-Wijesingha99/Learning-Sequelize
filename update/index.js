
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
.then(() => {
    // let's update the table here once the table rows have been inserted above
    // first argument is the column value you want to update
    // second argument is where you want this to be updated. So you need to specify another column value for that same row you want to update
    // can specify a condition as well, like where age is greater than or less than 21
    return Book.update({isPaperback: false}, {where: {author: 'William James'}})

})
.catch(err => console.log(err))