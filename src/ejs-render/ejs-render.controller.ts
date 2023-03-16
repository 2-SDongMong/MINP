import { Controller, Get, Param, Render, Req, Res } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { RequestsService } from 'src/requests/requests.service';

@Controller()
export class EjsRenderController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly postsService: PostsService
  ) {}

  @Get('/')
  @Render('index')
  async main(@Req() req) {
    console.log('/ GET, req.userId: ', req.userId);
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

  @Get('/user/mypage')
  @Render('index')
  myPage(@Req() req) {
    return { components: 'myPage', user: req.user };
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

  @Get('')
  @Render('index')
  shareList(@Req() req) {
    return { components: 'shareList' };
  }

  @Get('')
  @Render('index')
  shareDetail(@Req() req) {
    return { components: 'shareDetail' };
  }

  @Get('')
  @Render('index')
  sharePost(@Req() req) {
    return { components: 'sharePost' };
  }

  @Get('')
  @Render('index')
  boardList(@Req() req) {
    return { components: 'boardList' };
  }

  @Get('')
  @Render('index')
  boardDetail(@Req() req) {
    return { components: 'boardDetail' };
  }

  @Get('')
  @Render('index')
  boardPost(@Req() req) {
    return { components: 'boardPost' };
  }

  @Get('')
  @Render('index')
  message(@Req() req) {
    return { components: 'message' };
  }
}
