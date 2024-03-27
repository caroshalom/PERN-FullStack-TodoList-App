const Pool = require("pg").Pool;

const pool = new Pool({
	user: 'caro',
    host: 'localhost',
    database: 'bdTest',
    password: 'password7',
    port: 5432
});

module.exports = pool;