export class InMemoryOrdersRepository {
  items = []

  async create(data) {
    const { id, customerId, priority, amount } = data

    const order = {
      id,
      customerId,
      priority,
      amount,
    }
    
    this.items.push(order)

    return order
  }
}