
'use client';

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { Post } from '@/entities/post/model/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';

interface MapWithPostsProps {
  posts: Post[];
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = {
  lat: 37.5665,
  lng: 126.978,
};

interface Location {
  id: string;
  title: string;
  lat: number;
  lng: number;
}

// Geocoding 라이브러리를 명시적으로 포함합니다.
const LIBRARIES: ('geocoding')[] = ['geocoding'];

export function MapWithPosts({ posts }: MapWithPostsProps) {
  const router = useRouter();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const geocodePromises = posts
        .filter(post => post.address)
        .map(post => {
          return new Promise<Location | null>(resolve => {
            geocoder.geocode({ address: post.address! }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                resolve({
                  id: post.id,
                  title: post.title,
                  lat: location.lat(),
                  lng: location.lng(),
                });
              } else {
                console.error(
                  `Geocode failed for address "${post.address}" with status: ${status}`,
                );
                resolve(null);
              }
            });
          });
        });

      Promise.all(geocodePromises).then(results => {
        setLocations(
          results.filter((location): location is Location => location !== null),
        );
      });
    }
  }, [isLoaded, posts]);

  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      if (locations.length === 1) {
        mapRef.current.setCenter(locations[0]);
        mapRef.current.setZoom(14);
      } else {
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(location => {
          bounds.extend(
            new window.google.maps.LatLng(location.lat, location.lng),
          );
        });
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [locations]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = (id: string) => {
    router.push(`/blog/${id}`);
  };

  if (loadError) {
    return <div>Error loading maps. Please check the console.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialCenter}
      zoom={10}
      onLoad={onMapLoad}
    >
      {locations.map(location => (
        <Marker
          key={location.id}
          position={location}
          onClick={() => handleMarkerClick(location.id)}
          onMouseOver={() => setActiveMarker(location.id)}
          onMouseOut={() => setActiveMarker(null)}
        >
          {activeMarker === location.id && (
            <InfoWindow
              position={location}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div>{location.title}</div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}
