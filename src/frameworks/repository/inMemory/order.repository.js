const { inMemory: inMemoryDb } = require('../../database');


const { v4 :uuidv4 } = require('uuid');

exports.addOrder = (order) => {
  if (!order.id) {
    order.id = uuidv4();
  }
  inMemoryDb.orders.push(order);
  return inMemoryDb.orders[inMemoryDb.orders.length -1];
};
exports.updateOrder = (order) => {
  const index = inMemoryDb.orders.findIndex(item => item.id === order.id);
  if (index == -1) return null;
  inMemoryDb.orders[index] = order;
  return inMemoryDb.orders[index];
};
exports.deleteOrder = (order) => {
  const index = inMemoryDb.orders.findIndex(item => item.id === order.id);
  if (index == -1) return null;
  inMemoryDb.orders.splice(index, 1);
  return order;

};
exports.getOrderById = (orderId) => inMemoryDb.orders.find(item => item.id === orderId);
