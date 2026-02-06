
import React, { useState } from 'react';
import { Page, UserProfile, BusinessCard } from './types';
import { DEFAULT_AVATAR } from './constants';
import ProfilePage from './components/ProfilePage';
import CertificationPage from './components/CertificationPage';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import CardDetailPage from './components/CardDetailPage';
import DigitalTwinPage from './components/DigitalTwinPage';
import ContactsPage from './components/ContactsPage';
import SettingsPage from './components/SettingsPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.PROFILE);
  const [user, setUser] = useState<UserProfile>({
    name: '旅行者阿星',
    avatar: DEFAULT_AVATAR,
    isCertified: false,
    tags: ['摄影爱好者', '美食达人', '自驾游']
  });
  
  const [myCard, setMyCard] = useState<BusinessCard | null>(null);
  const [draftCard, setDraftCard] = useState<BusinessCard | null>(null);
  const [previewMode, setPreviewMode] = useState<'own' | 'received'>('own');

  const navigateTo = (page: Page) => setCurrentPage(page);

  const handleCertificationComplete = () => {
    setUser(prev => ({ ...prev, isCertified: true }));
    setCurrentPage(Page.PROFILE);
  };

  const handlePreviewRequest = (cardData: BusinessCard) => {
    setDraftCard(cardData);
    setPreviewMode('own');
    setCurrentPage(Page.CARD_PREVIEW);
  };

  const handleViewContact = (contact: BusinessCard) => {
    setDraftCard(contact);
    setPreviewMode('received');
    setCurrentPage(Page.CARD_PREVIEW);
  };

  const handleCardConfirm = (cardData: BusinessCard) => {
    if (previewMode === 'own') {
      setMyCard(cardData);
    }
    setDraftCard(null);
    setCurrentPage(Page.CARD_DETAIL);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.PROFILE:
        return <ProfilePage user={user} myCard={myCard} onNavigate={navigateTo} />;
      case Page.CERTIFICATION:
        return <CertificationPage onComplete={handleCertificationComplete} onBack={() => setCurrentPage(Page.PROFILE)} />;
      case Page.CARD_CREATE:
        return (
          <CardForm 
            initialData={draftCard || myCard} 
            defaultAvatar={user.avatar} 
            onSubmit={handlePreviewRequest} 
            onBack={() => setCurrentPage(Page.PROFILE)} 
          />
        );
      case Page.CARD_PREVIEW:
        const cardToShow = draftCard || myCard;
        return cardToShow ? (
          <CardPreview 
            card={cardToShow} 
            mode={previewMode}
            onConfirm={handleCardConfirm} 
            onBack={() => setCurrentPage(previewMode === 'own' ? Page.CARD_CREATE : Page.CARD_DETAIL)}
            onGoToMyCard={() => setCurrentPage(Page.CARD_DETAIL)}
          />
        ) : null;
      case Page.CARD_DETAIL:
        // 移除了 myCard ? ... : null 的判断，现在始终允许渲染 CardDetailPage
        return (
          <CardDetailPage 
            card={myCard} 
            onEdit={() => setCurrentPage(Page.CARD_CREATE)}
            onPreview={() => {
              setPreviewMode('own');
              setCurrentPage(Page.CARD_PREVIEW);
            }}
            onDigitalTwin={() => setCurrentPage(Page.DIGITAL_TWIN)}
            onViewContact={handleViewContact}
            onBack={() => setCurrentPage(Page.PROFILE)}
          />
        );
      case Page.DIGITAL_TWIN:
        return <DigitalTwinPage onBack={() => setCurrentPage(Page.CARD_DETAIL)} />;
      case Page.CONTACTS:
        return <ContactsPage onBack={() => setCurrentPage(Page.PROFILE)} />;
      case Page.SETTINGS:
        return <SettingsPage onBack={() => setCurrentPage(Page.PROFILE)} />;
      default:
        return <ProfilePage user={user} myCard={myCard} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-xl overflow-hidden font-sans">
      {renderPage()}
    </div>
  );
};

export default App;
