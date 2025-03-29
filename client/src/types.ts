export type Mood = {
  key: string,
  name: string;
  emoji: string;
  colors: string;
  genres: string[];
};

export type Movie = {
  id: number;
  original_title: string;
  genres: string[];
  imdb_id: string;
  adult: boolean;
  overview:string;
  popularity:number;
  release_date:string;
  runtime:number;
  title:string;
  vote_average:number;
  vote_count:number;
  cast: string[];
  weighted_rating:number
};