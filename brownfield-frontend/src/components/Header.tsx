import React from 'react';

type View = 'petList' | 'petDetail' | 'visitList' | 'visitDetail' | 'vetList' | 'invoiceList';

interface HeaderProps {
  currentView: View;
  onNavigateToPetList: () => void;
  onNavigateToVisitList: () => void;
  onNavigateToVetList: () => void;
  onNavigateToInvoiceList: () => void;
}

const PawIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="10" r="4" fill="#029f5b"/>
    <circle cx="26" cy="10" r="4" fill="#029f5b"/>
    <circle cx="8" cy="20" r="3.5" fill="#029f5b"/>
    <circle cx="32" cy="20" r="3.5" fill="#029f5b"/>
    <ellipse cx="20" cy="28" rx="9" ry="8" fill="#029f5b"/>
  </svg>
);

const Header: React.FC<HeaderProps> = ({ currentView, onNavigateToPetList, onNavigateToVisitList, onNavigateToVetList, onNavigateToInvoiceList }) => {
  const tabs = [
    { label: 'Pets', isActive: currentView === 'petList' || currentView === 'petDetail', onClick: onNavigateToPetList },
    { label: 'Visits', isActive: currentView === 'visitList' || currentView === 'visitDetail', onClick: onNavigateToVisitList },
    { label: 'Vets', isActive: currentView === 'vetList', onClick: onNavigateToVetList },
    { label: 'Invoices', isActive: currentView === 'invoiceList', onClick: onNavigateToInvoiceList },
  ];

  return (
    <header style={{ backgroundColor: '#fbfbff' }}>
      {/* Logo + Title row */}
      <div className="container mx-auto px-8 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <PawIcon />
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 500, color: '#00032c', lineHeight: 1.2 }}>
              Pet Directory
            </h1>
            <p style={{ fontSize: '18px', fontWeight: 400, color: '#747474', marginTop: '2px' }}>
              Managing your furry friends
            </p>
          </div>
        </div>
      </div>

      {/* Separator + Nav tabs row */}
      <div style={{ borderTop: '1px solid #e5e7eb' }}>
        <div className="container mx-auto px-8">
          <nav className="flex items-center gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={tab.onClick}
                style={{
                  fontSize: '18px',
                  fontWeight: tab.isActive ? 700 : 400,
                  color: tab.isActive ? '#029f5b' : '#7a7a7a',
                  padding: '12px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  borderBottom: tab.isActive ? '2px solid #029f5b' : '2px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
