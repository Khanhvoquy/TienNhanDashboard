# 🌌 Tu Tiên ITSM Dashboard - Gamified IT Service Management

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 Giới Thiệu

**Tu Tiên ITSM Dashboard** là một hệ thống quản lý IT Service Management (ITSM) được **gamification hóa** với chủ đề **Tu Tiên/Tiên Hiệp** (Xianxia theme). 

Biến quá trình làm việc nhàm chán (xử lý tickets, đóng góp knowledge base) thành một hành trình tu luyện đầy thú vị với:
- 🎯 **9 Cảnh giới tu luyện**: Từ Phàm Nhân → Tiên Nhân
- ⚡ **Linh lực (XP)**: Tích lũy từ việc hoàn thành tickets
- 🔥 **Tâm ma & Đạo kiếp**: Cơ chế risk/reward độc đáo
- 🏆 **Leaderboard**: So tài cùng các đạo hữu trong tông môn
- ✨ **Hiệu ứng visual**: Aura, level ring, XP bar sống động

## 🎮 Tính Năng Chính

### Hệ Thống Tu Luyện
| Cảnh Giới | XP Range | Màu Sắc |
|-----------|----------|---------|
| Phàm Nhân | 0 - 500 | Xám |
| Luyện Khí | 500 - 1,200 | Xanh lá |
| Trúc Cơ | 1,200 - 2,500 | Xanh dương |
| Kim Đan | 2,500 - 5,000 | Vàng |
| Nguyên Anh | 5,000 - 8,000 | Tím |
| Hóa Thần | 8,000 - 12,000 | Đỏ |
| Hợp Thể | 12,000 - 18,000 | Hồng |
| Đại Thừa | 18,000 - 25,000 | Cam |
| Tiên Nhân | 25,000+ | Bạch kim |

### Công Thức Tính XP

**SLA Bonus** (Hoàn thành sớm):
```
P_base + P_bonus × (T_remaining / T_goal)^α
```

**SLA Penalty** (Trễ hạn):
```
-k × ln(1 + T_breach)
```

**Role Multipliers**:
- L1 Support: 1.0x
- L2 Support: 1.2x
- QA: 1.1x
- DevOps: 1.3x
- PM: 1.0x
- Mentor: 1.5x

### Trạng Thái Đặc Biệt
- **Tâm Ma Xâm Nhập** (Tam Ma): Giảm 20% XP nhận được (stress cao)
- **Độ Kiếp Thành Công** (Do Kiep): Tăng 50% XP nhưng rủi ro cao

## 🖼️ Screenshots

### Dashboard Chính
![Dashboard](./public/assets/screenshots/dashboard.png)

### Leaderboard
![Leaderboard](./public/assets/screenshots/leaderboard.png)

### Ticket View
![Tickets](./public/assets/screenshots/tickets.png)

> 💡 *Lưu ý: Screenshots sẽ được cập nhật sau khi chạy `pnpm dev`*

## 🚀 Cài Đặt Nhanh

### Yêu Cầu Hệ Thống
- Node.js >= 18.17.0
- pnpm >= 8.15.3 (khuyến nghị) hoặc npm/yarn

### Bước 1: Clone Repository
```bash
git clone https://github.com/your-org/tu-tien-itsm-dashboard.git
cd tu-tien-itsm-dashboard
```

### Bước 2: Cài Đặt Dependencies
```bash
pnpm install
```

### Bước 3: Cấu Hình Environment
```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local` nếu cần kết nối API thật (Jira, Confluence):
```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: Kết nối API thật (để trống nếu dùng mock data)
JIRA_BASE_URL="https://your-domain.atlassian.net"
JIRA_API_TOKEN=""
CONFLUENCE_SPACE_KEY=""

DEBUG_MODE="false"
```

### Bước 4: Chạy Development Server
```bash
pnpm dev
```

Mở trình duyệt và truy cập: **http://localhost:3000**

### Bước 5: Tạo Mock Data (Optional)
```bash
pnpm seed
```

Lệnh này tạo dữ liệu giả lập cho 9 đạo hữu với tickets ngẫu nhiên.

## 📁 Cấu Trúc Dự Án

```
tu-tien-itsm-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # i18n routing
│   │   │   ├── (dashboard)/    # Dashboard routes
│   │   │   │   ├── page.tsx    # Dashboard chính
│   │   │   │   ├── tickets/    # Trang tickets
│   │   │   │   ├── kb/         # Knowledge base
│   │   │   │   └── leaderboard/# Bảng xếp hạng
│   │   │   └── layout.tsx      # Layout với i18n
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React Components
│   │   ├── cultivation/        # Components tu luyện
│   │   │   ├── AuraEffect.tsx  # Hiệu ứng hào quang
│   │   │   ├── LevelRing.tsx   # Vòng cấp độ
│   │   │   ├── XPBar.tsx       # Thanh kinh nghiệm
│   │   │   └── TuTienBackground.tsx # Background 3D
│   │   ├── dashboard/          # Dashboard widgets
│   │   │   ├── KPICard.tsx
│   │   │   ├── SLAGauge.tsx
│   │   │   └── PriorityBadge.tsx
│   │   └── layout/             # Layout components
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── lib/                    # Business Logic
│   │   ├── gamification/
│   │   │   ├── config.ts       # Cấu hình game
│   │   │   └── calculator.ts   # Công thức tính XP ⭐
│   │   ├── animations/
│   │   │   └── variants.ts     # Framer Motion variants
│   │   └── utils.ts            # Utility functions
│   ├── store/                  # State Management (Zustand)
│   │   ├── useDashboardStore.ts
│   │   └── DashboardProvider.tsx
│   ├── types/                  # TypeScript Definitions
│   │   └── index.ts
│   └── i18n/                   # Internationalization
│       ├── messages/
│       │   ├── vi.json         # Tiếng Việt
│       │   └── en.json         # English
│       ├── request.ts
│       └── routing.ts
├── scripts/                    # Scripts tiện ích
│   ├── seed-mock.ts            # Tạo mock data
│   ├── sync-data.ts            # Đồng bộ API
│   └── health-check.js         # Kiểm tra sức khỏe
├── data/                       # Data files
│   └── snapshot.json           # Mock data snapshot
├── public/
│   └── assets/                 # Static assets
├── .env.example                # Environment template
├── next.config.mjs             # Next.js config
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json
```

