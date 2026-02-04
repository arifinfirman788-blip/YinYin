
import React, { useState } from 'react';

interface DigitalTwinPageProps {
  onBack: () => void;
}

const DigitalTwinPage: React.FC<DigitalTwinPageProps> = ({ onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('AI 数字分身生成功能正在研发中，敬请期待！');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white animate-in slide-in-from-right duration-500 overflow-hidden relative">
      {/* 动态背景背景 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#1e3a8a_0%,transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#4c1d95_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff 0.5px, transparent 0.5px), linear-gradient(90deg, #ffffff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center p-6">
          <button onClick={onBack} className="p-2 -ml-2 text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <h1 className="text-xl font-bold flex-1 text-center mr-6">数字分身</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
           <div className="relative w-48 h-48 mb-12">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-blue-400/50 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <svg className="w-full h-full text-blue-400/30 p-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 104.1 0h-4.1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
           </div>

           <h2 className="text-2xl font-black mb-4 tracking-tight">开启 AI 数字分身时代</h2>
           <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-xs">
              通过 AI 深度学习你的社交习惯和名片信息，生成专属数字形象。实现 24 小时在线社交，让连接不再设限。
           </p>

           <button 
             onClick={startGeneration}
             disabled={isGenerating}
             className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
           >
             {isGenerating ? (
               <>
                 <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 AI 构建中...
               </>
             ) : '立即开启生成'}
           </button>
        </div>

        <div className="p-10 text-center opacity-20">
           <p className="text-[10px] font-bold tracking-widest text-white uppercase">AI Digital Persona System Beta</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinPage;
