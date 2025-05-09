export function wikimedia(file: Wikimedia) {
  return `https://upload.wikimedia.org/wikipedia/${file.language}/${file.hash[0]}/${file.hash}/${file.name}.${file.format}`;
}

export class Wikimedia {
  constructor(
    public hash: string,
    public name: string,

    public language: "en" | "commons" = "en",
    public format = "jpg"
  ) {}
}
