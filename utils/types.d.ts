// utils/types.d.ts
// [NUOVO] Tipi condivisi tra schermate e navigazione

// Tipo dei dati che arrivano dalla API
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Parametri delle schermate del nostro Stack Navigator
export type HomeStackParamList = {
  HomeScreen: undefined;          // Home non richiede parametri
  DetailScreen: { post: Post };   // Detail riceve un oggetto Post
};
