
import React, { useState, useEffect, useRef } from 'react';
import { BusinessCard } from '../types';

interface CardPreviewProps {
  card: BusinessCard;
  mode?: 'own' | 'received';
  onConfirm: (card: BusinessCard) => void;
  onBack: () => void;
  onGoToMyCard?: () => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, mode = 'own', onConfirm, onBack, onGoToMyCard }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWechatModal, setShowWechatModal] = useState(false);
  
  const isOwn = mode === 'own';

  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-hidden relative">
      {/* 顶部导航 */}
      <div className="flex items-center p-6 border-b border-gray-100 shrink-0 bg-white z-30">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center mr-6 text-gray-900">
          {isOwn ? '预览名片' : '名片详情'}
        </h1>
      </div>

      <div className={`flex-1 overflow-y-auto px-6 py-6 space-y-8 ${isOwn ? 'pb-40' : 'pb-10'}`}>
        {/* 1. 名片预览 */}
        <div 
          className="w-full aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl relative ring-1 ring-black/5 animate-in zoom-in duration-500"
          style={{ 
            backgroundImage: `url(${card.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent"></div>
          <div className="relative h-full p-6 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-2xl font-black tracking-wider truncate">{card.name}</h2>
                <div className="w-8 h-[1px] bg-white/40 my-2"></div>
                <p className="text-sm font-bold text-white/90 uppercase tracking-widest truncate">{card.position}</p>
                <p className="text-xs text-white/70 mt-1 font-medium truncate">{card.organization}</p>
              </div>
              <img src={card.avatar} className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg shrink-0" alt="Avatar" />
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 text-[10px] font-bold opacity-90">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    {card.phone}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path></svg>
                    {card.email}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    <span className="truncate">{card.region} {card.address}</span>
                 </div>
              </div>
              
              {/* 二维码展示区 */}
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 p-1 flex items-center justify-center shrink-0 shadow-sm">
                {card.wechatId ? (
                  <img src={card.wechatId} className="w-full h-full object-cover rounded-lg" alt="QR" />
                ) : (
                  <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2z"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. 按钮区域 - 样式完全统一 */}
        <div className="flex gap-3">
           {!isOwn && (
             <>
               <button 
                 onClick={() => alert('已收藏到我收到的名片')}
                 className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 active:scale-95 transition-all shadow-sm group hover:bg-white hover:shadow-md"
               >
                 <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-500 mb-1 group-hover:scale-110 transition-transform">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                 </div>
                 <span className="text-[10px] font-bold">收藏名片</span>
               </button>

               <button 
                 onClick={() => setShowWechatModal(true)}
                 className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 active:scale-95 transition-all shadow-sm group hover:bg-white hover:shadow-md"
               >
                 <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-500 mb-1 group-hover:scale-110 transition-transform">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.27 10.15a.9.9 0 100-1.79.9.9 0 000 1.79zm7.46 0a.9.9 0 100-1.79.9.9 0 000 1.79zM12 4.1a8.55 8.55 0 00-8.6 8.3c0 1.55.43 3.01 1.2 4.26L3.5 19.5l3.15-1.01A8.53 8.53 0 0012 20.7a8.55 8.55 0 008.6-8.3 8.55 8.55 0 00-8.6-8.3zm0 14.8c-1.35 0-2.61-.35-3.7-.97l-2.14.68.7-2.07A6.74 6.74 0 015.1 12.4a6.79 6.79 0 0113.8 0 6.79 6.79 0 01-6.9 6.5zm7.3-8.86a.65.65 0 100-1.3.65.65 0 000 1.3z" /></svg>
                 </div>
                 <span className="text-[10px] font-bold">微信二维码</span>
               </button>

               <button 
                 onClick={() => setShowShareModal(true)}
                 className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 active:scale-95 transition-all shadow-sm group hover:bg-white hover:shadow-md"
               >
                 <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mb-1 group-hover:scale-110 transition-transform">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                 </div>
                 <span className="text-[10px] font-bold">分享名片</span>
               </button>

               <button 
                 onClick={() => onGoToMyCard?.()}
                 className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 active:scale-95 transition-all shadow-sm group hover:bg-white hover:shadow-md"
               >
                 <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500 mb-1 group-hover:scale-110 transition-transform">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                 </div>
                 <span className="text-[10px] font-bold">我的名片</span>
               </button>
             </>
           )}
        </div>

        {/* 确认生成按钮 - 仅在自己的预览模式下显示，且固定在底部 */}
        {isOwn && (
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-3xl border-t border-gray-100 z-40 pb-10 flex justify-center">
             <button 
               onClick={() => onConfirm(card)}
               className="w-full max-w-md py-4 bg-[#7786FE] rounded-2xl text-white shadow-xl shadow-[#7786FE]/30 active:scale-95 transition-all group flex items-center justify-center gap-2"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
               <span className="text-base font-bold tracking-widest">确认生成</span>
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
