export default function RichText({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`rich-copy ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
