export type Lang = 'en' | 'ar';
export type Localized = Record<Lang, string>;

/**
 * Edit this file to change the artist's details. See docs/ARCHITECTURE.md for the launch
 * checklist and docs/CONTENT-SOURCES.md for where each biographical fact comes from.
 */
export const SITE = {
  name: { en: 'Jasim Alfadhel', ar: 'جاسم الفضل' } as Localized,
  role: { en: 'Iraqi visual artist', ar: 'الفنان التشكيلي العراقي' } as Localized,
  life: { en: 'Basra, 1955–2022', ar: 'البصرة، ١٩٥٥–٢٠٢٢' } as Localized,

  /** Production address, for example https://example.com (no trailing slash). */
  url: '',
  /** Addresses that receive enquiries. The contact form stays disabled while this is empty. */
  emails: ['mohammed@nema-international.co.uk', 'mohammed.alfadhel.10@gmail.com'],
  /** Keeps the site out of search engines while it holds sample content. */
  launched: false,

  /** A description of the work by the site, not a quotation from the artist. */
  statement: {
    en: 'Frames within frames, restrained browns and the long shadow of war: expressive paintings of pain, alienation and the wish to be free.',
    ar: 'أطر داخل أطر، وألوان بنية هادئة، وظل الحرب الطويل: لوحات تعبيرية عن الألم والاغتراب والتوق إلى الحرية.',
  } as Localized,
  biography: [
    {
      en: 'Jasim Mohammed Alfadhel was born in Basra, Iraq, in 1955. He graduated from the Institute of Fine Arts and went on to earn a degree from the College of Fine Arts.',
      ar: 'ولد جاسم محمد الفضل في البصرة بالعراق عام 1955. تخرج في معهد الفنون الجميلة، ثم نال شهادته من كلية الفنون الجميلة.',
    },
    {
      en: 'He taught at the Institute of Fine Arts in Basra and continued teaching after his official retirement, training many artists now active in Iraq. He also illustrated for the Iraqi children’s magazine Majallati and painted murals in Basra.',
      ar: 'درّس في معهد الفنون الجميلة في البصرة، وواصل التدريس بعد تقاعده الرسمي، فتتلمذ على يديه كثير من الفنانين الناشطين اليوم في العراق. كما رسم لمجلة «مجلتي» العراقية للأطفال، ونفذ جداريات في البصرة.',
    },
    {
      en: 'Known for portraits, landscapes and scenes of Iraqi life, he worked prolifically and painted in watercolour every day. His paintings from the war years are symbolic and sombre.',
      ar: 'عُرف برسم البورتريه والمناظر الطبيعية والبيئة العراقية، وكان غزير الإنتاج يرسم بالألوان المائية يوميًا. أما لوحاته من سنوات الحرب فتتسم بطابع رمزي قاتم.',
    },
    {
      en: 'He died in Basra on 29 September 2022, aged 67, leaving an unfinished watercolour. His family and the Basra Artists Association have continued to show his work in retrospective exhibitions.',
      ar: 'توفي في البصرة في 29 أيلول/سبتمبر 2022 عن عمر ناهز 67 عامًا، تاركًا لوحة مائية لم تكتمل. وتواصل أسرته وجمعية فناني البصرة عرض أعماله في معارض استعادية.',
    },
  ] as Localized[],
  socials: [] as { label: string; url: string }[],
};
