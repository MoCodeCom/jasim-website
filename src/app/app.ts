import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { SITE } from './content/site';
import { Language } from './core/language';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly language = inject(Language);
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** The same page in the other language. */
  protected readonly otherLanguageUrl = computed(() => {
    const other = this.language.current() === 'ar' ? 'en' : 'ar';
    const url = this.url();
    return /^\/(en|ar)(?=[/?#]|$)/.test(url) ? url.replace(/^\/(en|ar)/, `/${other}`) : `/${other}`;
  });
}
