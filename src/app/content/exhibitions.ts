import { Localized } from './site';

export interface Exhibition {
  /** Leave out when the year has not been confirmed. */
  year?: number;
  title: Localized;
  venue?: Localized;
  kind: 'solo' | 'group' | 'retrospective';
}

/** Newest first, with undated entries last. The page shows a notice while this list is empty. */
export const EXHIBITIONS: Exhibition[] = [
  {
    year: 2026,
    title: { en: 'Second retrospective exhibition', ar: 'المعرض الاستعادي الثاني' },
    venue: { en: 'Basra Artists Association, Basra', ar: 'جمعية فناني البصرة، البصرة' },
    kind: 'retrospective',
  },
  {
    title: { en: 'Solo exhibitions', ar: 'معارض شخصية' },
    venue: { en: 'Basra and Baghdad', ar: 'البصرة وبغداد' },
    kind: 'solo',
  },
  {
    title: { en: 'Iraqi Art exhibition', ar: 'معرض الفن العراقي' },
    venue: { en: 'Lebanon', ar: 'لبنان' },
    kind: 'group',
  },
  { title: { en: 'Arab Biennial', ar: 'البينالي العربي' }, kind: 'group' },
  { title: { en: 'Al-Wasiti Festival', ar: 'مهرجان الواسطي' }, kind: 'group' },
  {
    title: { en: 'Association of Plastic Artists exhibition', ar: 'معرض جمعية الفنانين التشكيليين' },
    kind: 'group',
  },
  { title: { en: 'Artists’ Syndicate exhibition', ar: 'معرض نقابة الفنانين' }, kind: 'group' },
  { title: { en: 'Youth exhibition', ar: 'معرض الشباب' }, kind: 'group' },
];
