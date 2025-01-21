import { useEffect, useState } from "react";

export default function useApiRequest<T>(
  queryUrl: string,
  resultSetter: (results: T) => void
): boolean {
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    async function fetchVideos() {
      const response = await fetch(queryUrl);
      const json = await response.json();
      resultSetter(json as T);
      setSuccess(true);
    }

    fetchVideos();
  }, [queryUrl]);

  return success;
}
