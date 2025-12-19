export const getGoogleMapsLink = (iframeHtml) => {
  if (!iframeHtml) return 'https://maps.google.com';
  
  try {
    // Extract src from iframe
    const srcMatch = iframeHtml.match(/src="([^"]+)"/);
    if (!srcMatch) return 'https://maps.google.com';
    
    const src = srcMatch[1];
    
    // Extract place ID and name from the URL
    const placeIdMatch = src.match(/place\/([^/]+)/);
    const placeNameMatch = src.match(/[?&]q=([^&]+)/);
    
    if (placeIdMatch && placeNameMatch) {
      const placeId = placeIdMatch[1];
      const placeName = decodeURIComponent(placeNameMatch[1].replace(/\+/g, ' '));
      return `https://www.google.com/maps/place/${encodeURIComponent(placeName)}/@?entry=ttu&g_ep=CAESCTExLjQ4LjM4MhgA`;
    }
    
    // Fallback to direct link with coordinates if available
    const coordsMatch = src.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordsMatch) {
      const [_, lat, lng] = coordsMatch;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    // If we can't extract anything useful, return the src or default
    return src.startsWith('http') ? src : 'https://maps.google.com';
  } catch (error) {
    return 'https://maps.google.com';
  }
};
