import { TUserDocument } from '../../src/types/documents/TUserDocument'
declare global {
  namespace Express {
    interface Request {
      user?: TUserDocument
    }
  }
}

export {}
