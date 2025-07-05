interface NotFoundError {
  type: "not_found";
  resource: string;
}

interface UnauthorizedError {
  type: "unauthorized";
  reason: string;
}

interface ValidationError {
  // the data doesn't meet the requirements for example object sent to API does not match correct format
  type: "validation_error";
  fields: Record<string, string>;
}

interface UnknownError {
  // for catch block errors as we do not know the error type beforehand
  type: "checking_error";
  error: any;
}

interface FirebaseError {
  type: "firebase_error";
  reason?: string;
  errorCode?: string;
}

type ErrorDataType =
  | NotFoundError
  | UnauthorizedError
  | ValidationError
  | FirebaseError
  | UnknownError;

interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: ErrorDataType;
}

export default APIResponse;
