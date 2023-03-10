import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import { Message } from './message.entity';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';
const mockMessagesRepository = () => {
  return {
    getMessageById: jest.fn(),
  };
};

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

describe('MessagesService', () => {
  let service: MessagesService;
  let repository: jest.Mocked<MessagesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: MessagesRepository,
          useFactory: mockMessagesRepository,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    repository = module.get(MessagesRepository);
  });

  describe('getMessageById', () => {
    it('should call repository', async () => {
      // const spy = jest.spyOn(repository, 'getMessageById').mockResolvedValue(message);
      repository.getMessageById.mockResolvedValue(message);
      expect(await service.getMessageById(1)).toStrictEqual(message);
      expect(repository.getMessageById).toBeCalledWith(1);
    });
  });
});

// describe('MessagesService', () => {
//   let service: MessagesService;
//   let repository: MessagesRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [MessagesService, MessagesRepository, DataSource],
//     }).compile();

//     service = module.get<MessagesService>(MessagesService);
//     repository = module.get<MessagesRepository>(MessagesRepository);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('getMessageById', () => {
//     // repository를 호출하는지 E검사
//     it('should call repository', async () => {
//       const message = {
//         message_id: 1,
//         sender_id: 2,
//         recipient_id: 3,
//         content: '냥품 지원합니다!',
//       };
//       // const spy = jest.spyOn(repository, 'getMessageById').mockResolvedValue(message);
//       expect(await service.getMessageById(1)).toStrictEqual(message);
//       // expect(spy).toBeCalledWith(1);
//     });
//   });
// });
