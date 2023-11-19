import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/stockmeta/search/HPQ Ticker search (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/stockmeta/search/AAPL')
      .expect(200);
  });
  it('/stockmeta/page Pagination (GET)', () => {
    return request(app.getHttpServer()).get('/api/stockmeta/page').expect(200);
  });
});
