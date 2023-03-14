import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class EjsRenderController {
  @Get('/')
  @Render('index')
  index(@Req() req): { components: string; user: string } {
    return { components: 'main', user: '1' };
  }

  @Get('')
  @Render('index')
  signUp(@Req() req): { components: string } {
    return { components: 'signUp' };
  }

  @Get('/user/mypage')
  @Render('index')
  // FIXME: 로그인 페이지 완성 돼서 토큰값 받아오게 되면 수정하기
  myPage(@Req() req): { components: string; user: string } {
    return { components: 'myPage', user: '1' };
  }

  @Get('')
  @Render('index')
  admin(@Req() req): { components: string } {
    return { components: 'admin' };
  }

  @Get('')
  @Render('index')
  requestList(@Req() req): { components: string } {
    return { components: 'requestList' };
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

  @Get('/shareProduct')
  @Render('index')
  sharePost(@Req() req): { components: string; user: string } {
    return { components: 'shareProduct', user: '1' };
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
