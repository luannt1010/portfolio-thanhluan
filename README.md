# AI Developer Portfolio

Portfolio cá nhân hiện đại dành cho AI/Software Developer, xây dựng bằng Next.js App Router và tối ưu để deploy trực tiếp lên Vercel. Toàn bộ nội dung cá nhân được quản lý tập trung trong một file dữ liệu.

## Chạy project local

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

Các lệnh hữu ích:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Thay đổi thông tin cá nhân

Mở `data/portfolio.ts`. Đây là nơi quản lý tập trung:

- Tên, chức danh, email, địa điểm và nội dung Hero
- Giới thiệu, số liệu nổi bật và social links
- Skills / Tech Stack
- Experience và Education
- Projects
- Certificates
- Achievements
- Nội dung SEO

Bạn không cần sửa component khi chỉ cập nhật nội dung.

## Thêm project mới

Trong `data/portfolio.ts`, thêm một object vào mảng `projects`:

```ts
{
  slug: "project-slug",
  title: "Project name",
  category: "AI Product",
  shortDescription: "Mô tả ngắn dùng làm câu giới thiệu.",
  description: "Mô tả chi tiết hơn về bài toán, giải pháp và đóng góp.",
  technologies: ["Next.js", "Python", "PostgreSQL"],
  image: "/projects/project-name.jpg", // Không bắt buộc
  githubUrl: "https://github.com/your-name/project",
  demoUrl: "https://project-demo.vercel.app",
  period: "Jan — Mar 2026",
  featured: true,
  accent: "#3454d1",
}
```

Nếu không có `image`, website tự hiển thị cover hình học theo màu `accent`. Nếu có ảnh, đặt file trong `public/projects/` và dùng đường dẫn bắt đầu bằng `/projects/`.

## Thêm certificate mới

Thêm một object vào mảng `certificates` trong `data/portfolio.ts`:

```ts
{
  name: "Certificate name",
  issuer: "Issuing organization",
  issueDate: "August 2026",
  credentialUrl: "https://credential.example.com",
  image: "/certificates/certificate-name.jpg", // Không bắt buộc
}
```

Đặt ảnh chứng chỉ trong `public/certificates/`. Nếu bỏ `image`, website dùng placeholder mặc định.

## Thay avatar hoặc ảnh

Phiên bản hiện tại dùng artwork hình học thay avatar để giữ phong cách gọn và tải nhanh. Để thêm avatar:

1. Đặt ảnh vào `public/images/avatar.jpg`.
2. Thêm trường `avatar: "/images/avatar.jpg"` vào `person` trong `data/portfolio.ts`.
3. Hiển thị trường này tại vị trí mong muốn trong `app/page.tsx` hoặc tạo component riêng.

Ảnh project và certificate không cần sửa component; chỉ cần thêm file và cập nhật trường `image` trong dữ liệu.

## SEO và ảnh chia sẻ

- Sửa `seo.title`, `seo.description` và `seo.siteUrl` trong `data/portfolio.ts`.
- Ảnh Open Graph nằm tại `public/og.png`.
- Khi deploy, có thể đặt biến môi trường `NEXT_PUBLIC_SITE_URL` bằng domain thật. Biến này sẽ ghi đè `seo.siteUrl`.

## Deploy lên Vercel

### Cách 1: GitHub

1. Push project lên GitHub.
2. Vào Vercel và chọn **Add New → Project**.
3. Import repository.
4. Vercel tự nhận diện Next.js; giữ nguyên Build Command và Output mặc định.
5. Thêm `NEXT_PUBLIC_SITE_URL` với domain production, ví dụ `https://your-name.vercel.app`.
6. Chọn **Deploy**.

### Cách 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Không cần backend hoặc cấu hình đặc biệt cho phiên bản hiện tại.

## Cấu trúc chính

```text
app/
  globals.css        # Design system, responsive và animation
  layout.tsx         # SEO metadata và layout gốc
  page.tsx           # Ghép các section của trang
components/
  header.tsx         # Navigation, mobile menu, dark/light mode
  project-card.tsx   # Card project tái sử dụng
  section-heading.tsx
  footer.tsx
data/
  portfolio.ts       # Toàn bộ nội dung portfolio
public/
  og.png             # Social preview image
```
