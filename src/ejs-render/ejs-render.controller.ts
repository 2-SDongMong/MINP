import { Controller, Get, Render, Req, Res } from '@nestjs/common';
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
  main(@Req() req) {
    console.log('/ GET, req.userId: ', req.userId);
    return { components: 'main', userId: req.userId };
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
  requestList(@Req() req) {
    return { components: 'requestList', userId: req.userId };
  }

  @Get('')
  @Render('index')
  requestDetail(@Req() req) {
    return { components: 'requestDetail' };
  }

  @Get('')
  @Render('index')
  requestPost(@Req() req) {
    return { components: 'requestPost' };
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

  @Get('boardList')
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
