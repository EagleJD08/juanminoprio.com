export interface Persona {
  ageGroupId: string;
  emoji: string;
  archetype: string;
  tagline: string;
  lifestyle: string[];
  topBrands: Brand[];
  spendingInsight: string;
}

export interface Brand {
  name: string;
  category: string;
  domain: string;
  description: string;
}

export const PERSONAS: Persona[] = [
  {
    ageGroupId: "under-25",
    emoji: "🎓",
    archetype: "The Digital Native",
    tagline: "Building a life on subscriptions, not savings",
    lifestyle: [
      "Renting with roommates or living at home",
      "Streaming everything, owning little",
      "Social life is the budget priority",
      "Student loans are the elephant in the room",
      "Side hustles supplement entry-level pay",
    ],
    topBrands: [
      { name: "Spotify", category: "Entertainment", domain: "spotify.com", description: "Music & podcast streaming platform" },
      { name: "Chipotle", category: "Food", domain: "chipotle.com", description: "Fast-casual Mexican restaurant chain" },
      { name: "Nike", category: "Apparel", domain: "nike.com", description: "Athletic footwear, apparel & equipment" },
      { name: "Uber", category: "Transportation", domain: "uber.com", description: "Ride-hailing and food delivery app" },
      { name: "Amazon", category: "Shopping", domain: "amazon.com", description: "Everything store and cloud computing giant" },
      { name: "Netflix", category: "Entertainment", domain: "netflix.com", description: "Streaming entertainment with original content" },
      { name: "Venmo", category: "Finance", domain: "venmo.com", description: "Peer-to-peer mobile payments" },
      { name: "Zara", category: "Apparel", domain: "zara.com", description: "Fast fashion retailer from Spain" },
    ],
    spendingInsight: "Lowest total spending but highest share on housing relative to income. Education costs are significant even if suppressed in BLS data.",
  },
  {
    ageGroupId: "25-34",
    emoji: "🚀",
    archetype: "The Launcher",
    tagline: "First real salary, first real expenses",
    lifestyle: [
      "First apartment without roommates",
      "Building credit, maybe buying a first car",
      "Wedding costs hitting the friend group",
      "Gym memberships and wellness spending spike",
      "Starting to think about homeownership",
    ],
    topBrands: [
      { name: "Trader Joe's", category: "Food", domain: "traderjoes.com", description: "Affordable specialty grocery chain" },
      { name: "Apple", category: "Tech", domain: "apple.com", description: "Premium tech hardware and services ecosystem" },
      { name: "Lululemon", category: "Apparel", domain: "lululemon.com", description: "Premium athletic and leisure wear" },
      { name: "DoorDash", category: "Food", domain: "doordash.com", description: "Restaurant delivery and convenience platform" },
      { name: "IKEA", category: "Housing", domain: "ikea.com", description: "Affordable Scandinavian furniture and home goods" },
      { name: "Southwest", category: "Transportation", domain: "southwest.com", description: "Budget-friendly domestic airline, no baggage fees" },
      { name: "Peloton", category: "Health", domain: "onepeloton.com", description: "Connected fitness bikes and digital workouts" },
      { name: "Target", category: "Shopping", domain: "target.com", description: "Mass-market retail with a design-forward edge" },
    ],
    spendingInsight: "Insurance & pension contributions jump to $10,281 — double the under-25 group. This is peak 'adulting' spending.",
  },
  {
    ageGroupId: "35-44",
    emoji: "🏠",
    archetype: "The Builder",
    tagline: "Peak earning years meet peak spending years",
    lifestyle: [
      "Mortgages, minivans, and school districts",
      "Kids drive food, healthcare, and apparel costs up",
      "Career peak means bigger paychecks — and bigger lifestyle",
      "Home improvement is a weekend hobby",
      "Family vacations replace solo travel",
    ],
    topBrands: [
      { name: "Costco", category: "Food", domain: "costco.com", description: "Wholesale club for bulk buying and deals" },
      { name: "Toyota", category: "Transportation", domain: "toyota.com", description: "Reliable, fuel-efficient vehicles for families" },
      { name: "Home Depot", category: "Housing", domain: "homedepot.com", description: "Home improvement supplies and contractor tools" },
      { name: "Disney+", category: "Entertainment", domain: "disney.com", description: "Family streaming: Marvel, Star Wars, Pixar, Disney" },
      { name: "Pottery Barn", category: "Housing", domain: "potterybarn.com", description: "Mid-to-high-end home furnishings and decor" },
      { name: "Whole Foods", category: "Food", domain: "wholefoodsmarket.com", description: "Premium organic and natural grocery chain" },
      { name: "REI", category: "Entertainment", domain: "rei.com", description: "Outdoor gear co-op for camping, hiking, cycling" },
      { name: "State Farm", category: "Insurance", domain: "statefarm.com", description: "America's largest auto and home insurer" },
    ],
    spendingInsight: "Highest apparel spending at $2,959 — kids outgrow clothes fast. Entertainment hits $4,694 as family activities add up.",
  },
  {
    ageGroupId: "45-54",
    emoji: "📈",
    archetype: "The Peak Earner",
    tagline: "The highest spending decade of a lifetime",
    lifestyle: [
      "College tuition bills arrive (education spikes to $3,193)",
      "Trading up — nicer cars, nicer restaurants",
      "Healthcare costs start creeping up",
      "Helping aging parents while supporting kids",
      "Peak earning power, peak financial complexity",
    ],
    topBrands: [
      { name: "BMW", category: "Transportation", domain: "bmw.com", description: "German luxury performance automobiles" },
      { name: "Nordstrom", category: "Apparel", domain: "nordstrom.com", description: "Upscale department store with curated fashion" },
      { name: "Fidelity", category: "Finance", domain: "fidelity.com", description: "Investment management and retirement planning" },
      { name: "Williams-Sonoma", category: "Housing", domain: "williams-sonoma.com", description: "High-end cookware and kitchen essentials" },
      { name: "Delta", category: "Transportation", domain: "delta.com", description: "Major airline known for premium service" },
      { name: "Starbucks", category: "Food", domain: "starbucks.com", description: "Global coffee chain and third-place hangout" },
      { name: "UnitedHealth", category: "Healthcare", domain: "uhc.com", description: "Largest U.S. health insurance provider" },
      { name: "HBO", category: "Entertainment", domain: "hbo.com", description: "Premium TV and film streaming" },
    ],
    spendingInsight: "At $97,319, this is the highest-spending age group. Transportation alone is $17,311 — often maintaining multiple vehicles.",
  },
  {
    ageGroupId: "55-64",
    emoji: "🎯",
    archetype: "The Optimizer",
    tagline: "Spending smarter, not necessarily less",
    lifestyle: [
      "Empty nest — house feels bigger, grocery bills shrink",
      "Pre-retirement financial planning intensifies",
      "Travel spending shifts from family trips to couples trips",
      "Healthcare becomes a line item you actually track",
      "Tobacco spending peaks here at $523/year",
    ],
    topBrands: [
      { name: "Charles Schwab", category: "Finance", domain: "schwab.com", description: "Full-service brokerage and retirement planning" },
      { name: "Marriott", category: "Travel", domain: "marriott.com", description: "Global hotel chain from budget to luxury tiers" },
      { name: "Subaru", category: "Transportation", domain: "subaru.com", description: "Rugged, all-wheel-drive vehicles for outdoors lovers" },
      { name: "L.L.Bean", category: "Apparel", domain: "llbean.com", description: "Classic New England outdoor apparel and gear" },
      { name: "Kroger", category: "Food", domain: "kroger.com", description: "America's largest traditional grocery chain" },
      { name: "AARP", category: "Services", domain: "aarp.org", description: "Advocacy and discounts for 50+ Americans" },
      { name: "Mayo Clinic", category: "Healthcare", domain: "mayoclinic.org", description: "World-renowned nonprofit medical center" },
      { name: "NPR", category: "Entertainment", domain: "npr.org", description: "Nonprofit public radio news and storytelling" },
    ],
    spendingInsight: "Spending drops 14% from the 45-54 peak, but healthcare jumps to $7,164. The financial pivot from accumulation to preservation begins.",
  },
  {
    ageGroupId: "65-74",
    emoji: "🌅",
    archetype: "The New Retiree",
    tagline: "Freedom from the paycheck, not from spending",
    lifestyle: [
      "Social Security and pension income replace salaries",
      "Medicare kicks in but doesn't cover everything",
      "Downsizing the house, upsizing the travel",
      "Charitable giving increases meaningfully",
      "Insurance/pension contributions drop 70% — no more 401(k)",
    ],
    topBrands: [
      { name: "AARP", category: "Healthcare", domain: "aarp.org", description: "Advocacy and discounts for 50+ Americans" },
      { name: "Viking Cruises", category: "Travel", domain: "vikingcruises.com", description: "River and ocean cruises for cultural travelers" },
      { name: "Walgreens", category: "Healthcare", domain: "walgreens.com", description: "Pharmacy and everyday health essentials" },
      { name: "Honda", category: "Transportation", domain: "honda.com", description: "Dependable, affordable cars and motorcycles" },
      { name: "Amazon", category: "Shopping", domain: "amazon.com", description: "Everything store and cloud computing giant" },
      { name: "Hallmark", category: "Gifts", domain: "hallmark.com", description: "Greeting cards, gifts, and sentimental media" },
      { name: "New Balance", category: "Apparel", domain: "newbalance.com", description: "Performance and lifestyle footwear, made in USA" },
      { name: "Ace Hardware", category: "Housing", domain: "acehardware.com", description: "Neighborhood hardware stores for DIY projects" },
    ],
    spendingInsight: "Personal insurance & pensions plummet to $4,286 (from $11,131). Cash contributions rise to $2,756 — generosity grows with age.",
  },
  {
    ageGroupId: "75-plus",
    emoji: "📚",
    archetype: "The Essentialist",
    tagline: "Spending concentrates on what truly matters",
    lifestyle: [
      "Healthcare is now the #2 expense after housing",
      "Transportation spending drops 50% — driving less",
      "Reading materials at 2x the national average",
      "Cash contributions hit their lifetime peak",
      "Fixed income means every dollar is intentional",
    ],
    topBrands: [
      { name: "Walgreens", category: "Healthcare", domain: "walgreens.com", description: "Pharmacy and everyday health essentials" },
      { name: "CVS", category: "Healthcare", domain: "cvs.com", description: "Pharmacy chain with in-store health clinics" },
      { name: "QVC", category: "Shopping", domain: "qvc.com", description: "Television and online home shopping network" },
      { name: "Cadillac", category: "Transportation", domain: "cadillac.com", description: "American luxury vehicles with a classic heritage" },
      { name: "Cracker Barrel", category: "Food", domain: "crackerbarrel.com", description: "Southern comfort food and country retail stores" },
      { name: "Salvation Army", category: "Donations", domain: "salvationarmyusa.org", description: "Faith-based charity for disaster and poverty relief" },
      { name: "Reader's Digest", category: "Reading", domain: "rd.com", description: "Iconic magazine of stories, tips, and humor" },
      { name: "Hallmark", category: "Gifts", domain: "hallmark.com", description: "Greeting cards, gifts, and sentimental media" },
    ],
    spendingInsight: "At $53,031 total, spending is 31% below average. But cash contributions peak at $3,653 — the most generous age group by far.",
  },
];

export function getPersonaByAgeGroup(ageGroupId: string): Persona | undefined {
  return PERSONAS.find((p) => p.ageGroupId === ageGroupId);
}
