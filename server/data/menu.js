// Menu data for Yakimachi (concept demo).
// Prices are in pence (880 = £8.80). price: null means "price not provided yet".
// Tags are only added where the menu states it clearly - verify with the restaurant before going live.

const categories = [
  { slug: 'starters', name: 'Starters', name_zh: '前菜' },
  { slug: 'maki', name: 'Maki', name_zh: '寿司卷' },
  { slug: 'temaki', name: 'Temaki', name_zh: '手卷' },
  { slug: 'nigiri', name: 'Nigiri (2pcs)', name_zh: '手握' },
  { slug: 'mains', name: 'Mains', name_zh: '主食' },
  { slug: 'others', name: 'Fried & Other Dishes', name_zh: '其他' },
  { slug: 'skewers', name: 'Grilled Meat Skewers', name_zh: '烤串' },
  { slug: 'dimsum', name: 'Dim Sum', name_zh: '点心' },
  { slug: 'soft-drinks', name: 'Soft Drinks', name_zh: '饮料' },
  { slug: 'beers', name: 'Beers', name_zh: '啤酒' },
  { slug: 'wines', name: 'Wines', name_zh: '葡萄酒' },
  { slug: 'plum-wine', name: 'Plum Wine', name_zh: '梅酒' },
  { slug: 'sake', name: 'Sake', name_zh: '清酒' },
  { slug: 'whiskey', name: 'Whiskey', name_zh: '威士忌' },
  { slug: 'soju', name: 'Soju', name_zh: '烧酒' },
];

