import type { Bill, Billionaire, Debt } from '../types'

type DebtEn = Partial<Pick<Debt, 'debtor' | 'story' | 'bio'>>
type BillionaireEn = Partial<Pick<Billionaire, 'name' | 'quirk' | 'bio'>>
type BillEn = Partial<Pick<Bill, 'title' | 'issuer' | 'joke'>>

export const DEBTS_EN: Record<string, DebtEn> = {
  'son-tung-m-tien': { story: 'Rents a wind machine so his hair flows even inside elevators. The electric bill flew away too.', bio: 'A fictional singer who rehearses entrances with a desk fan. Every encore adds another kilowatt-hour.' },
  'toc-truong-mi-xi': { debtor: 'Chief Mee Xee', story: 'Bought a gaming chair with an applause mode. It cheers every time the card gets swiped.', bio: 'A fictional streamer who livestreams loading screens. The chair is more famous than him because it always hypes.' },
  'hari-vay': { story: 'Ordered a bubble-tea pool for rubber ducks. The ducks only use tapioca pearls as floats.', bio: 'A fictional artist building a theme park for toy ducks. Now hiring lifeguards who can brew tea.' },
  'hieu-thu-hai': { story: 'Hired a delivery crew to carry one comma into a rap verse. The comma demanded business class.', bio: 'A fictional rapper who always rhymes with invoices. He believes punctuation deserves paid leave too.' },
  'den-vay': { story: 'Rented a stage for a potted plant to perform. It just stands there but wants a leaf-changing room.', bio: 'A fictional songwriter whose audience is houseplants. A full tour only needs sunlight and a watering can.' },
  'my-tam-ung': { story: 'Ordered outfits for a flock of paper pigeons. Measuring the wings cost more than the tailoring.', bio: 'A fictional singer hosting origami concerts. Every fan gets a DIY pair of wings.' },
  'lan-ngan-hang': { debtor: 'Lan the Bank', story: 'Bought a self-rolling red carpet to fetch snacks. It rolls straight to the cashier.', bio: 'A fictional actress who turns hallways into award ceremonies. Her trophy goes to the cake that arrives on time.' },
  'jen-no-ni': { story: 'Ordered a designer bag for every single sock. Odd socks demand single rooms.', bio: 'A fictional star running runway shows for tiny accessories. The front row is all invited hangers.' },
  'jung-cuc-keo': { story: 'Built a dance studio for gummy candies. They take breaks because they melt.', bio: 'A fictional singer managing a candy boy band. He only performs where there is AC and tissues.' },
  'jay-chau-chiu': { story: 'Ordered a tapioca tower as tall as a piano. The toppings collapsed before the first chord.', bio: 'A fictional musician playing in a tea house in the clouds. He conducts with a boba straw.' },
  'taylor-swipe': { story: 'Rents a truck to haul bracelets for a toy octopus. Eight new sets every tour.', bio: 'A fictional singer touring a yarn universe. Her new album is about a wallet asking for summer break.' },
  'cristiano-nonaldo': { story: 'Rents a pitch for a team of flip-flops to practice shooting. The left one insists on being captain.', bio: 'A fictional footballer coaching beach accessories. He celebrates every time a pair of flip-flops reunites.' },
  'leo-muon-si': { story: 'Bought a trophy cabinet for the napkin-folding championship. A tissue just scored a hat-trick.', bio: 'A fictional athlete in the sport of table setting. He holds the record for folding napkins with the fan on.' },
  'ariana-gran-no': { story: 'Installed an elevator so high notes can reach the rooftop. The note forgot its resident card.', bio: 'A fictional singer managing a building made of sound. The penthouse is reserved for the doorbell.' },
  'bruno-muon': { story: 'Rents a disco ball for a cotton hamster party. Guests are asking for a wind machine.', bio: 'A fictional musician throwing balls inside shoeboxes. VIP tickets include a paper sunflower seed.' },
  'keanu-tra-gop': { story: 'Rents a garage for a teddy-bear unicycle squad. Every bear wants covered parking.', bio: 'A fictional actor starring in slow-motion toy action films. Chase scenes pause to pump the tires.' },
  'adele-a-no': { story: 'Bought a separate phone just to call her wallet. The wallet is always on airplane mode.', bio: 'A fictional singer performing voicemails for objects. Her last show sold out to a set of teapots.' },
  'gordon-ram-no': { story: 'Ordered a chef hat for every potato. They want spare uniforms for when they get mashed.', bio: 'A fictional chef who rates dishes in duck quacks. His restaurant only serves imaginary feasts for vegetables.' },
}

