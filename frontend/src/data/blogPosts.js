// Draft blog posts — the text is genuine, ready-to-publish copy
// (not lorem ipsum) covering common traveler questions.
export const blogPosts = [
  {
    id: "best-season-to-trek-nepal",
    title: "When Is the Best Season to Trek in Nepal?",
    date: "2026-06-12",
    excerpt: "A season-by-season breakdown of trekking conditions across Nepal's major routes.",
    photo: "/images/packages/annapurna-circuit.jpg",
    body: [
      "Nepal's trekking calendar is shaped by two clear windows: spring (March to May) and autumn (September to November). Both offer stable weather, clear mountain views, and manageable temperatures at altitude.",
      "Autumn is generally considered the prime season — post-monsoon skies are at their clearest, and trails like Everest Base Camp and Annapurna Circuit see their highest foot traffic. Spring brings rhododendron blooms across mid-hill trails and slightly quieter routes.",
      "Winter (December to February) is workable for lower-altitude treks like Poon Hill or the Kathmandu Valley, but high passes such as Thorong La can close due to snow. The monsoon (June to August) is best reserved for rain-shadow regions like Upper Mustang and Dolpa, or cultural tours in the valley.",
    ],
  },
  {
    id: "everest-base-camp-first-timers-guide",
    title: "Everest Base Camp: A First-Timer's Guide",
    date: "2026-05-28",
    excerpt: "What to expect on the classic 14-day trek to the foot of the world's highest mountain.",
    photo: "/images/packages/everest-base-camp-trek.jpg",
    body: [
      "The Everest Base Camp trek doesn't require technical climbing skill, but it does demand fitness and patience with altitude. Most itineraries run 12–14 days, including two built-in acclimatisation days in Namche Bazaar and Dingboche.",
      "Trekkers fly into Lukla, then follow the Dudh Kosi valley through Sherpa villages, monasteries, and increasingly dramatic mountain views. The trek's high point isn't Base Camp itself but Kala Patthar, a nearby viewpoint with an unobstructed look at Everest's summit.",
      "Packing light but warm is key — expect temperatures well below freezing at higher elevations even in peak season. Teahouses along the route provide meals and basic lodging, so heavy camping gear isn't necessary.",
    ],
  },
  {
    id: "altitude-sickness-what-trekkers-should-know",
    title: "Altitude Sickness: What Every Trekker Should Know",
    date: "2026-05-05",
    excerpt: "Recognizing symptoms early and understanding how proper acclimatisation protects you on high routes.",
    photo: "/images/site/thorong-la-pass.jpg",
    body: [
      "Acute Mountain Sickness (AMS) can affect anyone above roughly 2,500m, regardless of fitness level. Early symptoms — headache, nausea, dizziness, and disrupted sleep — are the body's signal to stop ascending and rest.",
      "The standard prevention rule is 'climb high, sleep low': ascending gradually and not gaining more than 300–500m of sleeping altitude per day above 3,000m. Itineraries on routes like Everest Base Camp and Annapurna Circuit are built around this principle, with rest days at key elevations.",
      "If symptoms worsen — confusion, loss of coordination, or breathlessness at rest — descending immediately is the only reliable treatment. This is why licensed guides and a realistic itinerary matter more on high-altitude routes than on any other kind of trek.",
    ],
  },
];

export const getPostById = (id) => blogPosts.find((p) => p.id === id);
