import 'dotenv/config'
import pg from 'pg'

export const client = new pg.Client({
  // database: 'postgres',
})

await client.connect()