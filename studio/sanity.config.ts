import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const sharedConfig = {
  projectId: 'qus38rw8',
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes},
}

export default defineConfig([
  {
    ...sharedConfig,
    name: 'staging',
    title: 'Kamil Kołodziejczyk — staging',
    basePath: '/staging',
    dataset: 'staging',
  },
  {
    ...sharedConfig,
    name: 'production',
    title: 'Kamil Kołodziejczyk — production',
    basePath: '/production',
    dataset: 'production',
  },
])
