import React, { useEffect, useState } from 'react';
import { vetService, type Vet } from './vetService';

const specialtyBadgeStyle = (specialty: string): React.CSSProperties => {
  const map: Record<string, { bg: string; color: string }> = {
    Surgery: { bg: '#ffdbc d', color: '#d63f05' },
    Dentistry: { bg: '#d8f9ff', color: '#0a97b4' },
    'General Practice': { bg: '#b7ffd4', color: '#159548' },
    Cardiology: { bg: '#cecaff', color: '#2519b2' },
  };
  const style = map[specialty] ?? { bg: '#e5e7eb', color: '#374151' };
  return {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 500,
    backgroundColor: style.bg,
    color: style.color,
  };
};

const VetList: React.FC = () => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        setLoading(true);
        const data = await vetService.findAll();
        setVets(data);
        setError(null);
      } catch (err) {
        setError('Failed to load vets. Please try again later.');
        console.error('Error fetching vets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>Loading vets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>{error}</div>
      </div>
    );
  }

  if (vets.length === 0) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>No vets found.</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
      <div className="container mx-auto px-8 py-8">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#00032c', marginBottom: '4px' }}>Our Veterinarians</h2>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#747474' }}>Meet and manage the vets who care for your pets</p>
        </div>

        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f4ff' }}>
                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>User ID</th>
                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Veterinarian</th>
                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Specialty</th>
              </tr>
            </thead>
            <tbody>
              {vets.map((vet, index) => (
                <tr
                  key={vet.id}
                  style={{
                    borderTop: index > 0 ? '1px solid #e5e7eb' : undefined,
                    backgroundColor: '#ffffff',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{String(vet.id).padStart(2, '0')}</td>
                  <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{vet.name}</td>
                  <td style={{ padding: '14px 24px', fontSize: '14px' }}>
                    <span style={specialtyBadgeStyle(vet.specialty)}>{vet.specialty}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VetList;
