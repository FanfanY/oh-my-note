import path from 'path'

const AppConfig = {
  routes: [
    {
      title: '笔记',
      path: '/note',
      children: [
        { title: 'JavaScript', path: '/javascript' },
        { title: 'performance', path: '/performance' },
        { title: 'good', path: '/index.md' },
      ],
    },
    { title: '思考', path: '/thinking', children: [{ title: 'good', path: '/index.md' }] },
    { title: '协作', path: '/collaborate', children: [{ title: '', path: '' }] },
    { title: '实践', path: '/practice', children: [{ title: '', path: '' }] },
  ],
  docsPath: path.join(process.cwd(), 'docs'),
  suffix: '.md',
}
export default AppConfig
