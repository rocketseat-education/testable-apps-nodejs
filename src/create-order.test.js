import { test, mock } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'
import { transport } from './mail/transport.js'

test('create new order', async () => {
  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 1000,
  })

  assert.ok(order.id)
})

test('orders with amount higher than 3000 should me marked as priority', async () => {
  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 5000,
  })

  assert.equal(order.priority, true)
})

test('an email should be sent after the order is created', async (t) => {
  t.mock.method(transport, 'sendMail')

  await createOrder({
    customerId: 'fake-customer-id',
    amount: 3000,
  })

  assert.equal(transport.sendMail.mock.calls.length, 1);
})