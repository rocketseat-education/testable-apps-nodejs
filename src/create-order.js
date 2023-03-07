import { randomUUID } from 'node:crypto'

import { client } from './database/client.js'
import { transport } from './mail/transport.js'

export async function createOrder(data) {
  const { customerId, amount } = data

  const orderId = randomUUID()
  const isPriority = amount > 3000

  const command = await client.query(/* SQL */`
    INSERT INTO "orders" (id, customer_id, priority, amount)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [
    orderId,
    customerId,
    isPriority,
    amount,
  ])

  const order = command.rows[0]

  const amountFormatted = new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency: "USD" }
  ).format(amount)

  await transport.sendMail({
    from: {
      name: 'Diego Fernandes',
      address: 'diego@rocketseat.com.br',
    },
    to: {
      name: 'Diego Fernandes',
      address: 'diego@rocketseat.com.br',
    },
    subject: `New order #${order.id}`,
    html: `<strong>New order:</strong> ${order.id} with amount of ${amountFormatted}`
  })

  return order
}