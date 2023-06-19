
const { userConstants, User } = require('./User');

const { Product } = require('./Product');

const { Order } = require('./Order');

module.exports = {
  Product,
  User,
  Order,
  constants: {
    userConstants
  }
}