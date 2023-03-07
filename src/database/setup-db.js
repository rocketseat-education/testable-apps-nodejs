import { client } from './client.js'

(async function up() {
  // await client.query('CREATE DATABASE mydb')

  await client.query(/* SQL */`
    DROP TABLE IF EXISTS "orders" CASCADE;

    CREATE TABLE IF NOT EXISTS "orders" (
      "id" TEXT NOT NULL,
      "customer_id" TEXT NOT NULL,
      "priority" BOOLEAN NOT NULL,
      "amount" DECIMAL(10, 2) NOT NULL,

      CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
    );

    -- CreateIndex
    CREATE INDEX IF NOT EXISTS 
      "orders_customer_id_key" ON "orders"("customer_id");
  `)

  await client.end()
})()
