import { Wikimedia } from "../utils/wikimedia";

export interface Movie {
  name: string;
  poster: Wikimedia;
  rating: number;
  year: number;
}

export const movies: Movie[] = [
  {
    name: "Interstellar",
    poster: new Wikimedia("bc", "Interstellar_film_poster"),
    year: 2014,
    rating: 5,
  },
  {
    name: "Joker",
    poster: new Wikimedia("e1", "Joker_%282019_film%29_poster"),
    year: 2019,
    rating: 5,
  },
  {
    name: "Joker: Folie à Deux",
    poster: new Wikimedia("e8", "Joker_-_Folie_à_Deux_poster"),
    year: 2024,
    rating: 4.5,
  },
  {
    name: "Megamind",
    poster: new Wikimedia("89", "Megamind2010Poster"),
    year: 2010,
    rating: 4,
  },
  {
    name: "The SpongeBob SquarePants Movie",
    poster: new Wikimedia("31", "The_SpongeBob_SquarePants_Movie_poster"),
    year: 2004,
    rating: 4,
  },
  {
    name: "12 Angry Men",
    poster: new Wikimedia(
      "b5",
      "12_Angry_Men_%281957_film_poster%29",
      "commons"
    ),
    year: 1957,
    rating: 5,
  },
  {
    name: "Modern Times",
    poster: new Wikimedia("36", "Modern_Times_poster", "commons"),
    year: 1963,
    rating: 4.5,
  },
  {
    name: "The Dark Knight",
    poster: new Wikimedia("1c", "The_Dark_Knight_%282008_film%29"),
    year: 2008,
    rating: 4.5,
  },
  {
    name: "Tenet",
    poster: new Wikimedia("14", "Tenet_movie_poster"),
    year: 2020,
    rating: 5,
  },
].sort((a, b) => b.year - a.year);
