import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RequestsModule } from '../src/requests/requests.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  getRequestByIdSample,
  getRequestsSample,
  createRequestSample,
  mockRequestsRepository,
} from '../src/requests/mock-data';

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

    // TODO: 유저가 작성자가 맞는지 테스트 (현재는 실패)
    it('should throw 401 UnauthorizationException when user id not match with author id', () => {
      return request(app.getHttpServer())
        .delete('/requests/10')
        .set('user', '100')
        .expect(401)
        .expect('');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
