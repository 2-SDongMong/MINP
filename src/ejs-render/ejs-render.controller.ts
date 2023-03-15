import { Controller, Get, Param, Render, Req, Res } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { RequestsService } from 'src/requests/requests.service';
import { ProductsService } from 'src/share-modules/share-products/share-products.service';

@Controller()
export class EjsRenderController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly postsService: PostsService,
    private readonly productsService: ProductsService
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

  @Get('/shareList')
  @Render('index')
  async ShareList(@Req() req) {
    const products = await this.productsService.findAll();
    return { components: 'shareList', userId: req.userId, products };
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
