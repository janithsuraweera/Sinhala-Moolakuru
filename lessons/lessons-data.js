// Sinhala Typing Lessons Data
const LESSONS_DATA = {
  // Basic Alphabet Lessons
  alphabet: {
    title: "සිංහල අකුරු පිළිබඳ මූලික පාඩම්",
    description: "සිංහල අකුරු පිළිබඳ මූලික දැනුම",
    lessons: [
      {
        id: "alphabet-1",
        title: "සරල ස්වර අකුරු",
        description: "අ, ආ, ඉ, ඊ, උ, ඌ, එ, ඒ, ඔ, ඕ අකුරු",
        content: "අ ආ ඉ ඊ උ ඌ එ ඒ ඔ ඕ",
        practice: "අම්මා ආයියා ඉස්කෝලේ ඊයේ උදේ ඌරා එදින ඒක ඔයා ඕනේ",
        keyboard_hints: {
          phonetic: "a, aa, i, ii, u, uu, e, ee, o, oo",
          wijesekara: "a, A, i, I, u, U, e, E, o, O"
        }
      },
      {
        id: "alphabet-2", 
        title: "සරල ව්‍යංජන අකුරු",
        description: "ක, ග, ච, ජ, ට, ඩ, ත, ද, ප, බ අකුරු",
        content: "ක ග ච ජ ට ඩ ත ද ප බ",
        practice: "කඩය ගෙදර චිත්‍රය ජනතාව ටැංකිය ඩිස්කෝ තාත්තා දොර පාසල බල්ලා",
        keyboard_hints: {
          phonetic: "k, g, ch, j, t, d, p, b",
          wijesekara: "k, g, c, j, t, d, p, b"
        }
      },
      {
        id: "alphabet-3",
        title: "මහප්‍රාණ ව්‍යංජන අකුරු", 
        description: "ඛ, ඝ, ඡ, ඣ, ඨ, ඪ, ථ, ධ, ඵ, භ අකුරු",
        content: "ඛ ඝ ඡ ඣ ඨ ඪ ථ ධ ඵ භ",
        practice: "ඛන්ධය ඝෝෂය ඡායාව ඣම්මය ඨානය ඪානය ථානය ධානය ඵලය භාරය",
        keyboard_hints: {
          phonetic: "kh, gh, chh, jh, th, dh, ph, bh",
          wijesekara: "K, G, C, J, T, D, P, B"
        }
      },
      {
        id: "alphabet-4",
        title: "අනුනාසික අකුරු",
        description: "ඞ, ඤ, ණ, න, ම අකුරු",
        content: "ඞ ඤ ණ න ම",
        practice: "ඞානය ඤානය ණානය නානය මානය",
        keyboard_hints: {
          phonetic: "ng, gn, nn, n, m",
          wijesekara: "N, N, N, n, m"
        }
      },
      {
        id: "alphabet-5",
        title: "අර්ධ ව්‍යංජන අකුරු",
        description: "ය, ර, ල, ව, ශ, ෂ, ස, හ, ළ, ෆ අකුරු",
        content: "ය ර ල ව ශ ෂ ස හ ළ ෆ",
        practice: "යාලය රාජය ලාභය වාරය ශාන්තිය ෂාන්තිය සාන්තිය හානිය ළානිය ෆානිය",
        keyboard_hints: {
          phonetic: "y, r, l, v, sh, sh, s, h, l, f",
          wijesekara: "y, r, l, v, S, S, s, h, L, f"
        }
      }
    ]
  },

  // Character Typing Exercises
  character_exercises: {
    title: "අකුරු ටයිපිං අභ්‍යාස",
    description: "සිංහල අකුරු ටයිපිං කිරීමේ අභ්‍යාස",
    lessons: [
      {
        id: "char-ex-1",
        title: "ස්වර + ව්‍යංජන යුගල",
        description: "ක + අ = ක, ක + ආ = කා වැනි යුගල",
        content: "ක කා කි කී කු කූ කෙ කේ කො කෝ",
        practice: "කඩය කාර්යය කිරි කීර්තිය කුරුල්ලා කූර්තිය කෙනෙක් කේන්ද්‍රය කොටස කෝපය",
        keyboard_hints: {
          phonetic: "ka, kaa, ki, kii, ku, kuu, ke, kee, ko, koo",
          wijesekara: "ka, kA, ki, kI, ku, kU, ke, kE, ko, kO"
        }
      },
      {
        id: "char-ex-2",
        title: "සංයුක්ත අකුරු",
        description: "ක්‍ර, ග්‍ර, ච්‍ර වැනි සංයුක්ත අකුරු",
        content: "ක්‍ර ග්‍ර ච්‍ර ජ්‍ර ට්‍ර ඩ්‍ර ත්‍ර ද්‍ර ප්‍ර බ්‍ර",
        practice: "ක්‍රීඩා ග්‍රාමය ච්‍රාමය ජ්‍රාමය ට්‍රාමය ඩ්‍රාමය ත්‍රාමය ද්‍රාමය ප්‍රාමය බ්‍රාමය",
        keyboard_hints: {
          phonetic: "kra, gra, chra, jra, tra, dra, pra, bra",
          wijesekara: "kra, gra, cra, jra, tra, dra, pra, bra"
        }
      },
      {
        id: "char-ex-3",
        title: "අනුස්වර යුගල",
        description: "අං, අඃ, අංක, අඃක වැනි යුගල",
        content: "අං අඃ අංක අඃක අංග අඃග",
        practice: "අංකය අඃකය අංගය අඃගය අංකර අඃකර",
        keyboard_hints: {
          phonetic: "ang, ah, anka, ahka, anga, ahga",
          wijesekara: "aN, aH, aNk, aHk, aNg, aHg"
        }
      }
    ]
  },

  // Word Formation Exercises
  word_formation: {
    title: "වචන ගොනු කිරීමේ අභ්‍යාස",
    description: "සිංහල වචන ගොනු කිරීමේ අභ්‍යාස",
    lessons: [
      {
        id: "word-ex-1",
        title: "දෙඅකුරු වචන",
        description: "අම්මා, තාත්තා, පාසල වැනි වචන",
        content: "අම්මා තාත්තා පාසල ගුරුතුමා මිතුරා",
        practice: "අම්මා තාත්තා පාසල ගුරුතුමා මිතුරා කඩය ගෙදර මල්",
        keyboard_hints: {
          phonetic: "amma, taaththaa, paasala, guruththumaa, miththuraa",
          wijesekara: "amma, taaththaa, paasala, guruththumaa, miththuraa"
        }
      },
      {
        id: "word-ex-2",
        title: "තුන්අකුරු වචන",
        description: "කුරුල්ලා, මීයා, බල්ලා වැනි වචන",
        content: "කුරුල්ලා මීයා බල්ලා පොත දොර",
        practice: "කුරුල්ලා මීයා බල්ලා පොත දොර කඩය ගෙදර මල්",
        keyboard_hints: {
          phonetic: "kurullaa, miyaa, ballaa, poth, dhor",
          wijesekara: "kurullaa, miyaa, ballaa, poth, dhor"
        }
      },
      {
        id: "word-ex-3",
        title: "සංයුක්ත වචන",
        description: "ක්‍රීඩා, ග්‍රාමය, ප්‍රාමය වැනි වචන",
        content: "ක්‍රීඩා ග්‍රාමය ප්‍රාමය බ්‍රාහ්මණ",
        practice: "ක්‍රීඩා ග්‍රාමය ප්‍රාමය බ්‍රාහ්මණ ක්‍රෝධය ග්‍රෝමය",
        keyboard_hints: {
          phonetic: "kreedaa, graamaya, praamaya, braahmana",
          wijesekara: "kreedaa, graamaya, praamaya, braahmana"
        }
      },
      {
        id: "word-ex-4",
        title: "වාක්‍ය ගොනු කිරීම",
        description: "සරල වාක්‍ය ගොනු කිරීමේ අභ්‍යාස",
        content: "මම පාසලට යන්නෙමි",
        practice: "මම පාසලට යන්නෙමි. ඔබ කොහෙද යන්නේ? අපි ක්‍රීඩා කරමු.",
        keyboard_hints: {
          phonetic: "mama paasalata yannemi. oba kohadha yanne? api kreedaa karamu.",
          wijesekara: "mama paasalata yannemi. oba kohadha yanne? api kreedaa karamu."
        }
      }
    ]
  },

  // Advanced Lessons
  advanced: {
    title: "උසස් ටයිපිං අභ්‍යාස",
    description: "සංකීර්ණ වචන සහ වාක්‍ය ටයිපිං අභ්‍යාස",
    lessons: [
      {
        id: "adv-1",
        title: "සංකීර්ණ වචන",
        description: "උසස් මට්ටමේ වචන ටයිපිං අභ්‍යාස",
        content: "විශ්වවිද්‍යාලය උපන්දිනය පරිසරය සිහිනය",
        practice: "විශ්වවිද්‍යාලය උපන්දිනය පරිසරය සිහිනය කාලය නාස්ති ගුරුවරයා",
        keyboard_hints: {
          phonetic: "vishvavidyaalaya, upandhinaya, parisaraya, sihinaya",
          wijesekara: "vishvavidyaalaya, upandhinaya, parisaraya, sihinaya"
        }
      },
      {
        id: "adv-2",
        title: "සංකීර්ණ වාක්‍ය",
        description: "උසස් මට්ටමේ වාක්‍ය ටයිපිං අභ්‍යාස",
        content: "සිංහල භාෂාව ඉතා සරල හා ලස්සන භාෂාවකි",
        practice: "සිංහල භාෂාව ඉතා සරල හා ලස්සන භාෂාවකි. අපි සියලු දෙනා එකට වැඩ කළ යුතුය.",
        keyboard_hints: {
          phonetic: "sinhala bhaashawa ithaa saral haa lassana bhaashawak",
          wijesekara: "sinhala bhaashawa ithaa saral haa lassana bhaashawak"
        }
      }
    ]
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LESSONS_DATA;
} else {
  window.LESSONS_DATA = LESSONS_DATA;
} 