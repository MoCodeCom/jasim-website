import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SITE } from '../../content/site';
import { WORKS } from '../../content/works';
import { Language } from '../../core/language';
import { Seo } from '../../core/seo';

/** Builds the pre-filled email the enquiry form opens. */
export function enquiryLink(
  to: string[],
  enquiry: { name: string; email: string; subject: string; message: string },
): string {
  const body = `${enquiry.message}\n\n${enquiry.name}\n${enquiry.email}`;
  return `mailto:${to.join(',')}?subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(body)}`;
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

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.doc.location.href = enquiryLink(SITE.emails, this.form.getRawValue());
  }
}
