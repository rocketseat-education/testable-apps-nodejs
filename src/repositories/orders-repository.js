import { client } from '../database/client.js'

export class OrdersRepository {
  async create(data) {
    const { id, customerId, priority, amount } = data

    const command = await client.query(/* SQL */`
      INSERT INTO "orders" (id, customer_id, priority, amount)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [
      id,
      customerId,
      priority,
      amount,
    ])

    const order = command.rows[0]

    return order
  }
}