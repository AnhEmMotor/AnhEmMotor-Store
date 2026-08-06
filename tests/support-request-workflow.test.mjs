import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const repository = read(
  "app/core/infrastructure/repositories/contact.repository.js",
);
const store = read("app/stores/contact.store.js");
const page = read("app/pages/support.vue");
const tracker = read("app/components/support/RequestTracker.vue");

assert.match(repository, /support-request\/\$\{id\}\/tracking/);
assert.match(repository, /support-request\/\$\{id\}\/customer-rating/);
assert.match(store, /anhem-support-tracking/);
assert.match(store, /async fetchTracking\(\)/);
assert.match(store, /async rateEmployee\(rating, comment\)/);
assert.match(page, /<SupportRequestTracker/);
assert.match(tracker, /Đã tiếp nhận/);
assert.match(tracker, /Đã phân công/);
assert.match(tracker, /Đang hỗ trợ/);
assert.match(tracker, /Hoàn tất/);
assert.match(tracker, /Đánh giá nhân viên hỗ trợ/);
assert.match(tracker, /Lịch sử đánh giá/);
assert.match(tracker, /customerRatedAt/);
assert.doesNotMatch(tracker, /<textarea/);
assert.doesNotMatch(tracker, /const comment = ref/);
