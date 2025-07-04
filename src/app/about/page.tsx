import HeroClientWrapper from '@/shared/ui/HeroClientWrapper';
import { Metadata } from 'next';
import BrandIdentity from '@/shared/ui/BrandIdentity';

export const metadata: Metadata = {
  title: 'About | Taste for Seoul',
  description: '서울 마포구에 사는 현지인이 직접 경험하고 기록하는 맛집 블로그입니다.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
        <header className="text-center mb-12">
          <HeroClientWrapper />
        </header>
      <main className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          
          {/* Introduction Section */}
          <section className="text-center mb-12 border-b pb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Taste for Seoul
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              서울 마포구에 사는 현지인이 포스팅하는 맛집 블로그입니다.
            </p>
            <p>This blog is all about delicious restaurants in Seoul's Mapo-gu district (around), as recommended by a local resident. We give you the chance to visit, sample the food and experience Seoul for yourself.</p>
            <div className="flex items-center gap-2 mt-6 justify-center">
              <span>contact us :</span>
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
          </section>

          {/* About Me Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Hojun Lee</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Role:</strong> Software Engineer</li>
              <li><strong>Email:</strong> ho2yahh@gmail.com</li>
              <li><strong>GitHub:</strong> <a href="https://github.com/hozunlee" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/hozunlee</a></li>
              <li><strong>Portfolio:</strong> <a href="https://www.notion.so/d1c9010f0e7643a683283ab3a2b01931" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">My Tech Story (Notion)</a></li>
              <li><strong>Property Tools:</strong> <a href="https://house.hololog.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">house.hololog.dev</a></li>
            </ul>
          </section>

          {/* HOLO + LOG Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">HOLO + LOG란?</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>(holo)</strong> 비교할 수 없는 기술과 <strong>(log)</strong> 읽고 싶은 기록, 그리고 쓸모있는 비즈니스를 만드는 일에 대한 글을 쓰는 블로그입니다. 영업, 기획자, 콘텐츠 마케터를 거쳐 풀스택 개발자의 길을 걸어가고 있습니다.
            </p>
          </section>

          {/* Brand Story Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">BRAND STORY</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🚀 효율성</h3>
                <p className="text-gray-700 leading-relaxed">
                  우리는 기술 및 개발 지식을 효율적이고 탐색하기 쉽게 구성하는 것을 우선시합니다. 개발자가 새로운 아이디어와 솔루션을 찾아내는 데 필요한 정보를 명확하게 제공합니다.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🤝 포괄성</h3>
                <p className="text-gray-700 leading-relaxed">
                  hololog는 모든 배경과 기술 수준의 개발자에게 열려있다는 믿음으로, 모든 사람이 접근할 수 있는 플랫폼을 만들고 있습니다. 경험 수준에 관계없이 모든 사람들을 환영하며, 지속적인 학습과 성장을 지원하는 환경을 제공합니다.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 혁신</h3>
                <p className="text-gray-700 leading-relaxed">
                  개발자가 고정된 생각에서 벗어나 창의적으로 생각할 수 있도록 지지합니다. 쓸모있는 기술을 바탕으로, 새로운 아이디어에 대한 모험적인 탐구를 함께합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Brand Identity Section */}
          <BrandIdentity />

        </div>
      </main>
    </div>
  );
}
