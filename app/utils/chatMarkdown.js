import { marked } from 'marked';

marked.setOptions({ breaks: true });

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const renderChatMarkdown = (text) => (text ? marked.parse(escapeHtml(text)) : '');
