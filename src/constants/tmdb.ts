import { TMDB } from "../utils/tmdb";

export const tmdb = new TMDB(import.meta.env.TMDB_ACCESS_TOKEN);
