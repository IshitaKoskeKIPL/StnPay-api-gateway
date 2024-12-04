import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('MASTER_MICROSERVICE')
    private readonly masterMicroservice: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
