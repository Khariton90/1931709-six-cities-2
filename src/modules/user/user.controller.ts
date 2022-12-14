import { UploadFileMiddleware } from './../../common/middlewares/upload-file.middleware.js';
import { ValidateObjectIdMiddleware } from './../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from './../../common/middlewares/validate-dto.middleware.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { IConfig } from './../../common/config/config.interface.js';
import { Response, Request } from 'express';
import { HttpMethod } from './../../types/http-method.enum.js';
import { IUserService } from './user-service.interface.js';
import { ILogger } from './../../common/logger/logger.interface.js';
import { Component } from './../../types/component.types.js';
import { injectable, inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import CreateUserDto from './dto/create-user.dto.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO, createJWT } from '../../utils/common.js';
import UserResponse from './response/user.response.js';
import HttpError from '../../common/errors/http-error.js';
import LoggedUserResponse from './response/logged-user.response.js';
import { JWT_ALGORITM } from './user.constant.js';
import UploadUserAvatarResponse from './response/upload-avatar.responce.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IUserService) private readonly userService: IUserService,
    @inject(Component.IConfig) configService: IConfig,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for UserController');

    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)]});
    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateUserDto)]});
    this.addRoute({path: '/auth', method: HttpMethod.Get, handler: this.checkAuthenticate});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post, handler: this.uploadAvatar,
      middlewares:
      [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, res: Response): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('SALT'),
      {email: user.email, id: user.id}
    );
    this.ok(res, {...fillDTO(LoggedUserResponse, user), token});
  }


  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Such a user ${body.email} already exists`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.userService.findByEmail(req.user.email);

    this.ok(res, fillDTO(LoggedUserResponse, user));
  }

  public async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params;
    const uploadFile = {avatarUrl: req.file?.filename};
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarResponse, uploadFile));
  }
}

