import React from 'react';

const BrandIdentity = () => {
  return (
    <section className="w-full mt-16 p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFF9F8 0%, #F0F9F9 100%)' }}>
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #FF5A36 0%, #FFC700 100%)' }}>
          맛포서울 | Tasty 4 Seoul
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-[#FF5A36]">마포의 맛</span>을 오감으로 느끼는 특별한 여정,{' '}
            <span className="font-semibold text-[#008080]">현지인만 아는 진짜 맛집</span>으로 여러분을 초대합니다.
          </p>
          
          <div className="py-4 px-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-700 italic mb-2">"오늘 뭐 먹지? 맛포서울에게 물어봐"</p>
            <p className="text-gray-500 text-sm">Taste Mapo, Live like a Local.</p>
            <div className="flex items-center gap-2 mt-6 justify-center">
              <a 
                href="https://www.instagram.com/runtastygood?igsh=MTN3MW9xdThpZzN1eQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 !text-pink-600 !hover:text-pink-700 transition-colors"
                aria-label="Instagram @runtastygood"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="ml-1">@runtastygood</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ backgroundColor: 'rgba(255, 90, 54, 0.1)' }}>
                <span className="text-2xl" style={{ color: '#FF5A36' }}>📍</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">The Mapo Pin</h4>
              <p className="text-sm text-gray-600">지도와 미식이 만나는 특별한 핀</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ backgroundColor: 'rgba(0, 128, 128, 0.1)' }}>
                <span className="text-2xl" style={{ color: '#008080' }}>🌆</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Urban Flavor</h4>
              <p className="text-sm text-gray-600">도시의 활기와 골목의 아늑함</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ backgroundColor: 'rgba(255, 199, 0, 0.1)' }}>
                <span className="text-2xl" style={{ color: '#FFC700' }}>✨</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Hidden Gems</h4>
              <p className="text-sm text-gray-600">현지인만 아는 진짜 맛집</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIdentity;
