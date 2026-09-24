export interface SanityImage { alt?: string; asset?: {url?: string} }
export interface SocialLink { label: string; url: string }
export interface Offer { number: string; title: string; description: string }
export interface CapabilityItem { title: string; description: string }
export interface CapabilityGroup { title: string; items: CapabilityItem[] }
export interface Experience { company: string; period: string; role: string; description: string }
export interface ServicePerson { name: string; headline: string; services: CapabilityItem[]; socialLinks?: SocialLink[] }
export interface PortfolioItem { title: string; url: string; client: string; industry: string; tags: string[]; image: SanityImage }
export interface Testimonial { author: string; company: string; quote: string; relationship: string }
export interface SiteSettings { title: string; description: string; email: string; phone: string; ogImage?: SanityImage; socialLinks?: SocialLink[] }
export interface HomePage {
  heroEyebrow: string; heroCta: string; heroCaption: string; heroImage: SanityImage; heroImageMobile: SanityImage;
  offerIntro: string; offerHeading: string; offers: Offer[]; aboutLabel: string; aboutText: string;
  capabilityGroups: CapabilityGroup[]; experience: Experience[]; servicePeople: ServicePerson[];
  portfolio: PortfolioItem[]; testimonials: Testimonial[]; contactHeading: string; contactClaim: string; privacyNotice: string;
}
export interface PageData { settings: SiteSettings; page: HomePage }

export const pageQuery = `{
  "settings": *[_id == "siteSettings"][0]{title, description, email, phone, socialLinks[]{label,url}, ogImage{alt,asset->{url}}},
  "page": *[_id == "homePage"][0]{
    heroEyebrow, heroCta, heroCaption, heroImage{alt,asset->{url}}, heroImageMobile{alt,asset->{url}},
    offerIntro, offerHeading, offers[]{number,title,description}, aboutLabel, aboutText,
    capabilityGroups[]{title,items[]{title,description}},
    "experience": experience[]->{company,period,role,description,order},
    servicePeople[]{name,headline,services[]{title,description},socialLinks[]{label,url}},
    "portfolio": portfolio[]->{title,url,client,industry,tags,image{alt,asset->{url}},order},
    "testimonials": testimonials[]->{author,company,quote,relationship,order},
    contactHeading, contactClaim, privacyNotice
  }
}`

export const imageUrl = (image: SanityImage | undefined, width?: number, quality = 90) => {
  const url = image?.asset?.url
  if (!url) return ''
  return width ? `${url}?w=${width}&auto=format&q=${quality}` : url
}

export const blurredImageUrl = (image: SanityImage | undefined, width = 1200, blur = 10) => {
  const url = image?.asset?.url
  if (!url) return ''
  return `${url}?w=${width}&auto=format&q=72&blur=${blur}`
}
