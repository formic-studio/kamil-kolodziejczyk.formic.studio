import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'qus38rw8',
    dataset: 'staging',
  },
  deployment: {
    autoUpdates: false,
  },
})
