import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class ResponseDTO {
  @IsNumber()
  public readonly status: number;

  // @IsString()
  public readonly response: any;
}
