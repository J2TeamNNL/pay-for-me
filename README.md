# PayForMe 💸 Tinder cho con nợ

![PayForMe](public/brand/og.png)

> Con nợ đăng hóa đơn, tỷ phú buồn chán vuốt phải để trả hộ.

Web troll lấy cảm hứng từ ý tưởng "app để tỷ phú vào trả nợ hộ" đang viral. Không có tiền thật, không có cổng thanh toán, không liên quan tới bất kỳ tỷ phú hay người nổi tiếng thật nào.

**Live:** https://pay.j2teamnnl.com

## Tính năng

- **Vuốt nợ:** lướt thẻ con nợ như Tinder. Vuốt phải là trả hộ, hiện "It's a Debt Match!" kèm pháo giấy.
- **Quay nợ:** mở hộp kiểu CS:GO, ra ngẫu nhiên một con nợ hoặc một hóa đơn, có 4 độ hiếm từ Thường tới Huyền thoại.
- **Đăng nợ:** tự đăng khoản nợ của mình kèm câu chuyện bi thảm.
- **Chế độ tỷ phú:** nhập vai tỷ phú phiên bản chế (Elon Mút, Jeff Bé Zô...), số dư ảo bị trừ sau mỗi lần trả.
- **Danh sách:** xem toàn bộ con nợ, tìm kiếm, lọc theo khu vực và trạng thái.
- **Bảng vàng:** xếp hạng tỷ phú hào phóng nhất và con nợ được cứu.
- Song ngữ Việt/Anh, không cần đăng nhập. Dữ liệu lưu trong `localStorage` của trình duyệt.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:5179.

## Deploy

Deploy lên Cloudflare Workers (static assets), custom domain khai báo trong `wrangler.jsonc`:

```bash
npx wrangler login
npm run deploy
```

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `src/store.tsx` | State toàn app (reducer) và lưu vào `localStorage` |
| `src/i18n.tsx` | Từ điển Việt/Anh, định dạng tiền VND |
| `src/data/seed.ts` | Dữ liệu mẫu: con nợ, tỷ phú, hóa đơn |
| `src/data/seed-en.ts` | Bản dịch tiếng Anh của dữ liệu mẫu, khớp theo `id` |
| `src/lib/gacha.ts` | Bốc thăm theo độ hiếm và dựng dải ô quay |
| `src/lib/sfx.ts` | Phát âm thanh qua Web Audio |
| `src/components/` | Thẻ vuốt, vòng quay, form, bảng vàng, chọn tỷ phú |

Kết quả quay được chọn trước theo trọng số độ hiếm. Dải ô chỉ là hiệu ứng và luôn dừng đúng vào kết quả đó.

## Stack

Vite, React 19, TypeScript, framer-motion, canvas-confetti, Cloudflare Workers. Logo, avatar và ảnh minh họa do AI vẽ.

## Ghi công

- Cơ chế quay gacha tham khảo từ [truanayangi](https://github.com/truanayangi-com/truanayangi).
- Âm thanh mở hộp lấy từ [sourcesounds/csgo](https://github.com/sourcesounds/csgo). Bản quyền âm thanh thuộc Valve và các chủ sở hữu tương ứng.
- Mọi tên nhân vật đều là tên chế, chỉ nhằm mục đích giải trí.

> Toàn bộ nội dung, nhân vật, hình ảnh và code đều do AI tạo ra. Tên nhân vật là tên chế, không nhắm tới bất kỳ ai ngoài đời thật. Tác giả từ chối mọi trách nhiệm phát sinh từ nội dung này.
