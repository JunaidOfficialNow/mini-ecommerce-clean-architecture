const  {userRepository} = require('../../../src/frameworks/repository/inMemory');
const { User , constants} = require('../../../src/entities');
const { cloneDeep } = require('lodash');
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

    const returnedUser = userRepository.getUserById(addedUser.id);
    expect(returnedUser).toEqual(addedUser);
  })

  test('Should delete a user', async () =>   {
    const willBeDeletedUser = new User({name:  chance.name(), gender: constants.FEMALE, age: chance.age(), lastName: chance.last(), metadata: { hair: chance.color()}});
    const willBeStayedUser = new User({name:  chance.name(), gender: constants.FEMALE, age: chance.age(), lastName: chance.last(), metadata: { hair: chance.color()}});

    const [ willBeDeletedAddedUser, willBeStayedAddedUser ] = await Promise.all([userRepository.addUser(willBeDeletedUser), userRepository.addUser(willBeStayedUser)]);
    expect(willBeDeletedAddedUser).toBeDefined();
    expect(willBeStayedUser).toBeDefined();
    const deletedUser = await userRepository.deleteUser(willBeDeletedAddedUser);
    expect(deletedUser).toEqual(willBeDeletedAddedUser);

    const shouldBeUndefinedUser = await userRepository.getUserById(deletedUser.id);
    expect(shouldBeUndefinedUser).toBeUndefined();

   const shouldBeFindUser = await userRepository.getUserById(willBeStayedAddedUser.id);
   expect(shouldBeFindUser).toBeDefined();
   expect(shouldBeFindUser).toEqual(willBeStayedAddedUser);


   
  })

  test('should be able to update a user', async () => {
     willBeUpdatedUser = new User({name:  chance.name(), gender: constants.FEMALE, age: chance.age(), lastName: chance.last(), metadata: { hair: chance.color()}});
     willBeUpdatedAddedUser = await userRepository.addUser(willBeUpdatedUser);
     expect(willBeUpdatedAddedUser).toBeDefined();

     const cloneUser = cloneDeep( { name: chance.name(), ...willBeUpdatedAddedUser});
     UpdatedAddedUser = await userRepository.updateUser(cloneUser);
    
     expect(UpdatedAddedUser).toBeDefined();
     expect(UpdatedAddedUser).toEqual(cloneUser)


  })
  
})