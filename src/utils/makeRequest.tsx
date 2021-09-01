import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import Config from "./Config";
import Cookies from "./Cookies";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeRequest = async <T extends any = any>(
  config: AxiosRequestConfig
): Promise<AxiosPromise<T>> => {
  try {
    const token = Cookies.get(Config.USER_KEY);
    const finalHeaders = {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(config.headers || {}),
    };
    const finalConfig = { ...config, headers: finalHeaders };
    const data = await axios(finalConfig);
    return data;
  } catch (ex) {
    const error = ex as AxiosError;
    const errString = error.request.responseText || "{}";
    throw new Error(errString);
  }
};
