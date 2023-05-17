import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { EntityManager } from 'typeorm';

describe('AppService', () => {
  let appService: AppService;
  let entityManagerMock: Partial<EntityManager>;

  beforeEach(async () => {
    entityManagerMock = {
      query: jest.fn(() => Promise.resolve('Success') as any), // Mocking the query method to resolve with a string value
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: EntityManager, useValue: entityManagerMock },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!" if the query is successful', async () => {
      const result = await appService.getHello();
      expect(result).toEqual('Hello World!');
      expect(entityManagerMock.query).toHaveBeenCalledWith('SELECT 1');
    });

    it('should return "Failed to connect to the database" if the query fails', async () => {
      entityManagerMock.query = jest.fn(() =>
        Promise.reject(new Error('Database connection error')),
      );

      const result = await appService.getHello();
      expect(result).toEqual('Failed to connect to the database');
    });
  });
});
