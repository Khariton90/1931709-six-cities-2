import { Length, IsString, IsInt, IsMongoId, IsDate } from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Length string is not less than 5 not more than 1024'})
  public commentText!: string;

  @IsDate({message: 'field must be valid date'})
  public postDate!: Date;

  @IsInt({message: 'number is required'})
  @Length(1, 5, {message: 'Min value 1, max 5'})
  public rating!: number;

  @IsMongoId({message: 'offer id must be valid id'})
  public userId!: string;
}
