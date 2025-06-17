import { Box, Flex, Text } from "@radix-ui/themes";
import { tmdb } from "../../constants/tmdb";
import { Stars } from "../Stars";
import "./index.css";

interface MovieProps {
  movie: TMDB.AccountRatedMoviesResult;
}

export async function Movie({ movie }: MovieProps) {
  const releaseDate = new Date(movie.release_date);

  return (
    <Flex
      flexShrink="0"
      direction="column"
      style={{
        backgroundImage: `url(${await tmdb.image(movie.poster_path, "w92")})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        overflow: "hidden",
        boxShadow: "var(--shadow-2)",
      }}
    >
      <Box
        style={{
          backgroundImage: `url(${await tmdb.image(
            movie.poster_path,
            "w342"
          )})`,
          aspectRatio: "2 / 3",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box
        style={{
          backdropFilter: "blur(1rem)",
        }}
      >
        <Flex p="3" direction="column" className="movie-title-card" gap="1">
          <Flex align="center" gap="2">
            <Stars rating={movie.rating} />

            <Text color="amber" size="1">
              {movie.rating / 2} / 5
            </Text>
          </Flex>

          <Flex justify="between" align="center" gap="3">
            <Text
              size="4"
              weight="medium"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {movie.original_title}
            </Text>

            <Text size="2" color="gray">
              {releaseDate.getFullYear()}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
