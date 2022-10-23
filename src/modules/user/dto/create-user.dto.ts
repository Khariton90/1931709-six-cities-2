import { IsEmail, Length, IsString } from 'class-validator';

export default class CreateUserDto {
  @Length(1, 15, {message: 'minLength name must be 1, max 15'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid'})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'minLength password must be 6, max 12'})
  public password!: string;

  public isPro!: string;
  public avatarUrl!: string;
}
