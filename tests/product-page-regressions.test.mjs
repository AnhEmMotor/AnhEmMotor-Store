import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('installment consultation CTA navigates to customer support', () => {
  const salesEnablers = read('app/components/index/SalesEnablers.vue');

  assert.match(salesEnablers, /<NuxtLink\s+to="\/support"[^>]*>\s*Liên hệ tư vấn trả góp/s);
});

test('brand filter is derived from products available in the selected category', () => {
  const sidebar = read('app/components/product/ProductFilterSidebar.vue');

  assert.match(sidebar, /brands:\s*\[\.\.\.brandsById\.values\(\)\]/);
  assert.match(sidebar, /filterFacetsData\.value\?\.brands/);
  assert.doesNotMatch(sidebar, /productStore\.getBrands/);
});
