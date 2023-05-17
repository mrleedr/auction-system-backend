import { Item } from './item.entity';

describe('ItemEntity', () => {
  it('should be defined', () => {
    expect(new Item()).toBeDefined();
  });
});
