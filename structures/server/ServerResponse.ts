export interface ServerResponseParams {
  data?: any;
  error?: any;
}

export default class ServerResponse {
  data: any;

  error: any;

  constructor(params: ServerResponseParams) {
    this.data = params.data ?? null;
    this.error = params.error ?? null;
  }
}
