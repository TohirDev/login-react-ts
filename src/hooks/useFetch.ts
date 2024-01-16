import { useEffect, useState } from "react";

type TFetch = {
  url: string;
  options?: object;
};

const useFetch = ({ url, options }: TFetch) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        console.error((err as Error).message);
        setError((err as Error).message);
        throw new Error((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);
  return { data, loading, error };
};

export default useFetch;
