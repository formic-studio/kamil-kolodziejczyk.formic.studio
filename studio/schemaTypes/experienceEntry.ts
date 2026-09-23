import {defineField, defineType} from 'sanity'

export const experienceEntry = defineType({name: 'experienceEntry', title: 'Doświadczenie', type: 'document', fields: [
  defineField({name: 'company', title: 'Firma', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'period', title: 'Okres', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'role', title: 'Stanowisko', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'description', title: 'Opis', type: 'text', rows: 5, validation: (r) => r.required()}),
  defineField({name: 'order', title: 'Kolejność', type: 'number', validation: (r) => r.required().integer().min(1)}),
], preview: {select: {title: 'role', subtitle: 'company'}}})
