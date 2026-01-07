import axios from 'axios';

interface GeocodingResult {
  lat: number;
  lng: number;
}

export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!apiKey || apiKey === 'YOUR_SERVER_API_KEY_HERE') {
    console.error('Google Maps Server API key is not configured.');
    // In a real app, you might want to throw an error or handle this differently.
    return null;
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { data } = response;

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.warn(`Geocoding failed for address "${address}": ${data.status}`);
      if (data.error_message) {
        console.warn(`Google API Error: ${data.error_message}`);
      }
      return null;
    }
  } catch (error) {
    console.error(`An error occurred during geocoding for address "${address}":`, error);
    return null;
  }
}
