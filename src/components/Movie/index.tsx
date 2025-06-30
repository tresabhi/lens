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
    <Box className="movie-card" position="relative">
      <Flex
        direction="column"
        style={{
          backgroundImage: `url(${await tmdb.image(movie.poster_path, "w92")})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          borderRadius: "var(--radius-4)",
          overflow: "hidden",
          boxShadow: "var(--shadow-3)",
        }}
      >
        <Box
          className="poster"
          position="relative"
          style={{
            backgroundImage: `url(${await tmdb.image(
              movie.poster_path,
              "w342"
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "2 / 3",
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

      <Flex
        direction="column"
        justify="end"
        className="popup"
        style={{
          zIndex: 2,
          backgroundImage: `url(${await tmdb.image(
            movie.backdrop_path,
            "w1280"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        <Flex
          className="info"
          p="4"
          style={{
            backdropFilter: "blur(1rem)",
          }}
        >
          <Text size="5" weight="medium">
            {movie.original_title}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
