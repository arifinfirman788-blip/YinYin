
import React, { useState, useEffect, useRef } from 'react';
import { BusinessCard } from '../types';
import { GoogleGenAI } from "@google/genai";

interface CardPreviewProps {
  card: BusinessCard;
  mode?: 'own' | 'received';
  onConfirm: (card: BusinessCard) => void;
  onBack: () => void;
  onGoToMyCard?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, mode = 'own', onConfirm, onBack, onGoToMyCard }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `您好！我是黄小西，任何关于贵州旅游的问题都可以问我哦！` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWechatModal, setShowWechatModal] = useState(false);
  
  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')?.text || "";

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `你叫黄小西，是LocalPro Connect的AI助手，也是贵州旅游达人。用户现在的名片信息是：姓名 ${card.name}, 职位 ${card.position}, 公司 ${card.organization}。用户说：${userMsg}` }]
          }
        ],
        config: {
          systemInstruction: "你是一个热情、专业的社交及贵州旅游助手黄小西。语气要轻快、幽默，多使用表情符号。你的回复要简短，适合放在对话气泡里。如果用户询问旅游建议，请提供地道的贵州当地推荐。"
        }
      });

      const aiText = response.text || "哎呀，刚才走神了，再说一遍好吗？";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "哎呀，信号不太好，我没听清楚..." }]);
    } finally {
      setIsTyping(false);
    }
  };

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
           {isOwn ? (
             <button 
               onClick={() => onConfirm(card)}
               className="flex-1 flex flex-col items-center justify-center py-4 bg-blue-600 rounded-2xl border border-blue-600 text-white active:scale-95 transition-all shadow-lg shadow-blue-200"
             >
               <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
               <span className="text-sm font-black uppercase tracking-widest">确认生成</span>
             </button>
           ) : (
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

        {/* 3. AI 角色与气泡对话区域 - Only for 'own' mode */}
        {isOwn && (
          <div className="relative pt-6 flex flex-col items-center">
             {/* 对话气泡 */}
             <div className="relative mb-6 w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white px-8 py-7 rounded-[3rem] shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-100 relative z-10 max-w-[92%] min-h-[110px] flex items-center justify-center">
                  <p className="text-lg font-black text-gray-800 leading-relaxed text-center">
                     {isTyping ? "黄小西正在思考中..." : lastAssistantMessage}
                  </p>
                  <div className="absolute -bottom-4 right-1/4 w-8 h-8 bg-white border-r border-b border-gray-100 transform rotate-[35deg] z-0"></div>
                </div>
             </div>

             {/* AI 角色形象 */}
             <div className="relative w-full h-40 flex justify-end pr-10 mt-2">
                <div className="w-56 h-full relative group">
                   <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-2xl overflow-visible">
                      <path d="M40 100 Q70 50 160 70 Q200 80 200 110 L40 110 Z" fill="#F87171" />
                      <circle cx="125" cy="65" r="38" fill="#FFE4E6" />
                      <path d="M85 55 Q125 0 165 55" stroke="#E2E8F0" strokeWidth="14" fill="none" strokeLinecap="round" />
                      <circle cx="125" cy="30" r="6" fill="white" stroke="#CBD5E1" strokeWidth="1" />
                      <circle cx="112" cy="70" r="4.5" fill="#3F3F46" />
                      <circle cx="138" cy="70" r="4.5" fill="#3F3F46" />
                      <circle cx="100" cy="80" r="6" fill="#F472B6" opacity="0.4" />
                      <circle cx="150" cy="80" r="6" fill="#F472B6" opacity="0.4" />
                      <path d="M120 85 Q125 90 130 85" stroke="#3F3F46" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d="M105 100 Q115 88 125 100" stroke="#FFE4E6" strokeWidth="7" fill="none" strokeLinecap="round" />
                      <path d="M145 100 Q135 88 125 100" stroke="#FFE4E6" strokeWidth="7" fill="none" strokeLinecap="round" />
                   </svg>
                   <div className="absolute -top-4 left-6 animate-pulse text-2xl">☁️</div>
                   <div className="absolute top-8 -right-2 animate-bounce text-xl">✨</div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* 4. 底部输入框 - Only for 'own' mode */}
      {isOwn && (
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-3xl border-t border-gray-100 z-40 pb-10">
          <div className="max-w-md mx-auto flex items-center gap-3">
             {/* 语音输入按钮 */}
             <button 
               onClick={() => alert('语音输入功能正在接入中...')}
               className="h-12 w-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-sm shrink-0 border border-gray-100"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 10v2a7 7 0 01-14 0v-2M12 18.5V22M8 22h8" />
               </svg>
             </button>

             {/* 输入框 */}
             <div className="flex-1 flex items-center">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="对黄小西说点什么..."
                  className="h-12 w-full px-6 bg-gray-100 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
             </div>

             {/* 发送按钮 */}
             <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-30 shrink-0"
             >
                <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPreview;
