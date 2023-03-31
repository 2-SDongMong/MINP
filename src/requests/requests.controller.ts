import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  //커서 페이지네이션
  @Get()
  async getRequestsByCursor(@Query('endCursor') endCursor: number) {
    return await this.requestsService.getRequestsByCursor(endCursor);
  }

  //기존
  // @Get('/page/:page')
  // async getRequestsPagination(@Param('page') page: number) {
  //   return await this.requestsService.getRequestsPagination(page, 2);
  // }

  @Get('address/:bname')
  async getRequestsByBnameAndCursor(
    @Param('bname') bname: string,
    @Query('endCursor') endCursor: number
  ) {
    return await this.requestsService.getRequestsByBnameAndCursor(
      bname,
      endCursor
    );
  }

  // @Get('/address/:bname')
  // async getRequestsByAddressBname(@Param('bname') bname: string) {
  //   return await this.requestsService.getRequestsByAddressBname(bname);
  // }

  // //기존
  // @Get('/address/:bname/:page')
  // async getRequestsByAddressBnamePagination(
  //   @Param('bname') bname: string,
  //   @Param('page') page: number
  //   // @Query('page') page: number
  // ) {
  //   return await this.requestsService.getRequestsByAddressBnamePagination(
  //     bname,
  //     page,
  //     2
  //   );
  // }

  // // 기존 목록 조회
  // @Get()
  // async getRequests() {
  //   return await this.requestService.getRequests();
  // }

  @Get('/:id')
  async getRequestById(@Param('id') requestId: number) {
    return await this.requestsService.getRequestById(requestId);
  }

  @Post()
  async createRequest(@Req() req, @Body() data: CreateRequestDto) {
    return await this.requestsService.createRequest(req.userId, data);
  }

  @Patch('/:id')
  updateRequestById(
    @Req() req,
    @Param('id') requestId: number,
    @Body() data: UpdateRequestDto
  ) {
    // TODO:
    // if (data.detail && data.detail === '') {
    //   throw new BadRequestException(
    //     "When 'detail' is given, it should not be an empty string."
    //   );
    // }
    this.requestsService.updateRequestById(req.userId, requestId, data);
  }

  @Patch('/ongoing/:id')
  updateRequestIsOngoing(
    @Req() req,
    @Param('id') requestId: number,
    @Body() data: UpdateRequestDto
  ) {
    this.requestsService.updateRequestIsOngoing(req.userId, requestId, data);
  }

  @Delete('/:id')
  deleteRequestById(@Req() req, @Param('id') requestId: number) {
    this.requestsService.deleteRequestById(req.userId, requestId);
  }
}
