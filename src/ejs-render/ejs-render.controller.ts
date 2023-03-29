import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { RequestsService } from '../requests/requests.service';
import { MessagesService } from '../messages/messages.service';
import { ProductsService } from '../share-modules/share-products/share-products.service';
import { ConfigService } from '@nestjs/config';
import { PostCategoryType } from '../posts/post.entity';
import { performance } from 'perf_hooks';

@Controller()
export class EjsRenderController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly postsService: PostsService,
    private readonly messagesService: MessagesService,
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService
  ) {}

  @Get('/')
  @Render('index')
  async main(@Req() req) {
    const start = performance.now();
    const posts = await this.postsService.getPosts();

    let requests;

    // 로그인 한 사용자이고 위치인증까지 마쳤다면
    // '사용자의 동네명 기반' 품앗이 최신 6개를 가져옴 (캐러셀용)
    if (req.user && req.user.address_certified) {
      requests = await this.requestsService.getRequestsByBnameAndCursor(
        req.user.address_bname,
        null,
        6
      );
    } else {
      requests = await this.requestsService.getRequestsByCursor(null, 6);
    }

    let products;
    products = await this.productsService.findAll();

    const end = performance.now();
    console.log('메인 페이지 로딩 시간: ', end - start);

    return {
      components: 'main',
      userId: req.userId,
      user: req.user,
      requests: requests.data,
      posts,
      products,
    };
  }

  @Get('/signUp')
  @Render('index')
  signUp(@Req() req) {
    return { components: 'signUp', userId: req.userId, user: req.user };
  }

  @Get('/mypage')
  @Render('index')
  myPage(@Req() req) {
    const KAKAO_APP_KEY = this.configService.get<string>('KAKAO_APP_KEY');
    return {
      components: 'myPage',
      userId: req.userId,
      KAKAO_APP_KEY,
      user: req.user,
    };
  }

  @Get('/admin')
  @Render('index')
  admin(@Req() req) {
    return { components: 'admin', userId: req.userId, user: req.user };
  }

  @Get('/login')
  @Render('index')
  login(@Req() req) {
    return { components: 'login', userId: req.userId, user: req.user };
  }

  @Get('/request')
  @Render('index')
  async requestList(@Req() req, @Query('endCursor') endCursor: number) {
    let requests;
    if (req.user && req.user.address_certified) {
      requests = await this.requestsService.getRequestsByBnameAndCursor(
        req.user.address_bname,
        endCursor
      );
    } else {
      requests = await this.requestsService.getRequestsByCursor(endCursor);
    }

    return {
      components: 'requestList',
      userId: req.userId,
      user: req.user,
      requests,
    };
  }

  @Get('request/detail/:id')
  @Render('index')
  async requestDetail(@Param('id') id: number, @Req() req, @Res() res) {
    if (!req.user) {
      // FIXME: 로그인이 필요합니다 메세지를 보내며 redirect 하는 방법 찾기
      // 혹인 일괄 핸들링 방법 찾기.
      return res.status(401).redirect('/login');
    }
    const request = await this.requestsService.getRequestById(id);
    return {
      components: 'requestDetail',
      userId: req.userId,
      request: request[0],
      user: req.user,
    };
  }

  @Get('request/post')
  @Render('index')
  requestPost(@Req() req) {
    return { components: 'requestPost', userId: req.userId, user: req.user };
  }

  @Get('request/modify/:id')
  @Render('index')
  async requestModify(@Param('id') id: number, @Req() req) {
    const request = await this.requestsService.getRequestById(id);
    return {
      components: 'requestModify',
      userId: req.userId,
      request: request[0],
      user: req.user,
    };
  }

  @Get('/shareList')
  @Render('index')
  async ShareList(@Req() req) {
    const products = await this.productsService.findAll();
    return {
      components: 'shareList',
      userId: req.userId,
      products,
      user: req.user,
    };
  }

  @Get('/shareDetail/:id')
  @Render('index')
  async ShareDetail(@Param('id') id: string, @Req() req) {
    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return {
      components: 'shareDetail',
      userId: req.userId,
      product,
      user: req.user,
    };
  }

  @Get('/shareMy')
  @Render('index')
  async ShareMy(@Req() req) {
    const userId = req.userId;
    const sm = await this.productsService.findProductsByUserId(userId);
    console.log('Products:', sm); // Add log here
    if (!sm) {
      throw new NotFoundException(`Product with user id ${userId} not found`);
    }
    return {
      components: 'shareMy',
      userId: userId,
      sm,
      product: sm,
      user: req.user,
    };
  }

  @Get('/shareProduct')
  @Render('index')
  ShareProduct(@Req() req) {
    return { components: 'shareProduct', userId: req.userId, user: req.user };
  }

  //커서
  @Get('boardList')
  @Render('index')
  async boardList(@Req() req, @Query('endCursor') endCursor: number) {
    console.log('ejs render controller ===>', 'endCursor', endCursor);
    const posts = await this.postsService.getPostsByCursor(endCursor);
    return {
      components: 'boardList',
      userId: req.userId,
      user: req.user,
      posts,
    };
  }

  // //오프셋
  // @Get('boardList')
  // @Render('index')
  // async boardList(@Req() req, @Query('page') pageNum: number) {
  //   const posts = await this.postsService.getPosts(pageNum);
  //   return { components: 'boardList', userId: req.userId, user: req.user, posts };
  // }

  @Get('boardList/:category')
  @Render('index')
  async boardListCtg(
    @Req() req,
    @Param('id') postId: number,
    @Param('category') postCategory: PostCategoryType
  ) {
    const posts = await this.postsService.getPostByCategory(
      postId,
      postCategory
    );
    return {
      components: 'boardListCtg',
      userId: req.userId,
      posts,
      user: req.user,
    };
  }

  @Get('boardDetail/:id')
  @Render('index')
  async boardDetail(@Req() req, @Param('id') postId: number) {
    const post = await this.postsService.getPostById(postId);
    return {
      components: 'boardDetail',
      userId: req.userId,
      post: post[0],
      user: req.user,
    };
  }

  @Get('board/post')
  @Render('index')
  async boardPost(@Req() req) {
    return { components: 'boardPost', userId: req.userId, user: req.user };
  }

  @Get('board/modify/:id')
  @Render('index')
  async boardModify(@Param('id') id: number, @Req() req) {
    const post = await this.postsService.getPostById(id);
    return { components: 'boardModify', userId: req.userId, post: post[0] };
  }

  @Get('/message/:type')
  @Render('index')
  async receivedMessages(@Req() req, @Param('type') messageType: string) {
    let messages;
    if (messageType == 'received') {
      messages = await this.messagesService.getReceivedMessages(req.userId);
    } else if (messageType == 'sent') {
      messages = await this.messagesService.getSentMessages(req.userId);
    } else {
      messages = await this.messagesService.getUnreadMessages(req.userId);
    }
    
    return {
      components: 'message',
      userId: req.userId,
      messages,
      user: req.user,
    };
  }
}
