import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage', title: 'Strona główna', type: 'document',
  groups: [{name: 'hero', title: 'Hero'}, {name: 'offer', title: 'Oferta'}, {name: 'about', title: 'O mnie'}, {name: 'services', title: 'Usługi'}, {name: 'contact', title: 'Kontakt'}],
  fields: [
    defineField({name: 'heroEyebrow', title: 'Nagłówek hero', type: 'string', group: 'hero', validation: (r) => r.required()}),
    defineField({name: 'heroCta', title: 'Tekst przycisku', type: 'string', group: 'hero', validation: (r) => r.required()}),
    defineField({name: 'heroCaption', title: 'Podpis', type: 'string', group: 'hero', validation: (r) => r.required()}),
    defineField({name: 'heroImage', title: 'Zdjęcie desktop', type: 'image', group: 'hero', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (r) => r.required()})]}),
    defineField({name: 'heroImageMobile', title: 'Zdjęcie mobile', type: 'image', group: 'hero', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (r) => r.required()})]}),
    defineField({name: 'offerIntro', title: 'Podpis sekcji', type: 'string', group: 'offer'}),
    defineField({name: 'offerHeading', title: 'Nagłówek oferty', type: 'text', rows: 3, group: 'offer', validation: (r) => r.required()}),
    defineField({name: 'offers', title: 'Elementy oferty', type: 'array', group: 'offer', of: [{type: 'offerItem'}], validation: (r) => r.required().length(4)}),
    defineField({name: 'aboutLabel', title: 'Podpis sekcji', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'Opis doświadczenia', type: 'text', rows: 6, group: 'about', validation: (r) => r.required()}),
    defineField({name: 'capabilityGroups', title: 'Kompetencje', type: 'array', group: 'about', of: [{type: 'capabilityGroup'}]}),
    defineField({name: 'experience', title: 'Doświadczenie', type: 'array', group: 'about', of: [{type: 'reference', to: [{type: 'experienceEntry'}]}]}),
    defineField({name: 'servicePeople', title: 'Usługi', type: 'array', group: 'services', of: [{type: 'servicePerson'}]}),
    defineField({name: 'portfolio', title: 'Portfolio', type: 'array', of: [{type: 'reference', to: [{type: 'portfolioItem'}]}]}),
    defineField({name: 'testimonials', title: 'Rekomendacje', type: 'array', of: [{type: 'reference', to: [{type: 'testimonial'}]}]}),
    defineField({name: 'contactHeading', title: 'Nagłówek kontaktu', type: 'text', rows: 2, group: 'contact'}),
    defineField({name: 'contactClaim', title: 'Claim kontaktowy', type: 'string', group: 'contact'}),
    defineField({name: 'privacyNotice', title: 'Informacja pod formularzem', type: 'string', group: 'contact'}),
  ],
  preview: {prepare: () => ({title: 'Strona główna'})},
})
