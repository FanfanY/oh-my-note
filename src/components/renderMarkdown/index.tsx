'use client'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { styled } from 'styled-components'
import Copy from 'src/components/copy'
interface RenderMarkdownProps {
  data: string
}
const SyntaxHighlighter = styled(Prism)`
  background: none !important;
  code {
    white-space: break-spaces !important;
  }
`

const RenderMarkdown: FC<RenderMarkdownProps> = ({ data }) => {
  return (
    <div style={{ position: 'relative' }}>
      <ReactMarkdown
        components={{
          code({ node, style, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return !inline && match ? (
              <Copy data={String(children).replace(/\n$/, '')} language={match[1]}>
                <SyntaxHighlighter {...props} language={match[1]}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Copy>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          },
        }}
        className="markdown-body"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {data}
      </ReactMarkdown>
    </div>
  )
}

export default RenderMarkdown
