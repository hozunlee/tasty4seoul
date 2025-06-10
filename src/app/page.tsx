'use client';

import { Hero } from '@/shared/ui/hero-anime';

export default function Home() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="@container py-2">

        <div className="mb-2">
        <Hero />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 px-4">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
            {[
              {
                id: 1,
                title: "Exploring the Hidden Gems of Jeju Island",
                description: "Uncover the natural beauty and unique culture of Jeju.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARHcQiWiFLCb-qfH8Bbg1hpw4va5A6WO7ymoDCBnxNXqWs9_TFywJ8-P67NEDRkf-dkEMIGwFNeDv-VMzMk_urBfGjkW8XU6oAcuLEXn6ghVveIcHD9GhzAuNUH-U14H7TrmdjimkAK54Xh75oqte0mcCBC5GrAih75OOQ7xBy0Ux4m94PSocGyGwyh0Fjw13uPf0pqcAhZLczDjF4x-drlE-WKhw-Sg2KGuEtcw5dToFR59B3xd0L7qv5d2qTTUuu7gxEQIL-15XK"
              },
              {
                id: 2,
                title: "A Guide to Seoul's Best Street Food",
                description: "Taste the flavors of Seoul with our top picks.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJtn-NdxOPyg9Kgzwl0ERasQoo_nZOF5PzYrvFoE7tHq68-SiTU_8cIXYyATRk4ITSokVwABRIQELnM6xaPupmWEzBB12lrg--wKC50RQRmSyoQx29m_5guhmx1KiOTfU-mvifaxobAcgzYv6udRO6Nlz9aB2Vy52rldR1XXmu8sLcIbDhzASRIGKbQr4HV4M8PKCoP6nEUcut7L3xMdzoxYtSguzwH1CivLm60D_IQdkHWcLv_b39JHumjQxWC0vCJ2eOwRp69iA9"
              },
              {
                id: 3,
                title: "Discovering the Ancient Temples of Gyeongju",
                description: "Step back in time with a visit to Gyeongju's temples.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEzHB9dZSyXB1xk7Qs2FHxCldkMResg07HBAxrfc3_prvD-dajMfi0vrrBkRJS_RoaoQdhF6aEQXWR1O_-9ngspInThNXcOIRXjURnqgKJJj3vr2zPQHvHqccHIthHucpYt_Xhl1C-BXdkA4LXJqoQYAHQXYE8ZatXuDa01irjkL1qEF_1xTfqkHn811T0570SZXnviGuaMFFiRs264VAqUPwN0g2H3dxp3_hSD_Ta5N6QpaLcL3INylBOqKl7MEHxj2rCmkf2wE_N"
              },
              {
                id: 4,
                title: "Hiking in the Korean Alps",
                description: "Experience the breathtaking scenery of the Korean Alps.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7d6I-kD9-jPsgJdU4GJ53cibukNcREj2PZTyRmJmdQP7cXrx-028auAEzFt8T2LfzRmzLGpEQTO4E5miBq4vw-B3CLVEONqI3q4GlUIMxAiTM69dPrnsx8E6AM488jHbQWw1ZJ2QHv48o9X5XbmAWCA_d78WBbQxApaGudxS8yl_D61oLa8ojlbxLTgmt_vnQXLFti6xTAr6Wdd28Yfsiar3PSlVx23NVI_H0PMug9KEGwnhK4xcuo7GuAzXkqVwI8nZdOLMoCSdg"
              }
            ].map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-3">
                  <div 
                    className="w-full aspect-video bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}