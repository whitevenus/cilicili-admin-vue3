export default {
  description: '创建标准CURD',
  prompts: [
    {
      type: 'input',
      name: 'modelName',
      message: '请输入模型名称（用-分隔单词，统一小写,勿与之前重复，然后回车即可）：'
    },
    {
      type: 'input',
      name: 'labelName',
      message: '请输入模型标识名称（建议中文，如：角色）：'
    },
    {
      type: 'confirm',
      name: 'isPackage',
      message: '当前业务组件是否为主包主入口组件？',
      default: true
    },
    {
      type: 'input',
      name: 'packageName',
      message: '请输入该组件属于主包名称：',
      default: '',
      when: (data) => {
        return !data.isPackage
      }
    }
  ],
  actions: (data) => {
    const { modelName, labelName, isPackage, packageName } = data
    const listPath = isPackage ? `${modelName}/index.vue` : `${packageName}/${modelName}.vue`
    const editDialogPath = isPackage
      ? `${modelName}/edit-dialog.vue`
      : `${packageName}/${modelName}-edit-dialog.vue`
    return [
      {
        type: 'add',
        path: `src/api/${modelName}.ts`,
        templateFile: 'templates/curd/api/api.hbs',
        data: {
          modelName,
          labelName
        }
      },
      {
        type: 'append',
        path: `src/api/types.ts`,
        templateFile: 'templates/curd/api/types.hbs',
        data: {
          modelName
        }
      },
      {
        type: 'add',
        path: `src/views/${listPath}`,
        templateFile: 'templates/curd/views/index.hbs',
        data: {
          modelName,
          labelName,
          editDialogPath
        }
      },
      {
        type: 'add',
        path: `src/views/${editDialogPath}`,
        templateFile: 'templates/curd/views/edit-dialog.hbs',
        data: {
          modelName,
          labelName
        }
      }
    ]
  }
}

// [
//   {
//     type: 'add',
//     path: 'src/{{name}}.js',
//     templateFile: 'plop-templates/controller.hbs'
//   }
// ]
