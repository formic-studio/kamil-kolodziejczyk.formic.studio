import {defineField, defineType} from 'sanity'

export const socialLink = defineType({name: 'socialLink', title: 'Link społecznościowy', type: 'object', fields: [
  defineField({name: 'label', title: 'Nazwa', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'url', title: 'Adres URL', type: 'url', validation: (r) => r.required()}),
]})

export const offerItem = defineType({name: 'offerItem', title: 'Element oferty', type: 'object', fields: [
  defineField({name: 'number', title: 'Numer', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'description', title: 'Opis', type: 'text', rows: 5, validation: (r) => r.required()}),
], preview: {select: {title: 'title', subtitle: 'number'}}})

export const capabilityItem = defineType({name: 'capabilityItem', title: 'Kompetencja', type: 'object', fields: [
  defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'description', title: 'Opis', type: 'text', rows: 3, validation: (r) => r.required()}),
]})

export const capabilityGroup = defineType({name: 'capabilityGroup', title: 'Grupa kompetencji', type: 'object', fields: [
  defineField({name: 'title', title: 'Nazwa roli', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'items', title: 'Kompetencje', type: 'array', of: [{type: 'capabilityItem'}], validation: (r) => r.required().min(1)}),
]})

export const serviceItem = defineType({name: 'serviceItem', title: 'Usługa', type: 'object', fields: [
  defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'description', title: 'Opis', type: 'text', rows: 5, validation: (r) => r.required()}),
]})

export const servicePerson = defineType({name: 'servicePerson', title: 'Osoba i usługi', type: 'object', fields: [
  defineField({name: 'name', title: 'Imię i nazwisko', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'headline', title: 'Nagłówek', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'services', title: 'Usługi', type: 'array', of: [{type: 'serviceItem'}], validation: (r) => r.required().min(1)}),
  defineField({name: 'socialLinks', title: 'Linki społecznościowe', type: 'array', of: [{type: 'socialLink'}]}),
]})
