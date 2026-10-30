import { Component, effect, inject } from '@angular/core';

import { EXHIBITIONS } from '../../content/exhibitions';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';

@Component({
  selector: 'app-exhibitions',
  template: `
    <div class="page-head">
      <div class="wrap">
        <h1>{{ language.ui().exhibitions }}</h1>
      </div>
    </div>
    <div class="wrap page">
      <ul>
        @for (item of exhibitions; track $index) {
          <li>
            <span class="year">{{ item.year }}</span>
            <span>
              <strong>{{ language.pick(item.title) }}</strong>
              @if (item.venue; as venue) {
                <br />
                {{ language.pick(venue) }}
              }
            </span>
            <span class="kind">{{ language.ui()[item.kind] }}</span>
          </li>
        } @empty {
          <li class="empty">{{ language.ui().exhibitionsEmpty }}</li>
        }
      </ul>
    </div>
  `,
  styles: `
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      border-block-start: 1px solid var(--line);
    }
    li {
      display: grid;
      grid-template-columns: 5rem 1fr auto;
      gap: 1rem;
      padding-block: 1.25rem;
      border-block-end: 1px solid var(--line);
    }
    strong {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .year,
    .kind,
    .empty {
      color: var(--muted);
    }
    .empty {
      display: block;
    }
  `,
})
export class Exhibitions {
  protected readonly language = inject(Language);
  protected readonly exhibitions = EXHIBITIONS;
  private readonly seo = inject(Seo);

  constructor() {
    effect(() => {
      const ui = this.language.ui();
      this.seo.update(ui.exhibitions, ui.metaExhibitions, 'exhibitions');
    });
  }
}
