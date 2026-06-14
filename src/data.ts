import { ArabicLetter, Dua, QuizQuestion, SalahPose, Tasbih } from "./types";

export const ARABIC_LETTERS: ArabicLetter[] = [
  { char: "أ", name: "Alif", phonetic: "a/i/u", isolated: "أ", initial: "أـ", medial: "ـأـ", final: "ـأ", exampleWord: "أَسَد", exampleMeaning: "Asad (Lion)" },
  { char: "ب", name: "Ba", phonetic: "b", isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب", exampleWord: "بَيْت", exampleMeaning: "Bayt (House)" },
  { char: "ت", name: "Ta", phonetic: "t", isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت", exampleWord: "تُفَّاح", exampleMeaning: "Tuffah (Apple)" },
  { char: "ث", name: "Tha", phonetic: "th (soft)", isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث", exampleWord: "ثَوْب", exampleMeaning: "Thawb (Garment)" },
  { char: "ج", name: "Jeem", phonetic: "j", isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج", exampleWord: "جَمَل", exampleMeaning: "Jamal (Camel)" },
  { char: "ح", name: "Haa", phonetic: "h (deep)", isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح", exampleWord: "حُبّ", exampleMeaning: "Hubb (Love)" },
  { char: "خ", name: "Khaa", phonetic: "kh (raspy)", isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ", exampleWord: "خُبْز", exampleMeaning: "Khubz (Bread)" },
  { char: "د", name: "Dal", phonetic: "d", isolated: "د", initial: "دـ", medial: "ـدـ", final: "ـد", exampleWord: "دَفْتَر", exampleMeaning: "Daftar (Notebook)" },
  { char: "ذ", name: "Thal", phonetic: "th (voiced)", isolated: "ذ", initial: "ذـ", medial: "ـذـ", final: "ـذ", exampleWord: "ذَهَب", exampleMeaning: "Thahab (Gold)" },
  { char: "ر", name: "Raa", phonetic: "r (rolled)", isolated: "ر", initial: "رـ", medial: "ـرـ", final: "ـر", exampleWord: "رَجُل", exampleMeaning: "Rajul (Man)" },
  { char: "ز", name: "Zay", phonetic: "z", isolated: "ز", initial: "زـ", medial: "ـزـ", final: "ـز", exampleWord: "زَهْرَة", exampleMeaning: "Zahrah (Flower)" },
  { char: "س", name: "Seen", phonetic: "s", isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس", exampleWord: "سَيَّارَة", exampleMeaning: "Sayyarah (Car)" },
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

export const DUAS: Dua[] = [
  {
    id: "dua-wakeup",
    title: "Dua Upon Waking Up",
    category: "Daily Life",
    arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-lathee ahyana ba'da ma amatana wa-ilayhin-nushoor",
    translation: "Praise is to Allah Who gave us life after He had caused us to die and to Him is the resurrection.",
    benefit: "Sunnah of the Prophet (ﷺ) to recite immediately upon waking to show gratitude for a renewed life."
  },
  {
    id: "dua-knowledge",
    title: "Dua for Seeking Knowledge",
    category: "Learning",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidnee 'ilma",
    translation: "My Lord, increase me in knowledge.",
    benefit: "Quoted directly from Surah Taha [20:114]. Expands memory, comprehension, and guidance."
  },
  {
    id: "dua-parents",
    title: "Dua for Parents",
    category: "Family",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayanee sagheera",
    translation: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    benefit: "From Surah Al-Isra [17:24]. Keeps hearts connected to parents and invokes divine kindness."
  },
  {
    id: "dua-protection",
    title: "Dua for Full Protection",
    category: "Daily Life",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-lathee la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem",
    translation: "In the name of Allah, with Whose name nothing can cause harm in the earth nor in the heaven, and He is the All-Hearing, the All-Knowing.",
    benefit: "Protects against sudden afflictions, illness, or harm when read three times in morning/evening."
  },
  {
    id: "dua-forgiveness",
    title: "Dua for Forgiveness (Sayyid al-Istighfar)",
    category: "Repentance",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
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
    recitationArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ... (سُورَةُ الْفَاتِحَةِ)",
    recitationTranslit: "Recitation of Surah Al-Fatihah",
    recitationEnglish: "Recitation of Quranic verses..."
  },
  {
    id: "ruku",
    name: "Ruku (Bowing)",
    arabicName: "الرُّكُوعُ",
    description: "Bow down, grab your knees with your fingers spread out, keep your back parallel to the floor, and gaze at your toes while glorifying Allah.",
    recitationArabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    recitationTranslit: "Subhana Rabbiyal-Atheem (x3)",
    recitationEnglish: "Glory be to my Lord the Supreme."
  },
  {
    id: "itidal",
    name: "I'tidal (Standing Upright)",
    arabicName: "الْإِعْتِدَالُ",
    description: "Rise from bowing back to fully upright standing, letting your arms rest at your sides.",
    recitationArabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ",
    recitationTranslit: "Sami'Allahu liman hamidah, Rabbana wa lakal-hamd",
    recitationEnglish: "Allah hears those who praise Him. Our Lord, and to You is all praise."
  },
  {
    id: "sujud",
    name: "Sujud (Prostration)",
    arabicName: "السُّجُودُ",
    description: "Prostrate on the floor, touching seven bones: forehead and nose, two palms, two knees, and the tips of both feet, keeping elbows off the ground.",
    recitationArabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    recitationTranslit: "Subhana Rabbiyal-A'la (x3)",
    recitationEnglish: "Glory be to my Lord the Most High."
  },
  {
    id: "jalasah",
    name: "Jalasah (Sitting Between Sujud)",
    arabicName: "الْجَلْسَةُ",
    description: "Rise from prostration and sit upright on your left leg with the right foot vertical, placing your hands on your thighs.",
    recitationArabic: "رَبِّ اغْفِرْ لِي ، وَارْحَمْنِي",
    recitationTranslit: "Rabbighfir lee, warhamnee",
    recitationEnglish: "My Lord, forgive me and have mercy on me."
  },
  {
    id: "tashahhud",
    name: "Tashahhud (Final Testimony)",
    arabicName: "التَّشَهُّدُ",
    description: "Sit gracefully for the final unit of prayer, raise your right index finger slightly to bear witness, and send blessings upon Prophet Muhammad and Prophet Ibrahim.",
    recitationArabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ... أَشْهَدُ أَن لَّا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    recitationTranslit: "Attahiyyatu lillahi was-salawatu wat-tayyibatu... Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan abduhu wa Rasooluh",
    recitationEnglish: "All compliments, prayers and pure deeds are due to Allah... I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Beginner (15)
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
    difficulty: "Beginner",
    question: "What does 'Islam' mean?",
    options: ["Peace", "Submission to God", "Love", "Faith"],
    correctAnswerIndex: 1,
    explanation: "Islam means 'submission to the will of God'. The root word 'Salaam' means peace."
  },
  {
    id: 5,
    difficulty: "Beginner",
    question: "Who is the final Prophet of Islam?",
    options: ["Prophet Musa", "Prophet Isa", "Prophet Muhammad", "Prophet Ibrahim"],
    correctAnswerIndex: 2,
    explanation: "Prophet Muhammad (ﷺ) is the final messenger of Allah, known as the Seal of the Prophets (Khatam an-Nabiyyin)."
  },
  {
    id: 6,
    difficulty: "Beginner",
    question: "What is the first month of the Islamic calendar?",
    options: ["Ramadan", "Muharram", "Shawwal", "Dhul Hijjah"],
    correctAnswerIndex: 1,
    explanation: "Muharram is the first month of the Islamic lunar calendar."
  },
  {
    id: 7,
    difficulty: "Beginner",
    question: "What do Muslims say when greeting each other?",
    options: ["Shalom", "Namaste", "Assalamu Alaikum", "Bonjour"],
    correctAnswerIndex: 2,
    explanation: "'Assalamu Alaikum' means 'Peace be upon you' and is the standard Islamic greeting."
  },
  {
    id: 8,
    difficulty: "Beginner",
    question: "What is the direction Muslims face during prayer?",
    options: ["North", "South", "East", "Mecca (Kaaba)"],
    correctAnswerIndex: 3,
    explanation: "Muslims face the Kaaba in Mecca, Saudi Arabia, which is called the 'Qibla'."
  },
  {
    id: 9,
    difficulty: "Beginner",
    question: "What is the name of the angel who revealed the Quran to Prophet Muhammad?",
    options: ["Mika'il", "Israfil", "Jibril (Gabriel)", "Azrael"],
    correctAnswerIndex: 2,
    explanation: "Angel Jibril (Gabriel) delivered Allah's revelations to Prophet Muhammad (ﷺ) over 23 years."
  },
  {
    id: 10,
    difficulty: "Beginner",
    question: "What is the Islamic declaration of faith called?",
    options: ["Salah", "Shahada", "Zakat", "Sawm"],
    correctAnswerIndex: 1,
    explanation: "The Shahada is 'La ilaha illallah, Muhammadur Rasulullah' (There is no god but Allah, Muhammad is the Messenger of Allah)."
  },
  {
    id: 11,
    difficulty: "Beginner",
    question: "What is the meaning of 'Bismillah'?",
    options: ["Praise God", "In the name of Allah", "God is great", "Thank God"],
    correctAnswerIndex: 1,
    explanation: "'Bismillah' means 'In the name of Allah' and is recited before starting most actions."
  },
  {
    id: 12,
    difficulty: "Beginner",
    question: "What is Zakat?",
    options: ["Prayer", "Fasting", "Charity (obligatory giving)", "Pilgrimage"],
    correctAnswerIndex: 2,
    explanation: "Zakat is the obligatory giving of a fixed portion of one's wealth to those in need, one of the 5 Pillars of Islam."
  },
  {
    id: 13,
    difficulty: "Beginner",
    question: "What is the sacred month of fasting in Islam?",
    options: ["Muharram", "Rajab", "Ramadan", "Shawwal"],
    correctAnswerIndex: 2,
    explanation: "Ramadan is the 9th month of the Islamic calendar, during which Muslims fast from dawn to sunset."
  },
  {
    id: 14,
    difficulty: "Beginner",
    question: "What is the Kaaba?",
    options: ["A mosque", "A holy building in Mecca", "A mountain", "A river"],
    correctAnswerIndex: 1,
    explanation: "The Kaaba is a cube-shaped building in the center of Masjid al-Haram in Mecca, the holiest site in Islam."
  },
  {
    id: 15,
    difficulty: "Beginner",
    question: "What does 'Alhamdulillah' mean?",
    options: ["God is great", "Praise be to Allah", "In the name of Allah", "There is no god but Allah"],
    correctAnswerIndex: 1,
    explanation: "'Alhamdulillah' means 'All praise and thanks be to Allah' and is recited frequently by Muslims."
  },
  // Intermediate (15)
  {
    id: 16,
    difficulty: "Intermediate",
    question: "Which Prophet received the Ten Commandments and spoke to Allah directly on Mount Sinai?",
    options: ["Prophet Ibrahim (Abraham)", "Prophet Musa (Moses)", "Prophet Isa (Jesus)", "Prophet Yusuf (Joseph)"],
    correctAnswerIndex: 1,
    explanation: "Prophet Musa (Moses) is known in Islam as Kalimullah (the one who spoke directly to Allah), and he was given the Torah."
  },
  {
    id: 17,
    difficulty: "Intermediate",
    question: "What is the Arabic word for Fasting in the month of Ramadan?",
    options: ["Zakat", "Salah", "Sawm", "Sadaqah"],
    correctAnswerIndex: 2,
    explanation: "Sawm refers to the act of fasting, abstaining from food, drink, and intimate relations from dawn until sunset."
  },
  {
    id: 18,
    difficulty: "Intermediate",
    question: "In which city was the Prophet Muhammad (ﷺ) born?",
    options: ["Medina", "Mecca", "Jerusalem", "Cairo"],
    correctAnswerIndex: 1,
    explanation: "Prophet Muhammad (ﷺ) was born in Mecca in 570 CE, in the Year of the Elephant."
  },
  {
    id: 19,
    difficulty: "Intermediate",
    question: "What is the night journey of Prophet Muhammad called?",
    options: ["Hijrah", "Isra and Mi'raj", "Laylat al-Qadr", "Hajj"],
    correctAnswerIndex: 1,
    explanation: "Isra and Mi'raj is the miraculous night journey from Mecca to Jerusalem and then ascension through the heavens."
  },
  {
    id: 20,
    difficulty: "Intermediate",
    question: "How many Surahs are in the Quran?",
    options: ["100", "110", "114", "120"],
    correctAnswerIndex: 2,
    explanation: "The Quran contains 114 Surahs (chapters) of varying lengths."
  },
  {
    id: 21,
    difficulty: "Intermediate",
    question: "What is the longest Surah in the Quran?",
    options: ["Surah Al-Baqarah", "Surah Al-Imran", "Surah An-Nisa", "Surah Al-Maidah"],
    correctAnswerIndex: 0,
    explanation: "Surah Al-Baqarah (The Cow) is the longest Surah with 286 ayahs."
  },
  {
    id: 22,
    difficulty: "Intermediate",
    question: "What is the shortest Surah in the Quran?",
    options: ["Surah Al-Ikhlas", "Surah Al-Asr", "Surah An-Nasr", "Surah Al-Falaq"],
    correctAnswerIndex: 1,
    explanation: "Surah Al-Asr (The Declining Day) is the shortest with only 3 ayahs."
  },
  {
    id: 23,
    difficulty: "Intermediate",
    question: "What is Laylat al-Qadr?",
    options: ["The first night of Ramadan", "The Night of Power/Decree", "The night of Eid", "The night of Hajj"],
    correctAnswerIndex: 1,
    explanation: "Laylat al-Qadr (The Night of Power) is better than 1,000 months. It falls in the last 10 nights of Ramadan."
  },
  {
    id: 24,
    difficulty: "Intermediate",
    question: "What does 'Hijrah' refer to?",
    options: ["The first revelation", "The migration from Mecca to Medina", "The journey to Jerusalem", "The pilgrimage to Mecca"],
    correctAnswerIndex: 1,
    explanation: "The Hijrah was the migration of Prophet Muhammad (ﷺ) and his followers from Mecca to Medina in 622 CE."
  },
  {
    id: 25,
    difficulty: "Intermediate",
    question: "Which companion was the first Caliph of Islam?",
    options: ["Umar ibn Al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib", "Abu Bakr As-Siddiq"],
    correctAnswerIndex: 3,
    explanation: "Abu Bakr As-Siddiq was the first Caliph, succeeding Prophet Muhammad (ﷺ)."
  },
  {
    id: 26,
    difficulty: "Intermediate",
    question: "What is the Hijri calendar based on?",
    options: ["The birth of Prophet Muhammad", "The Hijrah (migration to Medina)", "The first revelation", "The conquest of Mecca"],
    correctAnswerIndex: 1,
    explanation: "The Islamic (Hijri) calendar begins from the year of the Hijrah (622 CE)."
  },
  {
    id: 27,
    difficulty: "Intermediate",
    question: "What is the meaning of 'Jannah'?",
    options: ["Hellfire", "Paradise", "The Earth", "The Sky"],
    correctAnswerIndex: 1,
    explanation: "Jannah means 'Garden' and refers to Paradise in Islamic theology."
  },
  {
    id: 28,
    difficulty: "Intermediate",
    question: "What is Tawhid?",
    options: ["The belief in angels", "Monotheism / Oneness of God", "Predestination", "The Day of Judgment"],
    correctAnswerIndex: 1,
    explanation: "Tawhid is the fundamental Islamic concept of the absolute oneness and unity of God (Allah)."
  },
  {
    id: 29,
    difficulty: "Intermediate",
    question: "What is the name of Prophet Ibrahim's (Abraham's) son who was to be sacrificed?",
    options: ["Ishaq (Isaac)", "Ismail (Ishmael)", "Yaqub (Jacob)", "Yusuf (Joseph)"],
    correctAnswerIndex: 1,
    explanation: "Prophet Ibrahim was commanded to sacrifice his son Ismail (Ishmael), which is commemorated during Eid al-Adha."
  },
  {
    id: 30,
    difficulty: "Intermediate",
    question: "How many years did the revelation of the Quran take?",
    options: ["10 years", "15 years", "23 years", "30 years"],
    correctAnswerIndex: 2,
    explanation: "The Quran was revealed over approximately 23 years, from 610 CE to 632 CE."
  },
  // Scholar (15)
  {
    id: 31,
    difficulty: "Scholar",
    question: "What is the linguistic meaning of the word 'Tajweed'?",
    options: ["To memorize the text", "To search for origin", "To make better, or to perfect", "To chant loudly"],
    correctAnswerIndex: 2,
    explanation: "Tajweed comes from the root 'j-w-d' (jawdah), meaning quality. Linguistically, it means 'to make better' or 'proficiency/perfection'."
  },
  {
    id: 32,
    difficulty: "Scholar",
    question: "Which companion is known as the 'Translator of the Quran' (Tarjuman al-Quran)?",
    options: ["Abu Bakr As-Siddiq", "Abdullah ibn Abbas", "Ali ibn Abi Talib", "Umar ibn Al-Khattab"],
    correctAnswerIndex: 1,
    explanation: "Abdullah ibn Abbas became renowned for his deep knowledge of Tafseer, earning the title 'Tarjuman al-Quran'."
  },
  {
    id: 33,
    difficulty: "Scholar",
    question: "What is the longest ayah in the Quran?",
    options: ["Ayat al-Kursi (2:255)", "The Verse of debt (2:282)", "The Throne Verse", "Al-Fatihah 7"],
    correctAnswerIndex: 1,
    explanation: "Verse 2:282 (Surah Al-Baqarah) about financial transactions is the longest verse in the Quran."
  },
  {
    id: 34,
    difficulty: "Scholar",
    question: "What is 'Ma'arij' in Islamic terminology?",
    options: ["Places of worship", "Ascensions / Levels of the heavens", "Types of charity", "Schools of jurisprudence"],
    correctAnswerIndex: 1,
    explanation: "Ma'arij refers to the ascending levels/stations, as described in Surah Al-Ma'arij (70:3)."
  },
  {
    id: 35,
    difficulty: "Scholar",
    question: "Which Surah is equivalent to one-third of the Quran in reward?",
    options: ["Surah Al-Fatihah", "Surah Al-Ikhlas", "Surah Al-Falaq", "Surah An-Nas"],
    correctAnswerIndex: 1,
    explanation: "Surah Al-Ikhlas (112) is equivalent to one-third of the Quran in reward, as stated in a hadith."
  },
  {
    id: 36,
    difficulty: "Scholar",
    question: "What are the seven Ahruf (readings) of the Quran?",
    options: ["Seven languages", "Seven modes of recitation", "Seven types of tajweed", "Seven geographical regions"],
    correctAnswerIndex: 1,
    explanation: "The seven Ahruf are the seven modes in which the Quran was revealed for ease of recitation."
  },
  {
    id: 37,
    difficulty: "Scholar",
    question: "Which battle is considered the first major military engagement in Islamic history?",
    options: ["Battle of Uhud", "Battle of Badr", "Battle of Khandaq", "Battle of Hunayn"],
    correctAnswerIndex: 1,
    explanation: "The Battle of Badr (624 CE) was the first major battle, where the Muslims achieved a decisive victory against the Quraysh."
  },
  {
    id: 38,
    difficulty: "Scholar",
    question: "What is 'Makki' vs 'Madani' in Quranic classification?",
    options: ["Old vs New revelations", "Revealed in Mecca vs Medina", "Long vs Short Surahs", "Abrogating vs Abrogated"],
    correctAnswerIndex: 1,
    explanation: "Makki Surahs were revealed before the Hijrah in Mecca; Madani Surahs were revealed after the Hijrah in Medina."
  },
  {
    id: 39,
    difficulty: "Scholar",
    question: "How many roots does the Arabic language traditionally have?",
    options: ["Two-letter roots", "Three-letter roots", "Four-letter roots", "Both three and four-letter roots"],
    correctAnswerIndex: 3,
    explanation: "Arabic roots are predominantly trilateral (three-letter), but some quadrilateral (four-letter) roots also exist."
  },
  {
    id: 40,
    difficulty: "Scholar",
    question: "What is Naskh (abrogation) in Quranic studies?",
    options: ["A writing style", "The principle where later verses supersede earlier ones", "A recitation method", "A type of tafsir"],
    correctAnswerIndex: 1,
    explanation: "Naskh refers to the principle where Allah replaces or abrogates certain rulings with later revelations."
  },
  {
    id: 41,
    difficulty: "Scholar",
    question: "What is the 'Umm al-Kitab' (Mother of the Book)?",
    options: ["Surah Al-Fatihah", "The Preserved Tablet (Al-Lawh Al-Mahfuz)", "The Quran itself", "Surah Al-Baqarah"],
    correctAnswerIndex: 1,
    explanation: "Umm al-Kitab refers to Al-Lawh Al-Mahfuz (The Preserved Tablet), the heavenly original of the Quran."
  },
  {
    id: 42,
    difficulty: "Scholar",
    question: "Who compiled the first complete written manuscript of the Quran under Caliph Uthman?",
    options: ["Ibn Mas'ud", "Zayd ibn Thabit", "Abu Bakr", "Ali ibn Abi Talib"],
    correctAnswerIndex: 1,
    explanation: "Zayd ibn Thabit was the chief scribe who led the compilation of the first complete mushaf under Caliph Uthman."
  },
  {
    id: 43,
    difficulty: "Scholar",
    question: "What is 'I'jaz al-Quran' (the inimitability of the Quran)?",
    options: ["Its scientific predictions", "Its miraculous literary quality that cannot be matched", "Its historical accuracy", "Its grammatical perfection"],
    correctAnswerIndex: 1,
    explanation: "I'jaz al-Quran refers to the miraculous nature of the Quran's eloquence, rhetoric, and inimitable literary quality."
  },
  {
    id: 44,
    difficulty: "Scholar",
    question: "What is the significance of 'Bismillah ir-Rahman ir-Rahim' appearing 113 times in the Quran?",
    options: ["It's a prayer count", "All Surahs except Surah At-Tawbah begin with it", "Each time for a Prophet", "Each time for a pillar"],
    correctAnswerIndex: 1,
    explanation: "Bismillah appears at the beginning of 113 Surahs — all except Surah At-Tawbah (9), which begins with severity."
  },
  {
    id: 45,
    difficulty: "Scholar",
    question: "Which Tafsir work is considered the most authoritative and comprehensive in Sunni Islam?",
    options: ["Tafsir al-Jalalayn", "Tafsir Ibn Kathir", "Tafsir al-Tabari", "Tafsir al-Zamakhshari"],
    correctAnswerIndex: 2,
    explanation: "Tafsir al-Tabari (Jami' al-Bayan) by Imam al-Tabari is the earliest and most comprehensive classical tafsir."
  }
];

export const TASBIH_TEMPLATES: Tasbih[] = [
  { id: "subhanallah", phrase: "SubhanAllah", arabic: "سُبْحَانَ اللهِ", translation: "Glory be to Allah", count: 0, limit: 33 },
  { id: "alhamdulillah", phrase: "Alhamdulillah", arabic: "الْحَمْدُ للهِ", translation: "All Praise is due to Allah", count: 0, limit: 33 },
  { id: "allahuakbar", phrase: "Allahu Akbar", arabic: "اللهُ أَكْبَرُ", translation: "Allah is the Greatest", count: 0, limit: 34 },
  { id: "astagfirullah", phrase: "Astagfirullah", arabic: "أَسْتَغْفِرُ اللهَ", translation: "I ask Allah for forgiveness", count: 0, limit: 100 }
];
