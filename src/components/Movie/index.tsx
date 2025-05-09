import { Box, Flex, Text } from "@radix-ui/themes";
import type { Movie } from "../../constants/movies";
import { wikimedia } from "../../utils/wikimedia";
import { Stars } from "../Stars";
import "./index.css";

interface MovieProps {
  movie: Movie;
}

export function Movie({ movie }: MovieProps) {
  return (
    <Flex
      flexShrink="0"
      direction="column"
      style={{
        backgroundImage: `url(${wikimedia(movie.poster)})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        overflow: "hidden",
        boxShadow: "var(--shadow-2)",
      }}
    >
      <Box
        width="14rem"
        height="21rem"
        style={{
          backgroundImage: `url(${wikimedia(movie.poster)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box
        style={{
          backdropFilter: "blur(1rem)",
        }}
        maxWidth="14rem"
      >
        <Flex p="3" direction="column" className="movie-title-card" gap="2">
          <Flex align="center" gap="2">
            <Stars stars={movie.rating} />

            <Text color="amber" size="1">
              {movie.rating} / 5
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
              {movie.name}
            </Text>

            <Text size="2" color="gray">
              {movie.year}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
