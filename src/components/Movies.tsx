import { Flex, Heading } from "@radix-ui/themes";
import { movies } from "../constants/movies";
import { Movie } from "./Movie";
import { SectionWrapper } from "./SectionWrapper";

export function Movies() {
  return (
    <SectionWrapper>
      <Heading>Movies</Heading>

      <Flex gap="5" wrap="wrap">
        {movies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </Flex>
    </SectionWrapper>
  );
}
