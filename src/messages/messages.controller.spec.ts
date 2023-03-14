import { Test, TestingModule } from '@nestjs/testing';
import { UserId } from 'src/auth/decorator/get-current-userid.decorator';
import { User } from '../../src/users/user.entity';
import { Message } from './message.entity';
import { MessagesController } from './messages.controller';
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

const sampleMessage: Message = {
  message_id: 22,
  sender_id: 1,
  recipient_id: 2,
  content: '첫 쪽지',
  created_at: new Date(),
  sender_deleted_at: null,
  recipient_deleted_at: null,
  read_at:null,
  send_user: user,
  receive_user: user,
};

const sampleMessages: Message[] = [
  sampleMessage,
  { ...sampleMessage, content: '두 번째 쪽지' },
  { ...sampleMessage, content: '세 번째 쪽지' },
];

const mockMessagesService = {
  getMessageById: jest.fn((message_id) => {
    return { message_id, ...sampleMessage };
  }),
  getReceivedMessages: jest.fn(),
  getSentMessages: jest.fn(),
  createMessage: jest.fn((userId, dto) => {
    return {
      message_id: 1,
      ...dto,
    };
  }),
  deleteMessage: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    })
      .overrideProvider(MessagesService)
      .useValue(mockMessagesService)
      .compile();

    controller = module.get<MessagesController>(MessagesController);

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // sample 1.
  describe('getMessageById', () => {
    it('should get the message with id: 1', async () => {
      const message_id = 1;
      await expect(controller.getMessageById(message_id,1)).resolves.toEqual({
        message_id: expect.any(Number),
        ...sampleMessage,
      });

      // await controller.getMessageById()
      expect(mockMessagesService.getMessageById).toHaveBeenCalledWith(
        message_id,user_id
      );
    });
  });

  // sample 2.
  describe('getReceivedMessages', () => {
    // 이와 같은 테스트를 하려면 controller 소스 코드에서도 Express 형식대로 (req, res, next)를 사용해야 한다. 지금은 사용하지 않고 있으므로 무효한 테스트.
    it('should get the messages with receipent_id: 2', async () => {
      const receipentId = 2;
      await controller.getReceivedMessages(receipentId);

      expect(mockMessagesService.getReceivedMessages).toHaveBeenCalledTimes(1);

      expect(mockResponse.status).toHaveBeenCalledTimes(2);
      expect(mockResponse.status).toHaveBeenCalledWith(200);

      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });

  // sample 3.
  // describe('createMessage', () => {
  //   it('should create a message', async () => {
  //     const dto = { content: '잘 부탁드립니다!',recipient_id:1 };

  //     expect(controller.createMessage(mockRequest, dto)).not.toEqual(null);

  //     expect(mockMessagesService.createMessage).toHaveBeenCalledWith(dto);
  //   });
  // });
});
