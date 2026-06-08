const formatDate = (dateStr) => {
  if (!dateStr || dateStr === 'N/A') return '2000-01-01'; // Safe default
  const str = String(dateStr).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  
  // Check for DD-MM-YYYY or MM-DD-YYYY
  const match = str.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (match) {
    const part1 = parseInt(match[1], 10);
    const part2 = parseInt(match[2], 10);
    
    // If part2 is > 12, it MUST be MM-DD-YYYY (e.g., 05-30-1970)
    if (part2 > 12) {
      return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
    }
    // If part1 is > 12, it MUST be DD-MM-YYYY (e.g., 30-05-1970)
    if (part1 > 12) {
      return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
    }
    // If ambiguous (like 05-06-1970), assume DD-MM-YYYY based on standard Indian formats
    return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  return str;
};

console.log('30-05-1970 ->', formatDate('30-05-1970'));
console.log('06-07-1977 ->', formatDate('06-07-1977'));
console.log('undefined ->', formatDate());
console.log('N/A ->', formatDate('N/A'));
