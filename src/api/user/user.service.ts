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
    @Inject('USER_MICROSERVICE')
    private readonly userMicroservice: ClientProxy,
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

  async getUser(userId: string): Promise<ResponseDTO> {
    return firstValueFrom(
      this.userMicroservice.send(
        { role: 'user', cmd: 'get_user' },
        { userId },
      ),
    );
  }

  async updateUser(userId: string, userData: any): Promise<ResponseDTO> {
    return firstValueFrom(
      this.userMicroservice.send(
        { role: 'user', cmd: 'update_user' },
        { userId, ...userData },
      ),
    );
  }

  async deleteUser(userId: string): Promise<ResponseDTO> {
    return firstValueFrom(
      this.userMicroservice.send(
        { role: 'user', cmd: 'delete_user' },
        { userId },
      ),
    );
  }

  async listUsers(filters: any = {}): Promise<ResponseDTO> {
    return firstValueFrom(
      this.userMicroservice.send(
        { role: 'user', cmd: 'list_users' },
        filters,
      ),
    );
  }
}
