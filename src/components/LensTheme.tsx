import { Theme, type ThemeProps } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export function LensTheme(props: ThemeProps) {
  return (
    <ThemeProvider attribute="class">
      <Theme {...props} />
    </ThemeProvider>
  );
}
