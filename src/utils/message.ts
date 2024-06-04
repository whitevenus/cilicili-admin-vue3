import app from '@/app'

const getMessage = () => app.config.globalProperties.$message

const message = {
  error(param: string) {
    getMessage().error(param)
  },
  success(param: string) {
    getMessage().success(param)
  }
}

export default message
