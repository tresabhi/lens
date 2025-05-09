import { Flex, type FlexProps } from "@radix-ui/themes";

export function SectionWrapper(props: FlexProps) {
  return <Flex direction="column" gap="5" {...props} />;
}
