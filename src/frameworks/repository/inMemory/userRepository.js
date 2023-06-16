const {inMemory: inMemoryDb} = require('../../database')

const { v4 :uuidv4 } = require('uuid');

exports.addUser = (user) => {
  if (!user.id) {
    user.id = uuidv4();
  }
  inMemoryDb.users.push(user);
  return inMemoryDb.users[inMemoryDb.users.length -1];
};
exports.updateUser = (user) => {
  const index = inMemoryDb.users.findIndex(item => item.id === user.id);
  if (index == -1) return null;
  inMemoryDb.users[index] = user;
  return inMemoryDb.users[index];
};
exports.deleteUser = (user) => {
  const index = inMemoryDb.users.findIndex(item => item.id === user.id);
  if (index == -1) return null;
  inMemoryDb.users.splice(index, 1);
  return user;

};
exports.getUserById = (userId) => inMemoryDb.users.find(item => item.id === userId);
