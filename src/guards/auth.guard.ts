import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { ResponseDTO } from 'src/dto/common.dto';
import { AuthService } from '../api/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const response: ResponseDTO = await this.authService.validateToken(token);

    if (response.status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }
    req.headers.userId = response.response.userId;
    return true;
  }
}
