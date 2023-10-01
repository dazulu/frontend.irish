"use client";

import { Prism } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const SyntaxHighlighter = ({ code }: { code: string }) => {
  return (
    <div className="my-[2rem]">
      <Prism language="javascript" style={twilight} wrapLines wrapLongLines>
        {code}
      </Prism>
    </div>
  );
};
