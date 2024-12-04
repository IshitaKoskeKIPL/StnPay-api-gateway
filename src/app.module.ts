import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BillsModule } from './api/bills/bills.module';
import { AuthModule } from './api/auth/auth.module';
import { FundTransferLegacyModule } from './api/fund-transfer-legacy/fund-transfer.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RechargeModule } from './api/recharge/recharge.module';
import { UserModule } from './api/user/user.module';
import { AccountsModule } from './api/accounts/accounts.module';
import { FundTransferModule } from './api/fund-transfer/fund-transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'MASTER_MICROSERVICE',
        transport: Transport.TCP,
        options: { port: 3000 },
      },
      {
        name: 'BBPS_MICROSERVICE',
        transport: Transport.TCP,
        options: { port: 8887 },
      },
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: { port: 8888 },
      },
      {
        name: 'DMT_MICROSERVICE_LEGACY',
        transport: Transport.TCP,
        options: { port: 8889 },
      },
    ]),
    BillsModule,
    AuthModule,
    FundTransferLegacyModule,
    RechargeModule,
    UserModule,
    AccountsModule,
    FundTransferModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
