import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Tytuł strony', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Opis SEO', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'email', title: 'E-mail', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'phone', title: 'Telefon', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'ogImage', title: 'Grafika social media', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string'})]}),
    defineField({name: 'socialLinks', title: 'Linki społecznościowe', type: 'array', of: [{type: 'socialLink'}]}),
  ],
  preview: {prepare: () => ({title: 'Ustawienia strony'})},
})
