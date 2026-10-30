import { Component, effect, inject } from '@angular/core';

import { SITE } from '../../content/site';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';

@Component({
  selector: 'app-about',
  template: `
    <div class="page-head">
      <div class="wrap">
        <h1>{{ language.ui().about }}</h1>
      </div>
    </div>
    <div class="wrap page columns">
      <section>
        <p class="label">{{ language.ui().biography }}</p>
        @for (paragraph of site.biography; track $index) {
          <p>{{ language.pick(paragraph) }}</p>
        }
      </section>
      <section>
        <p class="label">{{ language.ui().statement }}</p>
        <p>{{ language.pick(site.statement) }}</p>
      </section>
    </div>
  `,
  styles: `
    .columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
      gap: clamp(2rem, 5vw, 5rem);
    }
    .label {
      margin-block-start: 0;
    }
  `,
})
export class About {
  protected readonly language = inject(Language);
  protected readonly site = SITE;
  private readonly seo = inject(Seo);

  constructor() {
    effect(() => {
      const ui = this.language.ui();
      this.seo.update(ui.about, ui.metaAbout, 'about');
    });
  }
}
