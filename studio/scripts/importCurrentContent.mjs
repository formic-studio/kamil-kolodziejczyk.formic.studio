import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const here = dirname(fileURLToPath(import.meta.url))
const imageDir = resolve(here, '../../web/public/images')
const keyed = (items) => items.map((item, index) => ({_key: `item-${index + 1}`, ...item}))

async function image(filename, alt) {
  const existing = await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id', {filename})
  const asset = existing ? {_id: existing} : await client.assets.upload('image', createReadStream(resolve(imageDir, filename)), {filename})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt}
}

const portraitAlt = 'Kamil Kołodziejczyk w pasiastym swetrze i okrągłych okularach, siedzący na metalowym krześle.'

const portfolioData = [
  ['upperhouse', 'Upperhouse', 'https://penthouse.upperhouse.pl/', 'Angel Group', 'deweloperska', ['Integracja CRM', 'Webflow'], 'folio-upperhouse.webp'],
  ['reset', 'Studio jogi&pilatesu', 'https://www.reset-club.pl/', 'studio reSET', 'joga', ['Rozbudowany CMS', 'Webflow'], 'reSET-186-1.webp'],
  ['habitat', 'Habitat', 'https://www.hbt.pl/', 'Jadach Invest', 'deweloperska', ['Strona deweloperska', 'Webflow'], 'Case.webp'],
  ['forna', 'Forna', 'https://forna.co/', 'Forna', 'design', ['Landing page', 'WordPress'], 'forna.webp'],
  ['carbonbuilt', 'Carbonbuilt', 'https://www.carbonbuilt.com/', 'Carbonbuilt', 'budowlana', ['Blog', 'Webflow'], 'carbon.webp'],
  ['pathra', 'Pathra', 'https://pathra-staging.webflow.io/', 'Pathra', 'technologiczna', ['Landing page', 'Webflow'], 'pathra.webp'],
]

const portfolio = []
for (const [slug, title, url, customer, industry, tags, filename] of portfolioData) {
  const doc = {
    _id: `portfolio-${slug}`, _type: 'portfolioItem', title, url, client: customer, industry,
    tags, order: portfolio.length + 1,
    image: await image(filename, `Projekt ${title}`),
  }
  await client.createOrReplace(doc)
  portfolio.push({_key: slug, _type: 'reference', _ref: doc._id})
}

const experienceData = [
  ['freelance', 'freelance', '2025 - obecnie', 'Low-code developer', "Współpraca ze studiami brandingowymi, takimi jak Meteora, nauczyła mnie rygorystycznego podejścia do designu. Jako developer Low-code gwarantuję wdrożenia 'pixel-perfect', gdzie każda animacja i detal wizualny są idealnym odzwierciedleniem Twojej marki."],
  ['synerise', 'synerise', '2021 - 2026', 'Customer Success & Implementation Manager', 'Praca z klientami Enterprise nauczyła mnie, że technologia musi przede wszystkim realizować cele biznesowe. Dzięki temu Twoja strona nie będzie tylko ładną wizytówką, ale narzędziem gotowym na analitykę, skalowanie i realne wspieranie sprzedaży.'],
  ['edrone-implementation', 'edrone', '2020 - 2021', 'Onsite Implementation Specialist', 'Wdrażałem rozwiązania marketingowe edrone na stronach e-commerce klientów. Zajmowałem się integracją narzędzi do automatyzacji marketingu, konfiguracją kampanii email oraz optymalizacją ścieżek komunikacji z klientami, zapewniając sprawne uruchomienie systemu i jego właściwe działanie.'],
  ['edrone-support', 'edrone', '2018 - 2020', 'Customer Support Specialist', 'Wspierałem klientów edrone w codziennym użytkowaniu platformy marketingowej. Pomagałem w rozwiązywaniu problemów technicznych, doradzałem w zakresie najlepszych praktyk email marketingu oraz dbałem o satysfakcję użytkowników, zapewniając szybką i profesjonalną pomoc.'],
]
const experience = []
for (const [slug, company, period, role, description] of experienceData) {
  const doc = {_id: `experience-${slug}`, _type: 'experienceEntry', company, period, role, description, order: experience.length + 1}
  await client.createOrReplace(doc)
  experience.push({_key: slug, _type: 'reference', _ref: doc._id})
}

