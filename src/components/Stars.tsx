import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";

interface StarsProps {
  rating: number;
}

export function Stars({ rating }: StarsProps) {
  const stars = rating / 2;

  return (
    <Flex>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} position="relative" width="0.75rem" height="0.75rem">
          <Text color="gray">
            <StarIcon
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Text>

          <Box
            position="absolute"
            top="0"
            left="0"
            width={`${Math.max(0, Math.min(1, stars - index)) * 100}%`}
            height="100%"
            overflow="hidden"
          >
            <Text color="amber">
              <StarFilledIcon
                style={{
                  position: "absolute",
                  width: "0.75rem",
                  height: "0.75rem",
                  left: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </Text>
          </Box>
        </Box>
      ))}
    </Flex>
  );
}
