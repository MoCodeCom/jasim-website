import { Localized } from './site';

export type Medium = 'oil' | 'watercolour' | 'mixed';

export interface Work {
  slug: string;
  title: Localized;
  medium: Medium;
  /** Width and height of the piece or its photo; sets the display shape. */
  width: number;
  height: number;
  /** Path under public/, for example artworks/river.jpg. */
  image?: string;
  year?: number;
  materials?: Localized;
  dimensions?: string;
  description?: Localized;
  /** Marks the entry as stand-in content. Remove it from real works. */
  sample?: boolean;
}

const work = (
  slug: string,
  en: string,
  ar: string,
  medium: Medium,
  width: number,
  height: number,
  year?: number,
): Work => ({
  slug,
  title: { en, ar },
  medium,
  width,
  height,
  image: `artworks/${slug}.jpg`,
  year,
});

/**
 * The home page uses this order: first work in the opening panel, and the third to fifth under
 * "Selected works".
 *
 * Titles describe each painting and media are judged from the images; see docs/CONTENT-SOURCES.md.
 */
export const WORKS: Work[] = [
  work('reed-boat', 'Reed Boat in the Marshes', 'قارب القصب في الأهوار', 'oil', 1280, 960, 2020),
  work('market-woman', 'Woman at the Market', 'امرأة في السوق', 'oil', 1280, 1024, 2018),
  work('mother-and-child', 'Mother and Child', 'أم وطفلها', 'watercolour', 1280, 861),
  work('boat-and-palms', 'Boat and Palms', 'قارب ونخيل', 'watercolour', 861, 1280, 2018),
  work('man-with-camels', 'Man with Camels', 'رجل مع الجمال', 'watercolour', 1280, 960),
  work('three-horses', 'Three Horses', 'ثلاثة خيول', 'oil', 1280, 1024),
  work('profile-with-horses', 'Profile with Horses', 'وجه جانبي وخيول', 'mixed', 1280, 1280),
  work('old-street', 'Old Street with Wooden Balconies', 'زقاق قديم بشرفات خشبية', 'oil', 1024, 1280),
  work('horses-at-camp', 'Horses at the Camp', 'خيول عند المخيم', 'oil', 1280, 1024),
  work('rider-and-white-horse', 'Rider and White Horse', 'فارس وحصان أبيض', 'oil', 1280, 1024),
  work('old-man-in-turban', 'Old Man in a Purple Turban', 'شيخ بعمامة بنفسجية', 'watercolour', 985, 1103, 2005),
  work('rain-street', 'Street in the Rain', 'شارع تحت المطر', 'watercolour', 669, 985),
  work('veiled-rider', 'Veiled Rider and White Horse', 'فارس ملثم وحصان أبيض', 'oil', 1280, 960),
  work('picture-of-jasim-alfadhel', 'Picture of Jasim Alfadhel', 'صورة جاسم الفضل', 'oil', 985, 1181, 2013),
  work('bridge-and-bus', 'Bus on the Bridge', 'حافلة على الجسر', 'watercolour', 1280, 861, 2016),
  work('riders', 'Riders', 'فرسان', 'oil', 1280, 959),
  work('boy-with-reeds', 'Boy with Reeds and Sickle', 'صبي مع القصب والمنجل', 'watercolour', 1280, 861),
  work('seated-old-man', 'Old Man in a Doorway', 'شيخ عند المدخل', 'watercolour', 861, 1280),
  work('chasing-the-white-horse', 'Chasing the White Horse', 'مطاردة الحصان الأبيض', 'oil', 1280, 959),
  work('fruit-seller', 'The Fruit Seller', 'بائع الفاكهة', 'watercolour', 884, 1280),
  work('woman-from-behind', 'Woman from Behind', 'امرأة من الخلف', 'oil', 959, 1280),
];

export const MEDIUMS: Medium[] = ['oil', 'watercolour', 'mixed'];
