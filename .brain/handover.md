# 📋 HANDOVER DOCUMENT

📍 **Đang làm**: Hoàn tất deploy Vercel & Kiểm thử popup liên hệ
🔢 **Đến bước**: Giai đoạn 6 - Hoàn thành & Deploy thành công

## ✅ ĐÃ XONG:
- **Tính năng Popup Liên hệ**:
  - Tạo component [ContactPopup.tsx](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/src/components/ui/ContactPopup.tsx) chứa thông tin liên hệ (Alex Anh Phan, 0909 922 603, Zalo link, Email).
  - Tích hợp thành công vào Hero, Navbar (Menu & Button), và Footer. 
  - Khắc phục lỗi intercept của Next.js router bằng global click listener cho các link có hash `#contact`.
- **Cải tiến Skills & CMS**:
  - Bỏ các trường `impact`, `projects`, và `link_text` khỏi Skills và trang quản trị CMS.
  - Hiển thị danh sách logo & tên công cụ (Tools & Technologies) dạng lưới gọn gàng.
- **Sửa các lỗi nghiêm trọng**:
  - Đổi tên `ggas.png` sang `google-campaign.png` để vượt qua AdBlockers.
  - Sửa lỗi chính tả `"category": "Adwards"` thành `"category": "Awards"` để sửa lỗi lọc dự án.
  - Sửa lỗi crash (`Failed to construct 'URL': Invalid URL`) bằng cách chuẩn hóa leading slash `/` cho ảnh avatar trong Testimonials.
- **Hỗ trợ Git & Deploy Vercel**:
  - Gom toàn bộ code mới, tạo commit và kết nối remote origin GitHub thành công.
  - Hướng dẫn chi tiết cách deploy dự án lên Vercel và cách khắc phục lỗi phân quyền khi push git.

## ⏳ CÒN LẠI / HƯỚNG PHÁT TRIỂN TIẾP THEO:
- Người dùng kiểm tra website online và test click các nút "Liên hệ ngay" xem popup hiển thị đúng ý chưa.
- Chuyển đổi sang database online (MongoDB Atlas hoặc Supabase) nếu người dùng muốn sửa nội dung trực tiếp tại link CMS online (thay vì làm ở local rồi push git).

## 🔧 QUYẾT ĐỊNH QUAN TRỌNG:
- Sử dụng **Client-side Click Interceptor** tại `ContactPopup.tsx` để ngăn Next.js router nuốt các sự kiện hash-change.
- Quản lý CMS thông qua **Local File Write** (dùng máy local làm CMS sửa file JSON rồi push git) để thích ứng với cơ chế serverless read-only của Vercel mà không phát sinh chi phí database.

## 📁 FILES QUAN TRỌNG:
- [ContactPopup.tsx](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/src/components/ui/ContactPopup.tsx) (Popup liên hệ)
- [Footer.tsx](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/src/components/layout/Footer.tsx) (Nút CTA cuối trang)
- [Hero.tsx](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/src/components/sections/Hero.tsx) (Nút CTA đầu trang)
- [vi.json](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/src/i18n/dictionaries/vi.json) (Dữ liệu tiếng Việt chính)
- [.brain/brain.json](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/.brain/brain.json) (Bộ nhớ dự án static)
- [.brain/session.json](file:///Users/alexanhphan/Downloads/Porfolio-alex-anh-phan/.brain/session.json) (Tiến độ session hiện tại)
