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
- Phải có responsive cho giao diện với mọi kích thước, từ điện thoại đến máy tính bảng đến máy tính bàn.

# Tailwind CSS

- Thứ tự Class: Sắp xếp theo nhóm: Layout -> Sizing -> Spacing -> Typography -> Color -> Effects -> States (hover/focus) -> Responsive.
- Arbitrary Values: Hạn chế tối đa sử dụng giá trị tùy chỉnh -[...]. Phải ưu tiên sử dụng các giá trị có sẵn trong theme.
- Tối ưu hóa:
  - Sử dụng tailwind-merge hoặc clsx khi cần xử lý class động.
  - Không viết trùng lặp các class ghi đè nhau (ví dụ: đã có px-4 thì không viết thêm pl-2).
  - Responsive: Ưu tiên Mobile-first.
- Phải có responsive cho giao diện với mọi kích thước, từ điện thoại đến máy tính bảng đến máy tính bàn.

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

# Kiến trúc & Quản lý State

- Để tối ưu hóa tìm kiếm và phân tách trách nhiệm, mọi file trong các folder endpoints, services, store và mappers phải tuân thủ định dạng:
  [name].[type].js (Ví dụ: brand.service.js, brand.mapper.js).

- Mỗi tính năng sẽ cần phải chia ở các tầng khác nhau với từng chức năng nhiệm vụ khác nhau:
  - Endpoints (nằm trong app\constants\endpoints): Quản lý tập trung tất cả các "đường dẫn" (URLs). Mỗi module là một file riêng (Ví dụ: product.endpoint.js). Sử dụng hàm cho các URL có tham số: DETAIL: (id) => \/api/v1/product/${id}``. Tuyệt đối không hardcode URL trong Service hay Component.
  - Constants (nằm trong app\constants): Nhiệm vụ: Lưu trữ các giá trị "tĩnh" và không thay đổi, ví dụ: các Enums, mã trạng thái (Status), hoặc các quyền (Permissions). Thay vì viết if (status === 1), hãy viết if (status === ORDER_STATUS.PENDING).
  - Mappers (nằm trong app\mappers): Chuyển đổi dữ liệu giữa Frontend và Backend. Tuyệt đối không dùng this trong Mapper để tránh rò rỉ ngữ cảnh. Mỗi tính năng lớn chứa 3 hàm thuần túy (Pure Functions), ngoài ra có thể chứa các hàm khác hỗ trợ việc chuyển đổi dữ liệu: -
    - toModel: Chuyển DTO từ API về định dạng UI cần (camelCase, format dữ liệu).
    - toDTO: Chuyển Model từ UI về định dạng API yêu cầu (PascalCase, xử lý logic gửi đi).
    - toParams: Chuyển Query Object từ UI thành URL Parameters cho Backend (Filter, Sort).
  - Services (nằm trong app\services): Thực hiện các cuộc gọi mạng "thô". Chỉ sử dụng axiosInstance để gửi request, Nhận vào dữ liệu đã được Map (DTO) và trả về dữ liệu thô từ API. Không lưu trữ bất kỳ trạng thái nào trong Service. Service không được biết đến sự tồn tại của Component.
  - Tầng Pinia Stores (nằm trong app\stores): "Nhạc trưởng" điều phối toàn bộ luồng dữ liệu, có nhiệm vụ gọi Mapper để biến đổi dữ liệu -> Gọi Service để lấy kết quả, quản lý trạng thái UI (Loading, Error) và dữ liệu toàn cục. Phối hợp với Tanstack Query để quản lý Server State (Caching, Invalidation). Không viết logic mapping trực tiếp trong Action của Store.
  - Component: Component không được biết đến sự tồn tại của Service hay Endpoint. Gồm 2 loại:
    - Smart Component (Views):
      - Nằm trong app\pages.
      - Kết nối trực tiếp với Store hoặc Tanstack Query.
      - Phân phối dữ liệu xuống các con và xử lý các sự kiện cấp cao (Save, Delete).
      - Nếu vượt quá 300 dòng, phải cân nhắc đưa code sang các tầng khác.
    - Dumb Component (UI Components):
      - Nằm trong app\components.
      - Chỉ giao tiếp qua props và emit.
      - Logic bên trong chỉ phục vụ hiển thị hoặc validate form tại chỗ.
  - Ngoài ra còn có app\composables và app\utils chứa các hàm tiện ích chung xài nhiều lần trong dự án. Đưa vào composables nếu file chứa logic sử dụng Composition API của Vue hoặc các hooks của Nuxt (useFetch, useRouter, useCookie). Đưa vào utils khi file chỉ chứa các hàm thuần túy (pure functions).

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

Khi có sự thay đổi trong dự án, chạy "npm run lint" để kiểm tra xem còn lỗi cú pháp thừa nào hay không, sau đó thì yêu cầu người dùng kiểm tra thủ công. Tuyệt đối không chạy "npm run build".

# Tuyệt đối không tự ý Commit Dự án

Tuyệt đối không tự ý commit và push code lên trên git cho dự án.
