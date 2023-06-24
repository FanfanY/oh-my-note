'use client'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import { getParameters } from 'codesandbox/lib/api/define'
import React, { FC, PropsWithChildren, useState } from 'react'
import { AiOutlineCheck, AiOutlineCodeSandbox } from 'react-icons/ai'
import { BsCodeSlash, BsCode } from 'react-icons/bs'
import { MdOutlineContentCopy } from 'react-icons/md'
import Root from 'react-shadow'
import styles from 'src/components/copy/index.module.scss'

interface CopyProps {
  code: string
  language: string
  codeSandbox: boolean
  renderHighlighter: React.ReactNode
  codePreviewer: React.ReactNode
}
const codeSandboxSrc = 'https://codesandbox.io/api/v1/sandboxes/define'
const packageJSON = {
  dependencies: {
    '@ant-design/icons': 'latest',
    '@types/react': '^18.0.0',
    '@types/react-dom': '^18.0.0',
    antd: '5.6.2',
    'rc-util': '^5.32.0',
    react: '^18.0.0',
    'react-dom': '^18.0.0',
    'react-scripts': '^5.0.0',
  },
  devDependencies: {
    typescript: '^5.0.2',
  },
}
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
  </head>
  <body>
    <div id="container" style="padding: 24px" />
    <script>const mountNode = document.getElementById('container');</script>
  </body>
</html>
`
const indexJsx = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

createRoot(document.getElementById('container')).render(<App />);
  `

const appJsx = `
import React from 'react';
import { Button, Space } from 'antd';
import  Demo  from './demo';
  
const App: React.FC = () => <Demo/>;
  
export default App;
  `
function getCodeSandboxParameters({ language, code }: { language: string; code: string }) {
  let configuration = {}
  if (['jsx', 'tsx'].includes(language)) {
    configuration = {
      'index.html': {
        content: indexHtml,
        isBinary: false,
      },
      [`index.${language}`]: {
        content: indexJsx,
        isBinary: false,
      },
      [`app.${language}`]: { content: appJsx, isBinary: false },
      [`demo.${language}`]: {
        content: code,
        isBinary: false,
      },
    }
  }
  return getParameters({
    files: {
      'package.json': {
        content: JSON.stringify(packageJSON, null, 2),
        isBinary: false,
      },
      [`index.${language}`]: {
        content: code,
        isBinary: false,
      },
      ...configuration,
    },
  })
}
const Copy: FC<PropsWithChildren<CopyProps>> = ({ codePreviewer, language, code, codeSandbox, renderHighlighter }) => {
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const parameters = getCodeSandboxParameters({ language, code })
  function reset() {
    setCopied(false)
  }
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      const timer = setTimeout(() => {
        reset()
        window.clearTimeout(timer)
      }, 1500)
    } catch (err) {
      reset()
    }
  }
  const toggleShowCode = () => setShowCode((oldStatus) => !oldStatus)
  return (
    <div className={styles['root-container']}>
      <div className={classNames(styles['copy-wrap'], 'flex-space-between-box')}>
        <div className={styles['language']}>{language}</div>
        <Tooltip title="复制代码">
          <button onClick={onCopy} className={classNames('flex-center-box', styles['copy-btn'])}>
            {!copied ? (
              <MdOutlineContentCopy className={classNames('animate__animated', 'animate__zoomIn')} />
            ) : (
              <AiOutlineCheck className={classNames('animate__animated', 'animate__zoomIn')} />
            )}
          </button>
        </Tooltip>
      </div>
      {codeSandbox ? (
        <Root.div className='className="px-2 py-2 w-full max-h-[500px] overflow-scroll flex justify-center items-center"'>
          {codePreviewer}
        </Root.div>
      ) : (
        renderHighlighter
      )}
      {codeSandbox && (
        <footer>
          <form
            className="text-gray-500 text-xl gap-2 flex items-center px-3 py-3 border-t border-[rgba(5, 5, 5, 0.06)] border-dashed"
            action={codeSandboxSrc}
            method="POST"
            target="_blank"
          >
            <input type="hidden" name="parameters" value={`${parameters}`} />
            <Tooltip title="在 codeSandbox 中打开">
              <button type="submit">
                <AiOutlineCodeSandbox />
              </button>
            </Tooltip>
            <Tooltip title={showCode ? '隐藏代码' : '显示代码'}>
              <button type="button" onClick={toggleShowCode}>
                {showCode ? <BsCodeSlash /> : <BsCode />}
              </button>
            </Tooltip>
          </form>
          <div hidden={!showCode} className="border-dashed border-t border-[rgba(5, 5, 5, 0.06)]">
            {renderHighlighter}
          </div>
        </footer>
      )}
    </div>
  )
}

export default Copy
