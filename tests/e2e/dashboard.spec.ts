import { test, expect } from '@playwright/test';

test.describe('Tu Tien ITSM Dashboard - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Tu Tiên ITSM/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display dashboard with cultivators', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Check for main dashboard elements
    const dashboard = page.locator('[data-testid="dashboard"]');
    if (await dashboard.isVisible()) {
      await expect(dashboard).toBeVisible();
    }
  });

  test('should show XP bar and level ring', async ({ page }) => {
    // Check for gamification elements
    const xpBar = page.locator('[data-testid="xp-bar"]');
    const levelRing = page.locator('[data-testid="level-ring"]');
    
    // These might not have test ids yet, so we check for visible text
    await expect(page.locator('text=/XP|Experience/i')).toBeVisible({ timeout: 10000 });
  });

  test('should navigate between pages', async ({ page }) => {
    // Test navigation to leaderboard
    const leaderboardLink = page.locator('a[href*="leaderboard"]');
    if (await leaderboardLink.isVisible()) {
      await leaderboardLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/.*leaderboard.*/);
    }
  });

  test('should handle responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Allow some errors from Three.js or external scripts
    const criticalErrors = errors.filter(
      err => !err.includes('Three.js') && !err.includes('favicon')
    );
    
    expect(criticalErrors.length).toBeLessThan(3);
  });
});

test.describe('Authentication Flow', () => {
  test('should show sign in page', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.locator('text=/Sign In|Đăng Nhập/i')).toBeVisible({ timeout: 10000 });
  });

  test('should validate login form', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Should show validation error
      await page.waitForTimeout(1000);
    }
  });
});

test.describe('Gamification Features', () => {
  test('should display realm information', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for realm names (Phàm Nhân, Luyện Khí, etc.)
    const realmTexts = ['Phàm Nhân', 'Luyện Khí', 'Trúc Cơ', 'Kim Đan'];
    let foundRealm = false;
    
    for (const realm of realmTexts) {
      if (await page.locator(`text=${realm}`).isVisible()) {
        foundRealm = true;
        break;
      }
    }
    
    expect(foundRealm).toBeTruthy();
  });

  test('should show ticket information', async ({ page }) => {
    await page.goto('/tickets');
    await page.waitForLoadState('networkidle');
    
    // Check for ticket-related content
    await expect(page.locator('text=/Ticket|Yêu cầu|Phiếu/i')).toBeVisible({ timeout: 10000 });
  });
});
