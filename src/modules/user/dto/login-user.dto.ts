import { IsEmail, Length, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, {message: 'email must be valid'})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'minLength password must be 6, max 12'})
  public password!: string;
}