const testimonialData = [
  ['piotr-budzisz', 'Piotr Budzisz', 'METEORA.AGENCY', 'Kamil ratował nasze projekty, gdy inni developerzy nie mieli czasu lub nie dostarczali nam oczekiwanej jakości. Tak zaczęła się nasza współpraca, która potoczyła się na tyle dobrze, że obecnie jest to nasz jedyny podwykonawca we wdrażaniu stron. Jeśli szukacie godnego zaufania, szybkiego i kontaktowego deva – to zdecydowanie on!', 'współpraca ze studiem'],
  ['adrianna-gajdziszewska', 'Adrianna Gajdziszewska', 'twarda sztuka', 'Współpraca z Kamilem była dla mnie wartościowym i twórczym procesem, opartym na uważnej rozmowie i wzajemnym zrozumieniu, dlatego z przekonaniem mogę ją polecić. Powstała strona z portfolio artystycznym w sposób spójny i wyważony oddaje mój styl, intencje i wrażliwość. Przejrzysta struktura i wyczucie formy sprawiają, że całość trafnie odzwierciedla moją praktykę twórczą.', 'współpraca z klientem'],
  ['tomasz-gorzelany', 'Tomasz Gorzelany', 'notice studio', 'Kamil to super gość, to po pierwsze! Cierpliwy, słuchający, wspierający, elastyczny, dociekliwy, zmotywowany — aż do celu. Taki, z którym po prostu chcesz pracować, gdy wdrażasz swój design jako agencja, studio czy freelancer.', 'współpraca z designerem'],
]
const testimonials = []
for (const [slug, author, company, quote, relationship] of testimonialData) {
  const doc = {_id: `testimonial-${slug}`, _type: 'testimonial', author, company, quote, relationship, order: testimonials.length + 1}
  await client.createOrReplace(doc)
  testimonials.push({_key: slug, _type: 'reference', _ref: doc._id})
}

const settings = {
  _id: 'siteSettings', _type: 'siteSettings',
  title: 'Kamil Kołodziejczyk — Low-code developer',
  description: 'Projektowanie i wdrażanie stron, integracje systemów, marketing automation oraz wsparcie marek i studiów brandingowych.',
  email: 'kamil.kolodziejczyk@formic.studio', phone: '+48 532 416 772',
  ogImage: await image('Formic_preview.jpg', 'Kamil Kołodziejczyk — low-code developer'),
  socialLinks: keyed([{_type: 'socialLink', label: 'LinkedIn', url: 'https://www.linkedin.com/in/kamil-ko%C5%82odziejczyk/'}]),
}

const capabilities = [
  {title: 'Low-Code Developer', items: [
    {title: 'Integracje i automatyzacje', description: 'Łączę strony z zewnętrznymi narzędziami (CRM, formularze, płatności) i automatyzuję procesy, które ułatwiają zarządzanie treścią i danymi.'},
    {title: 'Pixel-perfect development', description: 'Przekształcam projekty z Figmy w w pełni funkcjonalne strony, zachowując najwyższą precyzję i zgodność z wizją brandingową.'},
    {title: 'Zaawansowane animacje', description: 'Implementuję płynne animacje i mikrointerakcje (GSAP, Lottie), które ożywiają projekty i budują premium user experience.'},
    {title: 'Responsywność i optymalizacja', description: 'Dbam o perfekcyjne wyświetlanie na wszystkich urządzeniach oraz szybkość ładowania i optymalizację SEO.'},
  ]},
  {title: 'Implementation Manager', items: [
    {title: 'Integracje', description: 'Łączę platformy marketingowe, CRM i e-commerce ze stronami klientów, zapewniając automatyczny przepływ i synchronizację danych.'},
    {title: 'Onboarding klientów', description: 'Przeprowadzam klientów przez cały proces wdrożenia – od analizy potrzeb, przez konfigurację systemu, po szkolenia zespołów.'},
    {title: 'Customer Success', description: 'Buduję długoterminowe relacje z klientami, zapewniając wsparcie techniczne i biznesowe oraz maksymalizację ROI z platformy.'},
    {title: 'Automatyzacje', description: 'Projektuję i wdrażam zaawansowane scenariusze automatyzacji marketingowej, optymalizując procesy komunikacji z klientami.'},
  ]},
].map((group, index) => ({_key: `group-${index + 1}`, _type: 'capabilityGroup', ...group, items: keyed(group.items.map((item) => ({_type: 'capabilityItem', ...item})))}))

