import { Box, Flex, Text } from "@radix-ui/themes";
import { useCallback, useEffect, useRef } from "react";
import { Stars } from "../Stars";
import "./index.css";

interface Props {
  movie: TMDB.AccountRatedMoviesResult;
  poster: string;
  backdrop: string;
}

const RADIUS = 4;

export function MovieWrapped({ movie, poster, backdrop }: Props) {
  const releaseDate = new Date(movie.release_date);
  const popup = useRef<HTMLDivElement>(null);
  const reposition = useCallback(() => {
    if (!popup.current) return;

    const rect = popup.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const u = x / window.innerWidth;

    popup.current.style.left = `${u * 100}%`;
    popup.current.style.transform = `translate(-${u * 100}%, -50%)`;
  }, []);

  useEffect(reposition);

  return (
    <Box className="movie-card" position="relative" onMouseEnter={reposition}>
      <Flex
        direction="column"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          borderRadius: `var(--radius-${RADIUS})`,
          boxShadow: "var(--shadow-3)",
        }}
      >
        <Box
          className="poster"
          position="relative"
          style={{
            borderRadius: `var(--radius-${RADIUS}) var(--radius-${RADIUS}) 0 0`,
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "2 / 3",
          }}
        >
          <Flex
            align="end"
            display={{ initial: "none", md: "flex" }}
            ref={popup}
            className="popup"
            style={{
              borderRadius: `var(--radius-${RADIUS})`,
              boxShadow: "var(--shadow-6)",
              backgroundImage: `url(${backdrop})`,
              overflow: "hidden",
            }}
          >
            <Box
              className="description"
              p="4"
              style={{
                backdropFilter: "blur(1rem)",
              }}
            >
              <Text>{movie.overview}</Text>
            </Box>
          </Flex>
        </Box>

        <Box
          style={{
            backdropFilter: "blur(1rem)",
            borderRadius: `0 0 var(--radius-${RADIUS}) var(--radius-${RADIUS})`,
            overflow: "hidden",
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
    </Box>
  );
}
