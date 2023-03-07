import { randomUUID } from 'node:crypto'

import { transport } from './mail/transport.js'

export class CreateOrder {
  ordersRepository = null;

  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async handle(data) {
    const { customerId, amount } = data

    const orderId = randomUUID()
    const isPriority = amount > 3000

    const order = await this.ordersRepository.create({
      id: orderId,
      customerId,
      priority: isPriority,
      amount,
    })

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
}