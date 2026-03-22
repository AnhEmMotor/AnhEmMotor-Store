# Yêu cầu chung

- Tuyệt đối không viết comment (//, /\* \*/, <!-- -->) và log (alert, console) trong code trong bất cứ trường hợp nào.
- Tên biến bắt buộc phải sử dụng tiếng Anh.
- Luôn luôn sử dụng cú pháp VueJS, Javascript, CSS mới nhất.
- Không bao giờ được tự động cài thư viện cho các dự án, trừ trường hợp tôi yêu cầu. Nếu bạn muốn cài thêm thư viện, phải thông báo qua cho tôi.
- Không bao giờ được đổi nội dung các file env trừ trường hợp tôi yêu cầu. Nếu bạn muốn thay đổi, phải thông báo qua cho tôi.
- Tất cả phản hồi đều phải được viết bằng tiếng Việt, kể cả Task, Plan.
- Các quy tắc của Eslint cần được tuân thủ theo cấu hình của dự án.

# CSS

- Không sử dụng ID để định dạng. Không sử dụng !important.
- Giới hạn độ sâu nesting tối đa là 3 cấp.
- Thứ tự thuộc tính (Property Order): Phải sắp xếp theo nhóm từ ngoài vào trong:
  - Positioning (position, top, z-index...)
  - Box Model (display, flex, grid, margin, padding, border, width, height...)
  - Typography (font, line-height, color, text-align...)
  - Visual (background, opacity, transition...)
  - Misc (cursor, pointer-events...)

# Tailwind CSS

- Thứ tự Class: Sắp xếp theo nhóm: Layout -> Sizing -> Spacing -> Typography -> Color -> Effects -> States (hover/focus) -> Responsive.
- Arbitrary Values: Hạn chế tối đa sử dụng giá trị tùy chỉnh -[...]. Phải ưu tiên sử dụng các giá trị có sẵn trong theme.
- Tối ưu hóa:
  - Sử dụng tailwind-merge hoặc clsx khi cần xử lý class động.
  - Không viết trùng lặp các class ghi đè nhau (ví dụ: đã có px-4 thì không viết thêm pl-2).
  - Responsive: Ưu tiên Mobile-first.

# JavaScript

- Luôn dùng const mặc định, chỉ dùng let khi thực sự cần thay đổi giá trị.
- Sử dụng Arrow functions cho các callback và hàm ẩn danh.
- Sử dụng Template literals cho chuỗi. Kết thúc mọi câu lệnh bằng dấu chấm phẩy ;.
- Tên biến phải bằng tiếng Anh, có ý nghĩa rõ ràng.
- Hàm xử lý logic phải bắt đầu bằng động từ.
- Biến Boolean phải bắt đầu bằng is, has, should, hoặc can.
- Nguyên tắc Logic:
  - Early Return: Trả về kết quả sớm để tránh lồng ghép if-else quá 2 tầng.
  - Immutability: Không thay đổi trực tiếp tham số đầu vào hoặc dữ liệu gốc. Sử dụng Spread operator (...), map, filter, reduce.
  - Async/Await: Mọi lời gọi bất đồng bộ bắt buộc phải nằm trong khối try-catch để kiểm soát lỗi.
  - Single Responsibility: Một hàm chỉ thực hiện duy nhất một nhiệm vụ. Nếu hàm dài quá 20 dòng, phải cân nhắc tách hàm.
  - Formatting: Tuân thủ chặt chẽ cấu hình Prettier. Không để lại code thừa hoặc comment rác.

# Vue.js & Pinia (Kiến trúc & Quản lý State)

## Cấu trúc File (.vue)

> [!IMPORTANT]
> **Thứ tự ưu tiên:** `<script setup>` -> `<template>` -> `<style>`.
> **Lý do:** Bạn cần đọc logic và dữ liệu trước khi xem giao diện. Để `<style>` ở giữa là một sai lầm về trải nghiệm lập trình (DX) vì nó thường rất dài, khiến bạn phải scroll mỏi tay để nhảy giữa logic và template.

## Đặt tên

- **Component & File:** Đồng nhất sử dụng **PascalCase** (ví dụ: `UserCard.vue`).
- **Tại sao?** Trong Vue, Component là một class/object đặc biệt. Việc dùng `kebab-case` cho tên file chỉ làm khó hệ thống tự động import và gây mất đồng nhất khi gọi Component trong template.

## Phân chia nhiệm vụ (The Quadruple-Contract)

1. **API Service (Tầng giao tiếp):**

- Nằm trong thư mục `services/` hoặc `api/`.
- Là nơi duy nhất chứa các hàm gọi `axios` hoặc `fetch`.
- Định nghĩa kiểu dữ liệu (Interfaces/Types) cho Response và Request.
- **Nhiệm vụ:** Trả về dữ liệu thô hoặc ném lỗi kỹ thuật. Không xử lý State hay Logic ở đây.

2. **Pinia Store (Tầng điều phối & Logic):**

- Nơi duy nhất gọi đến **API Service**.
- Xử lý logic nghiệp vụ (Business Logic): validation, biến đổi dữ liệu thô từ API thành định dạng UI cần, quản lý trạng thái loading/error.
- Tuyệt đối không để logic nghiệp vụ trong Component.

3. **Component Cha (Smart Component):**

- Kết nối với Store, nhận dữ liệu và phân phối cho các con qua `props`.
- Quản lý bố cục (Layout) và các logic mang tính điều hướng.

4. **Component Con (Dumb/Presentational Component):**

- Chỉ nhận dữ liệu qua `props` và phát sự kiện qua `emit`.
- Không được phép biết đến sự tồn tại của Store hay API.
- Giữ cho component nhỏ, tập trung và có khả năng tái sử dụng cao.

## Quy tắc "Không rò rỉ"

- Không viết các hàm tính toán phức tạp bên trong `.vue` nếu nó có thể tái sử dụng hoặc thuộc về bản chất của dữ liệu (hãy đưa vào Store hoặc Composable).
- Mọi biến mang tính chất "trạng thái tính năng" (ví dụ: `isLoggedIn`, `userPermissions`) phải nằm ở Store.

# Tanstack Query (Quy trình CRUD Chuẩn)

- Thêm mới/Cập nhật (Mutation): Sau khi thành công, phải gọi queryClient.setQueryData cho ID sản phẩm cụ thể để cập nhật cache chi tiết ngay lập tức.
- Hành động "Sửa" (Fetching):
  - Sử dụng queryClient.fetchQuery để lấy dữ liệu.
  - UX: Nếu đã có cache, hiển thị ngay (không loading overlay) và fetch ngầm. Nếu chưa có cache, bắt buộc hiển thị loading overlay.
- Xóa (Deletion):
  - Phải gọi queryClient.removeQueries cho ID sản phẩm đó trước khi gọi invalidateQueries danh sách.
- Tương tác Modal (DraggableModal):
  - Truyền :onRefresh cho DraggableModal để hiện nút reload trên tiêu đề.
- Điều kiện: Chỉ truyền :onRefresh khi isEditMode === true, truyền undefined khi thêm mới.
- Hàm Refresh: Gọi queryClient.fetchQuery với staleTime: 0 để ép buộc lấy dữ liệu mới nhất từ API và hiển thị loading overlay.

# Pagination & Quản lý Trang

- Tiêu chuẩn: Bắt buộc sử dụng usePaginatedQuery.js cho mọi tính năng có phân trang hoặc quản lý danh sách nhiều trang.
- AI không được phép tự ý viết nội dung, sửa đổi hoặc tạo mới file usePaginatedQuery.js. Nếu chưa có file này, AI phải yêu cầu người dùng cung cấp hoặc copy từ dự án mẫu. Tuyệt đối không tự sinh code thay thế cho công cụ này.

# Quy tắc quản lý biến môi trường (khi có thêm biến môi trường trong file .env)

- Mọi biến mới phải được thêm vào .env.template với giá trị trống hoặc giá trị mẫu không nhạy cảm. Phải có comment ngay phía trên biến đó để giải thích chức năng.
- Mọi biến mới phải được thêm vào ecosystem.config.js
- Mọi biến mới phải được thêm vào .github/workflows/deploy.yml mục "Restart Application via SSH"
- Mọi biến dùng trong .env và .env.template phải có tiền tố NUXT\_.
- Tuyệt đối không lưu giá trị thật (Production keys) vào bất kỳ file nào được push lên Git (trừ file .env đã được .gitignore).
- Secret trên GitHub phải đặt tên khớp hoàn toàn với file .env (BẮT BUỘC KHÔNG CÓ TIỀN TỐ NUXT\_) để tối ưu hóa việc tự động hóa CI/CD. Khi thêm biến vào GitHub Secrets, phải kiểm tra xem biến đó có cần thiết cho quá trình Build hay không. Nếu có, phải liệt kê vào file .github/workflows/deploy.yml.
- Phải thêm vào trong file README.md:

* Nếu cần thiết chỉnh sửa hoặc ghi chú, phải ghi vào phần "Environment Configuration" (tiếng Anh) và "Cấu hình Môi trường" (tiếng Việt)

* Nếu có thêm biến cần cấu hình trong Github Secret thì cần ghi thêm vào trong bảng "Deployment & CI/CD" cả bản tiếng Anh và tiếng Việt, bao gồm cả mô tả và ví dụ rõ ràng.

# Build dự án

Khi có sự thay đổi trong dự án, chạy "npm run lint" để kiểm tra xem còn lỗi cú pháp thừa nào hay không, sau đó thì yêu cầu người dùng kiểm tra thủ công. Với dự án NuxtJS, tuyệt đối không chạy "npm run build".

# Tuyệt đối không tự ý Commit Dự án

Tuyệt đối không tự ý commit và push code lên trên git cho dự án.
