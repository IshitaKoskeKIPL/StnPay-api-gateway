import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from './auth.service';
import { LegacyAuthGuard } from 'src/guards/legacy-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res() res) {
    const result = await this.authService.login(body);
    return res.status(result.status).send(result.response);
  }

  @Post('login-legacy')
  async loginLegacy(@Body() body, @Res() res) {
    const result = await this.authService.loginLegacy(body);
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Get('login-auth')
  async loginAuth() {
    return 'success';
  }

  @UseGuards(LegacyAuthGuard)
  @Get('login-auth-legacy')
  async loginAuthLegacy() {
    return 'success';
  }

  @Post('routing-test')
  async rountingtest(@Body() body) {
    return this.authService.routingTest(body);
  }
}
