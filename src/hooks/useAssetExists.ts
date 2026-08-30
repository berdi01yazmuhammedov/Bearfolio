import { useEffect, useState } from "react";

/**
 * Checks whether an optional static asset (image, video, PDF) actually
 * exists before we build UI around it. Lets placeholders such as CV /
 * certificate / video links fail gracefully instead of pointing to a
 * broken file when the real asset hasn't been added yet.
 */
export function useAssetExists(url: string): boolean | null {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return exists;
}
