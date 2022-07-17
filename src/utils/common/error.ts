import { ErrorLibrary } from '..';

export const commonErrorLib: ErrorLibrary = {
  FileNotFound: {
    status: 404,
    message: 'File Not Found',
  },
  CompressionError: {
    status: 500,
    message: 'Error in Compression',
  },
  SchemaValidationError: {
    status: 400,
    message: 'Validation Error',
  }
};
