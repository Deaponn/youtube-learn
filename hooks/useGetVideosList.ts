import { useEffect, useState } from "react";

export type AllTopics = {
  [key in "reactNative" | "react" | "typescript" | "javascript"]: VideoResponseData[];
};

export interface VideoResponseData {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };
}

// TODO: switch from fetchMockData to fetchData

export default function useGetVideosList(
  search: string,
  resultSetter: (results: VideoResponseData[]) => void
): boolean {
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    async function fetchVideos() {
      const queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.EXPO_PUBLIC_API_KEY}&q=${search}&type=video`;
      const response = await fetch(queryUrl);
      const json = await response.json();
      resultSetter(json.items as VideoResponseData[]);
      setSuccess(true);
    }

    async function fetchMockedVideos() {
      const allResults = require("@/mockSearchData.json");
      resultSetter(allResults[search.toLowerCase()]! as VideoResponseData[]);
      setSuccess(true);
    }

    // fetchVideos();
    fetchMockedVideos();
  }, [search]);

  return success;
}
