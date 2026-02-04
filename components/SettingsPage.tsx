
import React from 'react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const sections = [
    { title: '账户设置', items: ['手机号绑定', '实名认证状态', '账号注销'] },
    { title: '偏好设置', items: ['通知提醒', '隐私设置', '语言选择'] },
    { title: '关于', items: ['检查更新', '清除缓存', '用户协议'] }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in slide-in-from-right duration-300">
      <div className="flex items-center p-6 sticky top-0 bg-white z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center mr-6">设置</h1>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto">
        {sections.map(section => (
          <div key={section.title}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">{section.title}</h3>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {section.items.map((item, idx) => (
                <div key={item} className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${idx !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full bg-white border border-red-100 text-red-500 font-bold py-4 rounded-2xl shadow-sm active:scale-95 transition-transform mt-8">
          退出登录
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
