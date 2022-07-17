declare namespace Express {
    export interface Response {
      sendJson: any;
      sendText: any;
      file: any;
      sendBuffer: any;
      compressed: any;
    }

    export interface Request {
        validData: any;
    }
}
  