export const BILLIONAIRES_EN: Record<string, BillionaireEn> = {
  elon: { quirk: 'Launches paper rockets to dodge rush hour.', bio: 'A fictional billionaire running a parking lot for paper ships. He measures wealth by how often his wallet glows.' },
  jeff: { quirk: 'The money arrives faster than the box it came in.', bio: 'A fictional mogul delivering body pillows to the moon by kite. Every order ships inside a smaller box.' },
  mark: { quirk: 'Accept the cookies before you get the cake.', bio: 'A fictional founder of a social network for avocados. He only posts photos of pensive seeds.' },
  bill: { quirk: 'Restarts his wallet to refresh the balance.', bio: 'A fictional entrepreneur selling windows that look out on rainbows. Every new version adds a paper bird.' },
  'jack-ma-dao': { quirk: 'Auctions wooden horses, neigh sound included.', bio: 'A fictional billionaire running a toy market in the clouds. He rides a rocking horse to every meeting.' },
  'pony-mai-tra': { quirk: 'Transfers money by imaginary pony hooves.', bio: 'A fictional mogul building a messaging app for plushies. Messages are delivered by soap bubbles.' },
  'mukesh-am-banh': { quirk: 'Every paid debt comes with a free cookie.', bio: 'A fictional tycoon building a city out of biscuit tins. The elevators run on crunching sounds.' },
  'dai-gia-xe-dien': { name: 'EV Tycoon', quirk: 'His wallet has a toy helipad.', bio: 'A fictional billionaire building condos for piggy banks. Residents pay fees in ceramic smiles.' },
  'ba-trum-hang-khong': { name: 'Airline Queenpin', quirk: 'Flies over your debt and drops paper-money parachutes.', bio: 'A fictional businesswoman running an airline for paper letters. Business class comes with cloud pillows.' },
  'vua-thep-lap-lanh': { name: 'Sparkly Steel King', quirk: 'Forges black cards out of imaginary glitter.', bio: 'A fictional mogul making rainbow stirring spoons. He sponsors the piggy-bank polishing championship.' },
}

export const BILLS_EN: Record<string, BillEn> = {
  'dien-quat-toc': { title: 'Hair-flow electric bill', issuer: 'Broke Power Co.', joke: 'Fluffy hair, fluffy meter reading.' },
  'tra-sua-vit': { title: 'Bubble tea for ducks', issuer: 'Forever Owing Boba', joke: 'Rubber ducks drink with their imagination.' },
  'tro-heo-dat': { title: 'Piggy-bank rent', issuer: 'Flying Pig Inn', joke: 'The piggy bank wants to pay the deposit in jingles.' },
  'tat-di-du-lich': { title: 'Bus ticket for socks', issuer: 'Lost Sock Coaches', joke: 'Round trip, but only one comes back.' },
  'wifi-may-bong': { title: 'Wi-Fi for cotton clouds', issuer: 'Comfy Cobweb Net', joke: 'High speed, even higher fluff.' },
  'giat-ao-khoai': { title: 'Potato laundry', issuer: 'Flying Potato Laundromat', joke: 'No ironing for mashed potatoes.' },
  'ghe-vo-tay': { title: 'Self-cheering chair', issuer: 'Applause Furniture', joke: 'Finish the installments and the chair gives a standing ovation.' },
  'net-no': { title: 'Movies for a body pillow', issuer: 'Netflix and Owe', joke: 'The pillow slept through it, still billed in full.' },
  'kham-robot': { title: 'Toy robot check-up', issuer: 'Thin Wallet General Hospital', joke: 'The patient is a robot; the prescription is toy batteries.' },
  'phong-thay-la': { title: 'Leaf-changing room', issuer: 'Sprout Stage', joke: 'Plants want privacy when the seasons change.' },
  'hat-nhac-di-thang': { title: 'Musical-note elevator', issuer: 'Do-Re-Owe Lifts', joke: 'Even the highest note has to press the button.' },
  'may-bong-khong-lo': { title: 'Prop cloud rental', issuer: 'Puffy Cloud Studio', joke: 'Clouds get charged for oversized luggage.' },
  'disco-hop-giay': { title: 'Shoebox disco', issuer: 'Sparkly Slipper Disco', joke: 'Cotton hamsters demand encores until dawn.' },
  'xe-cho-dau-phay': { title: 'Comma shipping', issuer: 'Punctuation Express', joke: 'Periods ship free, commas fly business.' },
  'thue-mat-trang': { title: 'Origami Moon lease', issuer: 'Paper Moon Realty', joke: 'Deposit one galaxy, refunded in paper stars.' },
  'dien-cau-vong': { title: 'Rainbow lighting', issuer: 'Fluffy Cosmos Power', joke: 'Seven colors, seven meters, one wallet running away.' },
}
