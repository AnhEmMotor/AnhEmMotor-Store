// Render markdown cho bong bóng chat AI — cùng thư viện `marked` đang dùng ở
// AnhEmMotor-Management/src/components/business/chat/ChatDrawer.vue, để nhất quán cách xử lý markdown
// giữa 2 frontend.
import { marked } from "marked";

marked.setOptions({ breaks: true });

// Khác với ChatDrawer.vue (nội bộ, đã đăng nhập): persona "store" công khai không cần đăng nhập, tool
// result có thể bị injection (xem AISidecar/app/guardrails/tool_guard.py) dụ AI in ra HTML — escape
// trước khi đưa qua marked để không render thẳng thẻ HTML nào từ nội dung AI (rủi ro XSS).
const escapeHtml = (text) =>
	text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const renderChatMarkdown = (text) => (text ? marked.parse(escapeHtml(text)) : "");
