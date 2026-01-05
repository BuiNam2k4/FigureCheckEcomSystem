export const currentUser = {
  id: "u1",
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/150?u=u1",
  balance: 1250.00,
  isSeller: true,
};

export const products = [
  {
    id: "p1",
    name: "One Piece - Monkey D. Luffy - Gear 5 Nika",
    series: "One Piece",
    manufacturer: "Bandai Spirits",
    condition: "New (Sealed)",
    price: 180,
    images: [
      "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1000&auto=format&fit=crop",
    ],
    seller: {
      id: "s1",
      name: "AnimeTreasures",
      rating: 4.8,
    },
    aiAnalysis: {
      authenticityScore: 98,
      status: "Verified Authentic",
      confidence: "High",
      suggestedPriceRange: { min: 170, max: 200 },
      analyzedAt: "2024-03-15T10:30:00Z",
    },
  },
  {
    id: "p2",
    name: "Evangelion - Asuka Langley - Radio Eva Ver.",
    series: "Neon Genesis Evangelion",
    manufacturer: "Hobby Max",
    condition: "Like New",
    price: 240,
    images: [
      "https://images.unsplash.com/photo-1637822365922-26372d8e411c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=1000&auto=format&fit=crop",
    ],
    seller: {
      id: "s2",
      name: "CollectorJane",
      rating: 5.0,
    },
    aiAnalysis: {
      authenticityScore: 95,
      status: "Verified Authentic",
      confidence: "High",
      suggestedPriceRange: { min: 230, max: 260 },
      analyzedAt: "2024-03-14T14:20:00Z",
    },
  },
  {
    id: "p3",
    name: "Demon Slayer - Rengoku Kyojuro - Flame Hashira",
    series: "Demon Slayer: Kimetsu no Yaiba",
    manufacturer: "Aniplex",
    condition: "Used (Good)",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000&auto=format&fit=crop",
    ],
    seller: {
      id: "s3",
      name: "KyotoFigures",
      rating: 4.5,
    },
    aiAnalysis: {
      authenticityScore: 45,
      status: "Potentially Fake",
      confidence: "Medium",
      suggestedPriceRange: { min: 20, max: 40 },
      reason: "Box font mismatch, paint irregularities detected.",
      analyzedAt: "2024-03-12T09:15:00Z",
    },
  },
  {
    id: "p4",
    name: "Hatsune Miku - 15th Anniversary Ver.",
    series: "Vocaloid",
    manufacturer: "Good Smile Company",
    condition: "New (Sealed)",
    price: 320,
    images: [
      "https://images.unsplash.com/photo-1579935110464-fcd70a35e058?q=80&w=1000&auto=format&fit=crop",
    ],
    seller: {
      id: "s1",
      name: "AnimeTreasures",
      rating: 4.8,
    },
    aiAnalysis: {
      authenticityScore: 99,
      status: "Verified Authentic",
      confidence: "Very High",
      suggestedPriceRange: { min: 310, max: 350 },
      analyzedAt: "2024-03-10T11:45:00Z",
    },
  },
   {
    id: "p5",
    name: "Genshin Impact - Ganyu - Plenilune Gaze",
    series: "Genshin Impact",
    manufacturer: "Apex",
    condition: "Like New",
    price: 150,
    images: [
      "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=1000&auto=format&fit=crop",
    ],
    seller: {
      id: "s4",
      name: "GachaKing",
      rating: 4.2,
    },
    aiAnalysis: {
      authenticityScore: 88,
      status: "Likely Authentic",
      confidence: "Medium",
      suggestedPriceRange: { min: 140, max: 160 },
      analyzedAt: "2024-03-09T16:00:00Z",
    },
  },
  {
    id: "p6",
    name: "Jujutsu Kaisen - Satoru Gojo - Shibuya Incident",
    series: "Jujutsu Kaisen",
    manufacturer: "MAPPA / Shibuya Scramble",
    condition: "Damaged Box",
    price: 210,
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5f50ce2c0?q=80&w=1000&auto=format&fit=crop",
    ],
    seller: {
      id: "s2",
      name: "CollectorJane",
      rating: 5.0,
    },
    aiAnalysis: {
      authenticityScore: 92,
      status: "Verified Authentic",
      confidence: "High",
      suggestedPriceRange: { min: 200, max: 230 },
      analyzedAt: "2024-03-08T13:20:00Z",
    },
  },

];

export const userCart = [
  {
    id: "c1",
    product: products[0], // One Piece Luffy
    addedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "c2",
    product: products[1], // Evangelion Asuka
    addedAt: "2024-03-21T14:30:00Z",
  },
];
