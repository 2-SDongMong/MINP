import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UserInfo } from 'src/users/user-info.decorator';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}

  @Get()
  async getRequests() {
    return await this.requestService.getRequests();
  }

  @Get('/:id')
  async getRequestById(@Param('id') requestId: number) {
    return await this.requestService.getRequestById(requestId);
  }

  @Post()
  createRequest(@UserInfo() user, @Req() req, @Body() data: CreateRequestDto) {
    // FIXME: 어째선지 req: Request (Express)타입을 지정해주면 제대로 인식하지 못함
    return this.requestService.createRequest(req.user, data);
  }

  @Patch('/:id')
  updateRequest(
    @Param('id') requestId: number,
    @Body() data: UpdateRequestDto
  ) {
    return this.requestService.updateRequestById(requestId, data);
  }

  @Delete('/:id')
  deleteRequest(@Param('id') requestId: number) {
    return this.requestService.deleteRequestById(requestId);
  }
}
