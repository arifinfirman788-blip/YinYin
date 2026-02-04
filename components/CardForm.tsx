
import React, { useState, useRef } from 'react';
import { BusinessCard } from '../types';

interface CardFormProps {
  initialData: BusinessCard | null;
  defaultAvatar: string;
  onSubmit: (data: BusinessCard) => void;
  onBack: () => void;
}

const BACKGROUND_TEMPLATES = [
  { id: 'business', name: '经典商务', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 'tech', name: '未来科技', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80' },
  { id: 'chinese', name: '中式美学', img: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80' },
  { id: 'nature', name: '自然风景', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' },
  { id: 'illustration', name: '趣味插画', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
];

const CardForm: React.FC<CardFormProps> = ({ initialData, defaultAvatar, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<BusinessCard>(initialData || {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    organization: '',
    position: '',
    phone: '',
    email: '',
    region: '',
    address: '',
    avatar: defaultAvatar,
    background: BACKGROUND_TEMPLATES[0].img,
    wechatId: ''
  });

  const [isMatching, setIsMatching] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const regions = {
    '贵州省': {
      '贵阳市': ['南明区', '云岩区', '花溪区', '乌当区', '白云区', '观山湖区'],
      '遵义市': ['红花岗区', '汇川区', '播州区'],
      '安顺市': ['西秀区', '平坝区'],
    },
    '上海市': {
      '上海市': ['静安区', '徐汇区', '黄浦区', '长宁区', '普陀区'],
    }
  };

  const handleRegionSelect = (p: string, c: string, d: string) => {
    const regionStr = `${p} · ${c} · ${d}`;
    setFormData({ ...formData, region: regionStr });
    setShowRegionPicker(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'background' | 'wechatId') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (tplImg: string) => {
    setIsMatching(true);
    setTimeout(() => {
      setFormData({ ...formData, background: tplImg });
      setIsMatching(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      name: formData.name || '王大雷',
      organization: formData.organization || '贵旅数网',
      position: formData.position || '产品经理',
      phone: formData.phone || '18899998888',
      email: formData.email || '12345678@qq.com',
      region: formData.region || '贵州省 · 贵阳市 · 南明区',
      address: formData.address || '中山东路 123 号'
    };
    
    onSubmit(finalData);
  };

  return (
    <div 
      className="flex flex-col h-full bg-cover bg-center transition-all duration-1000 ease-in-out relative overflow-hidden"
      style={{ backgroundImage: `url(${formData.background})` }}
    >
      {isMatching && (
        <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-white text-xs font-black mt-4 tracking-widest uppercase">智能匹配中...</p>
        </div>
      )}

      <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-0"></div>

      <div className="flex items-center p-6 sticky top-0 bg-white/40 backdrop-blur-xl z-20 shadow-sm border-b border-white/20">
        <button onClick={onBack} type="button" className="p-2 -ml-2 text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center mr-6 text-gray-900">编辑名片</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative z-10 p-6 space-y-6 overflow-y-auto flex-1 pb-10">
        <div className="flex flex-col items-center mb-4">
          <div className="relative group cursor-pointer">
            <img src={formData.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl" alt="Avatar Preview" />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-3 font-medium bg-white/50 px-3 py-1 rounded-full border border-white/20">请上传个人头像或公司logo</span>
        </div>

        {/* 基本信息 */}
        <div className="grid gap-4 bg-white/40 p-5 rounded-3xl border border-white/40 shadow-sm backdrop-blur-sm">
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">姓名</label>
            <input 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              type="text" placeholder="请输入您的姓名" 
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold" 
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">单位/组织</label>
            <input 
              value={formData.organization}
              onChange={e => setFormData({...formData, organization: e.target.value})}
              type="text" placeholder="所在的公司或机构名称" 
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400" 
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">职位</label>
            <input 
              value={formData.position}
              onChange={e => setFormData({...formData, position: e.target.value})}
              type="text" placeholder="例如：产品经理" 
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400" 
            />
          </div>
        </div>

        {/* 联系方式 */}
        <div className="grid gap-4 bg-white/40 p-5 rounded-3xl border border-white/40 shadow-sm backdrop-blur-sm">
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">联系电话</label>
            <div className="flex gap-2 mt-1">
              <input 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                type="tel" placeholder="请输入手机号" 
                className="flex-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 font-mono" 
              />
              <button 
                type="button"
                onClick={() => alert('微信电话授权功能已开启')}
                className="shrink-0 px-3 bg-green-500/10 text-green-600 border border-green-200 rounded-xl text-[10px] font-black active:scale-95 transition-all flex items-center gap-1 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.27 10.15a.9.9 0 100-1.79.9.9 0 000 1.79zm7.46 0a.9.9 0 100-1.79.9.9 0 000 1.79zM12 4.1a8.55 8.55 0 00-8.6 8.3c0 1.55.43 3.01 1.2 4.26L3.5 19.5l3.15-1.01A8.53 8.53 0 0012 20.7a8.55 8.55 0 008.6-8.3 8.55 8.55 0 00-8.6-8.3zm0 14.8c-1.35 0-2.61-.35-3.7-.97l-2.14.68.7-2.07A6.74 6.74 0 015.1 12.4a6.79 6.79 0 0113.8 0 6.79 6.79 0 01-6.9 6.5zm7.3-8.86a.65.65 0 100-1.3.65.65 0 000 1.3z" /></svg>
                授权微信电话
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">微信二维码</label>
            <div className="mt-1 flex items-center gap-4">
              <div 
                onClick={() => qrInputRef.current?.click()}
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-white/40 hover:bg-white/60 transition-colors cursor-pointer overflow-hidden group"
              >
                {formData.wechatId && formData.wechatId.startsWith('data:image') ? (
                  <img src={formData.wechatId} className="w-full h-full object-cover" alt="QR Code" />
                ) : (
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    <span className="text-[8px] text-gray-400 mt-1">上传图片</span>
                  </div>
                )}
              </div>
              <input type="file" ref={qrInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'wechatId')} />
              <p className="text-[10px] text-gray-500 flex-1 leading-relaxed">
                上传您的个人微信二维码，方便其他人扫描并添加您的微信。建议使用清晰的原始截图。
              </p>
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">邮箱</label>
            <input 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              type="email" placeholder="请输入常用邮箱" 
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400" 
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">所在地区</label>
            <div 
              onClick={() => setShowRegionPicker(true)}
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/80 transition-colors"
            >
              <span className={formData.region ? 'text-gray-900 font-bold' : 'text-gray-400'}>
                {formData.region || '点击选择省/市/区'}
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          {/* 新增详细地址输入框 */}
          <div>
            <label className="text-xs font-black text-gray-500 uppercase ml-1 opacity-70">详细地址</label>
            <input 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              type="text" placeholder="请输入街道、门牌号等详细信息" 
              className="w-full mt-1 px-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold" 
            />
          </div>
        </div>

        {/* 名片风格模版 */}
        <div className="bg-white/40 p-5 rounded-3xl border border-white/40 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 px-1">
            <label className="text-xs font-black text-gray-500 uppercase opacity-70">名片风格模版</label>
            <button type="button" onClick={() => bgInputRef.current?.click()} className="text-[10px] font-black text-blue-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              自定义背景
            </button>
            <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'background')} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {BACKGROUND_TEMPLATES.map((tpl) => (
              <div 
                key={tpl.id} 
                onClick={() => handleTemplateSelect(tpl.img)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all transform active:scale-95 ${formData.background === tpl.img ? 'ring-4 ring-blue-500 shadow-xl' : 'hover:shadow-md border border-white/20'}`}
              >
                <div className="h-24 relative">
                  <img src={tpl.img} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={tpl.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-3 right-3">
                    <p className="text-[10px] font-black text-white truncate drop-shadow-md">{tpl.name}</p>
                    <p className="text-[7px] text-white/60 font-medium uppercase tracking-tighter">Smart Match Available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 px-1 flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[9px] text-gray-500 leading-relaxed">选择模版后，AI 将根据您的公司「{formData.organization || '...'}」及职位「{formData.position || '...'}」智能调整名片视觉权重。</p>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isMatching}
          className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          预览名片
        </button>
      </form>

      {showRegionPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300 max-h-[75vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">选择所在地区</h3>
              <button onClick={() => setShowRegionPicker(false)} type="button" className="p-2 text-gray-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <div className="space-y-6">
              {Object.entries(regions).map(([province, cities]) => (
                <div key={province} className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                  <p className="text-xs font-black text-blue-600 uppercase mb-4 tracking-widest">{province}</p>
                  <div className="space-y-4">
                    {Object.entries(cities).map(([city, districts]) => (
                      <div key={city} className="space-y-2">
                        <p className="text-sm font-black text-gray-800 ml-1">{city}</p>
                        <div className="flex flex-wrap gap-2">
                          {districts.map(district => (
                            <button key={district} type="button" onClick={() => handleRegionSelect(province, city, district)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">{district}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardForm;
