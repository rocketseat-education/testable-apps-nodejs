import { test, mock } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'
import { InMemoryOrdersRepository } from './test/repositories/in-memory-orders-repository.js'
import { transport } from './mail/transport.js'

const inMemoryOrdersRepository = new InMemoryOrdersRepository()

mock.method(transport, 'sendMail', (mail) => {
  console.log('Sent email')
})

test('create new order', async () => {
  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 1000,
  }, inMemoryOrdersRepository)

  assert.ok(order.id)
  assert.equal(inMemoryOrdersRepository.items[0].amount, 1000)
})

test('orders with amount higher than 3000 should me marked as priority', async () => {
  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 5000,
  }, inMemoryOrdersRepository)

  assert.equal(order.priority, true)
})

test('an email should be sent after the order is created', async (t) => {
  t.mock.method(transport, 'sendMail')

  await createOrder({
    customerId: 'fake-customer-id',
    amount: 3000,
  }, inMemoryOrdersRepository)

  assert.equal(transport.sendMail.mock.calls.length, 1);
})