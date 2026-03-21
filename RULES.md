# Quy chuẩn dự án Management (Project Rules)

### 1. Code Convention

- **Tuyệt đối không** để lại **comment** (`//`, `/* */`, `<!-- -->`) và **logs** (`console.log`, `alert`, etc.) trong code khi hoàn tất tính năng.
- Tên biến, hàm bắt buộc phải sử dụng **tiếng Anh** mang ý nghĩa rõ ràng.

### 2. Quy trình GIT & Branching

#### Đặt tên nhánh (Branch Naming)

- Luôn phải bắt đầu bằng: `feature/`, `bugfix/`, `hotfix/`, hoặc `refactor/`.
- Chỉ sử dụng **chữ thường (lowercase)** và dùng **dấu gạch ngang (-)** để phân tách các từ.
  - _Ví dụ:_ `feature/new-login`, `bugfix/header-styling`
- Chỉ sử dụng các ký tự chữ và số (`a-z`, `0-9`) và dấu gạch ngang. Tránh dấu chấm câu, khoảng trắng, dấu gạch dưới.
- **Không** sử dụng dấu gạch ngang liên tục (ví dụ: `feature--new-login`).
- **Không** kết thúc tên nhánh bằng dấu gạch ngang (ví dụ: `feature-new-login-`).

#### Một nhánh - Một nhiệm vụ (The Rule of One)

- Mỗi nhánh chỉ nên giải quyết **duy nhất một task** hoặc một User Story.
- **Lý do:** Khi gộp nhiều tính năng vào 1 nhánh, nếu 1 tính năng bị lỗi hoặc thay đổi yêu cầu, việc tách hoặc hoàn tác (revert) code sẽ cực kỳ phức tạp và rủi ro.

#### Commit & Pull Request

- **Commit trên nhánh:** Có thể viết bằng **tiếng Việt**.
- **Pull Request (PR):** Tiêu đề và nội dung sử dụng **tiếng Việt**.
- **Merge về nhánh Main:** **BẮT BUỘC** phải sử dụng cấu hình **Squash**.

#### Nội dung Squash (Khi merge về Main)

- **Bắt buộc** phải sử dụng **tiếng Anh**.
- **Tiêu đề** phải bắt đầu bằng các từ khóa chuẩn conventional commits:
  - `fix:`, `feat:`, `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`
  - _Ví dụ:_ `feat: add login functionality`
- **Tuyệt đối không** sử dụng các biến thể có scope như `feat(ui):` hay `feat(test):`.
- **Nội dung:** Cần tóm tắt ngắn gọn các thay đổi chính bằng các **gạch đầu dòng 1 cấp** (không lồng nhiều cấp).

### 3. Kiểm tra Biên dịch (Build Check)

- Trước khi hoàn tất hoặc đẩy code, **bắt buộc** phải chạy các lệnh sau để đảm bảo không có lỗi:
  ```bash
  npm run lint
  npm run build
  ```
- **Mục tiêu:** Đảm bảo không còn lỗi biên dịch (Compile errors), lỗi biến chưa sử dụng (Unused variables), hay lỗi syntax thừa.
