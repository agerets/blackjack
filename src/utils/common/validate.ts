import { Schema } from 'joi';
import { ExposableError, commonErrorLib } from '../common';

export const validate = (schema: Schema<any>, data: any, opts = {}) => {
    const { error, value } = schema.validate(data, opts);
    if (error) {
        throw new ExposableError(commonErrorLib.SchemaValidationError, error.details);
    }
    return value;
};
