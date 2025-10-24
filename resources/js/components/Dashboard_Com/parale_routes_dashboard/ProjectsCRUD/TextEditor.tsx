import { useState, useRef } from 'react';
import { ContentStyles } from '../../../../types/index';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  styles: ContentStyles;
  onStylesChange: (styles: ContentStyles) => void;
}

export default function TextEditor({ value, onChange, styles, onStylesChange }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF' ,'#94a3b8' , '#64748b'
    , '#475569' , '#334155' , 'rgba(0, 0, 0, 0.6)' , 'seagreen' , '#407ec5'
  ];
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];
  const alignments = ['left', 'center', 'right', 'justify'] as const;

  const applyStyle = (style: Partial<ContentStyles>) => {
    onStylesChange({ ...styles, ...style });
  };

  const insertTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + `<${tag}>${selectedText}</${tag}>`+ value.substring(end);
    
    onChange(newText);
    
    // إعادة التركيز على textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length + 2, start + tag.length + 2 + selectedText.length);
    }, 0);
  };

  const insertLineBreak = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = value.substring(0, start) + '<br/>' + value.substring(start);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 5, start + 5);
    }, 0);
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-200">
        {/* Color Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md  hover:bg-gray-50"
          >
            <div 
              className="w-4 h-4 border border-gray-300 rounded"
              style={{ backgroundColor: styles.color || '#000000' }}
            />
            <span>Color</span>
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-background  border border-gray-300 rounded-lg shadow-lg z-10 grid grid-cols-4 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-6 h-6 border border-gray-300 rounded"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    applyStyle({ color });
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Font Size */}
        <select
          value={styles.fontSize || 16}
          onChange={(e) => applyStyle({ fontSize: parseInt(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-md bg-background "
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        {/* Bold */}
        <button
          type="button"
          onClick={() => applyStyle({ fontWeight: styles.fontWeight === 'bold' ? 'normal' : 'bold' })}
          className={`px-3 py-2 border border-gray-300 rounded-md ${
            styles.fontWeight === 'bold' ? 'bg-blue-100 text-blue-700' : ''
          }`}
        >
          <strong>B</strong>
        </button>{/* Italic */}
        <button
          type="button"
          onClick={() => applyStyle({ fontStyle: styles.fontStyle === 'italic' ? 'normal' : 'italic' })}
          className={`px-3 py-2 border border-gray-300 rounded-md ${
            styles.fontStyle === 'italic' ? 'bg-blue-100 text-blue-700' : ''
          }`}
        >
          <em>I</em>
        </button>

        {/* Text Alignment */}
        <div className="flex gap-1">
          {alignments.map(align => (
            <button
              key={align}
              type="button"
              onClick={() => applyStyle({ textAlign: align })}
              className={`px-3 py-2 border border-gray-300 rounded-md ${
                styles.textAlign === align ? 'bg-blue-100 text-blue-700' : ''
              }`}
            >
              {align === 'left' && '↤'}
              {align === 'center' && '⇔'}
              {align === 'right' && '↦'}
              {align === 'justify' && '⇔'}
            </button>
          ))}
        </div>

        {/* Line Height */}
        <select
          value={styles.lineHeight || 1.5}
          onChange={(e) => applyStyle({ lineHeight: parseFloat(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-md bg-background"
        >
          <option value={1}>1.0</option>
          <option value={1.25}>1.25</option>
          <option value={1.5}>1.5</option>
          <option value={1.75}>1.75</option>
          <option value={2}>2.0</option>
        </select>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap">
          {['b', 'i', 'u', 'strong', 'em', 'h1', 'h2', 'h3', 'p', 'div'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => insertTag(tag)}
              className="px-3 py-2 border border-gray-300 rounded-md  hover:bg-gray-50 text-sm"
            >
              &lt;{tag}&gt;
            </button>
          ))}
        </div>

        {/* Line Break */}
        <button
          type="button"
          onClick={insertLineBreak}
          className="px-3 py-2 border border-gray-300 rounded-md  hover:bg-gray-50"
        >
          &lt;br/&gt;
        </button>

        {/* Reset Styles */}
        <button
          type="button"
          onClick={() => onStylesChange({})}
          className="px-3 py-2 border border-gray-300 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
        >
          Reset
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          color: styles.color || '#000000',
          fontSize: styles.fontSize ? `${styles.fontSize}px `: '16px',
          fontWeight: styles.fontWeight || 'normal',
          fontStyle: styles.fontStyle || 'normal',
          textAlign: styles.textAlign || 'left',
          lineHeight: styles.lineHeight ? `${styles.lineHeight}` : '1.5'
        }}
        className="w-full bg-background h-64 p-4 resize-none focus:outline-none"
        placeholder="Start typing your content here..."
      />

      {/* Preview */}
      <div className="p-4 border-t border-gray-200 rounded-lg bg-background">
        <h4 className="font-semibold mb-2">Preview:</h4>
        <div 
          className="p-4  border border-gray-300 rounded min-h-20"
          style={{
            color: styles.color || '#000000',
            fontSize: styles.fontSize ? `${styles.fontSize}px` : '16px',
            fontWeight: styles.fontWeight || 'normal',
            fontStyle: styles.fontStyle || 'normal',
            textAlign: styles.textAlign || 'left',
            lineHeight: styles.lineHeight ? `${styles.lineHeight}` : '1.5'
          }}
          dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }}
        />
      </div>
    </div>
  );
}