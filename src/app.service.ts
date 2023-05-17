import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getHello(): Promise<string> {
    try {
      // try to execute a simple SQL query
      await this.entityManager.query('SELECT 1');
      return 'Hello World!';
    } catch (error) {
      console.error(error);
      return 'Failed to connect to the database';
    }
  }
}
