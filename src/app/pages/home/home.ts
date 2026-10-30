import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Lang, SITE } from '../../content/site';
import { WORKS } from '../../content/works';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';
import { Artwork } from '../../shared/artwork';
import { WorkCard } from '../../shared/work-card';

@Component({
  selector: 'app-home',
  imports: [Artwork, RouterLink, WorkCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly language = inject(Language);
  private readonly seo = inject(Seo);

  protected readonly site = SITE;
  protected readonly featured = WORKS[0];
  protected readonly promo = WORKS[1];
  protected readonly selected = WORKS.slice(2, 5);
  protected readonly otherName = computed(() => {
    const other: Lang = this.language.current() === 'ar' ? 'en' : 'ar';
    return SITE.name[other];
  });

  constructor() {
    effect(() => this.seo.update('', this.language.ui().metaHome));
  }
}
