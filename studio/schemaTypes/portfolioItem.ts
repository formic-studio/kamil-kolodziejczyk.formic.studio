import {defineField, defineType} from 'sanity'

export const portfolioItem = defineType({name: 'portfolioItem', title: 'Realizacja', type: 'document', fields: [
  defineField({name: 'title', title: 'Nazwa projektu', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'url', title: 'Adres strony', type: 'url', validation: (r) => r.required()}),
  defineField({name: 'client', title: 'Klient', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'industry', title: 'Branża', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'tags', title: 'Tagi', type: 'array', of: [{type: 'string'}], validation: (r) => r.required().min(1)}),
  defineField({name: 'image', title: 'Grafika', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (r) => r.required()})], validation: (r) => r.required()}),
  defineField({name: 'order', title: 'Kolejność', type: 'number', validation: (r) => r.required().integer().min(1)}),
], orderings: [{title: 'Kolejność na stronie', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}]})
