"use client";

import { useEffect } from "react";
import { Bold, Heading2, Italic, Link2, List, ListOrdered, Strikethrough } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function RichTextEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    editorProps: { attributes: { "aria-label": label, class: "rich-editor-content" } },
  });

  useEffect(() => {
    if (editor && !editor.isFocused && editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return <div className="admin-editor-loading" aria-hidden="true" />;

  const actions = [
    { label: "Bold", icon: Bold, run: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { label: "Italic", icon: Italic, run: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { label: "Strikethrough", icon: Strikethrough, run: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike") },
    { label: "Heading", icon: Heading2, run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { label: "Bulleted list", icon: List, run: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { label: "Numbered list", icon: ListOrdered, run: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    {
      label: "Link",
      icon: Link2,
      run: () => {
        const href = window.prompt("Enter a link URL");
        if (href === null) return;
        if (!href) editor.chain().focus().extendMarkRange("link").unsetLink().run();
        else editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
      },
      active: editor.isActive("link"),
    },
  ];

  return (
    <div className="admin-editor">
      <div className="admin-editor-toolbar" role="toolbar" aria-label={`${label} formatting`}>
        {actions.map(({ label: actionLabel, icon: Icon, run, active }) => (
          <button
            key={actionLabel}
            type="button"
            title={actionLabel}
            aria-label={actionLabel}
            aria-pressed={active}
            className={active ? "is-active" : ""}
            onMouseDown={(event) => event.preventDefault()}
            onClick={run}
          >
            <Icon size={16} aria-hidden="true" />
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