const servicePeople = [
  {name: 'Kamil Kołodziejczyk', headline: 'Low-code Development', services: [
    {title: 'Wdrażanie stron', description: 'Twój projekt z Figmy zamienię w w pełni funkcjonalną stronę z pixel-perfect precyzją. Zadbam o responsywność, animacje i dopracowanie każdego szczegółu zgodnie z Twoją wizją brandingową.'},
    {title: 'Integracje systemów', description: 'Połączę Twoją stronę z zewnętrznymi narzędziami – od CRM i platform marketingowych, po systemy płatności i formularze. Zapewnię płynny przepływ danych i automatyzację procesów.'},
    {title: 'Przekazanie strony', description: 'Płynnie przekażę Ci gotową stronę – przeszkolę Twój zespół z obsługi CMS, aktualizacji treści i podstawowych zmian, zapewniając Ci pełną autonomię.'},
  ], socialLinks: [{label: 'LinkedIn', url: 'https://www.linkedin.com/in/kamil-ko%C5%82odziejczyk/'}]},
  {name: 'Kinga Bożkiewicz', headline: '& Brand Design', services: [
    {title: 'Webdesign', description: 'Projektuję strony internetowe, które wyróżniają marki na tle konkurencji i są zgodne z oczekiwaniami klientów. Pomogę w określeniu zawartości i struktury strony, wesprę Cię w pisaniu tekstów i zaprojektuję design spójny z identyfikacją wizualną marki.'},
    {title: 'Strategia marki', description: 'Od 8 lat pomagam budować strategie, analizuję konkurencję, pozycjonuję marki względem niej, tworzę unikalny charakter komunikacji oraz badam grupy docelowe, by lepiej odpowiadać na ich potrzeby i zwiększać sprzedaż.'},
    {title: 'Identyfikacja wizualna', description: 'Pomogę na każdym etapie tworzenia spójnej, wyróżniającej się marki: od identyfikacji i strategii, przez sesje produktowe i nadzór nad wydrukami, aż po szkolenie zespołu we wdrażaniu brandu.'},
  ], socialLinks: [
    {label: 'LinkedIn', url: 'https://www.linkedin.com/in/kingabozkiewicz/'},
    {label: 'Behance', url: 'https://www.behance.net/kingabozkiewicz?locale=pl_PL'},
    {label: 'Instagram', url: 'https://www.instagram.com/eyecatcher.kb'},
  ]},
].map((person, index) => ({_key: `person-${index + 1}`, _type: 'servicePerson', ...person, services: keyed(person.services.map((item) => ({_type: 'serviceItem', ...item}))), socialLinks: keyed(person.socialLinks.map((item) => ({_type: 'socialLink', ...item})))}))

const home = {
  _id: 'homePage', _type: 'homePage',
  heroEyebrow: 'low-code developer, od którego\nnie usłyszysz „nie da się”',
  heroCta: 'wdróżmy twój projekt', heroCaption: 'projektowanie stron od zera\nwdrażanie gotowych designów',
  heroImage: await image('Hero_wide.webp', portraitAlt), heroImageMobile: await image('kk.webp', portraitAlt),
  offerIntro: 'Kamil Kołodziejczyk\nlow–code, it brand support, branding',
  offerHeading: 'Szukasz podwykonawcy, który rozumie design, realizuje projekty z wyczuciem co do piksela i wychodzi naprzeciw Twoim potrzebom?',
  offers: keyed([
    {number: '01', title: 'wszechstronność', description: 'Wspieram zarówno marki jak i studia brandingowe nie tylko we wdrażaniu stron, ale też w szerszym zakresie – od projektowania i kodowania, przez integracje systemów CRM i platform marketingowych, aż po wdrażanie zaawansowanych rozwiązań e-commerce i marketing automation.'},
    {number: '02', title: 'szybka realizacja', description: 'Dzięki biegłości w środowiskach low-code dostarczam gotowe rozwiązania szybko i efektywnie, skracając czas wdrożenia do minimum przy jednoczesnym odwzorowaniu każdego detalu. Bezpośrednia praca z designerem pozwala na szybsze wdrażanie korekt i reagowanie na feedback.'},
    {number: '03', title: 'doświadczenie z klientem', description: 'Mam 8-letnie doświadczenie w prowadzeniu projektów z zakresu IT i e-commerce z międzynarodowymi, dużymi markami. Znam realia wdrożeń od strony biznesu i kupującego, co pozwala mi lepiej dopasować rozwiązania do potrzeb obu stron.'},
    {number: '04', title: 'estetyka i nowoczesność', description: 'Śledzę najnowsze trendy i narzędzia, by wykorzystywać rozwiązania, które sprawiają, że projekty są szybsze, bardziej skalowalne i łatwiejsze w utrzymaniu. Działam w duecie z designerem i zwracam uwagę na dokładne odwzorowanie detali.'},
  ].map((item) => ({_type: 'offerItem', ...item}))),
  aboutLabel: 'kamil kołodziejczyk\npoznajmy się',
  aboutText: 'Przez 8 lat pracowałem w środowisku nowoczesnych technologii marketingowych (edrone/Synerise), realizując wdrożenia i projekty dla dużych oraz enterprise klientów e-commerce.\n\nWspółpracowałem z zespołami IT, marketingu i analityki, prowadząc projekty wdrożeniowe i szkolenia w zakresie wykorzystania danych i narzędzi AI.',
  capabilityGroups: capabilities, experience, servicePeople, portfolio, testimonials,
  contactHeading: 'Chcesz wdrożyć stronę, szukasz wsparcia z zakresu IT lub rozwoju marki?',
  contactClaim: 'Your idea\nmade to live',
  privacyNotice: 'Wysyłając wiadomość akceptujesz politykę prywatności i przetwarzania danych.',
}

await client.transaction().createOrReplace(settings).createOrReplace(home).commit()
const legacyIds = [
  ...portfolioData.map(([slug]) => `portfolio.${slug}`),
  ...experienceData.map(([slug]) => `experience.${slug}`),
  ...testimonialData.map(([slug]) => `testimonial.${slug}`),
]
await Promise.all(legacyIds.map((id) => client.delete(id).catch(() => undefined)))
console.log(`Zaimportowano treści do datasetu: ${client.config().dataset}`)
