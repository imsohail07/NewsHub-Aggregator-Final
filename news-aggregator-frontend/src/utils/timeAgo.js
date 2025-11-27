export function timeAgo(dateStr){
  if(!dateStr) return '';
  const d = new Date(dateStr);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals = [
    ['y', 31536000],
    ['mo', 2592000],
    ['d', 86400],
    ['h', 3600],
    ['m', 60],
    ['s', 1],
  ];
  for(const [unit, sec] of intervals){
    const val = Math.floor(seconds / sec);
    if(val > 0) return `${val}${unit} ago`;
  }
  return 'just now';
}
