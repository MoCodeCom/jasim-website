import { Component, effect, inject, RESPONSE_INIT } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Language } from '../../core/language';
import { Seo } from '../../core/seo';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="page-head">
      <div class="wrap">
        <h1>{{ language.ui().notFoundTitle }}</h1>
      </div>
    </div>
    <div class="wrap page">
      <p>{{ language.ui().notFoundText }}</p>
      <a [routerLink]="language.link()">{{ language.ui().backHome }}</a>
    </div>
  `,
})
export class NotFound {
  protected readonly language = inject(Language);
  private readonly seo = inject(Seo);

  constructor() {
    // Also covers paths that match a route pattern, such as /fr or a missing work.
    const response = inject(RESPONSE_INIT, { optional: true });
    if (response) {
      response.status = 404;
    }

    effect(() => {
      const ui = this.language.ui();
      this.seo.update(ui.notFoundTitle, ui.notFoundText);
    });
  }
}
