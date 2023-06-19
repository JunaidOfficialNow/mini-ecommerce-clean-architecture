const { inMemory: inMemoryDb } = require('../../database');


const { v4 :uuidv4 } = require('uuid');

exports.addProduct = (product) => {
  if (!product.id) {
    product.id = uuidv4();
  }
  inMemoryDb.products.push(product);
  return inMemoryDb.products[inMemoryDb.products.length -1];
};
exports.updateproduct = (product) => {
  const index = inMemoryDb.products.findIndex(item => item.id === product.id);
  if (index == -1) return null;
  inMemoryDb.products[index] = product;
  return inMemoryDb.products[index];
};
exports.deleteproduct = (product) => {
  const index = inMemoryDb.products.findIndex(item => item.id === product.id);
  if (index == -1) return null;
  inMemoryDb.products.splice(index, 1);
  return product;

};
exports.getProductById = (productId) => inMemoryDb.products.find(item => item.id === productId);
