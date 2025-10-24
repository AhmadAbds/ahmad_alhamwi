import { ContentStyles } from './../../../../types/index';

interface FormattedContentProps {
  formatted_content: string | null | undefined;
  styles?: ContentStyles;
  className?: string;
}

export default function FormattedContent({ 
 formatted_content, 
  styles, 
  className = "" 
}: FormattedContentProps) {
  if (!formatted_content) {
    return (
      <div className="">
        <p></p>
      </div>
    );
  }

  return (
    <div 
      className={`formatted-content ${className}`}
      style={{
        color: styles?.color || '#000000',
        fontSize: styles?.fontSize ? `${styles.fontSize}px` : '16px',
        fontWeight: styles?.fontWeight || 'normal',
        fontStyle: styles?.fontStyle || 'normal',
        textAlign: styles?.textAlign || 'left',
        lineHeight: styles?.lineHeight || 1.6,
        fontFamily: styles?.fontFamily || 'inherit'
      }}
      dangerouslySetInnerHTML={{ __html: formatted_content }}
    />
  );
}