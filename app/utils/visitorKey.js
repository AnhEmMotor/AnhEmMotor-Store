const VISITOR_KEY_STORAGE = 'store_chat_visitor_key';

export function getOrCreateVisitorKey() {
  let key = localStorage.getItem(VISITOR_KEY_STORAGE);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY_STORAGE, key);
  }
  return key;
}

// Khách bấm "Xoá cuộc trò chuyện" — luôn cấp key mới, để phiên cũ không còn được tham chiếu nữa.
export function resetVisitorKey() {
  const key = crypto.randomUUID();
  localStorage.setItem(VISITOR_KEY_STORAGE, key);
  return key;
}
