import type { Billionaire, Debt } from '../types'

export const SEED_BILLIONAIRES: Billionaire[] = [
  { id: 'elon', name: 'Elon Mút', avatar: '🚀', netWorth: 420_000_000_000, quirk: 'Trả nợ bằng Dogecoin tinh thần' },
  { id: 'jeff', name: 'Jeff Bé Zô', avatar: '📦', netWorth: 230_000_000_000, quirk: 'Giao tiền trong 2h, có phí ship' },
  { id: 'mark', name: 'Mark Dục Bơ', avatar: '🦎', netWorth: 210_000_000_000, quirk: 'Chỉ trả nợ nếu bạn đồng ý cookie' },
  { id: 'bill', name: 'Bill Gết', avatar: '🪟', netWorth: 110_000_000_000, quirk: 'Cần khởi động lại khoản nợ trước' },
]

const now = Date.now()

export const SEED_DEBTS: Debt[] = [
  { id: 'd1', debtor: 'Tuấn Ví Lép', age: 27, avatar: '😵‍💫', category: 'electric', amount: 3_450_000, story: 'Bật điều hòa 16 độ cả tháng để quên đi người yêu cũ. Giờ quên được rồi nhưng EVN thì không quên tôi.', createdAt: now - 86_400_000 },
  { id: 'd2', debtor: 'Lan Trà Sữa', age: 22, avatar: '🧋', category: 'milktea', amount: 8_900_000, story: 'Nợ 3 quán trà sữa full topping. Chủ quán đã biết mặt và in poster dán cửa.', createdAt: now - 72_000_000 },
  { id: 'd3', debtor: 'Hùng Cày Rank', age: 31, avatar: '🎮', category: 'credit', amount: 45_000_000, story: 'Quẹt thẻ tín dụng mua skin game. Skin đẹp nhưng vợ không thấy đẹp.', createdAt: now - 50_000_000 },
  { id: 'd4', debtor: 'Mai Trọ Rẻ', age: 25, avatar: '🏚️', category: 'rent', amount: 6_000_000, story: 'Chủ trọ đã đổi wifi thành "TRA_TIEN_DI_EM". Mật khẩu cũng vậy.', createdAt: now - 40_000_000 },
  { id: 'd5', debtor: 'Bác Ba Đau Lưng', age: 58, avatar: '🩻', category: 'medical', amount: 12_500_000, story: 'Đi khám vì đau lưng, bác sĩ bảo đau lưng là do... lo trả tiền khám.', createdAt: now - 30_000_000 },
  { id: 'd6', debtor: 'Khoa Startup', age: 29, avatar: '💡', category: 'other', amount: 999_000_000, story: 'Gọi vốn làm "Uber cho mèo". Mèo không chịu lên xe. Nhà đầu tư cũng vậy.', createdAt: now - 20_000_000 },
  { id: 'd7', debtor: 'Linh Săn Sale', age: 24, avatar: '🛒', category: 'credit', amount: 17_800_000, story: 'Ngày 11/11 mua 47 món vì "tiết kiệm được 60%". Tính ra tiết kiệm âm.', createdAt: now - 10_000_000 },
  { id: 'd8', debtor: 'Phong Nhà Bên', age: 35, avatar: '🔌', category: 'electric', amount: 2_100_000, story: 'Nuôi 3 con trâu cày coin trong phòng ngủ. Coin sập, chỉ còn hóa đơn điện đứng vững.', createdAt: now - 5_000_000 },
]

export const SEED_BILLS: import('../types').Bill[] = []
