# Nova AI — backend hoàn chỉnh

## 1. Tạo API key
Tạo API key trong tài khoản OpenAI của bạn. Không đưa key vào frontend/iPhone.

## 2. Chạy trên máy
Cài Node.js 22+, sau đó:

    npm install
    cp .env.example .env

Mở `.env` và thay:
OPENAI_API_KEY=sk-...

Sau đó:

    npm start

Kiểm tra:
http://localhost:3000/health

## 3. Kết nối frontend
Trong app Nova AI, đặt API endpoint thành:

    http://YOUR_SERVER:3000/chat

Khi triển khai thật nên dùng HTTPS, ví dụ:

    https://api.tenmiencuaban.com/chat

## 4. Đưa lên server
Có thể triển khai Dockerfile này lên bất kỳ nền tảng cloud nào hỗ trợ Docker/Node.
Đặt biến môi trường OPENAI_API_KEY trên server, không commit file `.env`.

## 5. Thêm ra màn hình chính iPhone
Frontend phải được host bằng HTTPS. Mở bằng Safari → Chia sẻ → Thêm vào Màn hình chính.
