import { Grid, Heading } from "@radix-ui/themes";
import { movies } from "../constants/movies";
import { Movie } from "./Movie";
import { SectionWrapper } from "./SectionWrapper";

export function Movies() {
  return (
    <SectionWrapper>
      <Heading>Movies</Heading>

      <Grid
        columns="repeat(auto-fill, minmax(14rem, 1fr))"
        flow="dense"
        gap="5"
      >
        {movies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </Grid>
    </SectionWrapper>
  );
}
