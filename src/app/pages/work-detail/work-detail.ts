import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WORKS } from '../../content/works';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';
import { Artwork } from '../../shared/artwork';
import { NotFound } from '../not-found/not-found';

@Component({
  selector: 'app-work-detail',
  imports: [Artwork, NotFound, RouterLink],
  templateUrl: './work-detail.html',
  styleUrl: './work-detail.css',
})
export class WorkDetail {
  /** Bound from the route parameter. */
  readonly slug = input<string>();

  protected readonly language = inject(Language);
  private readonly seo = inject(Seo);

  private readonly index = computed(() => WORKS.findIndex((work) => work.slug === this.slug()));
  protected readonly work = computed(() => WORKS[this.index()]);
  protected readonly previous = computed(() => WORKS[(this.index() - 1 + WORKS.length) % WORKS.length]);
  protected readonly next = computed(() => WORKS[(this.index() + 1) % WORKS.length]);

  constructor() {
    effect(() => {
      const work = this.work();
      if (work) {
        const title = this.language.pick(work.title);
        this.seo.update(title, title, `works/${work.slug}`);
      }
    });
  }
}
