import { config } from '../../config';

export const getPlainString = (body: any) => (typeof body === 'string' ? body : JSON.stringify(body));

export const log = (...message: any) => {
  if (config.get('isLoggingEnabled')) {
    try {
      const strMessage = message.map(getPlainString);
      console.log('NEW LOG:', ...strMessage);
    } catch (err) {
      console.log('NEW LOG:', ...message);
    }
  }
};
