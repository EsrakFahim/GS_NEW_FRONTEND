"use client";

import dynamic from "next/dynamic";
import React, { useRef, useMemo, useEffect } from "react";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ placeholder, content, setContent }) => {
      const editor = useRef(null);

      const config = useMemo(
            () => ({
                  readonly: false,
                  placeholder: content === "" ? placeholder || "Start typing..." : "",
            }),
            [placeholder, content]
      );

      useEffect(() => {
            const savedContent = localStorage.getItem("editorContent");
            if (savedContent) {
                  setContent(savedContent);
            }
      }, [setContent]);

      const handleBlur = (newContent) => {
            setContent(newContent);
            localStorage.setItem("editorContent", newContent);
      };

      return (
            <div>
                  <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={handleBlur}
                  />
            </div>
      );
};

export default TextEditor;
