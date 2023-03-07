import { RtStrategiest } from '../config/rt.config.service';
import { AtStrategiest } from '../config/at.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from 'src/config/jwt.config.service';
import { UserService } from 'src/user/user.service';

@Module({
    imports:[
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtConfigService,
            inject: [ConfigService],
        }),
    ],
    providers:[AuthService, AtStrategiest, RtStrategiest,UserService],
    controllers: [AuthController],
})

export class AuthModule{}