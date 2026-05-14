"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import styles from "./text-editor.module.css";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading1,
  Heading2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "ProseMirror",
        dir: "rtl",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-olive-green text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className={styles.wrapper}>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className={styles.toolbar}>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <UnderlineIcon size={15} />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={15} />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
          >
            <AlignLeft size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
          >
            <AlignCenter size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
          >
            <AlignRight size={15} />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <List size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <ListOrdered size={15} />
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={15} />
          </ToolbarButton>

          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={15} />
          </ToolbarButton>
        </div>

        <EditorContent
          editor={editor}
          className="h-30 text-xs"
        />
      </div>
    </div>
  );
}
