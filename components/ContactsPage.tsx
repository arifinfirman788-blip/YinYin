
import React from 'react';

interface ContactsPageProps {
  onBack: () => void;
}

const ContactsPage: React.FC<ContactsPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <div className="flex items-center p-6 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center mr-6">通讯录</h1>
      </div>

      {/* 搜索框 */}
      <div className="px-6 py-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input 
            type="text" 
            placeholder="搜索名片..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* 中间放置插画装饰（黄小西IP） */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 pb-20">
        <div className="relative w-64 h-64 mb-8">
           {/* 模拟黄小西IP插画 */}
           <div className="absolute inset-0 bg-yellow-100 rounded-full opacity-20 animate-pulse"></div>
           <div className="absolute inset-4 bg-yellow-400 rounded-full overflow-hidden shadow-inner border-4 border-yellow-200">
              {/* 这里放 IP 形象的简化 SVG 或占位图 */}
              <svg className="w-full h-full text-yellow-600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#FBBF24" />
                <path d="M60 85C60 85 75 75 85 85" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
                <path d="M115 85C115 85 130 75 140 85" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
                <circle cx="80" cy="100" r="6" fill="#451A03" />
                <circle cx="120" cy="100" r="6" fill="#451A03" />
                <path d="M80 135C90 145 110 145 120 135" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
                <rect x="70" y="40" width="60" height="20" rx="10" fill="#451A03" opacity="0.1" />
              </svg>
           </div>
           {/* 装饰性元素 */}
           <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-2xl rotate-12 flex items-center justify-center shadow-sm">
             <span className="text-xl">📫</span>
           </div>
           <div className="absolute -bottom-2 -left-4 w-10 h-10 bg-purple-100 rounded-full -rotate-12 flex items-center justify-center shadow-sm">
             <span className="text-lg">✨</span>
           </div>
        </div>
        
        <h2 className="text-xl font-black text-gray-800 mb-2">黄小西在这里等你</h2>
        <p className="text-gray-400 text-sm text-center max-w-[200px] leading-relaxed">
          点击右上角分享你的名片，让更多小伙伴认识你吧！
        </p>
        
        <button className="mt-8 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black rounded-full shadow-lg shadow-yellow-200 active:scale-95 transition-all">
          分享我的名片
        </button>
      </div>
      
      <div className="p-8 text-center opacity-20">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">LocalPro IP Illustration v1.0</p>
      </div>
    </div>
  );
};

export default ContactsPage;
