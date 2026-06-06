# Portfolio Spec: Alex Anh Phan

## 1. Executive Summary
Xây dựng website cá nhân cho Alex Anh Phan với mục đích trình bày profile, kỹ năng, các dự án nổi bật, lời chứng thực từ đối tác và cung cấp form liên hệ trực tiếp.

## 2. Các Section (UI/UX)
1. **Hero:** Lời chào, vai trò, hình ảnh cá nhân, CTA (Tải CV, Liên hệ).
2. **About Me:** Giới thiệu ngắn gọn.
3. **Skills & Tools:** Tech stack sử dụng (Next.js, React, v.v.) dạng Grid layout.
4. **Projects / Portfolio:** Danh sách dự án nổi bật (dạng card có ảnh, title, tech stack, mô tả ngắn).
5. **References:** Nhận xét, đánh giá từ đồng nghiệp/khách hàng (Testimonials).
6. **Contact:** Form liên hệ trực tiếp qua Email. Đi kèm các social links.

## 3. Tech Stack
- **Framework:** Next.js 15 (React 19, TypeScript, App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI, Lucide React
- **Animation:** Framer Motion
- **Analytics/SEO:** Google Analytics (GA4), Google Search Console

## 4. API, Integration & Tính năng đặc biệt
- **Contact:** Dùng liên kết trực tiếp `mailto:` và `tel:`, không sử dụng API hay Backend cho việc gửi email. (Loại bỏ Resend API).
- **Đa ngôn ngữ (i18n):** Tạo 2 phiên bản giao diện/nội dung độc lập (1 bản Tiếng Việt, 1 bản Tiếng Anh). Nút bấm trên Header sẽ đảm nhiệm việc Switch (đổi) qua lại giữa 2 bản này một cách nhanh chóng (có thể dùng Sub-path Routing của Next.js như `/vi` và `/en` để tối ưu SEO, hoặc dùng React State để đổi Component).

## 5. UI Sections Breakdown

### 5.1. Header / Navbar
- **Logo:** Ký tự "AP" (màu Cyan) kèm chữ "Alex Anh Phan" (màu Trắng).
- **Menu:** Trang chủ (có chấm Cyan active), Giới thiệu, Dịch vụ, Dự án, Blog.
- **Nút chuyển ngôn ngữ (Language Toggle):** Nút nhỏ gọn cạnh CTA, có thể hiện icon cờ (🇻🇳 / 🇬🇧) hoặc chữ (VI / EN).
- **CTA:** Nút "Liên hệ ngay" nền Cyan bo góc tròn.

### 5.2. Hero Section (Nội dung Tiếng Việt)
- **Background:** Đen tuyền, có vòng sáng (Glow aura) màu Cyan khổng lồ ở giữa.
- **Bố cục 3 cột (3-column layout):**
  - **Cột Trái (Giới thiệu cá nhân):**
    - Text nhỏ: "Xin chào, tôi là" (Cyan).
    - Heading 1 to: "Alex Anh\nPhan" (Trắng).
    - Đường kẻ ngang Cyan (Separator).
    - Paragraph mô tả: "Tôi giúp các doanh nghiệp tăng trưởng đột phá thông qua chiến lược dữ liệu, tự động hóa marketing và các giải pháp ứng dụng AI."
    - Primary CTA Button: Nút "Xem Dự Án" nền Cyan, chữ Đen có mũi tên phải và đổ bóng phát sáng (Glow shadow).
    - Social Links (Fixed left): Các icon dọc (LinkedIn, GitHub, Behance, Email) nối bằng vạch thẳng.
  - **Cột Giữa (Visual):** Ảnh chân dung Alex Anh Phan mặc vest, tay đút túi quần, nổi bật trên nền Glow Cyan.
  - **Cột Phải (Dịch vụ / Giá trị):**
    - Text nhỏ: "Kiến tạo giá trị với" (Cyan).
    - Heading 2 to: "AI, Dữ liệu &\nDigital Marketing." (Trắng, chữ "AI, Dữ liệu &" màu Cyan).
    - Đường kẻ ngang Cyan.
    - Paragraph mô tả: "Biến thách thức thành cơ hội bằng công nghệ, sự sáng tạo và mang lại những kết quả có thể đo lường thực tế."
    - Secondary CTA Button: Nút outline (viền trắng, chữ trắng) "Xem Video Giới Thiệu" kèm icon Play.
- **Góc phải dưới:** Chữ "CUỘN ĐỂ KHÁM PHÁ" và mũi tên chỉ xuống trong vòng tròn.

### 5.3. Experiences Section (Career Evolution - Bản nâng cấp V2)
- **Background:** Trắng (Light mode) để tạo tương phản với Hero Section. Điểm xuyết màu Cyan.
- **Tiêu đề chính:** "Career Evolution" / "Architect of Digital Excellence" (Chữ "Digital Excellence" tô màu Cyan nổi bật). Kèm tag nhỏ "• EXPERIENCE" ở trên cùng.
- **Bố cục tổng thể:** 3 cột (Trái, Giữa, Phải) + 1 dải ngang (Marquee) dưới cùng.
- **Cột Trái (Giới thiệu & Thông số):**
  - Đoạn giới thiệu tổng quan về 10+ năm kinh nghiệm.
  - Grid thống kê (2x2) có kèm Icon: "10+ Years Experience" (Icon Cúp), "500+ Students Trained" (Icon Mũ tốt nghiệp), "10+ Brands Managed" (Icon Tòa nhà), "AI Growth Strategist" (Icon Chip AI).
  - Khối Download Resume: Đã được làm thanh thoát hơn với nền xanh nhạt (light cyan tint), icon tài liệu, nút tròn xanh mũi tên trắng "Download Full Resume".
  - Khối Quote: Chữ ký tay (Handwritten signature) "Alex Anh Phan" tạo cảm giác cá nhân hóa cao cấp.
- **Cột Giữa (Timeline / Các công ty):**
  - Trục thời gian dọc. Điểm đang chọn (Active) có viền tròn Cyan.
  - Thẻ công ty (Cards): Có Logo lớn rõ ràng (RT, MindX, GEN, growth station). Bên trong thẻ có Chức danh, Tên công ty, Date (dạng pill badge màu xanh) và mũi tên `>`.
- **Cột Phải (Chi tiết tương tác - Accordion Style):**
  - Header: Logo lớn, Chức danh, Công ty, thời gian và nút "X" để đóng panel.
  - Các phần tử dạng Accordion (Đóng/Mở linh hoạt):
    - **Key Responsibilities:** Bullet points.
    - **Achievements (Thành tựu):** Grid 4 ô màu sắc rực rỡ (VD: +250% Lead Growth màu xanh lá, -35% CAC Reduction màu xanh dương, 10+ Brands màu tím, $5M+ Budget màu cam/vàng).
    - **Key Skills:** Các thẻ Tag (Pills).
    - **Tools & Technologies:** (Collapsed/Đóng).
    - **Education & Certifications:** (Collapsed/Đóng).
- **Phần đáy (Bottom Marquee):**
  - Dải chữ "Brands I've Worked With".
  - Chạy ngang (infinite scroll) các logo đối tác lớn: RT Holdings, MindX, VNG, FPT, Yody, Tiki, Viettel...
- **Tương tác (UX):** Master-Detail view kết hợp Accordion giúp người dùng tự do khám phá khối lượng thông tin khổng lồ mà UI vẫn cực kỳ gọn gàng, sạch sẽ.

### 5.4. Projects / Portfolio Section (View My Work)
- **Background:** Trắng (Light mode), duy trì sự liền mạch từ section trước.
- **Tiêu đề trung tâm (Center Aligned):**
  - Tag nhỏ (Pill badge): "SELECTED WORK & IMPACT" (viền Cyan, chữ Cyan, nền xanh nhạt).
  - Heading to: "View My Work" (Chữ "Work" màu Cyan).
  - Paragraph mô tả ngắn gọn về bộ sưu tập dự án.
- **Dải thông số ấn tượng (Top Stats Row):**
  - 4 thẻ (Cards) xếp ngang (Desktop), chứa icon Cyan nét thanh (Outline icons: Rocket, People, Chart, Trophy).
  - Các chỉ số: 15+ Products Built, 500+ Students Trained, 250% Average Growth, 10+ Awards Won.
  - Có dòng mô tả nhỏ bên dưới mỗi chỉ số.
- **Thanh lọc dự án (Filter Tabs):**
  - Các tab có icon đi kèm: All Projects (Active: gạch chân Cyan), AI & Automation, Marketing & Growth, Web & Platform, Education & Training, Others.
  - Cần UX mượt khi switch tab (Filter animation).
- **Lưới dự án (Projects Grid):**
  - Bố cục 4 cột (Desktop), hiển thị tối đa 8 dự án nổi bật.
  - **Project Card UI:**
    - Góc trái trên của ảnh: Tag phân loại (VD: EdTech / AI, Real Estate).
    - Ảnh đại diện (Thumbnail/Mockup) của dự án.
    - Tiêu đề dự án (Đậm, màu đen).
    - Đoạn text mô tả ngắn gọn.
    - **Điểm nhấn UI:** Một hàng ngang 3 thông số (Metrics) với icon nhỏ cho mỗi dự án (VD: 250% Lead Increase, 40% Conversion Rate, 30% Cost Reduction). Giúp định lượng kết quả rất thực tế.
    - Link cuối thẻ: "View Case Study →" (Màu Cyan, có hiệu ứng hover mũi tên).
- **Phần mở rộng (Bottom Action):**
  - Nút Outline "Show More Projects" kèm icon Grid.
  - Text nhỏ bên dưới: "12+ more projects in different industries...".

### 5.5. Skills Section (My Skills / What I Do Best)
- **Background:** Trắng (Light mode), nối tiếp section Projects.
- **Tiêu đề trung tâm:**
  - Tag nhỏ (Pill badge): "WHAT I DO BEST" (viền Cyan, chữ Cyan).
  - Heading to: "My Skills" (Chữ "Skills" màu Cyan).
  - Paragraph mô tả: "A combination of strategic thinking, technical expertise and the right tools..."
- **Bố cục 2 cột tương tác (Interactive Master-Detail Tab):**
  - **Cột Trái (Danh sách Nhóm Kỹ năng - Tab/Accordion):**
    - Danh sách dọc các nhóm kỹ năng: Digital Strategy & Growth, AI & Automation, Web Development, Data & Analytics, Design & UX/UI, Content & Communication.
    - Khi một mục được chọn (VD: Digital Strategy & Growth):
      - Mục đó mở rộng thành dạng Accordion, có viền Cyan bao quanh.
      - Bên trong hiển thị đoạn mô tả ngắn và mục **"Tools & Technologies"**: Một lưới (Grid) hiển thị các Logo/Icon của công cụ (VD: Google Analytics, Looker Studio, Google Ads, Semrush, HubSpot, Notion...).
  - **Cột Phải (Chi tiết Nhóm Kỹ năng & Tác động - Detail Pane):**
    - **Header:** Số thứ tự (VD: "01" trong khối cyan mờ) và Tiêu đề nhóm kỹ năng. Kèm theo một hình ảnh minh họa 3D/Isometric (màn hình máy tính, biểu đồ, hồng tâm màu cyan) phía góc phải trên.
    - Đoạn mô tả chi tiết năng lực cốt lõi.
    - **Khối "What I Do":** Danh sách bullet points với icon dấu tick tròn (check circle) màu Cyan (VD: Growth strategy, Performance marketing, Conversion rate optimization...).
    - **Khối "Key Impact":** Một hàng ngang gồm 4 thẻ thống kê siêu nhỏ nhắn, mang tính định lượng tác động (VD: 250% Average Growth, 10+ Brands Scaled...).
    - **Khối "Featured Projects":** Hiển thị nhanh 3 dự án tiêu biểu liên quan trực tiếp đến nhóm kỹ năng này (Thumbnail ảnh + Tiêu đề).
    - **Bottom Button:** Nút "View Case Study →" (Outline Cyan) để xem chi tiết.
- **Tương tác (UX):** Giống với phần Experiences, khi click đổi Tab ở cột trái, toàn bộ nội dung ở cột phải sẽ thay đổi (transition mượt mà). Cột trái vừa đóng vai trò là Tab menu, vừa là Accordion để show danh sách Tools. Thiết kế cực kỳ tối ưu diện tích.

### 5.6. References Section (What People Say)
- **Background:** Trắng (Light mode), tiếp tục sự thanh thoát.
- **Tiêu đề trung tâm:**
  - Subtitle nhỏ: "REFERENCE & RECOMMENDATIONS" (màu Cyan).
  - Heading to: "What People Say / About Working With Me" (Chữ "Working With Me" màu Cyan).
  - Paragraph mô tả và một đường gạch chân (Cyan separator) tinh tế bên dưới.
- **Lưới Nhận Xét Chính (Main Testimonial Grid):**
  - Bố cục 4 cột (Desktop), gồm 4 thẻ lớn.
  - **Card UI:**
    - Icon nháy kép (Quote icon `""`) to màu Cyan nhạt ở góc trái trên.
    - **Hồ sơ:** Avatar tròn, Tên (Đậm), Chức vụ, và Logo công ty rõ ràng (VD: Tuan Nguyen - CEO, RT Holdings + Logo).
    - Nội dung nhận xét chi tiết.
    - **Nút xác thực:** Link "View on LinkedIn →" màu Cyan có logo LinkedIn để tăng độ uy tín thực tế.
- **Dải Nhận Xét Mở Rộng (More References Carousel):**
  - Có một dải phân cách mờ "More References".
  - Một Carousel (Thanh trượt ngang) với 2 nút mũi tên Trái/Phải.
  - Chứa các thẻ thu gọn (Pill cards): Gồm Avatar, Tên, Chức vụ, Logo công ty và một nút icon LinkedIn tròn nhỏ bên phải. Thiết kế này giúp chứa thêm rất nhiều Reference mà không làm dài trang web.
- **Khối Tri Ân (Bottom Quote Box):**
  - Một khối hình chữ nhật dài, viền Cyan nét mảnh, bo góc tròn (Pill shape lớn).
  - Chứa câu tri ân của Alex: "I'm grateful for the amazing people..."
  - Có chữ ký tay "Alex Anh Phan" màu Cyan và chức danh "AI Growth Strategist" ở góc phải. Khẳng định thương hiệu cá nhân ở cuối section.

### 5.7. Contact Me Section (Footer)
- **Background:** Đen tuyền (Dark mode), có ánh sáng Glow Cyan tinh tế. Trở lại tone màu tối của Hero Section để tạo ra một cấu trúc Đầu-Đuôi (Đen - Trắng - Đen) hoàn hảo.
- **Bố cục 2 cột (Desktop):**
  - **Cột Trái (Visual):** Ảnh chân dung Alex (nửa người), thần thái chuyên nghiệp, nổi bật trên nền vầng sáng (Glow aura) Cyan. Giúp gợi nhớ lại Hero Section.
  - **Cột Phải (Thông tin liên hệ):**
    - Heading to: "Contact Me" (màu Cyan).
    - Paragraph: "Let's connect and discuss how we can work together..."
    - **Khối Liên Hệ Trực Tiếp:**
      - *Email Block:* Icon phong bì màu Cyan. Text "EMAIL ADDRESS", click vào sẽ mở `mailto:hello@portfolio.com`.
      - *Phone Block:* Icon điện thoại màu Cyan. Text "PHONE NUMBER", click vào sẽ gọi `tel:+1234567890`.
    - Đường phân cách (Separator line) mỏng, mờ.
    - **Social Networks:**
      - Text nhỏ: "SOCIAL NETWORKS".
      - Các nút icon tròn (Message, Share, Website/Globe) viền Cyan hoặc icon Cyan trên nền tối.

## 6. Chiến lược Responsive Bản Mobile (Mobile Layout Strategy)
Đảm bảo trải nghiệm 100% mượt mà trên thiết bị di động (Mobile-First approach):
- **Hero Section:** Đổi từ 3 cột sang xếp chồng (Stack dọc). Giới thiệu cá nhân -> Hình ảnh -> Giá trị dịch vụ.
- **Experiences Section:** Cột trái (Thông số) nằm trên cùng. Cột giữa (Timeline) chuyển thành ngang (Swipe) hoặc gộp vào. Cột phải (Detail) mở ra ngay bên dưới khi tap vào thẻ công ty (Accordion mode cho Mobile).
- **Projects Section:** Grid 4 cột chuyển về 1 cột dọc (hoặc 2 cột cho Tablet). Thẻ dự án vẫn giữ nguyên thiết kế nhưng thu nhỏ text. Hàng Metrics 3 thông số dàn dọc hoặc icon nhỏ lại. Thanh Filter chuyển sang dạng cuộn ngang (Scroll snap x).
- **Skills Section:** Danh sách nhóm kỹ năng (Cột trái) biến thành Dropdown Select hoặc Carousel ngang. Khi chọn, nội dung Detail Pane (Cột phải) hiện ra bên dưới dạng cột đơn thẳng đứng.
- **References:** Lưới 4 thẻ chuyển thành Carousel trượt ngang để tiết kiệm chiều dọc màn hình.
- **Padding & Font-size:** Giảm padding tổng thể, scale Font-size xuống phù hợp với màn nhỏ (Dùng Tailwind `text-base` đến `text-3xl`).
