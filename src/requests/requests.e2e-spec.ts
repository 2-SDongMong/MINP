// import * as request from 'supertest';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsModule } from './requests.module';

describe('Requests', () => {
  let app: INestApplication;
  const getRequestsResult = [
    {
      request_id: 5,
      reserved_time: '0000-00-00',
      user: {
        nickname: 'Nick',
        cats: [],
      },
    },
    {
      request_id: 6,
      reserved_time: '0000-00-00',
      user: {
        nickname: 'Nick',
        cats: [],
      },
    },
  ];
  const getRequestByIdResult = {
    request_id: 10,
    detail: '냥품 요청합니다!',
    reserved_time: '2023-03-09',
    user: {
      nickname: 'Nick',
      cats: [],
    },
  };
  const createRequestResult = {}; // 특이사항 201
  const updateRequestByIdResult = ''; // null?
  const deleteRequestByIdResult = '';
  let requestsService = {
    getRequests: () => getRequestsResult,
    getRequestById: (id) => getRequestByIdResult, // ? params로 받는 값을 어떻게 넣어주지.
    createRequest: () => createRequestResult,
    updateRequestById: () => updateRequestByIdResult,
    deleteRequestById: () => deleteRequestByIdResult,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [RequestsModule],
    })
      .overrideProvider(RequestsService)
      .useValue(requestsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET requests', () => {
    return request(app.getHttpServer())
      .get('/requests')
      .expect(200)
      .expect({ data: requestsService.getRequests() });
  });

  it('/GET requests/10', () => {
    return request(app.getHttpServer())
      .get('/requests/10')
      .expect(200)
      .expect({ data: requestsService.getRequestById() });
  });

  it('/POST requests', () => {
    return request(app.getHttpServer())
      .post('/requests')
      .expect(201)
      .expect({ data: requestsService.createRequest() });
  });

  it('/PATCH requests', () => {
    return request(app.getHttpServer())
      .patch('/requests/10')
      .expect(200)
      .expect({ data: requestsService.updateRequestById() });
  });

  it('/DELETE requests', () => {
    return request(app.getHttpServer())
      .delete('/requests')
      .expect(200)
      .expect({ data: requestsService.deleteRequestById() });
  });

  afterAll(async () => {
    await app.close();
  });
});
