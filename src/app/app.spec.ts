import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';
import { WORKS } from './content/works';
import { Language } from './core/language';
import { enquiryLink } from './pages/contact/contact';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  async function open(url: string) {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders English pages left to right', async () => {
    const page = await open('/en');
    expect(page.querySelector('h1')?.textContent).toContain('Jasim AlFadhel');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('renders Arabic pages right to left', async () => {
    const page = await open('/ar/works');
    expect(page.querySelector('h1')?.textContent).toContain('الأعمال');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    expect(TestBed.inject(Language).current()).toBe('ar');
  });

  it('links to the same page in the other language', async () => {
    const page = await open('/en/about');
    expect(page.querySelector('.switch')?.getAttribute('href')).toBe('/ar/about');
  });

  it('shows the not found page for unknown works and languages', async () => {
    expect((await open('/en/works/missing')).textContent).toContain('Page not found');
    expect((await open('/fr')).querySelector('h1')?.textContent).toBeTruthy();
  });
});

describe('content', () => {
  it('gives every work a unique slug and both languages', () => {
    expect(new Set(WORKS.map((work) => work.slug)).size).toBe(WORKS.length);
    for (const work of WORKS) {
      expect(work.title.en).toBeTruthy();
      expect(work.title.ar).toBeTruthy();
    }
  });
});

describe('enquiryLink', () => {
  it('encodes the enquiry so its text cannot alter the email fields', () => {
    const link = enquiryLink('studio@example.com', {
      name: 'A & B',
      email: 'a@example.com',
      subject: 'Hello&bcc=x@example.com',
      message: 'Line one',
    });
    expect(link).toContain('subject=Hello%26bcc%3Dx%40example.com&body=');
    expect(link).not.toContain('&bcc=');
  });
});
