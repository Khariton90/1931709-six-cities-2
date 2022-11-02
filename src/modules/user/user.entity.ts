import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.name = data.name;
    this.password = data.password;
    this.isPro = data.isPro;
  }

  @prop({required: true})
  public name!: string;

  @prop({unique: true, required: true})
  public email!: string;

  @prop()
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  @prop()
  public isPro!: string;

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hasPassword = createSHA256(password, salt);
    return hasPassword === this.password;
  }

  @prop({required: true, default: ''})
  public avatarUrl!: string;

  public favorites!: string[];
}

export const UserModel = getModelForClass(UserEntity);
