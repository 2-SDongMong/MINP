import { UpdateResult } from 'typeorm';
import { RequestsController } from './requests.controller';

export const getRequestsByCursorSample = {
  data: [
    {
      request_id: 77,
      detail: 'dbeaver 타임존 수정 후!',
      reserved_begin_date: '2023-04-08',
      reserved_end_date: '2023-04-08',
      is_ongoing: true,
      updated_at: '2023-03-27T15:33:33.369Z',
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 73,
      detail: '테스트입니다! 시간 측정을 위한',
      reserved_begin_date: '2023-03-31',
      reserved_end_date: '2023-04-01',
      is_ongoing: true,
      updated_at: '2023-03-27T05:21:28.942Z',
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 72,
      detail: '이게 들어가나?!',
      reserved_begin_date: '2023-03-25',
      reserved_end_date: '2023-03-25',
      is_ongoing: false,
      updated_at: '2023-03-27T05:14:18.031Z',
      user: {
        nickname: '리베',
        address_bname: '대림동',
        cats: [
          {
            image:
              'https://minp.s3.amazonaws.com/cat_images/1679484445087_cat-2310384_1280.jpg',
          },
        ],
      },
    },
  ],
  pageOpt: {
    total: 33,
    take: 9,
    endCursor: 70,
    startCursor: 80,
    hasNextPage: false,
    hasPreviousPage: true,
  },
};

export const getRequestsByBnameAndCursorSample = {
  data: [
    {
      request_id: 77,
      user_id: 38,
      detail: 'dbeaver 타임존 수정 후!',
      reserved_begin_date: '2023-04-08',
      reserved_end_date: '2023-04-08',
      is_ongoing: true,
      created_at: '2023-03-27T15:33:33.369Z',
      updated_at: '2023-03-27T15:33:33.369Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 76,
      user_id: 38,
      detail: '테스트',
      reserved_begin_date: '2023-03-25',
      reserved_end_date: '2023-03-29',
      is_ongoing: true,
      created_at: '2023-03-27T13:55:04.842Z',
      updated_at: '2023-03-27T13:55:04.842Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 73,
      user_id: 38,
      detail: '테스트입니다! 시간 측정을 위한',
      reserved_begin_date: '2023-03-31',
      reserved_end_date: '2023-04-01',
      is_ongoing: true,
      created_at: '2023-03-27T02:12:30.598Z',
      updated_at: '2023-03-27T05:21:28.942Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 64,
      user_id: 38,
      detail: '너무 길게',
      reserved_begin_date: '2023-03-25',
      reserved_end_date: '2023-03-31',
      is_ongoing: true,
      created_at: '2023-03-23T06:38:45.049Z',
      updated_at: '2023-03-23T06:38:45.049Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 51,
      user_id: 38,
      detail:
        '끝 날짜보다 이를 수 없는 시작 날짜로 수정 완료!\n모리야 네가 고생이다',
      reserved_begin_date: '2023-03-31',
      reserved_end_date: '2023-04-01',
      is_ongoing: true,
      created_at: '2023-03-16T12:37:08.669Z',
      updated_at: '2023-03-23T06:58:34.332Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 49,
      user_id: 38,
      detail:
        'reserved_time => reserved_begin/end_date으로 변경했습니다. 잘 되는지 우선 Rest Client 테스트 중. ',
      reserved_begin_date: '2023-03-23',
      reserved_end_date: '2023-03-23',
      is_ongoing: true,
      created_at: '2023-03-16T02:21:22.017Z',
      updated_at: '2023-03-17T02:56:39.173Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
    {
      request_id: 11,
      user_id: 38,
      detail:
        '이틀 간 출장을 가게 되어서 신청합니다.\n화장실은 자동 화장실이라 밥이랑 물만 챙겨주시면 될 거 같아요!\n\n23일 저녁이랑 24일 점심 즈음 가능하신 분 계실까요?',
      reserved_begin_date: '2023-03-23',
      reserved_end_date: '2023-03-24',
      is_ongoing: true,
      created_at: '2023-03-06T10:42:18.738Z',
      updated_at: '2023-03-22T08:05:39.067Z',
      deleted_at: null,
      user: {
        nickname: '고양이만세',
        address_bname: '구로동',
        cats: [
          {
            image: '/img/cat9.jfif',
          },
        ],
      },
    },
  ],
  pageOpt: {
    take: 9,
    endCursor: 11,
    startCursor: 77,
  },
};

export const getRequestByIdSample = [
  {
    request_id: 77,
    detail: 'dbeaver 타임존 수정 후!',
    reserved_begin_date: '2023-04-08',
    reserved_end_date: '2023-04-08',
    is_ongoing: true,
    user: {
      user_id: 38,
      nickname: '고양이만세',
      address_bname: '구로동',
      cats: [
        {
          name: '화이트',
          age: 6,
          gender: '수',
          neutered: true,
          image: '/img/cat9.jfif',
          character:
            '조용한 개냥이 입니다. 사람을 졸졸 따라 다녀요. 애교만점입니다.',
        },
      ],
    },
  },
];

export const createRequestSample = {
  user_id: 38,
  detail: 'Rest Client로 테스트 코드 작성에 필요한 샘플 반환값 생성중. ',
  reserved_begin_date: '2023-04-27',
  reserved_end_date: '2023-04-27',
  deleted_at: null,
  request_id: 84,
  is_ongoing: true,
  created_at: '2023-03-31T01:51:55.914Z',
  updated_at: '2023-03-31T01:51:55.914Z',
};

export const mockRequestsService = {
  getRequestsByCursor: jest.fn(
    (endCursor?, take = 9) => getRequestsByCursorSample
  ),
  getRequestsByBnameAndCursor: jest.fn(
    (bname, endCursor?, take = 9) => getRequestsByBnameAndCursorSample
  ),
  getRequestById: jest.fn((requestId) => {
    return [
      {
        ...getRequestByIdSample[0],
        request_id: requestId,
      },
    ];
  }),
  createRequest: jest.fn((userId, dto) => {
    return {
      ...createRequestSample,
      user_id: userId,
      ...dto,
    };
  }),

  updateRequestById: jest.fn((userId, requestId, dto) => {
    const { reserved_begin_date, reserved_end_date, detail } = dto;

    let requestSample = getRequestByIdSample[0];
    requestSample.reserved_begin_date = reserved_begin_date;
    requestSample.reserved_end_date = reserved_end_date;
    requestSample.detail = detail;

    return undefined;
  }),

  updateRequestIsOngoing: jest.fn((userId, requestId, dto) => {
    const { is_ongoing } = dto;
    let requestSample = getRequestByIdSample[0];
    requestSample.is_ongoing = is_ongoing;

    return undefined;
  }),

  deleteRequestById: jest.fn((userId, requestId) => undefined),
};

export const mockRequestsRepository = {
  find: jest.fn(() => getRequestsByCursorSample),
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
