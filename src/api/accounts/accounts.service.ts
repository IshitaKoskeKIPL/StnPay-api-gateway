import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ResponseDTO } from 'src/dto/common.dto';

@Injectable()
export class AccountsService {
  private logger = new Logger();
  constructor(
    @Inject('ACCOUNTS_MICROSERVICE')
    private readonly accountsMicroservice: ClientProxy,
  ) {
    this.logger = new Logger(); // to create new log file
  }

  async createAccount(data): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send({ role: 'accounts', cmd: 'create' }, data),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async getUserAccountList(user_id): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'accounts', cmd: 'list' },
        { user_id },
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async setDefaultAccount(user_id, id): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'accounts', cmd: 'set-default' },
        { user_id, id },
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async addTransaction(data): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'transactions', cmd: 'add' },
        data,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async getAccountStatement(data): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'transactions', cmd: 'statement' },
        data,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async getUserAccountListForFundTransfer(user_id): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'accounts', cmd: 'list-fund-transfer' },
        { user_id },
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async initiateFundTransfer(msg): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'accounts', cmd: 'initiate-fund-transfer' },
        msg,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async fundTransfer(msg): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'accounts', cmd: 'verify-fund-transfer' },
        msg,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async fundTransferResendOTP(msg): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.accountsMicroservice.send(
        { role: 'accounts', cmd: 'fund-transfer-resend-otp' },
        msg,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }
}
