import { UpdateResult } from 'typeorm';

export const getRequestsSample = [
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

export const getRequestByIdSample = {
  request_id: 26,
  detail: '하루 낮 냥품 요청해요!',
  reserved_time: '2023-03-31',
  user: {
    user_id: 30,
    nickname: 'Nick Again4',
    cats: [],
  },
};

export const createRequestSample = {
  user_id: 1,
  detail: '냥품 신청합니다',
  reserved_time: '2023-05-05',
  deleted_at: null,
  request_id: 26,
  created_at: '2023-03-11T04:46:27.466Z',
  updated_at: '2023-03-11T04:46:27.466Z',
};

export const mockRequestsRepository = {
  find: jest.fn(() => getRequestsSample),
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

export const mockRequestsService = {
  getRequests: jest.fn(() => getRequestsSample),
  getRequestById: jest.fn((requestId) => {
    return {
      ...getRequestByIdSample,
      request_id: requestId,
    };
  }),
  createRequest: jest.fn((req, dto) => {
    return {
      ...createRequestSample,
      user_id: 1,
      ...dto,
    };
  }),
  updateRequestById: jest.fn((requestId, dto) => undefined),
  deleteRequestById: jest.fn((requestId) => undefined),
};
