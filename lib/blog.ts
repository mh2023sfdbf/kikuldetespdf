export type BlogPost = {
  slug: string
  title: string
  metaDescription: string
  date: string
  sections: { h2: string; paragraphs: string[] }[]
  relatedLinks: { href: string; label: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'kikuldetesi-rendelveny-mintak-sablonok',
    title: 'Kiküldetési rendelvény minták és sablonok – mire jó, hogyan készítsd',
    metaDescription:
      'Ismerje meg a kiküldetési rendelvény sablonját, a kötelező adatokat és a NAV-barát PDF készítés lépéseit. Ingyenes minták belföldi és külföldi kiküldetéshez.',
    date: '2025-02-09',
    sections: [
      {
        h2: 'Mi az a kiküldetési rendelvény és mire kell?',
        paragraphs: [
          'A kiküldetési rendelvény (kiküldetési utasítás) a munkavállaló üzleti utazásának hivatalos nyilvántartása. A munkáltató által kiadott dokumentum rögzíti a kiküldetés célját, időtartamát, helyét, valamint a napidíj és költségtérítés jogosultságát. A belföldi és külföldi üzleti utazások egyaránt igényelnek rendelvényt, ha a munkavállaló napidíjra vagy költségtérítésre jogosult.',
          'A rendelvény a könyveléshez és az adóhatóság számára történő igazoláshoz szükséges. Jól készített sablon segít elkerülni a hibákat és gyorsítja a dokumentumok elkészítését.',
        ],
      },
      {
        h2: 'Milyen adatokat kell tartalmaznia a sablonnak?',
        paragraphs: [
          'A kiküldetési rendelvény sablonjában kötelezően szerepelnie kell: a munkavállaló neve és adatai, a kiküldetés célja, kezdő és záró nap, a kiküldetés helye (cím, ország külföldinél), a napidíj és költségtérítés jogosultsága, valamint a munkáltató és a kiadó aláírása. Külföldi kiküldetésnél az MNB árfolyam vagy igazolás is fontos lehet.',
          'Egy jó minta mindezt egyértelműen, olvashatóan és a könyvelés számára megfelelő formában tartalmazza. Ingyenes, NAV-barát sablonokkal egyszerűen generálhat PDF-et a saját adataiddal.',
        ],
      },
      {
        h2: 'Hogyan készíts kiküldetési rendelvényt gyorsan?',
        paragraphs: [
          'A legegyszerűbb megoldás egy online PDF generátor használata: kitöltöd az űrlapot (cégnév, dolgozó, dátumok, cél, napidíj stb.), és a rendszer azonnal létrehozza a könyvelésre alkalmas dokumentumot. Nem kell Word vagy Excel sablonokat keresgélni – minden egy helyen, belföldi és külföldi kiküldetésre is.',
          'Érdemes olyan sablont választani, amely megfelel a magyar jogszabályoknak és a könyvelői gyakorlatnak, így a dokumentum minden esetben használható igazolásként.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/kikuldetesi-rendelveny', label: 'Kiküldetési rendelvény' },
      { href: '/templates', label: 'Sablonok' },
      { href: '/generate', label: 'PDF generálás' },
    ],
  },
  {
    slug: 'belfoldi-kikuldetes-lepesrol-lepesre',
    title: 'Belföldi kiküldetés lépésről lépésre – napidíj és költségelszámolás',
    metaDescription:
      'Belföldi kiküldetés teljes útmutatója: kiküldetési rendelvény, napidíj elszámolás, költségtérítés és könyvelés. Tippek és sablonok a hibamentes dokumentumkészítéshez.',
    date: '2025-02-09',
    sections: [
      {
        h2: 'Belföldi kiküldetés – mi kell hozzá?',
        paragraphs: [
          'Belföldi kiküldetésnél a munkavállaló Magyarország területén végez üzleti vagy hivatali utazást. A kiküldetés megkezdése előtt a munkáltatónak ki kell adnia egy kiküldetési rendelvényt (kiküldetési utasítást), amely tartalmazza a kiküldetés célját, időtartamát, helyét és a napidíj/költségtérítés jogosultságát.',
          'A rendelvény alapján a dolgozó utazhat, és utólag a tényleges napidíj és költségeket elszámolhatja. A belföldi napidíj összege jogszabályban meghatározott, és a céges irányelvek szerint alkalmazandó.',
        ],
      },
      {
        h2: 'Napidíj elszámolás belföldön',
        paragraphs: [
          'A belföldi napidíj elszámolás a kiküldetés napjaira jogosít. Egy nap akkor számít kiküldetésnek, ha a munkavállaló a szokásos munkahelyétől máshol dolgozik, és ez a rendelvényben is szerepel. A napidíj összegét a munkáltató határozza meg (jogszabályi minimumoknak megfelelően), és a költségelszámolási lapon kell feltüntetni.',
          'A napidíj elszámolás dokumentumait (kiküldetési rendelvény + költségelszámolás) a könyvelésnek meg kell adni; ezek alapján kerül elszámolásra a kiadás.',
        ],
      },
      {
        h2: 'Költségtérítés és könyvelés',
        paragraphs: [
          'Ha a munkavállaló egyéb kiadást is elszámol (pl. útiköltség, parkolás), ezt a költségelszámolási lapon kell feltüntetni, mellékelve a bizonylatokat. A kiküldetési rendelvény és a költségelszámolás együtt alkotja a könyveléshez szükséges dokumentumcsomagot.',
          'Érdemes egy egységes, professzionális sablonnal dolgozni, hogy minden kiküldetés ugyanolyan formátumban kerüljön nyilvántartásra és az adóhatóság számára is áttekinthető legyen.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/belfoldi-kikuldetes', label: 'Belföldi kiküldetés' },
      { href: '/napidij-elszamolas', label: 'Napidíj elszámolás' },
      { href: '/generate', label: 'PDF generálás' },
    ],
  },
  {
    slug: 'kulfoldi-kikuldetes-dokumentumok',
    title: 'Külföldi kiküldetés dokumentumok – útlevél, árfolyam, NAV',
    metaDescription:
      'Külföldi kiküldetéshez szükséges dokumentumok: kiküldetési rendelvény, napidíj, deviza árfolyam, bizonylatok. Tippek a könyveléshez és az adóhatósághoz.',
    date: '2025-02-09',
    sections: [
      {
        h2: 'Külföldi kiküldetés – milyen dokumentumok kellenek?',
        paragraphs: [
          'Külföldi kiküldetésnél a munkavállaló magyarországi munkahelye mellett idegen országban végez üzleti tevékenységet. A dokumentumok hasonlóak a belföldihez, de kiegészülnek a külföldi napidíj szabályokkal, devizás kiadásokkal és az árfolyam igazolásával.',
          'Kötelező dokumentum: kiküldetési rendelvény (külföldi célponttal), költségelszámolás (ha van napidíj/költség), valamint a devizás kiadásoknál az MNB vagy bank árfolyam igazolása.',
        ],
      },
      {
        h2: 'Napidíj és árfolyam külföldön',
        paragraphs: [
          'A külföldi napidíj összege országonként és a cég irányelve szerint változhat. Az elszámolásnál fontos, hogy a devizás összegeket forintra számoljuk át – ehhez az MNB napi árfolyama vagy a bank árfolyama használható, és érdemes ezt a költségelszámoláson vagy melléklapon feltüntetni.',
          'A kiküldetési rendelvényen a külföldi célpont (ország, város) és a kiküldetés napjai egyértelműen szerepelniük kell. Ezek alapján a könyvelés el tudja végezni a forintos átváltást és a nyilvántartást.',
        ],
      },
      {
        h2: 'NAV és könyvelés – mire figyelj?',
        paragraphs: [
          'Az adóhatóság és a könyvelés számára a külföldi kiküldetés igazolása a kiküldetési rendelvény és a kapcsolódó költségelszámolás. A bizonylatok (repülőjegy, szállás, stb.) forintosított értékével kell dolgozni, az árfolyamot meg kell tudni indokolni.',
          'Egy jól kitöltött, professzionális sablon segít abban, hogy minden adat egy helyen, áttekinthetően legyen, így a könyvelés és az esetleges ellenőrzés zökkenőmentes lesz.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/kulfoldi-kikuldetes', label: 'Külföldi kiküldetés' },
      { href: '/koltegelszamolas-kikuldetes', label: 'Költségelszámolás' },
      { href: '/generate', label: 'PDF generálás' },
    ],
  },
  {
    slug: 'koltegelszamolas-konyveles-kikuldetes',
    title: 'Költségelszámolás és könyvelés kiküldetéshez – szabályok és sablonok',
    metaDescription:
      'Kiküldetési költségelszámolás és könyvelés: napidíj, költségtérítés, bizonylatok, NAV. Hogyan készíts könyvelésre alkalmas dokumentumot egyszerűen.',
    date: '2025-02-09',
    sections: [
      {
        h2: 'Mi tartozik a kiküldetési költségelszámolásba?',
        paragraphs: [
          'A költségelszámolás a kiküldetés során keletkezett, elszámolható kiadások összefoglalója. Ide tartozik a napidíj (belföldön és külföldön), az utazási költségek (jegy, benzin, parkolás), a szállás és egyéb, a rendelvényben engedélyezett kiadások – minden bizonylattal igazolva, ahol szükséges.',
          'A dokumentumot a munkavállaló tölti ki, a munkáltató jóváhagyja, majd a könyvelés a kiküldetési rendelvénnyel együtt nyilvántartja és elszámolja.',
        ],
      },
      {
        h2: 'Könyveléshez szükséges dokumentumok',
        paragraphs: [
          'A könyveléshez általában a következők kellenek: a kiküldetési rendelvény (utólag is bővíthető, ha változott a kiküldetés), a költségelszámolási lap a napidíjjal és egyéb tételekkel, valamint a mellékelt bizonylatok (számlák, blokkok). Külföldi kiadásnál az árfolyam igazolás is fontos.',
          'A dokumentumoknak áttekinthetőnek, teljesnek és a jogszabályoknak megfelelőnek kell lenniük. Így a könyvelő gyorsan tud dolgozni, és az adóhatóság ellenőrzése esetén minden rendelkezésre áll.',
        ],
      },
      {
        h2: 'Sablonnal gyorsabb és biztonságosabb',
        paragraphs: [
          'Egy egységes sablon segít abban, hogy ne maradjon ki kötelező adat, és minden kiküldetés ugyanolyan formátumban kerüljön be a könyvelésbe. Online PDF generátorral a kiküldetési rendelvény és a költségelszámolás egy űrlapból, azonnal létrehozható.',
          'A generált dokumentumot céges archívumban érdemes tárolni, és a dolgozói anyagokkal együtt megőrizni a jogszabályban előírt ideig. Így a kiküldetés teljes dokumentumcsomagja mindig megtalálható.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/koltegelszamolas-kikuldetes', label: 'Költségelszámolás kiküldetéshez' },
      { href: '/kikuldetesi-dokumentumok-konyveleshez', label: 'Dokumentumok a könyveléshez' },
      { href: '/generate', label: 'PDF generálás' },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
