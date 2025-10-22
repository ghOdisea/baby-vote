// Convierte "ES" → 🇪🇸 usando Regional Indicator Symbols
export function countryCodeToFlagEmoji(code: string): string {
    if (!code) return '';
        const cc = code.trim().toUpperCase();
        
    if (cc.length !== 2) return '';
        const A = 0x41, REGIONAL = 0x1F1E6; // 'A'
        const chars = Array.from(cc).map(ch => String.fromCodePoint(REGIONAL + (ch.charCodeAt(0) - A)));
    return chars.join('');
}