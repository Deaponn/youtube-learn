export function buildVideosQuery(search: string) {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.EXPO_PUBLIC_API_KEY}&q=${search}&type=video`;
}

export function buildVideoStatisticsQuery(videoId: string) {
  return `https://youtube.googleapis.com/youtube/v3/videos?key=${process.env.EXPO_PUBLIC_API_KEY}&part=statistics&id=${videoId}`;
}

export function buildVideoDetailsQuery(videoId: string) {
  return `https://youtube.googleapis.com/youtube/v3/videos?key=${process.env.EXPO_PUBLIC_API_KEY}&part=snippet&id=${videoId}`;
}

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

export interface VideoResponse {
  items: VideoResponseData[];
}

export interface VideoStatisticsResponse {
  items: [
    {
      statistics: {
        viewCount: number;
        likeCount: number;
        favoriteCount: number;
        commentCount: number;
      };
    }
  ];
}

export interface VideoDetailsResponse {
  items: [
    {
      snippet: {
        title: string;
        description: string;
        channelTitle: string;
      };
    }
  ];
}
