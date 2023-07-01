import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import AppConfig from 'src/config/app'
export function isDirectory(path: string) {
  try {
    return fs.statSync(path).isDirectory()
  } catch (error) {
    return false
  }
}

export function addSuffix(fileName: string) {
  return fileName + AppConfig.suffix
}

export function deleteSuffix(fileName: string) {
  const pointIndex = fileName.lastIndexOf('.')
  if (pointIndex === -1) return fileName
  return fileName.substring(0, pointIndex)
}

export function getLabelFromMarkdown(markdownFilePath: string) {
  const markdown = fs.readFileSync(markdownFilePath, 'utf-8')
  const firstLine = markdown?.split('/n')[0]
  const title = marked.lexer(firstLine)[0]?.raw
  const label = getTextFromRaw(title)
  return label
}

export function getTextFromRaw(rawText?: string) {
  return rawText?.replaceAll('#', '').trim().replaceAll('\n', '')
}

export function readDir(entry: string) {
  return fs.readdirSync(entry).filter((file) => (file === '.DS_Store' ? false : true))
}

export function getREADME() {
  const readmePath = path.join(process.cwd(), 'README.md')
  const markdown = fs.readFileSync(readmePath, 'utf-8')
  return markdown
}
