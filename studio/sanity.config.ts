import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const sharedConfig = {
  projectId: 'qus38rw8',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Treści')
          .items([
            S.listItem()
              .title('Ustawienia strony')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Strona główna')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['siteSettings', 'homePage'].includes(item.getId() || ''),
            ),
          ]),
    }),
    visionTool(),
  ],
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
