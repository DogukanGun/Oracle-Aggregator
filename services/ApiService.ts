import axios, { AxiosResponse } from 'axios';
import store from '@/store';
import { snakeToCamelInterceptor } from '@/interceptors';

axios.interceptors.response.use(snakeToCamelInterceptor);

/** Type of the response */
type ResponseType<T> = AxiosResponse<{
  data: T;
}>;

/** Method maps for types of requests */
const reqMethods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
type RequestMethods = keyof typeof reqMethods;

/** Configuration for ApiService initializaiton */
type ConfigType = {
  /** Host name for the fetcher */
  host: string;
  /** If the fetcher should use https connection */
  ssl?: boolean;
  /** Port of the fetcher */
  port?: number;
  /** Endpoint part of the fetcher URI */
  ep?: string;
  /** Disables attaching authentication header */
  disableAuth?: boolean;
};

/** Generic service that provides a basis for fetcher services */
class ApiService {
  /** The base URI of the API */
  private _baseUri: string;
  /** Disables auth header attaching process */
  private _disableAuth?: boolean;

  constructor({ host, ssl, port, ep, disableAuth }: ConfigType) {
    let baseUri = 'http';
    if (ssl) baseUri += 's';
    baseUri += `://${host}`;
    if (port !== undefined) baseUri += `:${port}`;
    if (ep) baseUri += `/${ep}`;
    baseUri += '/';
    this._baseUri = baseUri;
    if (disableAuth) this._disableAuth = true;
  }

  /** Gets object with Authorization header set to current session */
  protected get authHeader() {
    const auth = store.getState().auth;
    return auth.session
      ? { Authorization: auth.session.accessToken }
      : undefined;
  }

  /** Sends a request to the fetcher
   * @param endpoint Endpoint for the request
   * @param method Method of the request
   * @param body Body to attach in request. Only for compatible requests.
   * @returns Data of the response of the request
   */
  protected async req<T = any>(
    endpoint: string,
    method: RequestMethods,
    body: any = {},
  ) {
    const call = reqMethods[method];
    const uri = this._baseUri + endpoint;
    const isBody = method === 'put' || method === 'patch' || method === 'post';
    const header = this._disableAuth ? undefined : { headers: this.authHeader };
    body['user_id'] = store.getState().auth.session?.userID;
    const res = await (isBody
      ? call<any, ResponseType<T>>(uri, body, header)
      : call<any, ResponseType<T>>(uri, header));
    return res;
  }

  /**
   * Sends a GET request to the specified endpoint
   * @param endpoint Endpoint for the GET request
   * @returns Data of the response of the request
   */
  public async get<T = any>(endpoint: string) {
    const res = await this.req<T>(endpoint, 'get');
    return res;
  }

  /**
   * Sends a POST request to the specified endpoint with the provided body
   * @param endpoint Endpoint for the POST request
   * @param body Body to send with the POST request
   * @returns Data of the response of the request
   */
  public async post<T = any>(endpoint: string, body: any) {
    const res = await this.req<T>(endpoint, 'post', body);
    return res;
  }

  /**
   * Sends a PUT request to the specified endpoint with the provided data
   * @param endpoint Endpoint for the PUT request
   * @param data Data to send with the PUT request
   * @returns Data of the response of the request
   */
  public async put<T = any>(endpoint: string, data: any) {
    const res = await this.req<T>(endpoint, 'put', data);
    return res;
  }

  /**
   * Sends a PATCH request to the specified endpoint with the provided data
   * @param endpoint Endpoint for the PATCH request
   * @param data Data to send with the PATCH request
   * @returns Data of the response of the request
   */
  public async patch<T = any>(endpoint: string, data: any) {
    const res = await this.req<T>(endpoint, 'patch', data);
    return res;
  }

  /**
   * Sends a DELETE request to the specified endpoint
   * @param endpoint Endpoint for the DELETE request
   * @returns Data of the response of the request
   */
  public async delete<T = any>(endpoint: string) {
    const res = await this.req<T>(endpoint, 'delete');
    return res;
  }
}

export default ApiService;
