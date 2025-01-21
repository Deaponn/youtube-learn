import { useEffect, useState } from "react";

// TODO: switch from fetchMockData to fetchData

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

    async function fetchMockedVideos() {
      if (queryUrl.includes("www.googleapis")) {
        const allResults = require("@/mockSearchData.json");
        resultSetter({ items: allResults.react } as T);
        setSuccess(true);
      }
      if (queryUrl.includes("snippet&id")) {
        const allResults = require("@/mockSnippetData.json");
        resultSetter(allResults);
        setSuccess(true);
      }
      if (queryUrl.includes("statistics")) {
        const allResults = require("@/mockStatisticsData.json");
        resultSetter(allResults);
        setSuccess(true);
      }
    }

    // fetchVideos();
    fetchMockedVideos();
  }, [queryUrl]);

  return success;
}
