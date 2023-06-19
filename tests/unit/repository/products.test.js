const {
  productRepository
} = require('../../../src/frameworks/repository/inMemory');
const {Product} = require('../../../src/entities');
const {cloneDeep} = require('lodash');
const Chance = require('chance');

const chance = new Chance();

describe('Product Repository', () => {
  test('product should be added', async () => {
    // create new product
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: 'China',
      }
    });


    const addedProduct = await productRepository.addProduct(testProduct);
    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.color).toBe(testProduct.color);
    expect(addedProduct.name).toBe(testProduct.name);
    expect(addedProduct.meta).toEqual(testProduct.meta);
    expect(addedProduct.price).toBe(testProduct.price);
    expect(addedProduct.images).toEqual(testProduct.images);

    const returnedProduct = await productRepository.getProductById(addedProduct.id);
    expect(returnedProduct).toBeDefined();
    expect(returnedProduct).toEqual(addedProduct);
  });
  test('product should be deleted', async () => {
    const shouldStayProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: 'China',
      }
    });

    const willBeDeletedProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: 'China',
      }
    });

    const [ shouldStayAddedProduct, willBeDeletedAddedProduct ] = await Promise.all([productRepository.addProduct(shouldStayProduct), 
    productRepository.addProduct(willBeDeletedProduct)]);

    expect(shouldStayAddedProduct).toBeDefined();
    expect(shouldStayAddedProduct.id).toBeDefined();

    expect(willBeDeletedAddedProduct).toBeDefined();
    expect(willBeDeletedProduct.id).toBeDefined();

    const deletedProduct = await productRepository.deleteproduct(willBeDeletedAddedProduct);
    expect(deletedProduct).toBeDefined();
    expect(deletedProduct).toEqual(willBeDeletedAddedProduct);

    const shouldBeUndefinedProduct = await productRepository.getProductById(deletedProduct.id);
    expect(shouldBeUndefinedProduct).toBeUndefined();

    const shouldBeDefinedProduct = await productRepository.getProductById(shouldStayAddedProduct.id);
    expect(shouldBeDefinedProduct).toBeDefined();




  });
  test('product should be updated', async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: 'China',
      }
    });


    const addedProduct = await productRepository.addProduct(testProduct);
    const updatedProduct = {...addedProduct, name: chance.name(), price: chance.natural()};
    const returnedUpdatedProduct = await productRepository.updateproduct(updatedProduct);
    expect(returnedUpdatedProduct).toBeDefined();
    expect(returnedUpdatedProduct.name).not.toBe(addedProduct.name);
    expect(returnedUpdatedProduct.price).not.toBe(addedProduct.price);
    expect(returnedUpdatedProduct.color).toBe(addedProduct.color)
  });
});
