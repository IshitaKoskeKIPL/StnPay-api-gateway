import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PERMISSIONS_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PERMISSIONS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PERMISSIONS_SERVICE_PORT) || 3002,
        },
      },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
