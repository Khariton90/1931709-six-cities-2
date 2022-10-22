import { MAX_COMMENTS_COUNT } from './comment.constant.js';
import { CommentEntity } from './comment.entity.js';
import { types, DocumentType } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.types.js';
import { ICommentService } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class CommentService implements ICommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}, {}, {limit: MAX_COMMENTS_COUNT}).sort({createdAt: SortType.Down}).exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({offerId}).exec();

    return result.deletedCount;
  }
}
