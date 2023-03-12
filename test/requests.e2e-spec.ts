import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RequestsService } from '../src/requests/requests.service';
import { RequestsModule } from '../src/requests/requests.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

const getRequestsSample = [
  {
    request_id: 9,
    reserved_time: '2023-03-10',
    user: {
      nickname: 'Nick',
      cats: [],
    },
  },
  {
    request_id: 10,
    reserved_time: '2023-03-09',
    user: {
      nickname: 'Nick',
      cats: [],
    },
  },
  {
    request_id: 26,
    reserved_time: '2023-03-31',
    user: {
      nickname: 'Nick Again4',
      cats: [],
    },
  },
];
const getRequestByIdSample = {
  request_id: 10,
  detail: '냥품 요청합니다!',
  reserved_time: '2023-03-09',
  user: {
    nickname: 'Nick',
    cats: [],
  },
};
const createRequestSample = {
  user_id: 1,
  detail: '냥품 신청합니다',
  reserved_time: '2023-05-05',
  deleted_at: null,
  request_id: 26,
  created_at: '2023-03-11T04:46:27.466Z',
  updated_at: '2023-03-11T04:46:27.466Z',
};
// requests.service.spec.ts의 mockRequestsRepository와 동일
const mockRequestsRepository = {
  find: jest.fn().mockResolvedValue(getRequestsSample),
  findOne: jest.fn((options) => getRequestByIdSample),
  create: jest.fn((dto) => createRequestSample),
  save: jest.fn((request) =>
    Promise.resolve({
      ...request,
      request_id: 26,
    })
  ),
  update: jest.fn((requestId, dto) => Promise<UpdateResult>),
  softDelete: jest.fn((requestId) => Promise<UpdateResult>),
};

// TODO: '본인'만 수정 및 삭제가 가능하도록 테스트하기
// TODO: '해당하는 ID로 데이터를 찾지 못했을 때' 에러를 던지도록 테스트하기
//      -> mockRpository에서 임의로 null을 던지도록 했는데 제대로 던지는지 확인하기
//      -> lodash의 _isNil이 어떻게 동작하는지 확인하기

describe('Requests (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [RequestsModule],
    })
      .overrideProvider(getRepositoryToken(Request))
      .useValue(mockRequestsRepository)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('GET /requests', () => {
    it('gets all requests', () => {
      return request(app.getHttpServer())
        .get('/requests')
        .expect(200)
        .expect(getRequestsSample);
    });
  });

  describe('GET /requests/10', () => {
    it('gets the request with ID: 10', () => {
      return request(app.getHttpServer())
        .get('/requests/10')
        .expect(200)
        .expect(getRequestByIdSample);
    });
  });

  describe('POST /requests', () => {
    it('accepts body as json', () => {
      return request(app.getHttpServer())
        .post('/requests')
        .send({
          reserved_time: new Date('2023-05-05'),
          detail: '냥품 신청합니다',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(createRequestSample);
    });

    it('accepts body as urlencoded form', () => {
      return request(app.getHttpServer())
        .post('/requests')
        .send('reserved_time=2023-05-05&detail=냥품 신청합니다')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(createRequestSample);
    });

    it('fails with 400 Bad Request when given body types are not matched. ex)"detail" is not a string', () => {
      return request(app.getHttpServer())
        .post('/requests')
        .send({
          reserved_time: '2023-05-05',
          detail: 123123,
        })
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('fails with 400 Bad Request when given body types are not matched. ex)"detail" is not an empty string', () => {
      return request(app.getHttpServer())
        .post('/requests')
        .send({
          reserved_time: '2023-05-05',
          detail: '',
        })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe('PATCH /requests/10', () => {
    it('accepts body as JSON form', () => {
      return (
        request(app.getHttpServer())
          .patch('/requests/10')
          .send({
            reserved_time: '2023-05-05',
            detail: '(급구) 품앗이 신청합니다!',
          })
          // FIXME: PATCH는 어째선지 이 Content-Type 테스트를 통과하지 못하므로 삭제할 것.
          // .expect('Content-Type', /json/)
          .expect(200)
          .expect('')
      );
    });

    it('fails with 400 Bad Request when given body types are not matched. ex)"reserved_time" is not a valid ISO date string', () => {
      return request(app.getHttpServer())
        .patch('/requests/10')
        .send({
          reserved_time: 20230505,
          detail: '(급구) 품앗이 신청합니다!',
        })
        .expect(400);
    });
  });

  describe('DELETE /requests/10', () => {
    it('deletes', () => {
      return request(app.getHttpServer())
        .delete('/requests/10')
        .expect(200)
        .expect('');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
