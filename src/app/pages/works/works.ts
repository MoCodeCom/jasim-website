import { Component, computed, effect, inject, signal } from '@angular/core';

import { Medium, MEDIUMS, WORKS } from '../../content/works';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';
import { WorkCard } from '../../shared/work-card';

@Component({
  selector: 'app-works',
  imports: [WorkCard],
  templateUrl: './works.html',
  styleUrl: './works.css',
})
export class Works {
  protected readonly language = inject(Language);
  private readonly seo = inject(Seo);

  protected readonly mediums = MEDIUMS;
  protected readonly active = signal<Medium | null>(null);
  protected readonly visible = computed(() => {
    const medium = this.active();
    return medium ? WORKS.filter((work) => work.medium === medium) : WORKS;
  });

  constructor() {
    effect(() => {
      const ui = this.language.ui();
      this.seo.update(ui.works, ui.metaWorks, 'works');
    });
  }
}
