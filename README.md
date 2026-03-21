# AnhEmMotor Store Project

[English](#english) | [Tiếng Việt](#tieng-viet) | [Rules (Quy chuẩn)](./RULES.md)

---

<a name="english"></a>

## English

[Project Rules](./RULES.md)

**Copyright (C) 2026 Tran Thanh Binh, Nguyen Huynh Kim Ngan, Nguyen Trinh Anh Khoi, Trinh Minh Uyen.**

This project is licensed under the **Apache License 2.0**.
See the [LICENSE](LICENSE) file for details.

This project is the customer-facing storefront of AnhEmMotor (product browsing, ordering, etc.).

### Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Deployment & CI/CD](#deployment--cicd)
- [Troubleshooting](#troubleshooting-port-is-in-use--not-running-on-port-3000)

### System Requirements

- Node.js (v20 or higher)
- Access to GitHub Repository

### Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd AnhEmMotor-Store
npm install
```

### Environment Configuration

Create a `.env` file from the template:

```bash
cp .env.template .env
```

Update the information in `.env`:

```properties
# Backend API URL for Browser Client
NUXT_PUBLIC_API_URL_FOR_BROWSER_CLIENT=http://localhost:5000

# Backend API URL for Server (Internal)
# Always use http for internal server-to-server communication
NUXT_INTERNAL_API_URL_FOR_SERVER=http://localhost:5000
```

### Local Development

```bash
npm run dev
```

The website will run at: `http://localhost:3000` (default Nuxt port)

### Deployment & CI/CD

The project uses GitHub Actions for auto-deployments.

#### Required Secrets on GitHub Repo:

| Secret Name                         | Description                          | Example                                  |
| ----------------------------------- | ------------------------------------ | ---------------------------------------- |
| `PUBLIC_API_URL_FOR_BROWSER_CLIENT` | Public Backend API URL (Production)  | `https://api.anhemmotor.online`          |
| `INTERNAL_API_URL_FOR_SERVER`       | Internal Backend API URL             | `http://localhost:5000`                  |
| `PRODUCTION_SERVER_IP`              | Production Server IP                 | `123.123.123.123`                        |
| `PRODUCTION_SERVER_USERNAME`        | SSH Username (usually root)          | `root`                                   |
| `SERVER_REMOTE_ACCESS_PRIVATE_KEY`  | Private SSH Key to access the server | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SSH_PORT_FOR_PRODUCTION_SERVER`    | SSH Port (default 22)                | `22`                                     |

#### Workflow

1. Create a pull request.
2. After the pull request is approved (if it meets quality standards), GitHub Action will automatically build the project.
3. If the build is successful, the code will be deployed to the server.

#### Troubleshooting: Port is in use / Not running on port 3000

**Solution:**

Check if there are any other projects running on port 3000. If not, try running the following two commands in Command Prompt with administrator privileges:

```
sc stop winnat
sc start winnat
```

If it still doesn't work, restart your computer.

---

<a name="tieng-viet"></a>

## Tiếng Việt

[Quy chuẩn dự án](./RULES.md)

**Copyright (C) 2026 Tran Thanh Binh, Nguyen Huynh Kim Ngan, Nguyen Trinh Anh Khoi, Trinh Minh Uyen.**

Dự án này được cấp phép theo **Giấy phép Apache 2.0**.
Xem tệp [LICENSE](LICENSE) để biết chi tiết.

Dự án này là hệ thống cửa hàng dành cho khách hàng của AnhEmMotor (xem sản phẩm, đặt hàng, ...)

### Mục lục

- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Cấu hình Môi trường](#cấu-hình-môi-trường)
- [Chạy Local Development](#chạy-local-development)
- [Deployment & CI/CD](#deployment--cicd-1)
- [Khắc phục sự cố](#khắc-phục-sự-cố-cổng-đã-được-sử-dụng--không-chạy-trên-cổng-3000)

### Yêu cầu hệ thống

- Node.js (v20 trở lên)
- Access to GitHub Repository

### Cài đặt

Clone dự án và cài đặt dependencies:

```bash
git clone <repo-url>
cd AnhEmMotor-Store
npm install
```

### Cấu hình Môi trường

Tạo file `.env` từ file mẫu:

```bash
cp .env.template .env
```

Cập nhật thông tin trong `.env`:

```properties
# URL của Backend API cho Client trình duyệt
NUXT_PUBLIC_API_URL_FOR_BROWSER_CLIENT=http://localhost:5000

# URL của Backend API cho Server (Nội bộ)
# Luôn sử dụng đường link http cho giao tiếp nội bộ server-to-server
NUXT_INTERNAL_API_URL_FOR_SERVER=http://localhost:5000
```

### Chạy Local Development

```bash
npm run dev
```

Trang web có thể sẽ chạy tại: `http://localhost:3000` (Cổng mặc định của Nuxt)

### Deployment & CI/CD

Dự án sử dụng GitHub Actions để auto deploy.

#### Secrets cần cấu hình trên GitHub Repo:

| Secret Name                         | Mô tả                                  | Ví dụ                                    |
| ----------------------------------- | -------------------------------------- | ---------------------------------------- |
| `PUBLIC_API_URL_FOR_BROWSER_CLIENT` | URL Backend API công khai (Production) | `https://api.anhemmotor.online`          |
| `INTERNAL_API_URL_FOR_SERVER`       | URL Backend API nội bộ                 | `http://localhost:5000`                  |
| `PRODUCTION_SERVER_IP`              | IP của Server deploy                   | `123.123.123.123`                        |
| `PRODUCTION_SERVER_USERNAME`        | Username SSH (thường là root)          | `root`                                   |
| `SERVER_REMOTE_ACCESS_PRIVATE_KEY`  | Key SSH private để access server       | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SSH_PORT_FOR_PRODUCTION_SERVER`    | Port SSH (mặc định 22)                 | `22`                                     |

#### Workflow

1. Tạo pull request
2. Sau khi được chấp nhận pull request (nếu đạt đủ chất lượng), GitHub Action sẽ tự động build.
3. Nếu build thành công, code sẽ được deploy lên server.

#### Khắc phục sự cố: Cổng đã được sử dụng / Không chạy trên cổng 3000

**Giải pháp:**

Hãy xem coi có dự án nào khác chạy trên cổng 3000 hay không. Nếu không có, hãy thử chạy 2 lệnh sau trong Command Prompt với quyền quản trị viên:

```
sc stop winnat
sc start winnat
```

Nếu vẫn không thành công, hãy khởi động lại máy tính.
