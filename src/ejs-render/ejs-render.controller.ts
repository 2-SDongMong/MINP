import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostsService } from 'src/posts/posts.service';
import { RequestsService } from 'src/requests/requests.service';
import { MessagesService } from 'src/messages/messages.service';
import { ProductsService } from 'src/share-modules/share-products/share-products.service';
@Controller()
export class EjsRenderController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly postsService: PostsService,
    private readonly messagesService: MessagesService,
    private readonly productsService: ProductsService
  ) {}

  @Get('/')
  @Render('index')
  async main(@Req() req) {
    const requests = await this.requestsService.getRequests();
    return {
      components: 'main',
      userId: req.userId,
      requests: requests.slice(0, 6),
    };
  }

  @Get('/signUp')
  @Render('index')
  signUp(@Req() req) {
    return { components: 'signUp', userId: req.userId };
  }

  @Get('/mypage')
  @Render('index')
  myPage(@Req() req) {
    return { components: 'myPage', userId: req.userId, user: req.user };
  }

  @Get('')
  @Render('index')
  admin(@Req() req) {
    return { components: 'admin' };
  }

  @Get('/login')
  @Render('index')
  login(@Req() req) {
    return { components: 'login', userId: req.userId };
  }

  @Get('/request/list')
  @Render('index')
  async requestList(@Req() req) {
    const requests = await this.requestsService.getRequests();
    return { components: 'requestList', userId: req.userId, requests };
  }

  @Get('requestDetail/:id')
  @Render('index')
  async requestDetail(@Param('id') id: number, @Req() req) {
    const request = await this.requestsService.getRequestById(id);
    return {
      components: 'requestDetail',
      userId: req.userId,
      request: request[0],
    };
  }

  @Get('request/post')
  @Render('index')
  requestPost(@Req() req) {
    return { components: 'requestPost', userId: req.userId };
  }

  @Get('/shareList')
  @Render('index')
  async ShareList(@Req() req) {
    const products = await this.productsService.findAll();
    return {
      components: 'shareList',
      userId: req.userId,
      products,
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
    };
  }

  @Get('/shareProduct')
  @Render('index')
  ShareProduct(@Req() req) {
    return { components: 'shareProduct', userId: req.userId };
  }

  @Get('boardList')
  @Render('index')
  async boardList(@Req() req, @Query('page') pageNum: number) {
    const posts = await this.postsService.getPosts(pageNum);
    console.log(posts);
    return { components: 'boardList', userId: req.userId, posts };
  }

  @Get('boardDetail/:id')
  @Render('index')
  async boardDetail(@Req() req, @Param('id') postId: number) {
    const post = await this.postsService.getPostById(postId);
    return { components: 'boardDetail', userId: req.userId, post };
  }

  @Get('boardPost')
  @Render('index')
  async boardPost(@Req() req) {
    return { components: 'boardPost', userId: req.userId };
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

    return { components: 'message', userId: req.userId, messages };
  }
}
