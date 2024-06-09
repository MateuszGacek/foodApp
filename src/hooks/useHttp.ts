import { useCallback, useEffect, useState } from "react";

type HttpMethod = "GET" | "POST";

type UseHttpProps = {
  url: string;
  initialData: any;
  config?: {
    method?: HttpMethod;
    body?: any;
    headers?: HeadersInit;
  };
};

const sendHttpRequest = async (url: string, config?: RequestInit) => {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong.");
  }

  return resData;
};

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState<Promise<any>>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest };
};

export default useHttp;
