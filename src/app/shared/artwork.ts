import { Component, computed, inject, input } from '@angular/core';

import { Work } from '../content/works';
import { Language } from '../core/language';

const PALETTE = ['#a23c22', '#bfa253', '#174248', '#2a6a6e', '#1c1a16', '#d98a2b'];

/** Small seeded generator: the same work always draws the same shapes on server and browser. */
function seeded(text: string): () => number {
  let state = [...text].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/** Shows a work's image, or a generated abstract stand-in while it has none. */
@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.html',
  styleUrl: './artwork.css',
  host: { '[class.cover]': 'cover()' },
})
export class Artwork {
  readonly work = input.required<Work>();
  readonly eager = input(false);
  /** Fills the positioned parent edge to edge, cropping as needed. */
  readonly cover = input(false);

  protected readonly language = inject(Language);
  protected readonly viewBox = computed(() => `0 0 ${this.work().width * 100} ${this.work().height * 100}`);

  protected readonly shapes = computed(() => {
    const { slug, width, height } = this.work();
    const random = seeded(slug);
    const w = width * 100;
    const h = height * 100;
    return Array.from({ length: 12 }, () => ({
      x: random() * w * 0.75,
      y: random() * h * 0.75,
      width: w * (0.2 + random() * 0.6),
      height: h * (0.1 + random() * 0.5),
      fill: PALETTE[Math.floor(random() * PALETTE.length)],
      opacity: 0.8 + random() * 0.2,
    }));
  });
}
