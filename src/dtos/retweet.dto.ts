export interface RetweetDto {
  userId: string;
  tweetId: string;
  content?: string;
}

export interface UpdateRetweetDto {
  id: string;
  content?: string;
}
