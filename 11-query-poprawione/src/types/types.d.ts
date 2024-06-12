export type TBook = {
  id: string;
  title: string;
  author: string;
  year: string;
  description: string;
  copies: number;
  price: number;
  genreId: string;
};

export type TGenre = {
  id: string;
  name: string;
};
