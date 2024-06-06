import curdGenerator from './templates/curd/index.js'

export default function (plop) {
  // controller generator
  plop.setGenerator('curd', curdGenerator)
}
