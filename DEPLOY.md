# Cách đưa Nova AI lên iPhone

1. Deploy thư mục frontend (`index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, `icon.svg`) lên một hosting HTTPS.
2. Deploy backend Node trong thư mục này lên server.
3. Đặt `OPENAI_API_KEY` ở biến môi trường của backend.
4. Mở Nova AI → ⚙️ → nhập `https://TEN-MIEN-CUA-BAN/chat`.
5. Nhấn Lưu và gửi tin nhắn thử.
6. Trên iPhone dùng Safari → Chia sẻ → Thêm vào Màn hình chính.

Không đưa API key vào JavaScript frontend.
