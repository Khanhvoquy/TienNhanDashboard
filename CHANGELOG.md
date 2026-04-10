# 📝 CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive unit tests for gamification calculator (calculator.test.ts)
- Vitest configuration with coverage reporting
- Testing setup with @testing-library/react and jest-dom
- Test scripts: `test`, `test:watch`, `test:coverage`, `test:ui`
- Complete README.md with installation, usage, and customization guides
- .env.example template for environment variables
- Improved .gitignore with test coverage and IDE exclusions

### Changed
- Updated package.json with testing dependencies (vitest, @testing-library/*)
- Fixed test assertions to use actual GAMIFICATION_CONFIG values
- Enhanced documentation with screenshots placeholders and architecture diagram

### Fixed
- Test expectations aligned with actual config values (P_base=10, P_bonus=40)
- Realm thresholds in tests match config.ts (PHAM_NHAN: 0-99, LUYEN_KHI: 100-299, etc.)

## [1.0.0] - 2024-04-10

### Added
- Initial release of Tu Tiên ITSM Dashboard
- Gamification system with 9 cultivation realms
- XP calculation with SLA bonus/penalty formulas
- Role multipliers and special states (Tam Ma, Do Kiep)
- Next.js 14 App Router implementation
- Internationalization (Vietnamese & English)
- 3D background with Three.js Fiber
- Framer Motion animations
- Zustand state management
- Mock data generator script
- Health check script

### Features
- **9 Realms**: Phàm Nhân → Luyện Khí → Trúc Cơ → Kim Đan → Nguyên Anh → Hóa Thần → Hợp Thể → Đại Thừa → Tiên Nhân
- **XP System**: Base XP + SLA bonuses - penalties with role multipliers
- **Special States**: 
  - Tam Ma (Tâm Ma): 50% XP penalty
  - Do Kiep (Độ Kiếp): 2x XP multiplier (high risk/high reward)
- **Dashboard**: Real-time stats, XP bar, level ring, aura effects
- **Leaderboard**: Compare progress with other cultivators
- **Tickets**: Track SLA compliance and resolution times
- **Knowledge Base**: Passive XP from views, likes, comments

---

## Version History Summary

| Version | Date | Key Changes |
|---------|------|-------------|
| 1.0.0 | 2024-04-10 | Initial Release |
| Unreleased | TBD | Testing infrastructure, enhanced docs |
