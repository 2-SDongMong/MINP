import {
    CacheModuleOptions,
    CacheOptionsFactory,
    Injectable,
  } from '@nestjs/common';
  import * as redisStore from 'cache-manager-ioredis';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class CacheConfigService implements CacheOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
  
    createCacheOptions(): CacheModuleOptions<Record<string, any>> {
      return {
        store: redisStore,
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
        password: this.configService.get<string>('REDIS_PASSWORD'),
        ttl: this.configService.get<number>('REDIS_TTL'),
        isGlobal: true,
      };
    }
  }