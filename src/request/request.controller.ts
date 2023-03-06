import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestService } from './request.service';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

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
