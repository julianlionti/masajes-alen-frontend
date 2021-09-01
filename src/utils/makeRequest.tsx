import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import Config from "./Config";

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
    console.log(data);
    return data;
  } catch (ex) {
    const error = ex as AxiosError;
    const errString = error.request.responseText || "{}";
    throw new Error(errString);
  }
};
