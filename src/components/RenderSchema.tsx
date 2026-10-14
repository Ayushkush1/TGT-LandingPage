import React from "react";

export function RenderSchema({ schema, id }: { schema: string | null | undefined; id: string }) {
  if (!schema) return null;
  const trimmed = schema.trim();
  if (!trimmed) return null;
  
  const hasScriptTag = /^<script/i.test(trimmed);
  let jsonContent = trimmed;

  if (hasScriptTag) {
    jsonContent = trimmed
      .replace(/^<script[^>]*>/i, "")
      .replace(/<\/script>$/i, "")
      .trim();
  }

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: jsonContent }}
    />
  );
}
