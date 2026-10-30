import { Localized } from './site';

export type Medium = 'painting' | 'drawing' | 'mixed';

export interface Work {
  slug: string;
  title: Localized;
  medium: Medium;
  /** Width and height of the piece or its photo; sets the display shape. */
  width: number;
  height: number;
  /** Path under public/, for example works/river.jpg. */
  image?: string;
  year?: number;
  materials?: Localized;
  dimensions?: string;
  description?: Localized;
  /** Marks the entry as stand-in content. Remove it from real works. */
  sample?: boolean;
}

const sample = (
  index: number,
  medium: Medium,
  width: number,
  height: number,
): Work => {
  const number = String(index).padStart(2, '0');
  const arabicNumber = number.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
  return {
    slug: `sample-${number}`,
    title: { en: `Sample work ${number}`, ar: `عمل تجريبي ${arabicNumber}` },
    medium,
    width,
    height,
    sample: true,
  };
};

export const WORKS: Work[] = [
  sample(1, 'painting', 4, 5),
  sample(2, 'painting', 5, 4),
  sample(3, 'drawing', 3, 4),
  sample(4, 'mixed', 1, 1),
  sample(5, 'painting', 3, 4),
  sample(6, 'drawing', 4, 3),
  sample(7, 'mixed', 4, 5),
  sample(8, 'painting', 1, 1),
  sample(9, 'drawing', 5, 4),
];

export const MEDIUMS: Medium[] = ['painting', 'drawing', 'mixed'];
