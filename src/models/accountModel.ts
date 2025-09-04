export interface Account {
  id: number;
  username: string;
  name: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
}