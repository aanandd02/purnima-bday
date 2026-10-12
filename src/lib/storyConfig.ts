// ============================================================
// STORY CONFIG — Birthday surprise for Purnima, 18 October 2026
// Relationship milestones are woven in as emotional context.
// ============================================================

export const storyConfig = {
  name: "Purnima",

  // Primary event — her birthday
  birthday: "2026-10-18", // 18 October 2026

  // Relationship milestones (supporting emotional context)
  dates: {
    firstMeet: "2026-08-09",      // 9 August 2026
    familyApproval: "2026-10-09", // 9 October 2026
  },

  heroPhoto: "/media/photos/hero-01.jpg",

  // ── Intro scene (Full suspense, romantic, mysterious) ──
  intro: {
    eyebrow: "A Little World · Just For You",
    heading: "For You,",
    name: "My Purnima",
    tagline: "Some moments deserve to be paused, held close, and cherished forever. I created something special just for you.",
    subtext: "Take a breath, close your eyes, and step inside 🤍",
    cta: "Open your surprise ✨",
  },

  // ── Our Story timeline (CountdownScene) ──────────────────
  ourStory: {
    intro: "Before the surprise unfolds, a little story…",
    heading: "How We Got Here",
    milestones: [
      {
        date: "9 August 2026",
        icon: "🌸",
        label: "The Day I Met You",
        description: "I did not know it then, but that afternoon would quietly become one of the most important moments of my life.",
      },
      {
        date: "9 October 2026",
        icon: "🌹",
        label: "Our Families Said Yes",
        description: "Two months later, on 9 October, both our families happily agreed and gave their blessings to what our hearts had already chosen.",
      },
      {
        date: "18 October 2026",
        icon: "✨",
        label: "Today",
        description: "And today… a day that is entirely, beautifully all about you.",
      },
    ],
    ctaLabel: "Continue",
  },

  // ── Photo reveal ──────────────────────────────────────────
  photoReveal: {
    line1: "Some moments don't live in albums — they live in the heart.",
    line2: "These are a few of those moments.",
  },

  // ── Memory gallery ────────────────────────────────────────
  memories: [
    { type: "image" as const, src: "/media/photos/memory-01.jpg", caption: "Beautiful, just as you always are.", label: "01" },
    { type: "image" as const, src: "/media/photos/memory-02.jpg", caption: "Red era. Iconic era.", label: "02" },
    { type: "image" as const, src: "/media/photos/memory-03.jpg", caption: "Even in silence, you speak volumes.", label: "03" },
    { type: "image" as const, src: "/media/photos/memory-04.jpg", caption: "So many sides, one extraordinary soul.", label: "04" },
    { type: "image" as const, src: "/media/photos/memory-05.jpg", caption: "The most precious thing in the frame.", label: "05" },
    { type: "image" as const, src: "/media/photos/memory-06.jpg", caption: "Golden hour, best subject.", label: "06" },
    { type: "image" as const, src: "/media/photos/memory-07.jpg", caption: "Beautiful in every single way.", label: "07" },
    { type: "image" as const, src: "/media/photos/memory-08.jpg", caption: "This one is my personal favourite.", label: "08" },
    { type: "image" as const, src: "/media/photos/memory-09.jpg", caption: "Candid and radiant.", label: "09" },
    { type: "image" as const, src: "/media/photos/memory-10.jpg", caption: "Not a single photo of yours is ever bad.", label: "10" },
    { type: "image" as const, src: "/media/photos/memory-11.jpg", caption: "You feel like a whole emotion.", label: "11" },
    { type: "image" as const, src: "/media/photos/memory-12.jpg", caption: "Soft, warm, and deep.", label: "12" },
    { type: "image" as const, src: "/media/photos/memory-13.jpg", caption: "Unbothered. Iconic.", label: "13" },
    { type: "image" as const, src: "/media/photos/memory-14.jpg", caption: "The most effortless one in the frame.", label: "14" },
    { type: "image" as const, src: "/media/photos/memory-15.jpg", caption: "A moment worth remembering.", label: "15" },
    { type: "image" as const, src: "/media/photos/memory-16.jpg", caption: "And so many more still to come.", label: "16" },
    { type: "image" as const, src: "/media/photos/memory-17.jpg", caption: "This one is special to me.", label: "17" },
    { type: "image" as const, src: "/media/photos/memory-18.jpg", caption: "You look like this every single day.", label: "18" },
    { type: "image" as const, src: "/media/photos/memory-19.jpg", caption: "Some moments are just meant to be felt.", label: "19" },
    { type: "image" as const, src: "/media/photos/memory-20.jpg", caption: "Wherever you are, that place becomes special.", label: "20" },
    { type: "image" as const, src: "/media/photos/memory-21.jpg", caption: "Just you.", label: "21" },
    { type: "image" as const, src: "/media/photos/memory-22.jpg", caption: "That smile — I would do anything for it.", label: "22" },
    { type: "image" as const, src: "/media/photos/memory-23.jpg", caption: "Pure joy.", label: "23" },
    { type: "image" as const, src: "/media/photos/memory-24.jpg", caption: "So much love in one person.", label: "24" },
    { type: "image" as const, src: "/media/photos/memory-25.jpg", caption: "Every picture of you is my favourite.", label: "25" },
  ],

  // ── Videos ───────────────────────────────────────────────
  videos: [
    { src: "/media/videos/video-01.mp4", poster: "/media/posters/video-01.jpg", caption: "A moment, captured." },
    { src: "/media/videos/video-02.mp4", poster: "/media/posters/video-02.jpg", caption: "Exactly herself." },
    { src: "/media/videos/video-03.mp4", poster: "/media/posters/video-03.jpg", caption: "This energy, always." },
    { src: "/media/videos/video-04.mp4", poster: "/media/posters/video-04.jpg", caption: "A moment worth keeping." },
    { src: "/media/videos/video-05.mp4", poster: "/media/posters/video-05.jpg", caption: "That in-between moment." },
    { src: "/media/videos/video-06.mp4", poster: "/media/posters/video-06.jpg", caption: "Another favourite." },
    { src: "/media/videos/video-07.mp4", poster: "/media/posters/video-07.jpg", caption: "Perfectly unguarded." },
    { src: "/media/videos/video-08.mp4", poster: "", caption: "One more beautiful moment." },
  ],

  // ── Reasons I love you ───────────────────────────────────
  reasons: [
    {
      title: "Your smile",
      message: "When you smile — truly, without pretence — it feels like everything is right with the world. There is a quiet peace in that smile that I find nowhere else.",
    },
    {
      title: "Your energy",
      message: "Your presence does something to a room. When you are around or talking, everything feels lighter, warmer, more alive. That's just you.",
    },
    {
      title: "Your voice",
      message: "After a long, noisy day — hearing your voice for even a little while brings a calm that nothing else can. It is my favourite sound.",
    },
    {
      title: "Your heart",
      message: "You don't attach easily — it takes time for you to truly let someone in. But when you do, your love is completely genuine, deep, and real. That is what makes you unlike anyone else.",
    },
    {
      title: "Even your stubbornness",
      message: "Yes, that little sulking and the small tantrums too. Because even in those, your realness shows — completely genuine, with no performance whatsoever.",
    },
    {
      title: "Your laughter",
      message: "When you laugh freely, without holding anything back — that is my absolute favourite sound in the world. Seeing you laugh like that makes my heart happy without reason.",
    },
    {
      title: "The little things",
      message: "That unexpected 'did you eat?' message mid-day, understanding me without words, noticing the smallest details — these are the little things that win hearts completely.",
    },
    {
      title: "You are going to be mine",
      message: "Just knowing that the entire rest of this life will be spent with you — through every chapter, every turn, always — that feeling alone is enough.",
    },
  ],

  // ── A Letter From My Heart ────────────────────────────────
  letter: {
    greeting: "My Purnima,",
    body: `There are some people who come into your life quietly, and without warning, they change everything forever. For me, that person is you.

I still remember 9 August like it was yesterday. That quiet afternoon when I saw you for the very first time. The moment you smiled, something inside me paused. You had this rare, effortless grace — no pretenses, no drama, just pure and genuine warmth. I remember thinking to myself: this girl is completely different from the rest of the world. And the more I got to know you, the more breathtaking you became to me.

Your smile is my absolute favorite thing — it has a quiet peace that melts away every worry. But even more than your beauty, it is your heart that completely won me over. The way you genuinely care, the honesty in your eyes, and that soft depth of yours… you don't even realize how extraordinary you truly are.

And then came 9 October. That unforgettable day when both our families happily said yes to our relationship, blessing what had already grown so deeply in our hearts. In that moment, knowing that you and I are going to share an entire lifetime together, I felt like the most blessed man in the world.

Having you by my side is the greatest gift of my life. You are my calm, my happiness, and my forever. I promise to always cherish you, protect your smile, and love you with all my heart through every single chapter of our lives.`,
    closing: "Forever and always yours,",
    signature: "— The one whose world begins and ends with you. 🌹",
  },

  // ── Cake transition ───────────────────────────────────────
  cakeTransition: {
    line1: "And now…",
    line2: "The most important part.",
    line3: "Close your eyes. Make a wish. From the heart.",
  },

  // ── Birthday celebration ──────────────────────────────────
  celebration: {
    mainText: "HAPPY BIRTHDAY",
    name: "PURNIMA",
  },

  // ── Birthday wishes ───────────────────────────────────────
  wishes: [
    "A life full of joy and laughter.",
    "Memories that never fade.",
    "Dreams that come true, one by one.",
    "Courage that never breaks.",
    "Moments that fill your heart completely.",
    "Love that stays, always.",
  ] as readonly string[],

  // ── Year ahead — star constellation ──────────────────────
  yearAhead: {
    title: "A Sky Full of Stars, Just for You",
    subtitle: "Touch each star and receive your birthday blessing ✨",
    stars: [
      {
        icon: "💖",
        label: "Love",
        tag: "For your heart",
        wish: "May you always feel loved — not just by me, but by life itself. The kind of love that wraps around you like the warmest hug on the coldest night.",
      },
      {
        icon: "✨",
        label: "Dreams",
        tag: "For your soul",
        wish: "Everything you quietly wish for — those dreams you haven't spoken aloud yet — this year, I want to watch you make them real. You deserve every single one.",
      },
      {
        icon: "🌸",
        label: "Joy",
        tag: "For your laughter",
        wish: "Your full, unreserved laughter — on the days I hear it, I know everything is okay. This year, may that laughter grow deeper, come every day, and never stop.",
      },
      {
        icon: "🕊️",
        label: "Peace",
        tag: "For your mind",
        wish: "Whenever you are tired, whenever your heart feels heavy — remember, I am here. This year, you will find the peace you have always deserved.",
      },
      {
        icon: "🌟",
        label: "Success",
        tag: "For your future",
        wish: "Every door you have imagined — this year, it is opening. I can see it — there is a light in you that the world needs to see. And it will.",
      },
      {
        icon: "🥂",
        label: "Adventures",
        tag: "For the journey",
        wish: "New journeys, new people, new moments — this year, I want to write a beautiful story called life. With you. Only with you.",
      },
      {
        icon: "🌙",
        label: "Always",
        tag: "For us",
        wish: "This is our first birthday together — but I know this is only the beginning. I am here, for you, today and always. Happy Birthday, Purnima. 🌹",
      },
    ],
  },

  // ── Memory wall ───────────────────────────────────────────
  memoryWall: {
    intro: "And one last thing…",
    body: "These moments will pass — but I want to remember them. Always.",
  },

  // ── Love note prompts ─────────────────────────────────────
  myFeelings: {
    prompts: [
      "The birthday wish I have for you, from the bottom of my heart, is…",
      "When I think about the year ahead with you, I feel…",
      "The very first thing that took my breath away about you was…",
      "What I hope for our future together is…",
    ],
  },

  // ── Final scene ───────────────────────────────────────────
  final: {
    eyebrow: "Once again, from the bottom of my heart…",
    main: "Happy Birthday, My Purnima. ❤️",
    line1: "No matter how many times I say it today, words will never be enough to describe how special you are to me.",
    line2: "You are the calm in my chaos, the brightest smile in my life, and the most beautiful part of my world.",
    line3: "This is our very first birthday together — and I want to spend a lifetime celebrating every single year with you.",
    heartbeat: "Always by your side. Today, tomorrow, forever. 🤍",
    replay: "Relive the surprise ↺",
  },

  // ── Easter eggs ───────────────────────────────────────────
  easterEggs: [
    {
      trigger: "longpress-hero",
      message: "Ah, you found it. 🤍\nThis entire surprise was made just for you.\nJust. For. You.",
    },
    {
      trigger: "tap-star-sequence",
      message: "Your curiosity is adorable too. Happy Birthday, Purnima. 🌹",
    },
  ],

  // ── Theme ─────────────────────────────────────────────────
  theme: {
    primaryFont: "Cormorant Garamond",
    uiFont: "Inter",
    burgundy: "#7C2D3E",
    gold: "#C9A96E",
    cream: "#F8F3EC",
    charcoal: "#0A0A0A",
  },
} as const;

export type Memory = (typeof storyConfig.memories)[number];
export type Video = (typeof storyConfig.videos)[number];
export type Reason = (typeof storyConfig.reasons)[number];
export type Star = (typeof storyConfig.yearAhead.stars)[number];

// ── Backwards-compatible alias ────────────────────────────
// All existing scenes that import birthdayConfig continue to work unchanged.
export const birthdayConfig = {
  ...storyConfig,
  // Remap fields that scene components reference directly
  birthday: storyConfig.birthday,
  heroPhoto: storyConfig.heroPhoto,
  countdown: {
    preMessage: storyConfig.ourStory.intro,
    birthdayMessage: "Happy Birthday, Purnima! 🌹",
    subtext: "18 October",
  },
  photoReveal: storyConfig.photoReveal,
  cakeTransition: storyConfig.cakeTransition,
  celebration: storyConfig.celebration,
  wishes: storyConfig.wishes,
  yearAhead: storyConfig.yearAhead,
  memoryWall: storyConfig.memoryWall,
  final: storyConfig.final,
  easterEggs: storyConfig.easterEggs,
  audio: {
    background: "",
    candle: "",
    celebration: "",
    fireworks: "",
  },
} as const;
