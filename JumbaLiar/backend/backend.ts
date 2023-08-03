import { modelsBackend } from "./modelsBackend";
import { endpointsBackend } from "./endpointsBackend";

export class backend {
  model: modelsBackend;
  endpoint: endpointsBackend;
  constructor() {
    this.model = new modelsBackend();
    this.endpoint = new endpointsBackend();
  }
}
