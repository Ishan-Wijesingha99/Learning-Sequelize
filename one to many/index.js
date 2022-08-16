
// getting modules
const {Sequelize, DataTypes, HasMany, BelongsTo} = require('sequelize')
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



// one to many association
// when one column in the parent table can be associated with many columns in the child table

// an example of this is a user and their posts on an app
// there is only one user (parent table), and for that one user, there are many posts (child table)

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false
})

const Post = sequelize.define('post', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false
})



// parentTable.hasMany(childTable)
// childTable.belongsTo(parentTable)
User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})
// for each row (each post) in the Post table, there will be the relevant user_id, because every post should be associated with one user, and therefore one user_id



sequelize.sync({force: true})
.then(() => {

})
.catch(err => console.log(err))
