import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer())
      .post('/api/login');
    token = res.body.data;
  });

  afterAll(() => {
    app.close();
  })
  it('/cats/hello (GET)', async done => {
    const res = await request(app.getHttpServer())
            .get('/cats/hello')
            .set('token', token);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ test: 1 });
    done();
  });
});
