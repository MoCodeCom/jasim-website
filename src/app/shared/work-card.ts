import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Work } from '../content/works';
import { Language } from '../core/language';
import { Artwork } from './artwork';

@Component({
  selector: 'app-work-card',
  imports: [Artwork, RouterLink],
  template: `
    <a [routerLink]="language.link('works', work().slug)">
      <app-artwork [work]="work()" [eager]="eager()" />
      <span class="caption">
        <span class="title">{{ language.pick(work().title) }}</span>
        <span class="meta">{{ language.ui().mediums[work().medium] }}</span>
      </span>
    </a>
  `,
  styles: `
    a {
      display: block;
      color: inherit;
      text-decoration: none;
    }
    .caption {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.25rem 1rem;
      margin-block-start: 0.85rem;
    }
    .title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    a:hover .title {
      text-decoration: underline;
    }
    .meta {
      font-size: 0.95rem;
    }
  `,
})
export class WorkCard {
  readonly work = input.required<Work>();
  readonly eager = input(false);
  protected readonly language = inject(Language);
}
