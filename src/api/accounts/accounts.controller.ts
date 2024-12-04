import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  async createAccount(@Body() body, @Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.createAccount({
      ...body,
      user_id,
    });
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async getUserAccountList(@Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.getUserAccountList(user_id);
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/set-default')
  async setDefaultAccount(@Res() res, @Req() req, @Param('id') id: string) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.setDefaultAccount(user_id, id);
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Post('add-transaction')
  async addTransaction(@Body() body, @Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.addTransaction({
      ...body,
      user_id,
    });
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Get('statement')
  async getAccountStatement(@Query() data, @Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.getAccountStatement({
      ...data,
      user_id,
    });
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Get('list-fund-transfer')
  async getUserAccountListForFundTransfer(@Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.getUserAccountListForFundTransfer(
      user_id,
    );
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Post('initiate-fund-transfer')
  async initiateFundTransfer(@Body() body, @Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.initiateFundTransfer({
      ...body,
      user_id,
    });
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Post('fund-transfer')
  async fundTransfer(@Body() body, @Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.fundTransfer({
      ...body,
      user_id,
    });
    return res.status(result.status).send(result.response);
  }

  @UseGuards(AuthGuard)
  @Post('fund-transfer-resend-otp')
  async fundTransferResendOTP(@Body() body, @Res() res, @Req() req) {
    const user_id = req.headers.userId;
    const result = await this.accountsService.fundTransferResendOTP({
      ...body,
      user_id,
    });
    return res.status(result.status).send(result.response);
  }
}
