import { RenderMode, ServerRoute } from '@angular/ssr';

import { WORKS } from './content/works';

const LANGUAGES = ['en', 'ar'];
const languageParams = async () => LANGUAGES.map((lang) => ({ lang }));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: languageParams },
  { path: ':lang/works', renderMode: RenderMode.Prerender, getPrerenderParams: languageParams },
  {
    path: ':lang/works/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGUAGES.flatMap((lang) => WORKS.map((work) => ({ lang, slug: work.slug }))),
  },
  { path: ':lang/about', renderMode: RenderMode.Prerender, getPrerenderParams: languageParams },
  { path: ':lang/exhibitions', renderMode: RenderMode.Prerender, getPrerenderParams: languageParams },
  { path: ':lang/contact', renderMode: RenderMode.Prerender, getPrerenderParams: languageParams },
  // Unknown addresses are served by 404.html, which the deploy workflow copies from index.csr.html.
  { path: '**', renderMode: RenderMode.Client },
];