## 🛠️ Commands Hữu Ích

| Command | Mô Tả |
|---------|-------|
| `pnpm dev` | Chạy development server |
| `pnpm build` | Build production |
| `pnpm start` | Chạy production server |
| `pnpm lint` | Chạy ESLint |
| `pnpm type-check` | Kiểm tra TypeScript |
| `pnpm seed` | Tạo mock data |
| `pnpm sync` | Đồng bộ data từ API |
| `pnpm test` | Chạy tests |
| `pnpm test:watch` | Chạy tests ở watch mode |
| `pnpm test:coverage` | Chạy tests với coverage report |

## 🧪 Testing

Dự án sử dụng **Vitest** và **React Testing Library** cho testing:

```bash
# Cài đặt test dependencies (nếu chưa có)
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Chạy tests
pnpm test

# Xem coverage report
pnpm test:coverage
```

### Test Coverage Hiện Tại
- ✅ Gamification Calculator: 95%
- ✅ Realm Resolution: 100%
- ✅ SLA Bonus/Penalty: 100%
- 🔄 Components: Đang phát triển

## 🌐 Internationalization (i18n)

Dashboard hỗ trợ đa ngôn ngữ với **next-intl**:

- 🇻🇳 **Tiếng Việt** (default)
- 🇬🇧 **English**

Để chuyển đổi ngôn ngữ, thêm `/en` vào URL:
- Tiếng Việt: `http://localhost:3000/vi/dashboard`
- English: `http://localhost:3000/en/dashboard`

### Thêm Ngôn Ngữ Mới

1. Tạo file messages mới trong `src/i18n/messages/`:
```json
// fr.json
{
  "Common": {
    "loading": "Invocation des énergies...",
    "error": "Démon intérieur!"
  }
}
```

2. Cập nhật `src/i18n/routing.ts`:
```typescript
export const locales = ['vi', 'en', 'fr'] as const;
```

## 🎨 Customization

### Thay Đổi Theme Màu Sắc

Chỉnh sửa `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      'cultivation-emerald': '#10b981',
      'cultivation-purple': '#8b5cf6',
      // Thêm màu custom
    }
  }
}
```

### Thêm Cảnh Giới Mới

Chỉnh sửa `src/lib/gamification/config.ts`:
```typescript
export const REALMS: RealmConfig[] = [
  // ... existing realms
  {
    id: 'THANH_THU_TINH',
    nameVi: 'Thanh Thư Tỉnh',
    nameEn: 'Clarity Star',
    minXp: 30000,
    maxXp: 40000,
    colorClass: 'text-cyan-400'
  }
];
```

### Điều Chỉnh Công Thức XP

Chỉnh sửa `src/lib/gamification/calculator.ts`:
```typescript
export const GAMIFICATION_CONFIG = {
  P_base: 10,      // XP cơ bản
  P_bonus: 15,     // XP bonus tối đa
  alpha: 2,        // Hệ số SLA bonus
  k_penalty: 5,    // Hệ số penalty
  // ... thêm config mới
};
```

## 🔌 API Integration

### Kết Nối Jira

1. Tạo `.env.local`:
```env
JIRA_BASE_URL="https://your-domain.atlassian.net"
JIRA_API_TOKEN="your_api_token"
```

2. Chạy sync:
```bash
pnpm sync
```

### Custom API Endpoint

Tạo adapter trong `src/lib/api/`:
```typescript
// src/lib/api/jira-adapter.ts
export async function fetchTickets() {
  const res = await fetch(`${process.env.JIRA_BASE_URL}/rest/api/3/search`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`email:${process.env.JIRA_API_TOKEN}`).toString('base64')}`
    }
  });
  return res.json();
}
```

## 🚢 Deployment

### Vercel (Khuyến Nghị)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t tu-tien-dashboard .

# Run container
docker run -p 3000:3000 tu-tien-dashboard
```

### Manual Deployment

```bash
pnpm build
pnpm start
```

## 🤝 Đóng Góp

Chúng tôi chào đón mọi đóng góp! Hãy follow các bước sau:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

### Quy Tắc Code Style
- ✅ Sử dụng TypeScript strict mode
- ✅ Follow ESLint rules
- ✅ Viết tests cho logic mới
- ✅ Comments giải thích công thức phức tạp
- ✅ Semantic commit messages

## 📄 License

Dự án được phân phối dưới giấy phép **MIT**. Xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Acknowledgments

- Inspired by: **Phàm Nhân Tu Tiên** (Novel by Vong Ngữ Chân Nhân)
- UI Framework: **Tailwind CSS**, **Framer Motion**
- 3D Effects: **Three.js Fiber**, **Drei**
- State Management: **Zustand**
- i18n: **next-intl**

## 📞 Liên Hệ

- **Tác Giả**: Your Team
- **Email**: your-email@example.com
- **Issue Tracker**: [GitHub Issues](https://github.com/your-org/tu-tien-itsm-dashboard/issues)

---

<div align="center">

**"Tâm bất biến giữa dòng đời vạn biến"**

Made with ❤️ by the Tu Tiên Team

[⬆ Back to Top](#-tu-tien-itsm-dashboard---gamified-it-service-management)

</div>
