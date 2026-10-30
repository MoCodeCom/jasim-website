import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { Lang, Localized } from '../content/site';
import { UI_TEXT } from './ui-text';

@Injectable({ providedIn: 'root' })
export class Language {
  private readonly root = inject(DOCUMENT).documentElement;

  // Prerendered pages carry their language on <html>, so hydration starts in the right one.
  readonly current = signal<Lang>(this.root.getAttribute('lang') === 'ar' ? 'ar' : 'en');
  readonly ui = computed(() => UI_TEXT[this.current()]);

  set(lang: Lang): void {
    this.current.set(lang);
    this.root.setAttribute('lang', lang);
    this.root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  pick(text: Localized): string {
    return text[this.current()];
  }

  link(...segments: string[]): string[] {
    return ['/', this.current(), ...segments];
  }
}

/** Matches only supported language prefixes and applies the language before the page renders. */
export const languageMatch: CanMatchFn = (_route, segments) => {
  const lang = segments[0]?.path;
  if (lang !== 'en' && lang !== 'ar') {
    return false;
  }
  inject(Language).set(lang);
  return true;
};
