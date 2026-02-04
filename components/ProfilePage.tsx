
import React from 'react';
import { Page, UserProfile, BusinessCard } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  myCard: BusinessCard | null;
  onNavigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, myCard, onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* 右上角按钮 */}
      <div className="flex justify-end p-5 space-x-6">
        <div className="relative cursor-pointer group" onClick={() => onNavigate(Page.CONTACTS)}>
          <svg className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="relative cursor-pointer group" onClick={() => onNavigate(Page.SETTINGS)}>
          <svg className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
          </svg>
        </div>
      </div>

      {/* 1. 个人信息区 */}
      <div className="px-6 flex items-start space-x-5 mt-2">
        <div className="relative flex-shrink-0">
          <img 
            src={user.avatar} 
            className="w-[18vw] h-[18vw] max-w-[80px] max-h-[80px] rounded-full object-cover border-4 border-gray-50 shadow-sm" 
            alt="User Avatar" 
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight truncate">{user.name}</h2>
            <div 
              onClick={() => !user.isCertified && onNavigate(Page.CERTIFICATION)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold cursor-pointer transition-all active:scale-95 ${user.isCertified ? 'bg-gray-800 border-gray-700 text-white shadow-sm' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
            >
               <span className={user.isCertified ? 'text-gray-200' : ''}>{user.isCertified ? '本地人' : '未认证'}</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-1 leading-tight">简介：暂无简介</p>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {user.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full border border-gray-200/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 智能名片入口 - 修改文案与逻辑 */}
      <div className="px-4 mt-8 relative">
        <div 
          onClick={() => onNavigate(Page.CARD_DETAIL)} // 统一跳转到详情页
          className="relative h-24 overflow-hidden shadow-lg active:scale-[0.98] transition-all group"
          style={{ 
            borderRadius: '1.5rem 1.5rem 1.2rem 1.2rem',
            background: myCard ? `url(${myCard.background}) center/cover` : 'linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)',
            clipPath: 'ellipse(100% 90% at 50% 10%)' 
          }}
        >
          <div className={`absolute inset-0 ${myCard ? 'bg-black/30 backdrop-blur-[2px]' : 'pointer-events-none'}`}></div>

          <div className="relative h-full px-5 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`text-base font-black tracking-wide ${myCard ? 'text-white' : 'text-gray-800'}`}>
                  {myCard ? myCard.name : '新建智能名片'} {/* 修改文案 */}
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 font-medium tracking-tight ${myCard ? 'text-white/80' : 'text-gray-500'}`}>
                {myCard ? `${myCard.organization} · ${myCard.position}` : '建立专业社交形象，开启高效连接 >'}
              </p>
            </div>

            <div className="relative">
              <button className={`px-5 py-2 rounded-full text-xs font-black shadow-md active:scale-95 transition-transform border ${myCard ? 'bg-white/20 text-white border-white/40 backdrop-blur-md' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-white/20'}`}>
                我的名片 {/* 修改文案 */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部常用功能 */}
      <div className="mt-12 px-6 grid grid-cols-2 gap-4">
        <div className="group p-5 bg-gray-50/50 rounded-3xl border border-gray-100 hover:bg-white transition-all cursor-pointer">
           <div className="w-12 h-12 bg-orange-100/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <p className="text-sm font-bold text-gray-800">足迹地图</p>
        </div>
        <div className="group p-5 bg-gray-50/50 rounded-3xl border border-gray-100 hover:bg-white transition-all cursor-pointer">
           <div className="w-12 h-12 bg-purple-100/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
           </div>
           <p className="text-sm font-bold text-gray-800">我的收藏</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
