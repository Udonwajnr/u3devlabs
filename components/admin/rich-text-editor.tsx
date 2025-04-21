// components/admin/rich-text-editor.tsx
"use client"
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYWYSIWYG} // must be prefixed with NEXT_PUBLIC if used in browser
      value={value}
      onEditorChange={(newContent) => onChange(newContent)}
      init={{
        plugins: [
          "anchor", "autolink", "charmap", "codesample", "emoticons", "image", "link", "lists", "media", "searchreplace", "table", "visualblocks", "wordcount",
          "checklist", "mediaembed", "casechange", "formatpainter", "pageembed", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste",
          "advtable", "advcode", "editimage", "advtemplate", "ai", "mentions", "tinycomments", "tableofcontents", "footnotes", "mergetags",
          "autocorrect", "typography", "inlinecss", "markdown", "importword", "exportword", "exportpdf",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | " +
          "addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | " +
          "emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
    />
  );
}
