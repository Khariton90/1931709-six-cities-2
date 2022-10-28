import {NextFunction, Request, Response} from 'express';
import {nanoid} from 'nanoid';
import multer, {diskStorage} from 'multer';
import mime from 'mime-types';
import { IMiddleware } from './../../types/middleware.interface.js';

export class UploadFileMiddleware implements IMiddleware {
  constructor (
    private uploadDirectory: string,
    private fieldName: string
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extention = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extention}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage}).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
