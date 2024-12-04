import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ResponseDTO } from 'src/dto/common.dto';
import Axios from 'axios';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authMicroservice: ClientProxy,
    @Inject('AUTH_LEGACY_MICROSERVICE')
    private readonly authLegacyMicroservice: ClientProxy,
  ) {
    this.logger = new Logger(); // to create new log file
  }

  async login(body): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.authMicroservice.send({ role: 'auth', cmd: 'login' }, body),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async loginLegacy(body): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.authLegacyMicroservice.send({ role: 'auth', cmd: 'login' }, body),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async validateLegacyToken(token): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.authLegacyMicroservice.send(
        { role: 'auth', cmd: 'validate_token' },
        token,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async validateToken(token): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.authMicroservice.send(
        { role: 'auth', cmd: 'validate_token' },
        token,
      ),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }

  async routingTest(body) {
    const url = body.url;
    const type = body.type;
    const data = body.data;

    if (type == 'POST') {
      const res = await Axios.post(
        url,
        {
          ...data,
        },
        {
          // headers: this.createHeader(token),
        },
      ).catch((err) => {
        return err;
      });
      console.log(res);
      return res?.data;
    } else {
      const res = await Axios.get(url).catch((err) => {
        return err;
      });
      return res?.data;
    }
  }
}
