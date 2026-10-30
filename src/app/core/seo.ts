import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE } from '../content/site';
import { Language } from './language';

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly language = inject(Language);

  /** @param path Page path without the language prefix, for example "works". */
  update(pageTitle: string, description: string, path = ''): void {
    const name = this.language.pick(SITE.name);
    const fullTitle = pageTitle ? `${pageTitle} | ${name}` : name;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      name: 'robots',
      content: SITE.launched ? 'index, follow' : 'noindex, nofollow',
    });
    this.updateLinks(path);
  }

  private updateLinks(path: string): void {
    this.doc.head.querySelectorAll('link[data-seo]').forEach((link) => link.remove());
    if (!SITE.url) {
      return;
    }
    const href = (lang: string) => [SITE.url, lang, path].filter(Boolean).join('/');
    this.addLink('canonical', href(this.language.current()));
    this.addLink('alternate', href('en'), 'en');
    this.addLink('alternate', href('ar'), 'ar');
    this.addLink('alternate', href('en'), 'x-default');
  }

  private addLink(rel: string, href: string, hreflang?: string): void {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    link.setAttribute('data-seo', '');
    if (hreflang) {
      link.setAttribute('hreflang', hreflang);
    }
    this.doc.head.appendChild(link);
  }
}