// [category, name, name_zh, price_pence, description, tags]
const rows = [
  // Starters
  ['starters', 'Japanese Beef Roll', '日式牛肉卷', 880, 'Crispy onion, enoki mushrooms, spring onions and yakiniku sauce wrapped in seared sliced sirloin steak, served alongside salad with a sesame dressing.', ''],
  ['starters', 'Salmon King Prawn Roll', '三文鱼炸虾卷', 980, 'Fried king prawn wrapped in salmon, topped with avocado, unagi sauce and mayonnaise.', ''],
  ['starters', 'Japanese Stir-Fried Salmon', '日式炒三文鱼', 1190, 'Stir-fried salmon with garlic, spring onion, bell peppers, onion and teriyaki sauce.', ''],
  ['starters', 'Chicken & Vegetable Gyoza', '鸡肉煎饺', 560, 'Pan seared gyoza with a chicken and cabbage filling (6pcs).', ''],
  ['starters', 'Prawn Gyoza', '虾仁煎饺', 780, 'Pan seared gyoza with a prawn and chinese chive filling (6pcs).', ''],
  ['starters', 'Vegetable Gyoza', '蔬菜煎饺', 480, 'Pan seared gyoza with vegetable filling (6pcs).', 'vegetarian'],
  ['starters', 'Spring Rolls (Vegetarian)', '春卷(素)', 420, 'Deep fried vegetarian spring rolls (10pcs).', 'vegetarian'],
  ['starters', 'Deep Fried Milk', '炸牛奶', 680, 'Deep fried milk pudding in panko bread crumbs, served alongside condensed milk (6pcs).', 'vegetarian'],
  ['starters', 'Tamagoyaki', '玉子烧', 580, 'Japanese rolled layered omelette (3pcs).', 'vegetarian'],
  ['starters', 'Mixed Salad', '什锦沙拉菜', 480, 'Salad with cherry tomatoes, seaweed and shredded mango or papaya, topped with a sesame dressing.', 'vegetarian'],
  ['starters', 'Seaweed Salad', '海藻沙拉', 480, 'Mixed seaweed served in a sweet and tangy dressing with sesame seeds.', 'vegetarian'],
  ['starters', 'Kimchi', '辣白菜', 480, 'A traditional Korean side dish, made of Chinese cabbage fermented with gochujang (Korean spicy chili paste).', 'spicy'],
  ['starters', 'Miso Soup', '味噌汤', 200, 'A traditional Japanese side dish, made from a fermented soybean paste, served with silken tofu, seaweed and spring onions.', ''],
  ['starters', 'Edamame', '枝豆', 400, 'Boiled salted green soybeans.', 'vegetarian'],

  // Maki
  ['maki', 'Salmon Roll', '三文鱼卷', 480, '', ''],
  ['maki', 'Tuna Roll', '金枪鱼卷', 480, '', ''],
  ['maki', 'Avocado Roll', '牛油果卷', 400, '', 'vegetarian'],
  ['maki', 'Purple Dragon', '紫龙', 1280, 'Fried king prawn, crabsticks, cucumber, topped with red dragon fruit, crispy purple sweet potato, mayonnaise, a thousand island dressing, unagi sauce and tobiko.', ''],
  ['maki', 'Green Dragon', '青龙', 1180, 'Fried king prawn, crabsticks, cucumber, topped with avocado, a thousand island dressing, mayonnaise, unagi sauce and tobiko.', ''],
  ['maki', 'Golden Dragon', '金龙', 1280, 'Fried king prawn, crabsticks, cucumber, topped with mango, crispy sweet potato, mayonnaise, a thousand island dressing and unagi sauce.', ''],

  // Temaki
  ['temaki', 'Unagi And Avocado', '鰻魚', 480, 'Topped with unagi sauce.', ''],
  ['temaki', 'Mango And Fried Prawn', '芒果炸蝦', 550, 'Topped with tobiko and a thousand island dressing.', ''],
  ['temaki', 'Salmon And Avocado', '三文鱼牛油果', 460, 'Topped with tobiko and mayonnaise.', ''],
  ['temaki', 'Lucky Pouch', '福袋', 980, 'Seasoned tofu pockets with rice inside, topped with salmon, tuna, seaweed, sesame and mango, each individually (4pcs).', ''],

  // Nigiri
  ['nigiri', 'Salmon', '三文鱼', 400, '', ''],
  ['nigiri', 'Unagi', '鰻魚', 460, '', ''],
  ['nigiri', 'Tuna', '金枪鱼', 420, '', ''],
  ['nigiri', 'King Prawn', '寿司虾', 400, '', ''],
  ['nigiri', 'Amaebi', '甜虾', 400, '', ''],
  ['nigiri', 'Hokkigai', '北极贝', 400, '', ''],
  ['nigiri', 'Flamed Salmon', '炙烤三文鱼', 420, 'Served with mayonnaise and sugar.', ''],
  ['nigiri', 'Avocado Nigiri', '牛油果手握', 380, '', 'vegetarian'],
  ['nigiri', 'Tamagoyaki Nigiri', '玉子焼手握', 380, '', 'vegetarian'],

  // Mains
  ['mains', 'Unagi Fried Rice', '鰻魚炒饭', 1080, 'Egg fried rice with carrot, garlic shoot, onions and your choice of meats or seafood.', ''],
  ['mains', 'Prawn Fried Rice', '大虾炒饭', 1080, 'Egg fried rice with carrot, garlic shoot, onions and your choice of meats or seafood.', ''],
  ['mains', 'Beef Fried Rice', '牛肉炒饭', 1080, 'Egg fried rice with carrot, garlic shoot, onions and your choice of meats or seafood.', ''],
  ['mains', 'Chicken Fried Rice', '鸡肉炒饭', 1080, 'Egg fried rice with carrot, garlic shoot, onions and your choice of meats or seafood.', ''],
  ['mains', 'Kimchi Fried Rice', '辣白菜炒饭', 980, '', 'spicy'],
  ['mains', 'Mixed Fried Rice', '什锦炒饭', 880, 'Egg fried rice with carrots, onions and garlic shoots.', 'vegetarian'],
  ['mains', 'Steamed White Rice', '白米饭', 300, '', 'vegetarian'],
  ['mains', 'Japanese Beef Rice Bowl', '牛肉盖饭', 1080, 'Rice bowl with beef, butter, onions and yakiniku sauce, topped with spring onion and sesame seeds.', ''],
  ['mains', 'Bibimbap (Unagi)', '鰻魚', 1380, 'Steamed rice cooked over a stone pot, with sauteed vegetables, sunny-side up egg and your topping of choice.', ''],
  ['mains', 'Bibimbap (Chicken)', '鸡肉', 1180, 'Steamed rice cooked over a stone pot, with sauteed vegetables, sunny-side up egg and your topping of choice.', ''],
  ['mains', 'Bibimbap (Beef)', '牛肉', 1180, 'Steamed rice cooked over a stone pot, with sauteed vegetables, sunny-side up egg and your topping of choice.', ''],
  ['mains', 'Udon Seafood & Vegetable Pot', '乌冬海鲜蔬菜锅', 1580, 'Udon noodles cooked alongside king prawns, mussels, tofu and Chinese cabbage.', ''],

  // Fried & other dishes
  ['others', 'Omurice With Chicken Katsu Curry', '咖喱炸鸡排蛋包饭', 1280, 'Chicken katsu curry with potatoes, carrots, onion, coconut milk and peas served with rice, topped with a Japanese omelette.', ''],
  ['others', 'Omurice With Tonkatsu Curry', '咖喱炸猪排蛋包饭', 1280, 'Tonkatsu curry with potatoes, carrots, onions, coconut milk, peas served with rice, topped with a Japanese omelette.', ''],
  ['others', 'Tonkatsu Rice', '炸猪排饭', 980, 'Tonkatsu served alongside rice, lettuce, tonkatsu sauce and sesame seeds.', ''],
  ['others', 'Tori Kara', '日式炸鸡', 580, 'Japanese style fried chicken (6pcs).', ''],
  ['others', 'Ebi Furai', '炸虾', 680, 'Deep fried king prawns coated in panko bread crumbs, served with sweet chili sauce (3pcs).', ''],
  ['others', 'Squid Rings', '炸鱿鱼圈', 680, 'Deep fried squid rings, served with sweet chili sauce (6pcs).', ''],
  ['others', 'Ebi Tempura', '大虾天妇罗', 680, 'Deep fried king prawns in tempura batter, served with tempura sauce (3pcs).', ''],
  ['others', 'Yasai Tempura', '蔬菜天妇罗', 580, 'Mixed vegetables deep fried in tempura batter, served with tempura sauce.', 'vegetarian'],
  ['others', 'Salt & Pepper King Prawns', '椒盐虾', 980, 'Deep fried king prawns with salt and pepper, served alongside salad with a sesame dressing (6pcs).', ''],
  ['others', 'Salt & Pepper Chicken Katsu', '椒盐鸡排', 780, 'Deep fried chicken fillet in panko bread crumbs with salt and pepper, served alongside salad with a sesame dressing.', ''],
  ['others', 'Salt & Pepper Squid Tentacles', '椒盐鱿鱼爪', 780, 'Deep fried squid tentacles with salt and pepper, served alongside salad with a sesame dressing.', ''],
  ['others', 'Kabocha Korokke', '日式炸南瓜饼', 500, 'Deep fried Japanese pumpkin croquette, drizzled with takoyaki sauce (2pcs).', 'vegetarian'],
  ['others', 'Honey Mustard King Prawns', '蜂蜜芥末虾球', 990, 'Fried king prawns coated in honey mustard sauce, served alongside salad with a sesame dressing (6pcs).', ''],
  ['others', 'Honey Mustard Chicken Katsu', '蜂蜜芥末鸡排', 890, 'Deep fried chicken fillet in panko bread crumbs, drizzled with honey mustard sauce and served alongside salad with a sesame dressing.', ''],

  // Skewers
  ['skewers', 'Chicken Skewers (2pcs)', '鸡肉串', 780, '', ''],

  // Dim sum (no price given)
  ['dimsum', 'Dim Sum Platter', '点心拼盘', null, '4pcs Har Gow (king prawn dumpling), 8pcs vegetarian spring rolls, 4pcs chicken or vegetable gyoza, 2pcs ebi furai.', ''],

  // Soft drinks
  ['soft-drinks', 'Mango Juice', '芒果汁', 280, '', ''],
  ['soft-drinks', 'Apple Juice', '苹果汁', 280, '', ''],
  ['soft-drinks', 'Orange Juice', '橙汁', 280, '', ''],
  ['soft-drinks', 'Ramune Soda', '弹珠汽水', 350, '', ''],
  ['soft-drinks', '7up', '七喜', 180, '', ''],
  ['soft-drinks', 'Coke', '可乐', 180, '', ''],
  ['soft-drinks', 'Diet Coke', '健怡可乐', 180, '', ''],
  ['soft-drinks', 'Coke Zero', '零糖可乐', 180, '', ''],
  ['soft-drinks', 'Fanta', '芬达', 180, '', ''],
  ['soft-drinks', 'Lemon Iced Tea', '冰红茶', 300, '', ''],
  ['soft-drinks', 'Plum Juice', '酸梅汁', 300, '', ''],
  ['soft-drinks', 'Aloe Vera Drink', '芦荟汁', 320, '', ''],
  ['soft-drinks', 'Jasmine Grapefruit Tea', '', 280, '', ''],
  ['soft-drinks', 'Japanese Tea', '日本茶', null, '', ''],
  ['soft-drinks', 'Still Water', '矿泉水', 150, '', ''],

  // Beers
  ['beers', 'Kirin', '麒麟', 400, '', ''],
  ['beers', 'Asahi', '辛口', 400, '', ''],
  ['beers', 'Tsing Tao', '青岛', 400, '', ''],

  // Wines (no price given)
  ['wines', 'Red Wine', '红葡萄酒', null, '', ''],
  ['wines', 'White Wine', '白葡萄酒', null, '', ''],
  ['wines', 'Rosé Wine', '玫瑰酒', null, '', ''],

  // Plum wine
  ['plum-wine', 'Takachiho Matured Plum Liqueur', '熟成高千穗梅酒', 1800, '', ''],
  ['plum-wine', 'Kikkoman Plum Wine', '', 2588, '', ''],
  ['plum-wine', 'Ozeki Kanjuku Umeshu', '', 2988, '', ''],
  ['plum-wine', 'Takara Plum Wine', '', 2488, '', ''],

  // Sake
  ['sake', 'Premium Sake (Dassai)', '獺祭', 1980, '', ''],
  ['sake', 'Ozeki Karatanba Honjozo', '辛丹波', 1680, '', ''],

  // Whiskey
  ['whiskey', 'Asakura Distilled Spirits', '朝倉', 680, '', ''],

  // Soju
  ['soju', 'Soju Original', '原味', 680, '', ''],
  ['soju', 'Soju Blueberry', '蓝莓', 680, '', ''],
  ['soju', 'Soju Grape', '葡萄', 680, '', ''],
  ['soju', 'Soju Apple & Mango', '苹果芒果', 680, '', ''],
  ['soju', 'Soju Peach', '桃子', 680, '', ''],
  ['soju', 'Soju Yogurt', '酸奶', 680, '', ''],
];

const items = rows.map(([category, name, name_zh, price_pence, description, tags]) => ({
  category,
  name,
  name_zh,
  price_pence,
  description,
  tags,
}));

module.exports = { categories, items };
