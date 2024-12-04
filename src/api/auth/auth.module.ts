import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [AuthService],
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: { port: 8888 },
      },
      {
        name: 'AUTH_LEGACY_MICROSERVICE',
        transport: Transport.TCP,
        options: { port: 8891 },
      },
    ]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
