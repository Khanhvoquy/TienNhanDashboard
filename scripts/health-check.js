// Script kiểm tra tính toàn vẹn file cấu trúc
const fs = require('fs');
const path = require('path');
const requiredFiles = [
'src/app/layout.tsx',
'src/lib/gamification/calculator.ts',
'src/store/useDashboardStore.ts',
'tailwind.config.ts',
'middleware.ts'
];
console.log('🏥 Đang khám sức khỏe dự án...');
let healthy = true;
requiredFiles.forEach(file => {
const fullPath = path.join(process.cwd(), file);
if (!fs.existsSync(fullPath)) {
console.error(❌ Thiếu huyệt đạo quan trọng: ${file});
healthy = false;
} else {
console.log(✅ Huyệt đạo ${file} thông suốt.);
}
});
if (healthy) {
console.log('✅ Cơ thể cường tráng, sẵn sàng đột phá!');
process.exit(0);
} else {
console.error('❌ Cơ thể tổn thương, cần hàn gắn trước khi tu luyện.');
process.exit(1);
}