import { test, mock } from 'node:test'
import assert from 'node:assert'

import { CreateOrder } from './create-order.js'
import { InMemoryOrdersRepository } from './test/repositories/in-memory-orders-repository.js'
import { transport } from './mail/transport.js'

const inMemoryOrdersRepository = new InMemoryOrdersRepository()

mock.method(transport, 'sendMail', (mail) => {
  console.log('Sent email')
})

test('create new order', async () => {
  const createOrder = new CreateOrder(inMemoryOrdersRepository)

  const order = await createOrder.handle({
    customerId: 'fake-customer-id',
    amount: 1000,
  })

  assert.ok(order.id)
  assert.equal(inMemoryOrdersRepository.items[0].amount, 1000)
})

test('orders with amount higher than 3000 should me marked as priority', async () => {
  const createOrder = new CreateOrder(inMemoryOrdersRepository)

  const order = await createOrder.handle({
    customerId: 'fake-customer-id',
    amount: 5000,
  })

  assert.equal(order.priority, true)
})

test('an email should be sent after the order is created', async (t) => {
  t.mock.method(transport, 'sendMail')

  const createOrder = new CreateOrder(inMemoryOrdersRepository)

  await createOrder.handle({
    customerId: 'fake-customer-id',
    amount: 3000,
  })

  assert.equal(transport.sendMail.mock.calls.length, 1);
})