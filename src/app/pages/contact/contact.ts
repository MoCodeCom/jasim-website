import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SITE } from '../../content/site';
import { WORKS } from '../../content/works';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';

/** Where the visitor writes the email: their default app, or webmail in a new tab. */
export type EmailService = 'app' | 'gmail' | 'outlook';

/** Builds the pre-filled email the enquiry form opens. */
export function enquiryLink(
  to: string[],
  enquiry: { name: string; email: string; subject: string; message: string },
  service: EmailService = 'app',
): string {
  const subject = encodeURIComponent(enquiry.subject);
  const body = encodeURIComponent(`${enquiry.message}\n\n${enquiry.name}\n${enquiry.email}`);
  const recipients = to.join(',');
  switch (service) {
    case 'gmail':
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipients)}&su=${subject}&body=${body}`;
    case 'outlook':
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(recipients)}&subject=${subject}&body=${body}`;
    default:
      return `mailto:${recipients}?subject=${subject}&body=${body}`;
  }
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  /** Bound from the ?work= query parameter when arriving from a work's page. */
  readonly work = input<string>();

  protected readonly language = inject(Language);
  protected readonly site = SITE;
  private readonly seo = inject(Seo);
  private readonly doc = inject(DOCUMENT);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const ui = this.language.ui();
      this.seo.update(ui.contact, ui.metaContact, 'contact');
    });

    effect(() => {
      const work = WORKS.find((item) => item.slug === this.work());
      if (work && !this.form.controls.subject.dirty) {
        const subject = `${this.language.ui().enquirySubject}: ${this.language.pick(work.title)}`;
        this.form.controls.subject.setValue(subject);
      }
    });
  }

  protected showError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  protected send(service: EmailService = 'app'): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const link = enquiryLink(SITE.emails, this.form.getRawValue(), service);
    if (service === 'app') {
      this.doc.location.href = link;
    } else {
      this.doc.defaultView?.open(link, '_blank', 'noopener');
    }
  }
}
