import { ArabicLetter, Surah, Dua, QuizQuestion, SalahPose, Tasbih } from "./types";

export const ARABIC_LETTERS: ArabicLetter[] = [
  { char: "أ", name: "Alif", phonetic: "a/i/u", isolated: "أ", initial: "أـ", medial: "ـأـ", final: "ـأ", exampleWord: "أَسَد", exampleMeaning: "Asad (Lion)" },
  { char: "ب", name: "Ba", phonetic: "b", isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب", exampleWord: "بَيْت", exampleMeaning: "Bayt (House)" },
  { char: "ت", name: "Ta", phonetic: "t", isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت", exampleWord: "تُفَّاح", exampleMeaning: "Tuffah (Apple)" },
  { char: "ث", name: "Tha", phonetic: "th (soft)", isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث", exampleWord: "ثَوْب", exampleMeaning: "Thawb (Garment)" },
  { char: "ج", name: "Jeem", phonetic: "j", isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج", exampleWord: "جَمَل", exampleMeaning: "Jamal (Camel)" },
  { char: "ح", name: "Haa", phonetic: "h (deep)", isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح", exampleWord: "حُبّ", exampleMeaning: "Hubb (Love)" },
  { char: "خ", name: "Khaa", phonetic: "kh (raspy)", isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ", exampleWord: "خُبْز", exampleMeaning: "Khubz (Bread)" },
  { char: "د", name: "Dal", phonetic: "d", isolated: "د", initial: "دـ", medial: "ـدـ", final: "ـد", exampleWord: "دَفْتَر", exampleMeaning: "Daftar (Notebook)" },
  { char: "ذ", name: "Thal", phonetic: "th (voiced)", isolated: "ذ", initial: "ذـ", medial: "ـذـ", final: "ـذ", exampleWord: "ذَهَب", exampleMeaning: "Thahab (Gold)" },
  { char: "ر", name: "Raa", phonetic: "r (rolled)", isolated: "ر", initial: "رـ", medial: "ـرـ", final: "ـر", exampleWord: "رَجُل", exampleMeaning: "Rajul (Man)" },
  { char: "ز", name: "Zay", phonetic: "z", isolated: "ز", initial: "زـ", medial: "ـزـ", final: "ـز", exampleWord: "زَهْرَة", exampleMeaning: "Zahrah (Flower)" },
  { char: "س", name: "Seen", phonetic: "s", isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس", exampleWord: "سَيَّارَة", exampleMeaning: "Sayyarah (Car)" },
  { char: "ش", name: "Sheen", phonetic: "sh", isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش", exampleWord: "شَمْس", exampleMeaning: "Shams (Sun)" },
  { char: "ص", name: "Saad", phonetic: "s (emphatic)", isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص", exampleWord: "صَدِيق", exampleMeaning: "Sadiq (Friend)" },
  { char: "ض", name: "Daad", phonetic: "d (emphatic)", isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض", exampleWord: "ضَوْء", exampleMeaning: "Daw' (Light)" },
  { char: "ط", name: "Taa", phonetic: "t (emphatic)", isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط", exampleWord: "طِفْل", exampleMeaning: "Tifl (Child)" },
  { char: "ظ", name: "Zaa", phonetic: "z (emphatic)", isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ", exampleWord: "ظِلّ", exampleMeaning: "Zill (Shadow)" },
  { char: "ع", name: "Ayn", phonetic: "guttural 'a'", isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع", exampleWord: "عَيْن", exampleMeaning: "Ayn (Eye)" },
  { char: "غ", name: "Ghayn", phonetic: "gh (gargle)", isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ", exampleWord: "غَابَة", exampleMeaning: "Ghabah (Forest)" },
  { char: "ف", name: "Faa", phonetic: "f", isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف", exampleWord: "فَرَاشَة", exampleMeaning: "Farashah (Butterfly)" },
  { char: "ق", name: "Qaaf", phonetic: "q (guttural k)", isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق", exampleWord: "قَلَم", exampleMeaning: "Qalam (Pen)" },
  { char: "ك", name: "Kaaf", phonetic: "k", isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك", exampleWord: "كِتَاب", exampleMeaning: "Kitab (Book)" },
  { char: "ل", name: "Laam", phonetic: "l", isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل", exampleWord: "لَيْل", exampleMeaning: "Layl (Night)" },
  { char: "م", name: "Meem", phonetic: "m", isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم", exampleWord: "مَسْجِد", exampleMeaning: "Masjid (Mosque)" },
  { char: "ن", name: "Noon", phonetic: "n", isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن", exampleWord: "نَحْل", exampleMeaning: "Nahl (Bee)" },
  { char: "هـ", name: "Haa (soft)", phonetic: "h", isolated: "هـ", initial: "هـ", medial: "ـهـ", final: "ـه", exampleWord: "هِلَال", exampleMeaning: "Hilal (Crescent)" },
  { char: "و", name: "Waw", phonetic: "w / oo", isolated: "و", initial: "وـ", medial: "ـوـ", final: "ـو", exampleWord: "وَرْدَة", exampleMeaning: "Waradah (Rose)" },
  { char: "ي", name: "Yaa", phonetic: "y / ee", isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي", exampleWord: "يَد", exampleMeaning: "Yadd (Hand)" },
];

export const SURAHS: Surah[] = [
  {
    number: 1,
    name: "Al-Fatihah",
    englishName: "Al-Fatihah",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    revelationType: "Meccan",
    ayahs: [
      { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
      { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "All praise is [due] to Allah, Lord of the worlds -" },
      { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful," },
      { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense." },
      { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help." },
      { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -" },
      { number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray." }
    ]
  },
  {
    number: 112,
    name: "Al-Ikhlas",
    englishName: "Al-Ikhlas",
    englishNameTranslation: "The Sincerity",
    numberOfAyahs: 4,
    revelationType: "Meccan",
    ayahs: [
      { number: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One," },
      { number: 2, text: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge." },
      { number: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is he born," },
      { number: 4, text: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", translation: "Nor is there to Him any equivalent.'" }
    ]
  },
  {
    number: 113,
    name: "Al-Falaq",
    englishName: "Al-Falaq",
    englishNameTranslation: "The Daybreak",
    numberOfAyahs: 5,
    revelationType: "Meccan",
    ayahs: [
      { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", translation: "Say, 'I seek refuge in the Lord of daybreak" },
      { number: 2, text: "مِنْ شَرِّ مَا خَلَقَ", translation: "From the evil of that which He created" },
      { number: 3, text: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "And from the evil of darkness when it settles" },
      { number: 4, text: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", translation: "And from the evil of the blowers in knots" },
      { number: 5, text: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", translation: "And from the evil of an envier when he envies.'" }
    ]
  },
  {
    number: 114,
    name: "An-Nas",
    englishName: "An-Nas",
    englishNameTranslation: "Mankind",
    numberOfAyahs: 6,
    revelationType: "Meccan",
    ayahs: [
      { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "Say, 'I seek refuge in the Lord of mankind," },
      { number: 2, text: "مَلِكِ النَّاسِ", translation: "The Sovereign of mankind." },
      { number: 3, text: "إِلَٰهِ النَّاسِ", translation: "The God of mankind," },
      { number: 4, text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "From the evil of the retreating whisperer -" },
      { number: 5, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", translation: "Who whispers [evil] into the breasts of mankind -" },
      { number: 6, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", translation: "From among the jinn and mankind.'" }
    ]
  }
];

export const DUAS: Dua[] = [
  {
    id: "dua-wakeup",
    title: "Dua Upon Waking Up",
    category: "Daily Life",
    arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-lathee ahyana ba'da ma amatana wa-ilayhin-nushoor",
    translation: "Praise is to Allah Who gave us life after He had caused us to die and to Him is the resurrection.",
    benefit: "Sunnah of the Prophet (ﷺ) to recite immediately upon waking to show gratitude for a renewed life."
  },
  {
    id: "dua-knowledge",
    title: "Dua for Seeking Knowledge",
    category: "Learning",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidnee 'ilma",
    translation: "My Lord, increase me in knowledge.",
    benefit: "Quoted directly from Surah Taha [20:114]. Expands memory, comprehension, and guidance."
  },
  {
    id: "dua-parents",
    title: "Dua for Parents",
    category: "Family",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayanee sagheera",
    translation: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    benefit: "From Surah Al-Isra [17:24]. Keeps hearts connected to parents and invokes divine kindness."
  },
  {
    id: "dua-protection",
    title: "Dua for Full Protection",
    category: "Daily Life",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-lathee la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem",
    translation: "In the name of Allah, with Whose name nothing can cause harm in the earth nor in the heaven, and He is the All-Hearing, the All-Knowing.",
    benefit: "Protects against sudden afflictions, illness, or harm when read three times in morning/evening."
  },
  {
    id: "dua-forgiveness",
    title: "Dua for Forgiveness (Sayyid al-Istighfar)",
    category: "Repentance",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbee la ilaha illa Anta, khalaqtanee wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'oothu bika min sharri ma sana'tu, aboo'u laka bini'matika 'alayya wa aboo'u bithanbee faghfir lee fa'innahu la yaghfiruth-thunooba illa Anta",
    translation: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave. I keep Your covenant and my pledge to You as far as I am able. I seek refuge in You from the evil of what I have done. I admit Your blessings upon me, and I admit my sin, so forgive me, for indeed none forgives sins but You.",
    benefit: "The Chief Supplication for Forgiveness. Whosoever recites this with sincere conviction and dies that day/night enters Paradise."
  }
];

export const SALAH_POSES: SalahPose[] = [
  {
    id: "takbeer",
    name: "Intention & Takbeer",
    arabicName: "النِّيَّةُ وَالتَّكْبِيرُ",
    description: "Formulate your intention in your heart, stand upright, raise your hands to your ears / shoulders, and declare the start of prayers.",
    recitationArabic: "اللّهُ أَكْبَرُ",
    recitationTranslit: "Allahu Akbar",
    recitationEnglish: "Allah is the Greatest."
  },
  {
    id: "qiyam",
    name: "Qiyam (Standing)",
    arabicName: "الْقِيَامُ",
    description: "Place your right hand over your left hand on your chest, lower your gaze to the place of prostration (Sajdah), and recite Surah Al-Fatihah followed by another Surah.",
    recitationArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ... (سُورَةُ الْفَاتِحَةِ)",
    recitationTranslit: "Recitation of Surah Al-Fatihah",
    recitationEnglish: "Recitation of Quranic verses..."
  },
  {
    id: "ruku",
    name: "Ruku (Bowing)",
    arabicName: "الرُّكُوعُ",
    description: "Bow down, grab your knees with your fingers spread out, keep your back parallel to the floor, and gaze at your toes while glorifying Allah.",
    recitationArabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    recitationTranslit: "Subhana Rabbiyal-Atheem (x3)",
    recitationEnglish: "Glory be to my Lord the Supreme."
  },
  {
    id: "itidal",
    name: "I'tidal (Standing Upright)",
    arabicName: "الْإِعْتِدَالُ",
    description: "Rise from bowing back to fully upright standing, letting your arms rest at your sides.",
    recitationArabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ",
    recitationTranslit: "Sami'Allahu liman hamidah, Rabbana wa lakal-hamd",
    recitationEnglish: "Allah hears those who praise Him. Our Lord, and to You is all praise."
  },
  {
    id: "sujud",
    name: "Sujud (Prostration)",
    arabicName: "السُّجُودُ",
    description: "Prostrate on the floor, touching seven bones: forehead and nose, two palms, two knees, and the tips of both feet, keeping elbows off the ground.",
    recitationArabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    recitationTranslit: "Subhana Rabbiyal-A'la (x3)",
    recitationEnglish: "Glory be to my Lord the Most High."
  },
  {
    id: "jalasah",
    name: "Jalasah (Sitting Between Sujud)",
    arabicName: "الْجَلْسَةُ",
    description: "Rise from prostration and sit upright on your left leg with the right foot vertical, placing your hands on your thighs.",
    recitationArabic: "رَبِّ اغْفِرْ لِي ، وَارْحَمْنِي",
    recitationTranslit: "Rabbighfir lee, warhamnee",
    recitationEnglish: "My Lord, forgive me and have mercy on me."
  },
  {
    id: "tashahhud",
    name: "Tashahhud (Final Testimony)",
    arabicName: "التَّشَهُّدُ",
    description: "Sit gracefully for the final unit of prayer, raise your right index finger slightly to bear witness, and send blessings upon Prophet Muhammad and Prophet Ibrahim.",
    recitationArabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ... أَشْهَدُ أَن لَّا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    recitationTranslit: "Attahiyyatu lillahi was-salawatu wat-tayyibatu... Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan abduhu wa Rasooluh",
    recitationEnglish: "All compliments, prayers and pure deeds are due to Allah... I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    difficulty: "Beginner",
    question: "How many pillars of Islam are there?",
    options: ["3", "5", "7", "10"],
    correctAnswerIndex: 1,
    explanation: "There are 5 Pillars of Islam: Shahada (Faith), Salah (Prayer), Zakat (Charity), Sawm (Fasting), and Hajj (Pilgrimage)."
  },
  {
    id: 2,
    difficulty: "Beginner",
    question: "What is the holy book of Islam called?",
    options: ["Torah", "Hadith", "Quran", "Bible"],
    correctAnswerIndex: 2,
    explanation: "The Quran is the central religious text of Islam, believed by Muslims to be a revelation from God (Allah)."
  },
  {
    id: 3,
    difficulty: "Beginner",
    question: "How many times a day are daily obligatory prayers (Salah) performed?",
    options: ["3 times", "4 times", "5 times", "7 times"],
    correctAnswerIndex: 2,
    explanation: "There are 5 daily obligatory prayers: Fajr (Dawn), Dhuhr (Midday), Asr (Afternoon), Maghrib (Sunset), and Isha (Night)."
  },
  {
    id: 4,
    difficulty: "Intermediate",
    question: "Which Prophet received the Ten Commandments and spoke to Allah directly on Mount Sinai?",
    options: ["Prophet Ibrahim (Abraham)", "Prophet Musa (Moses)", "Prophet Isa (Jesus)", "Prophet Yusuf (Joseph)"],
    correctAnswerIndex: 1,
    explanation: "Prophet Musa (Moses) is known in Islam as Kalimullah (the one who spoke directly to Allah), and he was given the Torah."
  },
  {
    id: 5,
    difficulty: "Intermediate",
    question: "What is the Arabic word for Fasting in the month of Ramadan?",
    options: ["Zakat", "Salah", "Sawm", "Sadaqah"],
    correctAnswerIndex: 2,
    explanation: "Sawm refers to the act of fasting, abstaining from food, drink, and intimate relations from dawn until sunset."
  },
  {
    id: 6,
    difficulty: "Intermediate",
    question: "In which city was the Prophet Muhammad (ﷺ) born?",
    options: ["Medina", "Mecca", "Jerusalem", "Cairo"],
    correctAnswerIndex: 1,
    explanation: "Prophet Muhammad (ﷺ) was born in Mecca in 570 CE, in the Year of the Elephant."
  },
  {
    id: 7,
    difficulty: "Scholar",
    question: "What is the linguistic meaning of the word 'Tajweed'?",
    options: ["To memorize the text", "To search for origin", "To make better, or to perfect", "To chant loudly"],
    correctAnswerIndex: 2,
    explanation: "Tajweed comes from the root 'j-w-d' (jawdah), meaning quality. Linguistically, it means 'to make better' or 'proficiency/perfection'. In recitation, it means giving every letter its right."
  },
  {
    id: 8,
    difficulty: "Scholar",
    question: "Which companion is known as the 'Translator of the Quran' (Tarjuman al-Quran)?",
    options: ["Abu Bakr As-Siddiq", "Abdullah ibn Abbas", "Ali ibn Abi Talib", "Umar ibn Al-Khattab"],
    correctAnswerIndex: 1,
    explanation: "Abdullah ibn Abbas (may Allah be pleased with him), the Prophet's cousin, became renowned for his deep knowledge of Tafseer, earning the title 'Tarjuman al-Quran'."
  },
  {
    id: 9,
    difficulty: "Scholar",
    question: "What was the very first Surah revealed in full to Prophet Muhammad (ﷺ)?",
    options: ["Surah Al-Alaq", "Surah Al-Fatihah", "Surah Al-Muddaththir", "Surah Al-Muzzammil"],
    correctAnswerIndex: 1,
    explanation: "While the first 5 ayahs revealed were indeed from Surah Al-Alaq (Iqra), Surah Al-Fatihah was the first *complete* Surah revealed to the Prophet (ﷺ) as a whole."
  }
];

export const TASBIH_TEMPLATES: Tasbih[] = [
  { id: "subhanallah", phrase: "SubhanAllah", arabic: "سُبْحَانَ اللهِ", translation: "Glory be to Allah", count: 0, limit: 33 },
  { id: "alhamdulillah", phrase: "Alhamdulillah", arabic: "الْحَمْدُ للهِ", translation: "All Praise is due to Allah", count: 0, limit: 33 },
  { id: "allahuakbar", phrase: "Allahu Akbar", arabic: "اللهُ أَكْبَرُ", translation: "Allah is the Greatest", count: 0, limit: 34 },
  { id: "astagfirullah", phrase: "Astagfirullah", arabic: "أَسْتَغْفِرُ اللهَ", translation: "I ask Allah for forgiveness", count: 0, limit: 100 }
];
