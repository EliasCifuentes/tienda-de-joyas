import pg from 'pg'
import 'dotenv/config'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
    allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
    (err)
        ? console.log('Error conecting to DB:', err)
        : console.log('DB conected at:', res.rows[0].now)
})

export default pool