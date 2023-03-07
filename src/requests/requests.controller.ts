import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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

  @Post()
  createRequest(@Req() request: Request, @Body() data: CreateRequestDto) {
    // FIXME: const userEmail = request.user;
    return this.requestService.createRequest(data);
  }

  @Patch()
  updateRequest(@Body() data: UpdateRequestDto) {}
}
