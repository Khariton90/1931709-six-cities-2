export const Component = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  IConfig: Symbol.for('IConfig'),
  IDataBase: Symbol.for('IDataBase'),
  IUserService: Symbol.for('IUserService'),
  IOffelService: Symbol.for('IOffelService'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
} as const;
