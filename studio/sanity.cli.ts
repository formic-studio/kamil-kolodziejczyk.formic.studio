import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'qus38rw8',
    dataset: 'staging',
  },
  deployment: {
    appId: 'r4kg3vpgkgu8kisfjl6kjqf6',
    autoUpdates: false,
  },
})
