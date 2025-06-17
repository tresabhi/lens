export class TMDB {
  private base = "https://api.themoviedb.org";
  private version = 3;

  private configurationCache: TMDB.Configuration | null = null;

  constructor(private readAccessToken: string) {
    console.log(import.meta.env.TMDB_ACCOUNT);
  }

  async accountRatedMovies(account: string, page: number) {
    return await this.get<TMDB.AccountRatedMovies>(
      `account/${account}/rated/movies?page=${page}&sort_by=created_at.desc`
    );
  }

  async allAccountRatedMovies(account: string) {
    const results: TMDB.AccountRatedMoviesResult[] = [];
    let pages: number | undefined = undefined;
    let page = 1;

    while (pages === undefined || page <= pages) {
      const accountRatedMovies = await this.accountRatedMovies(account, page++);
      results.push(...accountRatedMovies.results);
      pages = accountRatedMovies.total_pages;
    }

    return results;
  }

  async configuration() {
    if (this.configurationCache === null) {
      const configuration = await this.get<TMDB.Configuration>("configuration");
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

  async get<Type>(path: string) {
    const url = `${this.base}/${this.version}/${path}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.readAccessToken}`,
    };
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const json = (await response.json()) as Type;

    return json;
  }
}
