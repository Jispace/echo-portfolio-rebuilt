import { useEffect, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  Link2Off,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Baseline,
  Highlighter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface RichTextEditorProps {
  /** HTML content */
  value: string;
  /** Called with HTML and plain text */
  onChange: (html: string, text: string) => void;
  invalid?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

const TEXT_COLORS = ['#2D241E', '#7A583E', '#B4443C', '#C07A2B', '#3E7C4F', '#2F5D8A', '#6B4FA0'];
const HIGHLIGHT_COLORS = ['#FBE9C6', '#F6D5D0', '#D9EAD3', '#D0E0F0', '#E6DDF2', '#F9E3EE'];

function ToolbarButton({
  title,
  active,
  disabled,
  onClick,
  children,
}: {
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      className={`h-8 w-8 text-[#3E3228] hover:bg-[#F2ECE2] dark:text-foreground dark:hover:bg-accent ${active ? 'bg-[#F2ECE2] dark:bg-accent' : ''}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function ColorPicker({
  title,
  icon: Icon,
  colors,
  current,
  onPick,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  colors: string[];
  current?: string | undefined;
  onPick: (color: string | null) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={title}
          aria-label={title}
          className="h-8 w-8 text-[#3E3228] hover:bg-[#F2ECE2] dark:text-foreground dark:hover:bg-accent"
          onMouseDown={(e) => e.preventDefault()}
        >
          <span className="flex flex-col items-center">
            <Icon className="h-3.5 w-3.5" />
            <span
              className="mt-0.5 h-0.5 w-3.5 rounded-full"
              style={{ backgroundColor: current ?? 'transparent', border: current ? 'none' : '1px solid #C9BCA8' }}
            />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex gap-1">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              aria-label={c}
              className="h-6 w-6 rounded-full border border-black/10 transition-transform hover:scale-110"
              style={{ backgroundColor: c }}
              onClick={() => onPick(c)}
            />
          ))}
          <button
            type="button"
            title="Aucune"
            className="h-6 rounded-md border border-black/10 px-1.5 text-[10px] text-muted-foreground hover:bg-accent"
            onClick={() => onPick(null)}
          >
            ✕
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const previous = editor.getAttributes('link')['href'] as string | undefined;
    const url = window.prompt('URL du lien :', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("URL de l'image :", 'https://');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 border-b border-[#E6DDD0] px-2 py-1 dark:border-border"
      role="toolbar"
      aria-label="Mise en forme du message"
    >
      <ToolbarButton title="Gras" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Italique" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Souligné" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Barré" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Titre 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Titre 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Titre 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Liste à puces" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Liste numérotée" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Citation" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Ajouter un lien" active={editor.isActive('link')} onClick={setLink}>
        <Link2 aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Retirer le lien" disabled={!editor.isActive('link')} onClick={() => editor.chain().focus().unsetLink().run()}>
        <Link2Off aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Insérer une image" onClick={addImage}>
        <ImageIcon aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Aligner à gauche" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeft aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Centrer" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenter aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Aligner à droite" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRight aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ColorPicker
        title="Couleur du texte"
        icon={Baseline}
        colors={TEXT_COLORS}
        current={editor.getAttributes('textStyle')['color'] as string | undefined}
        onPick={(c) => (c ? editor.chain().focus().setColor(c).run() : editor.chain().focus().unsetColor().run())}
      />
      <ColorPicker
        title="Surlignage"
        icon={Highlighter}
        colors={HIGHLIGHT_COLORS}
        current={editor.getAttributes('highlight')['color'] as string | undefined}
        onPick={(c) => (c ? editor.chain().focus().setHighlight({ color: c }).run() : editor.chain().focus().unsetHighlight().run())}
      />

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Annuler" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton title="Rétablir" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 aria-hidden="true" className="h-3.5 w-3.5" />
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({ value, onChange, invalid, placeholder, id, className }: RichTextEditorProps) {
  const [activated, setActivated] = useState(false);
  const [, force] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false, horizontalRule: false }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder ?? '' }),
    ],
    content: value,
    editorProps: {
      attributes: {
        id: id ?? '',
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-required': 'true',
        class:
          'tiptap-contact min-h-32 w-full outline-none text-xs leading-relaxed text-[#2D241E] sm:text-sm dark:text-foreground [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#E6DDD0] [&_blockquote]:pl-3 [&_blockquote]:italic [&_a]:text-[#7A583E] [&_a]:underline [&_img]:max-w-full [&_img]:rounded-lg [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.9em]',
      },
    },
    onFocus: () => setActivated(true),
    onUpdate: ({ editor }) => {
      setActivated(true);
      const text = editor.getText().trim();
      onChange(text ? editor.getHTML() : '', text);
    },
    onTransaction: () => force((n) => n + 1),
  });

  // Reset content when parent clears the value
  useEffect(() => {
    if (editor && !value && !editor.isEmpty) editor.commands.clearContent();
  }, [value, editor]);

  return (
    <div
      aria-invalid={invalid}
      className={`overflow-hidden rounded-2xl border bg-[#FAF7F2] transition-colors focus-within:bg-white dark:bg-background dark:focus-within:bg-background ${invalid ? 'border-red-500' : 'border-[#E6DDD0] focus-within:border-[#7A583E] dark:border-border'} ${className ?? ''}`}
    >
      {activated && editor && <Toolbar editor={editor} />}
      <div className="px-4 py-3" onClick={() => editor?.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
