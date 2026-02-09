
import React, { useState, useRef } from 'react';
import { BusinessCard } from '../types';
import { MOCK_CONTACTS } from '../constants';

interface CardDetailPageProps {
  card: BusinessCard | null;
  onEdit: () => void;
  onPreview: () => void;
  onDigitalTwin: () => void;
  onViewContact: (contact: BusinessCard) => void;
  onBack: () => void;
}

const CardDetailPage: React.FC<CardDetailPageProps> = ({ card, onEdit, onPreview, onDigitalTwin, onViewContact, onBack }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWechatModal, setShowWechatModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const qrInputRef = useRef<HTMLInputElement>(null);

  const filteredContacts = MOCK_CONTACTS.filter(contact => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.organization.toLowerCase().includes(term) ||
      contact.position.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in fade-in duration-500 overflow-hidden relative font-sans">
      {/* 顶部导航 */}
      <div className="flex items-center p-6 bg-white z-20 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-800 hover:text-blue-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center mr-6 text-gray-900">我的名片</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 名片预览展示 - 区分已创建和未创建状态 */}
        {card ? (
          <div 
            className="w-full aspect-[1.6/1] rounded-3xl overflow-hidden shadow-xl relative ring-1 ring-black/5"
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
                <div className="space-y-1.5 min-w-0 flex-1">
                   <div className="flex items-center gap-2 text-[10px] font-bold opacity-90 truncate">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      {card.phone}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold opacity-80 truncate">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path></svg>
                      {card.email}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold opacity-80 truncate">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                      <span className="truncate">{card.region} {card.address}</span>
                   </div>
                </div>
                
                {/* 二维码区域 */}
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 p-1 flex items-center justify-center shrink-0 shadow-sm ml-2">
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
        ) : (
          /* 未新建名片时的虚线框状态 */
          <div 
            onClick={onEdit}
            className="w-full aspect-[1.6/1] rounded-3xl border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
               </svg>
            </div>
            <p className="text-lg font-black text-gray-800">立即新建名片</p>
            <p className="text-xs text-gray-400 mt-2">创建您的专业形象，开启商务社交新方式</p>
          </div>
        )}

        {/* 核心操作按钮 */}
        <div className="grid grid-cols-2 gap-3">
           <button 
             onClick={() => setShowWechatModal(true)}
             className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all group"
           >
             <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.27 10.15a.9.9 0 100-1.79.9.9 0 000 1.79zm7.46 0a.9.9 0 100-1.79.9.9 0 000 1.79zM12 4.1a8.55 8.55 0 00-8.6 8.3c0 1.55.43 3.01 1.2 4.26L3.5 19.5l3.15-1.01A8.53 8.53 0 0012 20.7a8.55 8.55 0 008.6-8.3 8.55 8.55 0 00-8.6-8.3zm0 14.8c-1.35 0-2.61-.35-3.7-.97l-2.14.68.7-2.07A6.74 6.74 0 015.1 12.4a6.79 6.79 0 0113.8 0 6.79 6.79 0 01-6.9 6.5zm7.3-8.86a.65.65 0 100-1.3.65.65 0 000 1.3z" /></svg>
             </div>
             <span className="text-[10px] font-bold text-gray-600">微信二维码</span>
           </button>
           <button 
             onClick={() => setShowShareModal(true)}
             className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all group"
           >
             <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
             </div>
             <span className="text-[10px] font-bold text-gray-600">分享名片</span>
           </button>
        </div>

        {/* 数字分身入口 */}
        <button 
          onClick={onDigitalTwin}
          className="w-full relative overflow-hidden p-6 rounded-[2.5rem] bg-gradient-to-r from-gray-900 to-blue-900 text-white flex items-center justify-between shadow-xl active:scale-95 transition-all group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.5),transparent)] opacity-40"></div>
          <div className="relative z-10 flex items-center gap-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:rotate-12 transition-transform duration-500">
               <svg className="w-7 h-7 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 104.1 0h-4.1z" clipRule="evenodd" /></svg>
             </div>
             <div className="text-left">
               <p className="text-base font-black tracking-wide">生成我的数字分身</p>
               <p className="text-[10px] text-white/50 font-medium">基于AI技术的虚拟社交名片</p>
             </div>
          </div>
          <svg className="w-6 h-6 text-white/30 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        {/* 我收到的名片列表 */}
        <div className="mt-8 space-y-4">
           <div className="flex items-center gap-2 ml-1">
             <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
             <h3 className="text-sm font-black text-gray-800">我收到的名片</h3>
           </div>
           
           <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索姓名、公司名称、职务" 
                className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-500/5 outline-none text-[11px] font-medium transition-all placeholder:text-gray-400 shadow-sm"
              />
           </div>

           <div className="space-y-3">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    onClick={() => onViewContact(contact)}
                    className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] group"
                  >
                    <img src={contact.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={contact.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-800 truncate group-hover:text-blue-600 transition-colors">{contact.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium truncate">{contact.organization} · {contact.position}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-400 text-xs font-medium">未找到相关名片</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* 微信二维码弹框 */}
      {showWechatModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 animate-in zoom-in duration-300 flex flex-col items-center">
             <div className="w-full flex justify-end mb-2">
               <button onClick={() => setShowWechatModal(false)} className="text-gray-400 p-1 hover:text-gray-600 transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
             </div>
             <div className="w-48 h-48 bg-gray-50 rounded-3xl p-4 border border-gray-100 mb-6 relative overflow-hidden">
                <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden rounded-xl border-2 border-green-500/20 shadow-inner">
                   {card?.wechatId ? (
                     <img src={card.wechatId} className="w-full h-full object-cover" alt="My WeChat QR" />
                   ) : (
                     <>
                       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #22c55e 0, #22c55e 2px, transparent 0, transparent 4px)', backgroundSize: '10px 10px' }}></div>
                       <svg className="w-32 h-32 text-green-500 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M8.27 10.15a.9.9 0 100-1.79.9.9 0 000 1.79zM12 4.1a8.55 8.55 0 00-8.6 8.3c0 1.55.43 3.01 1.2 4.26L3.5 19.5l3.15-1.01A8.53 8.53 0 0012 20.7a8.55 8.55 0 008.6-8.3 8.55 8.55 0 00-8.6-8.3z" />
                       </svg>
                     </>
                   )}
                </div>
             </div>
             
             <p className="text-sm font-black text-gray-800 mb-6">扫一扫，加我微信</p>
             
             {/* 新增上传按钮 */}
             <button 
               onClick={() => {
                 setShowWechatModal(false);
                 onEdit(); // 跳转到编辑页面去上传
               }}
               className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
               上传微信二维码
             </button>
          </div>
        </div>
      )}

      {/* 分享弹窗 */}
      {showShareModal && card && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">分享名片</h3>
                <button onClick={() => setShowShareModal(false)} className="p-2 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
             </div>

             {/* 名片预览图 */}
             <div className="w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-lg mb-4 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.background})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                   <p className="text-lg font-bold">{card.name}</p>
                   <p className="text-xs opacity-90">{card.position} · {card.organization}</p>
                </div>
             </div>
             
             <p className="text-center text-xs text-gray-400 mb-8 font-medium">长按图片分享给好友</p>

             <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { icon: '📱', name: '生成海报', color: 'bg-orange-50' },
                  { icon: '💾', name: '保存图片', color: 'bg-blue-50' },
                  { icon: '💬', name: '微信好友', color: 'bg-green-50' },
                  { icon: '🎡', name: '朋友圈', color: 'bg-red-50' }
                ].map(opt => (
                  <button key={opt.name} className="flex flex-col items-center gap-2 group">
                    <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-2xl group-active:scale-90 transition-transform`}>
                      {opt.icon}
                    </div>
                    <span className="text-[11px] font-bold text-gray-500">{opt.name}</span>
                  </button>
                ))}
             </div>
             <button 
               onClick={() => setShowShareModal(false)}
               className="w-full py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl text-sm"
             >
               取消
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetailPage;
