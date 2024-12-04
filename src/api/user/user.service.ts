import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ResponseDTO } from 'src/dto/common.dto';

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authMicroservice: ClientProxy,
  ) {
    this.logger = new Logger(); // to create new log file
  }

  async createUser(body): Promise<ResponseDTO> {
    const res: ResponseDTO = await firstValueFrom(
      this.authMicroservice.send({ role: 'user', cmd: 'create' }, body),
    ).catch((err) => {
      console.log(err);
    });
    return res;
  }
}
