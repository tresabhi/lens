import type {
  AccountRatedMovie,
  AccountRatedTV,
  TMDBConfiguration,
  Paginated,
} from "../types/tmdb";

export class TMDB {
  private base = "https://api.themoviedb.org";
  private version = 4;

  private configurationCache: TMDBConfiguration | null = null;

  constructor(private readAccessToken: string) {}

  async accountRatedMovies(account: string, page: number) {
    return await this.get<Paginated<AccountRatedMovie>>(
      `account/${account}/movie/rated?page=${page}`,
    );
  }

  async accountRatedTV(account: string, page: number) {
    return await this.get<Paginated<AccountRatedTV>>(
      `account/${account}/tv/rated?page=${page}`,
    );
  }

  async allPaginated<Type>(
    account: string,
    getter: (account: string, page: number) => Promise<Paginated<Type>>,
  ) {
    const results: Type[] = [];
    let pages: number | undefined = undefined;
    let page = 1;

    while (pages === undefined || page <= pages) {
      const accountRatedMovies = await getter(account, page++);
      results.push(...accountRatedMovies.results);
      pages = accountRatedMovies.total_pages;
    }

    return results;
  }

  async allAccountRatedMovies(account: string) {
    return await this.allPaginated(account, this.accountRatedMovies.bind(this));
  }

  async allAccountRatedTV(account: string) {
    return await this.allPaginated(account, this.accountRatedTV.bind(this));
  }

  async everything(account: string) {
    const raw = await Promise.all([
      this.allAccountRatedMovies(account),
      this.allAccountRatedTV(account),
    ]);
    const mixed = raw.flat();
    const dated = mixed.map((show) => ({
      date: new Date(show.account_rating.created_at),
      show,
    }));
    const sorted = dated.sort((a, b) => b.date.getTime() - a.date.getTime());

    return sorted.map((item) => item.show);
  }

  async configuration() {
    if (this.configurationCache === null) {
      const configuration = await this.get<TMDBConfiguration>(
        "configuration",
        3,
      );
      this.configurationCache = configuration;

      return configuration;
    }

    return this.configurationCache;
  }

  async image(path: string, size = "original") {
    const configuration = await this.configuration();
    const url = `${configuration.images.secure_base_url}${size}${path}`;
    return url;
  }

  async get<Type>(path: string, version = this.version) {
    const url = `${this.base}/${version}/${path}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.readAccessToken}`,
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} for ${url}`);
    }

    const json = (await response.json()) as Type;

    return json;
  }
}
