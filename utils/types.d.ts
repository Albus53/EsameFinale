export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  DetailScreen: { post: Post };
};
