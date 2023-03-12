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

  @Get()
  async getRequests() {
    return await this.requestService.getRequests();
  }

  @Get('/:id')
  async getRequestById(@Param('id') requestId: number) {
    return await this.requestService.getRequestById(requestId);
  }

  @Post()
  async createRequest(@Req() req, @Body() data: CreateRequestDto) {
    // FIXME: 어째선지 req: Request (Express)타입을 지정해주면 제대로 인식하지 못함
    if (data.detail === '') {
      throw new BadRequestException(
        "Required data 'detail' should not be an empty string."
      );
    }
    return await this.requestService.createRequest(req.user, data);
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
    this.requestService.updateRequestById(req.user, requestId, data);
  }

  @Delete('/:id')
  deleteRequestById(@Req() req, @Param('id') requestId: number) {
    this.requestService.deleteRequestById(req.user, requestId);
  }
}
