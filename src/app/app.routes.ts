import { Routes } from '@angular/router';

import { languageMatch } from './core/language';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Exhibitions } from './pages/exhibitions/exhibitions';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { WorkDetail } from './pages/work-detail/work-detail';
import { Works } from './pages/works/works';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en' },
  {
    path: ':lang',
    canMatch: [languageMatch],
    children: [
      { path: '', pathMatch: 'full', component: Home },
      { path: 'works', component: Works },
      { path: 'works/:slug', component: WorkDetail },
      { path: 'about', component: About },
      { path: 'exhibitions', component: Exhibitions },
      { path: 'contact', component: Contact },
      { path: '**', component: NotFound },
    ],
  },
  { path: '**', component: NotFound },
];
