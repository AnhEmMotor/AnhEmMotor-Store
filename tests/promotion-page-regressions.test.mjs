import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('promotion tabs filter by category without dropping the featured promotion', () => {
  const page = read('app/pages/promotion/index.vue');

  assert.match(
    page,
    /promotionStore\.promotions\.filter\(\s*\(promotion\)\s*=>\s*promotion\.category === activeTab\.value\s*\)/s
  );
  assert.match(page, /if \(activeTab\.value !== 'all'\) return all/);
  assert.doesNotMatch(page, /promotionStore\.promotions\.slice\(0, 3\)/);
});

test('promotion detail calls to action navigate to customer support', () => {
  const hero = read('app/components/promotion/PromotionDetailHero.vue');
  const stickyCta = read('app/components/promotion/PromotionStickyCTA.vue');

  assert.match(hero, /<NuxtLink\s+to="\/support"[^>]*>[\s\S]*?Đăng ký nhận ưu đãi ngay/);
  assert.equal(stickyCta.match(/<NuxtLink\s+to="\/support"/g)?.length, 3);
});

test('promotion banner decoration does not block its calls to action', () => {
  const banner = read('app/components/promotion/PromotionBanner.vue');

  assert.match(banner, /bottom-0 left-0 w-full h-40[^"\n]*pointer-events-none/);
});
