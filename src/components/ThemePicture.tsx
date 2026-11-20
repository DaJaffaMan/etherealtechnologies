import type { Component } from "solid-js";
import type { JSX } from "@solidjs/web";

export interface ThemePictureProps {
  readonly lightSrc: string;
  readonly darkSrc: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly class?: JSX.ClassValue;
  readonly loading?: "eager" | "lazy";
}

export const ThemePicture: Component<ThemePictureProps> = (props) => {
  return (
    <>
      <img
        src={props.lightSrc}
        alt={props.alt}
        width={props.width}
        height={props.height}
        loading={props.loading ?? "lazy"}
        decoding="async"
        class={["theme-only-light", props.class]}
      />
      <img
        src={props.darkSrc}
        alt={props.alt}
        width={props.width}
        height={props.height}
        loading={props.loading ?? "lazy"}
        decoding="async"
        class={["theme-only-dark", props.class]}
      />
    </>
  );
};
