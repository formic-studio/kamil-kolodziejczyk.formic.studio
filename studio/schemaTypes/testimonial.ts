import {defineField, defineType} from 'sanity'

export const testimonial = defineType({name: 'testimonial', title: 'Rekomendacja', type: 'document', fields: [
  defineField({name: 'author', title: 'Autor', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'company', title: 'Firma', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'quote', title: 'Treść', type: 'text', rows: 7, validation: (r) => r.required()}),
  defineField({name: 'relationship', title: 'Rodzaj współpracy', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'order', title: 'Kolejność', type: 'number', validation: (r) => r.required().integer().min(1)}),
], preview: {select: {title: 'author', subtitle: 'company'}}})
