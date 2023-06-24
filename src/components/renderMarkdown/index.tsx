/* eslint-disable @next/next/no-img-element */
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
            const code = String(children).replace(/\n$/, '')
            const language = match ? match[1] : ''
            return !inline && match ? (
              <Copy
                code={code}
                renderHighlighter={
                  <SyntaxHighlighter {...props} language={language}>
                    {code}
                  </SyntaxHighlighter>
                }
                codeSandbox={match['input']?.toLocaleLowerCase()?.includes('codesandbox')}
                language={language}
                codePreviewer={<div dangerouslySetInnerHTML={{ __html: code }} />}
              />
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
          img({ src, alt }) {
            return (
              <span className="flex justify-center items-center border-gray-200 border rounded-md mt-6 mb-6 p-2">
                <img loading="lazy" className="max-w-full" alt={alt || ''} src={src || ''} />
              </span>
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
