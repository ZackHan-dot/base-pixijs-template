"use client";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import PlaceHolder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from "lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github-dark.min.css";

import MenuBar from "./components/menuBar";
import "./index.css";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface TipTapProps {
  content?: string;
}

const Tiptap = ({ content }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: "写一些东西...",
      }),
      Highlight,
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
      },
    },
  });

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};

export default Tiptap;
