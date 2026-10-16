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
    firstPhoto: "2026-06-06",      // 6 June 2026 — first saw her photo
    firstTalk: "2026-06-08",       // 8 June 2026 — first chat on Instagram
    mannat: "2026-06-09",          // 9 June 2026 — mannat at Bade Hanuman Ji
    firstMeet: "2026-08-09",       // 9 August 2026 — first real meeting
    familyApproval: "2026-10-09",  // 9 October 2026 — families said yes
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
    intro: "Before the surprise unfolds, a little story… ❤️",
    heading: "How We Got Here",
    milestones: [
      {
        date: "6 June 2026",
        icon: "📸",
        label: "The First Glimpse",
        description: "On 6 June, I saw your photo for the very first time. Something about it simply stopped me. I did not know then that this one quiet moment was the beginning of everything ❤️",
      },
      {
        date: "8 June 2026",
        icon: "💬",
        label: "The First Chat",
        description: "Two days later, on 8 June, we chatted for the very first time on Instagram. That first conversation felt so special, warm, natural, and completely unforgettable 🥰",
      },
      {
        date: "9 June 2026",
        icon: "🙏",
        label: "A Prayer at Bade Hanuman Ji",
        description: "On 9 June, I went to Bade Hanuman Ji and made a mannat quietly and sincerely for you. Even before I truly knew you, my heart already knew you were the one 🙏❤️",
      },
      {
        date: "9 August 2026",
        icon: "🌸",
        label: "The Day I Met You",
        description: "On 9 August, I finally saw you in person. That moment confirmed everything my heart had already felt 🌸💕",
      },
      {
        date: "9 October 2026",
        icon: "🌹",
        label: "Our Families Said Yes",
        description: "On 9 October, both our families gave their blessings to what our hearts had already chosen long before 🌹💍",
      },
      {
        date: "18 October 2026",
        icon: "✨",
        label: "Today - Your Birthday 🎂❤️",
        description: "And today, a day that is entirely and beautifully all about you! Happy Birthday my love 🎂💖✨",
      },
    ],
    ctaLabel: "Continue",
  },

  // ── Photo reveal ──────────────────────────────────────────
  photoReveal: {
    line1: "Some moments don't live in albums, they live right in the heart ❤️",
    line2: "A few of my favourite moments with you 💕",
  },

  // ── Memory gallery ────────────────────────────────────────
  memories: [
    { type: "image" as const, src: "/media/photos/memory-01.jpg", caption: "There you are. Still the most beautiful thing I have ever seen.", label: "01" },
    { type: "image" as const, src: "/media/photos/memory-02.jpg", caption: "Red era. Entirely iconic.", label: "02" },
    { type: "image" as const, src: "/media/photos/memory-03.jpg", caption: "Quiet, but saying everything.", label: "03" },
    { type: "image" as const, src: "/media/photos/memory-04.jpg", caption: "Every version of you is extraordinary.", label: "04" },
    { type: "image" as const, src: "/media/photos/memory-05.jpg", caption: "I have looked at this one more times than I will admit.", label: "05" },
    { type: "image" as const, src: "/media/photos/memory-06.jpg", caption: "Even the light knows how to find you.", label: "06" },
    { type: "image" as const, src: "/media/photos/memory-07.jpg", caption: "No filter needed. Ever.", label: "07" },
    { type: "image" as const, src: "/media/photos/memory-08.jpg", caption: "This is the one that got me.", label: "08" },
    { type: "image" as const, src: "/media/photos/memory-09.jpg", caption: "Completely yourself. That is exactly why.", label: "09" },
    { type: "image" as const, src: "/media/photos/memory-10.jpg", caption: "Not one bad angle. Not one.", label: "10" },
    { type: "image" as const, src: "/media/photos/memory-11.jpg", caption: "You carry warmth everywhere you go.", label: "11" },
    { type: "image" as const, src: "/media/photos/memory-12.jpg", caption: "Gentle. Grounded. Yours.", label: "12" },
    { type: "image" as const, src: "/media/photos/memory-13.jpg", caption: "Unbothered energy. Nobody does it like you.", label: "13" },
    { type: "image" as const, src: "/media/photos/memory-14.jpg", caption: "Effortless. Like everything good in this world.", label: "14" },
    { type: "image" as const, src: "/media/photos/memory-15.jpg", caption: "A moment I want to come back to, always.", label: "15" },
    { type: "image" as const, src: "/media/photos/memory-16.jpg", caption: "There are a hundred more where this came from.", label: "16" },
    { type: "image" as const, src: "/media/photos/memory-17.jpg", caption: "The one I keep coming back to without a reason.", label: "17" },
    { type: "image" as const, src: "/media/photos/memory-18.jpg", caption: "This is just a regular day for you. Imagine that.", label: "18" },
    { type: "image" as const, src: "/media/photos/memory-19.jpg", caption: "Some feelings do not fit into words. This is one of them.", label: "19" },
    { type: "image" as const, src: "/media/photos/memory-20.jpg", caption: "You make every place look like it was waiting for you.", label: "20" },
    { type: "image" as const, src: "/media/photos/memory-21.jpg", caption: "Just you. That has always been enough.", label: "21" },
    { type: "image" as const, src: "/media/photos/memory-22.jpg", caption: "That smile. That particular smile. I am gone.", label: "22" },
    { type: "image" as const, src: "/media/photos/memory-23.jpg", caption: "Laughing like nobody is watching. I was.", label: "23" },
    { type: "image" as const, src: "/media/photos/memory-24.jpg", caption: "Too much goodness in one person. Genuinely unfair.", label: "24" },
    { type: "image" as const, src: "/media/photos/memory-25.jpg", caption: "Still my favourite. Will always be.", label: "25" },
    { type: "image" as const, src: "/media/photos/memory-26.jpg", caption: "The quiet grace you carry without even trying.", label: "26" },
    { type: "image" as const, src: "/media/photos/memory-27.jpg", caption: "Looking straight into my heart. Every single time.", label: "27" },
    { type: "image" as const, src: "/media/photos/memory-28.jpg", caption: "The brightest sparkle in the whole room, always.", label: "28" },
    { type: "image" as const, src: "/media/photos/memory-29.jpg", caption: "Caught in between thoughts, looking effortlessly perfect.", label: "29" },
    { type: "image" as const, src: "/media/photos/memory-30.jpg", caption: "That calm that settles over everything when you are near.", label: "30" },
    { type: "image" as const, src: "/media/photos/memory-31.jpg", caption: "How someone can look this beautiful just existing is beyond me.", label: "31" },
    { type: "image" as const, src: "/media/photos/memory-32.jpg", caption: "You have that timeless kind of charm.", label: "32" },
    { type: "image" as const, src: "/media/photos/memory-33.jpg", caption: "The sweetness in your expression that melts everything away.", label: "33" },
    { type: "image" as const, src: "/media/photos/memory-34.jpg", caption: "My absolute favourite glance in the world.", label: "34" },
    { type: "image" as const, src: "/media/photos/memory-35.jpg", caption: "Simple, honest, and completely breathtaking.", label: "35" },
    { type: "image" as const, src: "/media/photos/memory-36.jpg", caption: "The little things about you that make my whole day.", label: "36" },
    { type: "image" as const, src: "/media/photos/memory-37.jpg", caption: "Dressed up or down, you are just pure magic.", label: "37" },
    { type: "image" as const, src: "/media/photos/memory-38.jpg", caption: "A feeling I never want to let go of.", label: "38" },
    { type: "image" as const, src: "/media/photos/memory-39.jpg", caption: "Here is to you, my forever person.", label: "39" },
  ],

  // ── Birthday Wish Special Video (Celebration Exclusive) ─
  birthdayWishVideo: {
    src: "/media/videos/birthdaywish.mp4",
    poster: "/media/posters/birthdaywish.jpg",
    caption: "A special birthday wish, just for you, my love 💖",
  },

  // ── Videos (Memories Gallery) ─────────────────────────────
  videos: [
    { src: "/media/videos/video-01.mp4", poster: "/media/posters/video-01.jpg", caption: "A moment, captured." },
    { src: "/media/videos/video-02.mp4", poster: "/media/posters/video-02.jpg", caption: "Exactly herself." },
    { src: "/media/videos/video-03.mp4", poster: "/media/posters/video-03.jpg", caption: "This energy, always." },
    { src: "/media/videos/video-04.mp4", poster: "/media/posters/video-04.jpg", caption: "A moment worth keeping." },
    { src: "/media/videos/video-05.mp4", poster: "/media/posters/video-05.jpg", caption: "That in-between moment." },
    { src: "/media/videos/video-06.mp4", poster: "/media/posters/video-06.jpg", caption: "Another favourite." },
    { src: "/media/videos/video-07.mp4", poster: "/media/posters/video-07.jpg", caption: "Perfectly unguarded." },
    { src: "/media/videos/video-08.mp4", poster: "/media/posters/video-08.jpg", caption: "One more beautiful moment." },
    { src: "/media/videos/video-09.mp4", poster: "/media/posters/video-09.jpg", caption: "The laughter that lights up my whole world." },
    { src: "/media/videos/video-10.mp4", poster: "/media/posters/video-10.jpg", caption: "Completely natural, entirely you." },
    { src: "/media/videos/video-11.mp4", poster: "/media/posters/video-11.jpg", caption: "My favourite motion pictures in the world." },
  ],

  // ── Reasons I love you ───────────────────────────────────
  reasons: [
    {
      title: "Your Smile ❤️",
      message: "When you smile, truly and freely, it feels like everything is right with the world. There is a quiet peace in that smile that I find nowhere else 🥰",
    },
    {
      title: "Your Energy ✨",
      message: "Your presence does something magical. When you are around or talking, everything feels lighter, warmer, and more alive 💕",
    },
    {
      title: "Your Voice 🎶",
      message: "After a long day, hearing your voice for even a little while brings a calm that nothing else can. It is my favourite sound in the world ❤️",
    },
    {
      title: "Your Sweet Heart 💖",
      message: "Your heart is so pure and genuine. When you care for someone, your love is deep and real. That is what makes you so special to me 🤍",
    },
    {
      title: "Even Your Drame & Stubbornness 🙈",
      message: "Yes, that cute little sulking and the small tantrums too! Because even in those, your innocence and realness shows, completely adorable and completely you 🥰",
    },
    {
      title: "Your Laughter 🌸",
      message: "When you laugh freely from the heart, that is my absolute favourite thing. Seeing you laugh makes my entire day brighter without reason 💖",
    },
    {
      title: "The Little Things 💌",
      message: "That unexpected 'did you eat?' message, understanding me without words, noticing the smallest details, these little things won my heart completely 💕",
    },
    {
      title: "You Are Going To Be Mine 💍",
      message: "Knowing that the entire rest of this life will be spent with you, through every chapter, every turn, always, that feeling is everything to me ❤️",
    },
  ],

  // ── A Letter From My Heart ────────────────────────────────
  letter: {
    greeting: "My Purnima ❤️,",
    body: `There are some people who come into your life quietly, and without warning, they change everything forever. For me, that person is you.

It all started on 6 June. I saw your photo for the very first time that day, and something about it simply stopped me. In that quiet moment, without even knowing you, my heart felt something real ❤️.

Then came 8 June, when we chatted for the very first time on Instagram. That first conversation was so warm, natural, and completely unforgettable. I remember smiling long after it ended. Talking to you felt like finding something I had been missing all along 🥰.

And on 9 June, I went to Bade Hanuman Ji. I lit a diya, folded my hands, and made a mannat for you. Even before we had truly met, my heart had already decided. That prayer was the most honest wish of my life 🙏❤️.

And then, on 9 August, I finally saw you in person. That moment confirmed everything my heart had already felt. You had this rare, effortless grace, no drama, just pure and genuine warmth. I fell for you even more 🌸💕.

Your smile is my absolute favourite thing in this world, it melts away every single worry. But even more than your beauty, it is your sweet and caring heart that won me over completely. The way you care, the honesty in your eyes, you do not even realise how special you truly are ❤️.

And then came 9 October. That unforgettable day when both our families happily said yes to our relationship! In that moment, knowing that you and I are going to share an entire lifetime together, I felt like the luckiest person in the world 🌹💍.

Having you by my side is the greatest gift of my life. You are my calm, my happiness, and my forever. I promise to always cherish you, protect your smile, and love you with all my heart through every single chapter of our lives ❤️✨.`,
    closing: "Forever and always yours,",
    signature: "The one who prayed for you at Bade Hanuman Ji 🌹❤️",
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
    name: "Purnima",
  },

  // ── Papa's Blessing (Dedicated, deeply emotional sacred scene) ─
  papaBlessing: {
    badge: "Papa's Blessing 🕊️",
    line1: "Kaha jata hai jo hume sabse zyada pyaar karte hain, wo kabhi hume chhodkar nahi jaate...",
    line2: "Aaj aapke janamdin par, ek bohot hi khaas aashirwaad aapke liye... 🕊️🤍",
    videoSrc: "/media/videos/papa-wish.mp4",
    fallbackVideoSrc: "/media/videos/papa.mp4",
    note: "Wo hamesha aapko aashirwaad de rahe hain. Aur main waada karta hoon, unki tarah hamesha aapki hifazat karunga aur aapko bepanah pyaar dunga ❤️",
    cta: "A Sky Full of Stars ✨",
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
