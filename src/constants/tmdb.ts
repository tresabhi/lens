import { TMDB } from "../utils/tmdb";

export const tmdb = new TMDB(import.meta.env.TMDB_READ_ACCESS_TOKEN);
