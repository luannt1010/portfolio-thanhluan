# AI Developer Portfolio

Portfolio cá nhân của Nguyen Thanh Luan, xây dựng bằng React 19, Vinext và Vite. Project được triển khai trên OpenAI Sites với Cloudflare Worker-compatible output.

Nội dung portfolio được quản lý theo hướng data-driven:

- Thông tin cá nhân, kỹ năng, kinh nghiệm, học vấn, project và chứng chỉ nằm trong `data/portfolio.ts`.
- Nội dung case study nằm trong `data/case-studies/`.
- Component chỉ chịu trách nhiệm trình bày và tương tác, không chứa số liệu project.

## Chạy project local

Yêu cầu Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Các lệnh kiểm tra và build:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Cập nhật nội dung portfolio

Mở `data/portfolio.ts` để cập nhật:

- SEO, tên, chức danh, email, địa điểm và phần giới thiệu
- Số liệu tổng quan và social links
- Skills / Tech Stack
- Experience và Education
- Projects
- Certificates

Không cần sửa component nếu chỉ thay đổi nội dung thuộc các nhóm trên.

## Thêm project

Thêm một object vào mảng `projects` trong `data/portfolio.ts`:

```ts
{
  slug: "project-slug",
  title: "Project name",
  category: "AI Product",
  shortDescription: "Mô tả ngắn dùng ở mặt trước của project card.",
  description: "Mô tả bài toán, giải pháp và phạm vi triển khai.",
  highlights: ["Kết quả hoặc đóng góp đã được xác minh."],
  technologies: ["PyTorch", "FastAPI", "PostgreSQL"],
  image: "/images/projects/project-name.jpg",
  githubUrl: "https://github.com/your-name/project",
  demoUrl: "https://project-demo.example.com",
  period: "Personal Project",
  accent: "#3454d1",
}
```

`image`, `highlights`, `githubUrl`, `demoUrl` và `caseStudySlug` là tùy chọn. Nếu không có ảnh, card dùng artwork hình học theo màu `accent`. Ảnh project nằm trong `public/images/projects/` và được tham chiếu bằng đường dẫn bắt đầu với `/images/projects/`.

## Thêm case study

1. Tạo file trong `data/case-studies/` theo type `CaseStudy` ở `data/case-studies/types.ts`.
2. Đăng ký case study trong `data/case-studies/index.ts`.
3. Đặt media trong `public/images/case-studies/<slug>/`.
4. Thêm `caseStudySlug: "<slug>"` vào project tương ứng trong `data/portfolio.ts`.

`caseStudySlug` phải trùng với `slug` của case study đã đăng ký. Route chi tiết được tạo tại `/projects/<slug>`.

## Thêm certificate

Thêm một object vào mảng `certificates` trong `data/portfolio.ts`:

```ts
{
  name: "Certificate name",
  issuer: "Issuing organization",
  platform: "Learning platform",
  issueDate: "August 2026",
  credentialUrl: "https://credential.example.com",
  image: "/images/certificates/certificate-name.jpg",
}
```

Ảnh chứng chỉ nằm trong `public/images/certificates/`. Nếu không khai báo `image`, giao diện dùng `/images/certificates/certificate-thumbnail.jpg`.

## Avatar, SEO và social preview

- Avatar hiện tại: `public/images/nguyen-thanh-luan.jpg`.
- Cập nhật đường dẫn avatar tại `portfolio.person.avatar`.
- SEO title, description và URL mặc định nằm trong `portfolio.seo`.
- Có thể đặt `NEXT_PUBLIC_SITE_URL` để ghi đè URL mặc định khi build cho một domain khác.
- Social preview dùng `public/og.png`.
- Mỗi case study tự tạo metadata title, description và preview image từ record tương ứng.

## Hosting

Project sử dụng OpenAI Sites. Cấu hình project ID nằm trong `.openai/hosting.json`; Vinext, Vite và Cloudflare Worker được cấu hình tại `vite.config.ts` và `worker/index.ts`.

URL hiện tại:

[https://nguyen-thanh-luan-ai-portfolio.luanntai13.chatgpt.site](https://nguyen-thanh-luan-ai-portfolio.luanntai13.chatgpt.site)

Không commit file môi trường, cache hoặc build output. Các thư mục `.next/`, `.vinext/`, `.wrangler/`, `dist/`, `outputs/`, `tmp/` và file `*.tsbuildinfo` đã được ignore.

## Cấu trúc chính

```text
app/
  layout.tsx                    # Metadata, theme bootstrap và root layout
  page.tsx                      # Portfolio tabs và section composition
  projects/[slug]/              # Dynamic case-study route
components/
  header.tsx
  theme-toggle.tsx
  project-deck.tsx
  project-card.tsx
  case-study-header.tsx
  section-heading.tsx
  footer.tsx
data/
  portfolio.ts                  # Nội dung portfolio
  case-studies/                 # Nội dung và registry case study
public/
  images/                       # Ảnh portfolio và case study
  og.png                        # Social preview mặc định
worker/
  index.ts                      # Vinext request và image optimization handler
vite.config.ts                  # Sites, Vinext và Cloudflare integration
```
