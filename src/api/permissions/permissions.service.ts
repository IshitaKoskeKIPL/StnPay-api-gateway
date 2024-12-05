import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ResponseDTO } from 'src/dto/common.dto';

@Injectable()
export class PermissionsService {
  private logger = new Logger();

  constructor(
    @Inject('PERMISSIONS_MICROSERVICE')
    private readonly permissionsMicroservice: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async getUserPermissions(userId: string): Promise<ResponseDTO> {
    return firstValueFrom(
      this.permissionsMicroservice.send(
        { role: 'permissions', cmd: 'get_user_permissions' },
        { userId },
      ),
    );
  }

  async assignPermissions(userId: string, permissions: string[]): Promise<ResponseDTO> {
    return firstValueFrom(
      this.permissionsMicroservice.send(
        { role: 'permissions', cmd: 'assign_permissions' },
        { userId, permissions },
      ),
    );
  }

  async checkPermission(userId: string, permission: string): Promise<ResponseDTO> {
    return firstValueFrom(
      this.permissionsMicroservice.send(
        { role: 'permissions', cmd: 'check_permission' },
        { userId, permission },
      ),
    );
  }

  async getRolePermissions(role: string): Promise<ResponseDTO> {
    return firstValueFrom(
      this.permissionsMicroservice.send(
        { role: 'permissions', cmd: 'get_role_permissions' },
        { role },
      ),
    );
  }
}
