import {createClient} from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'qus38rw8',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'staging',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-08-15',
  useCdn: false,
  perspective: 'published',
});
