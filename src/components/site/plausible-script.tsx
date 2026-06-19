import Script from "next/script";

type PlausibleScriptProps = {
  domain: string;
};

export function PlausibleScript({ domain }: PlausibleScriptProps) {
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}