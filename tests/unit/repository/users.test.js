const  {userRepository} = require('../../../src/frameworks/repository/inMemory');
const { User , constants} = require('../../../src/entities');
const Chance = require('chance');

const chance = new Chance();

describe("User Repository", ()=> {
  test('should add new user', async () => {
    const testUser = new User({name:  chance.name(), gender: constants.FEMALE, age: chance.age(), lastName: chance.last(), metadata: { hair: chance.color()}})
    const addedUser = await userRepository.addUser(testUser);

    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(testUser.name);
    expect(addedUser.age).toBe(testUser.age);
    expect(addedUser.metadata).toEqual(testUser.metadata);
    expect(addedUser.gender).toBe(testUser.gender);
    
  })
  
})