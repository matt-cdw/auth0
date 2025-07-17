import React from "react";
import { cn } from "@/utils/helpers/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
  isError?: boolean;
  forceApplyFocusStyle?: boolean;
  floating?: boolean; // NEW: control floating behavior
}

const Label = ({
  children,
  htmlFor,
  className,
  isError,
  forceApplyFocusStyle,
  floating = true, // default to true for backward compatibility
  ...rest
}: LabelProps) => {
  const textColor = isError
    ? "text-error"
    : forceApplyFocusStyle
      ? "!text-link"
      : "text-text-secondary";

  // Only apply floating styles if `floating` is true
  const baseLabelStyles = floating
    ? cn(
        "absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out pointer-events-none origin-[0]",
        textColor
      )
    : cn("block text-sm font-medium mb-1", textColor);

  const floatedTextColor = isError ? "!text-error" : "!text-link";

  const floatedLabelStyles = floating
    ? cn(
        "peer-focus:scale-75 peer-focus:-translate-y-[1.18rem] peer-focus:top-2 peer-focus:z-10",
        isError ? "peer-focus:!text-error" : "peer-focus:!text-link",
        "peer-[.is-forced-focus]:scale-75 peer-[.is-forced-focus]:-translate-y-[1.18rem] peer-[.is-forced-focus]:top-2 peer-[.is-forced-focus]:z-10",
        `peer-[.is-forced-focus]:${floatedTextColor}`,
        "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[1.18rem] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:z-10",
        `peer-[:not(:placeholder-shown)]:${floatedTextColor}`,
        "peer-focus:bg-background-widget peer-focus:px-2",
        "peer-[.is-forced-focus]:bg-background-widget peer-[.is-forced-focus]:px-2",
        "peer-[:not(:placeholder-shown)]:bg-background-widget peer-[:not(:placeholder-shown)]:px-2"
      )
    : "";

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        baseLabelStyles,
        floatedLabelStyles,
        floating && "overflow-hidden whitespace-nowrap text-ellipsis max-w-[calc(100%-1rem)] box-border px-3",
        className
      )}
      {...rest} // `floating` won't leak here
    >
      {children}
    </label>
  );
};

export default Label;
