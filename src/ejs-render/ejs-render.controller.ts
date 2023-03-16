import { Controller, Get, Param, Render, Req, Res } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { RequestsService } from 'src/requests/requests.service';
import { MessagesService } from 'src/messages/messages.service'
@Controller()
export class EjsRenderController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly postsService: PostsService,
    private readonly messagesService: MessagesService
  ) {}

  @Get('/')
  @Render('index')
  main(@Req() req) {
    console.log('/ GET, req.userId: ', req.userId);
    return { components: 'main', userId: req.userId };
  }

  @Get('/signUp')
  @Render('index')
  signUp(@Req() req){
    return { components: 'signUp', userId: req.userId  };
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

  @Get('/message/:type')
  @Render('index')
  async receivedMessages(@Req() req,@Param('type') messageType:string) {
    let messages
    if(messageType=='received'){
      messages = await this.messagesService.getReceivedMessages(req.userId);
    } else if(messageType=='sent'){
      messages = await this.messagesService.getSentMessages(req.userId);
    } else{
      messages = await this.messagesService.getUnreadMessages(req.userId);
    }

    return { components: 'message', userId: req.userId, messages };
  }
}
