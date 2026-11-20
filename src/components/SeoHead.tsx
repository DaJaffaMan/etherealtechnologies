import { createMemo, Show, type Component } from "solid-js";
import { Head, Link, Meta, Script, Title } from "@solidjs/meta";
import { SITE, type JsonLdDocument } from "../data/site";

export interface SeoHeadProps {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly noindex?: boolean;
  readonly ogImageAlt?: string;
  readonly jsonLd?: JsonLdDocument;
}

export const SeoHead: Component<SeoHeadProps> = (props) => {
  const canonicalUrl = createMemo(() => {
    const cleanPath = props.path === "/" ? "/" : props.path.replace(/\/+$/, "");
    return `${SITE.baseUrl}${cleanPath}`;
  });
  const imageAlt = createMemo(() => props.ogImageAlt ?? SITE.ogImageAlt);

  return (
    <Head>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Link rel="canonical" href={canonicalUrl()} />
      <Meta property="og:site_name" content={SITE.name} />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={canonicalUrl()} />
      <Meta property="og:image" content={SITE.ogImage} />
      <Meta property="og:image:alt" content={imageAlt()} />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={SITE.ogImage} />
      <Meta name="twitter:image:alt" content={imageAlt()} />
      <Show when={props.noindex}>
        <Meta name="robots" content="noindex, nofollow" />
      </Show>
      <Show when={props.jsonLd}>
        {(schema) => <Script type="application/ld+json">{JSON.stringify(schema())}</Script>}
      </Show>
    </Head>
  );
};
