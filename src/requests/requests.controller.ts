import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}

  // 오프셋 페이지네이션 
  @Get()
  async getRequests(@Param('page') page: number = 1) {
    return await this.requestService.getRequests(page);
  }

  // // 기존 목록 조회
  // @Get()
  // async getRequests() {
  //   return await this.requestService.getRequests();
  // }

  @Get('/:id')
  async getRequestById(@Param('id') requestId: number) {
    return await this.requestService.getRequestById(requestId);
  }

  @Post()
  createRequest(@Req() req, @Body() data: CreateRequestDto) {
    return this.requestService.createRequest(req.userId, data);
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
    this.requestService.updateRequestById(req.userId, requestId, data);
  }

  @Delete('/:id')
  deleteRequestById(@Req() req, @Param('id') requestId: number) {
    this.requestService.deleteRequestById(req.userId, requestId);
  }
}
