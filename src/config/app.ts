import path from 'path'

const AppConfig = {
  routes: [{ title: '笔记' }, { title: '思考' }, { title: '协作' }, { title: '实践' }],
  docsPath: path.join(process.cwd(), 'docs'),
}
export default AppConfig
