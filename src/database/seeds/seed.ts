import { DataSource } from 'typeorm';
import { AppDataSource } from './../connection/index';

export abstract class Seed {
  protected dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  public async init() {
    try {
      this.dataSource = await this.dataSource.initialize();
    } catch (e) {
      const err: Error = e as any;
      console.error(err.message, err.stack);
    }
  }
}
