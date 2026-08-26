export const getColorBackground = (label) => {
  const lower = String(label).toLowerCase();
  
  if (lower.includes('đỏ') && lower.includes('đen')) return 'linear-gradient(135deg, #ef4444 50%, #111827 50%)';
  if (lower.includes('đỏ') && lower.includes('trắng')) return 'linear-gradient(135deg, #ef4444 50%, #ffffff 50%)';
  if (lower.includes('xanh') && lower.includes('đen') && lower.includes('dương')) return 'linear-gradient(135deg, #1d4ed8 50%, #111827 50%)';
  if (lower.includes('xanh') && lower.includes('đen') && (lower.includes('lá') || lower.includes('ngọc'))) return 'linear-gradient(135deg, #10b981 50%, #111827 50%)';
  if (lower.includes('xanh') && lower.includes('đen')) return 'linear-gradient(135deg, #3b82f6 50%, #111827 50%)';
  if (lower.includes('trắng') && lower.includes('đen')) return 'linear-gradient(135deg, #ffffff 50%, #111827 50%)';
  if (lower.includes('bạc') && lower.includes('đen')) return 'linear-gradient(135deg, #9ca3af 50%, #111827 50%)';
  if (lower.includes('xám') && lower.includes('đen')) return 'linear-gradient(135deg, #6b7280 50%, #111827 50%)';
  
  if (lower.includes('đỏ')) return '#ef4444';
  if (lower.includes('đen')) return '#111827';
  if (lower.includes('trắng')) return '#ffffff';
  if (lower.includes('xanh dương')) return '#1d4ed8';
  if (lower.includes('xanh lá') || lower.includes('xanh ngọc')) return '#10b981';
  if (lower.includes('vàng')) return '#f59e0b';
  if (lower.includes('bạc')) return '#9ca3af';
  if (lower.includes('xám')) return '#6b7280';
  if (lower.includes('cam')) return '#f97316';
  if (lower.includes('nâu')) return '#78350f';
  
  return '#e5e7eb';
};
