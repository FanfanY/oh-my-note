'use client'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { styled } from 'styled-components'
import Copy from 'src/components/copy'
import HeadingHashLink from 'src/components/hashLink'
import { getChildrenId } from 'src/lib/md-utils'

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
          h2({ node, children, level }) {
            const id = getChildrenId(node.children)
            return (
              <HeadingHashLink level={level} id={id} href={`#${id}`}>
                {children}
              </HeadingHashLink>
            )
          },
          h3({ children, node, level }) {
            const id = getChildrenId(node.children)
            return (
              <HeadingHashLink level={level} id={id} href={`#${id}`}>
                {children}
              </HeadingHashLink>
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
