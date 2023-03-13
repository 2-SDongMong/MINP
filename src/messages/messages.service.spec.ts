import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/user.entity';
import { Message } from './message.entity';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

/* FIXME: 작성중. requests 모듈의 테스트 코드를 참고해주세요.

Unit(단위) 테스트: 
  src/requests/requests.controller.spec.ts,
  src/requests/requests.service.spec.ts,

Integration(통합, e2e) 테스트: 
  test/requests.e2e-spec.ts
*/

const user: User = {
  user_id: 1,
  address: '서울시 성북구',
  email: '',
  nickname: 'Nick',
  name: 'name',
  phone_number: '',
  password: '',
  status: '가입 대기',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  hashdRt: null,
  cat_likes: [],
  cats: [],
  share_comments: [],
  post_comments: [],
  posts: [],
  receive_messages: [],
  referral_code: '',
  requests: [],
  send_messages: [],
  share_posts: [],
  share_products: [],
  target_user_likes: [],
  user_likes: [],
};
const message: Partial<Message> = {
  message_id: 1,
  sender_id: 2,
  recipient_id: 3,
  content: '냥품 지원합니다!',
  // created_at: new Date(),
  // deleted_at: null,
  // send_user: user,
  // receive_user: user,
};

const mockMessagesRepository = {
  // return {
  getMessageById: jest.fn(),
  getMessages: jest.fn(),
  getReceivedMessages: jest.fn(),
  getSentMessages: jest.fn(),
  createMessage: jest.fn().mockImplementation((dto) => dto),
  deleteMessage: jest.fn(),
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest
    .fn()
    .mockImplementation((message) => Promise.resolve({ id: 1, ...message })),
  // };
};

describe('MessagesService', () => {
  let service: MessagesService;
  // let repository: jest.Mocked<MessagesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        // {
        //   provide: MessagesRepository,
        //   useFactory: mockMessagesRepository,
        // },
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessagesRepository,
        },
      ],
    })
      // .overrideProvider(MessagesRepository)
      // .useValue(mockMessagesRepository)
      .compile();

    service = module.get<MessagesService>(MessagesService);
    // repository = module.get(MessagesRepository);
  });

  describe('getMessageById', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a new message and return that', async () => {
      expect(await service.create({ content: '네 그 때 갈게요!' })).toEqual({
        id: expect.any(Number),
        content: '네 그 때 갈게요!',
      });
    });

    // it('should call repository', async () => {
    //   // const spy = jest.spyOn(repository, 'getMessageById').mockResolvedValue(message);
    //   repository.getMessageById.mockResolvedValue(message);
    //   expect(await service.getMessageById(1)).toStrictEqual(message);
    //   expect(repository.getMessageById).toBeCalledWith(1);
    // });
    // it('should return null', () => {
    //   expect(typeof MessagesService.getMessageById('1')).not.equal(null);
    // });
    // it('should throw error for an invalid id', async () => {
    //   service.getMessageById.mockRejectedValue(
    //     new Error('Message not found. id: -1')
    //   );
    //   expect.assertions(1);
    //   try {
    //     await service.getMessageById(-1);
    //   } catch (e) {
    //     expect(e).toEqual({
    //       error: 'Message nod found. id: -1',
    //     });
    //   }
    //   await expect(service.getMessageById(-1)).rejects.toEqual({
    //     error: 'Message not found. id: -1',
    //   });
    // });
  });

  // describe('getMessages', () => {
  //   it('should call repository', async () => {
  //     const allMessages: Message[] = [
  //       {
  //         message_id: 1,
  //         sender_id: 1,
  //         recipient_id: 2,
  //         content: '달콩이 돌봐드리러 가도 될까요? 품앗이 신청합니다!',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //       {
  //         message_id: 2,
  //         sender_id: 10,
  //         recipient_id: 2,
  //         content: '그럼 그렇게 알고 있겠습니다!',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //     ];
  //     repository.getMessages.mockResolvedValue(allMessages);
  //     expect(await service.getMessages()).toStrictEqual(allMessages);
  //     expect(repository.getMessages).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('getReceivedMessages', () => {
  //   it('should return messages where "recipient_id: 2"', async () => {
  //     const allReceivedMessages: Message[] = [
  //       {
  //         message_id: 1,
  //         sender_id: 1,
  //         recipient_id: 2,
  //         content: '달콩이 돌봐드리러 가도 될까요? 품앗이 신청합니다!',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //       {
  //         message_id: 7,
  //         sender_id: 10,
  //         recipient_id: 2,
  //         content: '네네 괜찮습니다.',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //       {
  //         message_id: 3,
  //         sender_id: 1,
  //         recipient_id: 2,
  //         content: '그럼 그렇게 알고 있겠습니다!',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //     ];
  //     repository.getReceivedMessages.mockResolvedValue(allReceivedMessages);
  //     expect(await service.getReceivedMessages()).toStrictEqual(
  //       allReceivedMessages
  //     );
  //     expect(repository.getReceivedMessages).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('getSentMessages', () => {
  //   it('should return messages where "recipient_id: 2"', async () => {
  //     const allSentMessages: Message[] = [
  //       {
  //         message_id: 1,
  //         sender_id: 1,
  //         recipient_id: 2,
  //         content: '달콩이 돌봐드리러 가도 될까요? 품앗이 신청합니다!',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //       {
  //         message_id: 7,
  //         sender_id: 10,
  //         recipient_id: 2,
  //         content: '네네 괜찮습니다.',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //       {
  //         message_id: 3,
  //         sender_id: 1,
  //         recipient_id: 2,
  //         content: '그럼 그렇게 알고 있겠습니다!',
  //         created_at: new Date(),
  //         deleted_at: null,
  //         send_user: user,
  //         receive_user: user,
  //       },
  //     ];
  //     repository.getSentMessages.mockResolvedValue(allSentMessages);
  //     expect(await service.getSentMessages()).toStrictEqual(allSentMessages);
  //     expect(repository.getSentMessages).toHaveBeenCalledTimes(1);
  //   });
  // });
});
