import { Controller, Get, Render, Req, Res } from '@nestjs/common';

@Controller()
export class EjsRenderController {
  @Get('/')
  @Render('index')
  main(@Req() req): { components: string; userId: number } {
    console.log('/ GET, req.userId: ', req.userId);
    return { components: 'main', userId: req.userId };
  }

  @Get('/signUp')
  @Render('index')
  signUp(@Req() req): { components: string; userId: number } {
    return { components: 'signUp', userId: req.userId };
  }

  @Get('/user/mypage')
  @Render('index')
  // FIXME: 로그인 페이지 완성 돼서 토큰값 받아오게 되면 수정하기
  myPage(@Req() req): { components: string; userId: number } {
    return { components: 'myPage', userId: req.userId };
  }

  @Get('')
  @Render('index')
  admin(@Req() req): { components: string } {
    return { components: 'admin' };
  }

  @Get('/login')
  @Render('index')
  login(@Req() req): { components: string; userId: number } {
    return { components: 'login', userId: req.userId };
  }

  @Get('/request/list')
  @Render('index')
  requestList(@Req() req): { components: string; userId: number } {
    return { components: 'requestList', userId: req.userId };
  }

  @Get('')
  @Render('index')
  requestDetail(@Req() req): { components: string } {
    return { components: 'requestDetail' };
  }

  @Get('')
  @Render('index')
  requestPost(@Req() req): { components: string } {
    return { components: 'requestPost' };
  }

  @Get('')
  @Render('index')
  shareList(@Req() req): { components: string } {
    return { components: 'shareList' };
  }

  @Get('')
  @Render('index')
  shareDetail(@Req() req): { components: string } {
    return { components: 'shareDetail' };
  }

  @Get('')
  @Render('index')
  sharePost(@Req() req): { components: string } {
    return { components: 'sharePost' };
  }

  @Get('')
  @Render('index')
  boardList(@Req() req): { components: string } {
    return { components: 'boardList' };
  }

  @Get('')
  @Render('index')
  boardDetail(@Req() req): { components: string } {
    return { components: 'boardDetail' };
  }

  @Get('')
  @Render('index')
  boardPost(@Req() req): { components: string } {
    return { components: 'boardPost' };
  }

  @Get('')
  @Render('index')
  message(@Req() req): { components: string } {
    return { components: 'message' };
  }
}
