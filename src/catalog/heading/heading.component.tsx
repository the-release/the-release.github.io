import React, { FC } from "react";
import { Text, TextProps } from "../text/text.component";

interface HeadingProps extends Omit<TextProps, "component"> {
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: FC<HeadingProps> = ({
  children,
  component = "h2",
  variant = component,
  ...otherProps
}) => {
  return (
    <Text component={component} variant={variant} {...otherProps}>
      {children}
    </Text>
  );
};
