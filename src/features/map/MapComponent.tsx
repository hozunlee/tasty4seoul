'use client';

import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { Post } from '@/entities/post/model/types';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
};

const defaultCenter = {
  lat: 37.5665, // Seoul coordinates
  lng: 126.9780
};

interface MapComponentProps {
  posts: Post[];
}

export function MapComponent({ posts }: MapComponentProps) {
  // Filter posts with valid coordinates
  const markers = posts
    .filter(post => post.latitude && post.longitude)
    .map(post => ({
      id: post.id,
      title: post.title,
      position: {
        lat: parseFloat(post.latitude as string),
        lng: parseFloat(post.longitude as string)
      },
      address: post.address
    }));

  return (
    <div className="w-full">
      <div className="w-full h-full rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markers.length > 0 ? markers[0].position : defaultCenter}
            zoom={markers.length > 0 ? 13 : 12}
          >
            {markers.map((marker) => (
              <MarkerF
                key={marker.id}
                position={marker.position}
                title={marker.title}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
