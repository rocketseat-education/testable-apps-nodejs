import { test } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'

test('create new order', async () => {
  const order = await createOrder({
    customerId: 'fake-customer-id',
    amount: 5000,
  })

  assert.ok(order.id)
})