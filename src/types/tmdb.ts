namespace TMDB {
  export interface Configuration {
    change_keys: string[];
    images: {
      base_url: string;
      secure_base_url: string;
      backdrop_sizes: string[];
      logo_sizes: string[];
      poster_sizes: string[];
      profile_sizes: string[];
      still_sizes: string[];
    };
  }

  export interface AccountRatedMovies {
    page: number;
    results: AccountRatedMoviesResult[];
    total_pages: number;
    total_results: number;
  }

  export interface AccountRatedMoviesResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: number;
  }
}
