const connectionString = "postgres://peodzzpi:Bt26r3XYTIzcb09VlwSuYxHK_O8HzUkb@isilo.db.elephantsql.com:5432/peodzzpi";
const { Pool } = require('pg')
const pool = new Pool ({
    connectionString: connectionString,
})

Pool.query('CREATE TABLE Persons (PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255))')