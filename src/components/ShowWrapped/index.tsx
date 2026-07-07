import { Box, Flex, Text } from "@radix-ui/themes";
import { useCallback, useEffect, useRef } from "react";
import type { AccountRatedMovie, AccountRatedTV } from "../../types/tmdb";
import { Stars } from "../Stars";
import "./index.css";

interface Props {
  show: AccountRatedMovie | AccountRatedTV;
  poster: string;
  backdrop: string;
}

const RADIUS = 4;

export function ShowWrapped({ show, poster, backdrop }: Props) {
  const releaseDate = new Date(
    "release_date" in show ? show.release_date : show.first_air_date,
  );
  const title =
    "original_title" in show ? show.original_title : show.original_name;
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
        />

        <Box
          style={{
            backdropFilter: "blur(1rem)",
            borderRadius: `0 0 var(--radius-${RADIUS}) var(--radius-${RADIUS})`,
            overflow: "hidden",
          }}
        >
          <Flex p="3" direction="column" className="movie-title-card" gap="1">
            <Flex align="center" gap="2">
              <Stars rating={show.rating} />

              <Text color="amber" size="1">
                {show.rating / 2} / 5
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
                {title}
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
