export interface TweetDto {
  types: 'tweet' | 're-tweet';
  content: string;
  userId: string;
}

export interface UpdateTweetDto {
  id: string;
  content?: string;
  types?: 'tweet' | 're-tweet';
}
