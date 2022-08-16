
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



// Assosiations are relationships between tables in a database
// these relationships are established with foreign keys
// the primary key of the parent table is the foreign key of the child table

// for one to one association, do the following to link them

// an example of one to one is a social security number and a person
// one person only has one social security number
// one person does NOT have many social security numbers
// and one social security number does NOT have many people with that number

// country and capitals is another example

// how do we figure out which one is the parent table? Ask yourself, which one exists by itself?
// a child needs a parent to exist, but a parent can exist by itself

// A person can exist by itself without a social security number, but a social security number can't exist without a person. So person is parent table and social security is child table

// a country can exist by itself (parent), but a capital needs a country to exist (child)



// setting up models/tables
const Country = sequelize.define('country', {
    country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    country_name: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    timestamps: false
})

const Capital = sequelize.define('capital', {
    capital_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    capital_name: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    timestamps: false
})



// parentTable.hasOne(childTable)
// childTable.belongsTo(parentTable)
Country.hasOne(Capital, {
    foreignKey: 'country_id',
    // When we delete a Country, make sure to also delete the associated Capital
    onDelete: 'CASCADE'
})
// if you check both tables in mysql, you will see that the Capital table has the foreign key even though we didn't add it in define()
// this foreign key will be the concatination of the parent table name (country) and the name of the foreign key itself (country_id), it then converts it to camelCase, so the result will be countryCountryId
// hasOne() takes in an options object as the second argument, in this object you can use the foreignKey: property to name the foreign key whatever you want

Capital.belongsTo(Country, {
    foreignKey: 'country_id'
})
// it's a good practice to include both hasOne() and belongsTo()
// belongsTo() also takes an options object as the second argument
// here we don't add onDelete, because if a capital gets deleted, that shouldn't delete the country!





sequelize.sync({force: true})
.then(() => {
    console.log('connection successful')
})
.catch(err => console.log(err))

