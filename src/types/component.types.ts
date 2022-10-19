export const Component = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  IConfig: Symbol.for('IConfig'),
  IDataBase: Symbol.for('IDataBase'),
  IUserService: Symbol.for('IUserService'),
  IOffelService: Symbol.for('IOffelService'),
  ICommentService: Symbol.for('ICommentService'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
} as const;
