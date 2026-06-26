import React, { useEffect, useState } from 'react';
import { visitService } from './index';
import type { Visit } from './index';

interface VisitListProps {
  onPetSelect?: (petId: number) => void;
  onVisitClick?: (visit: Visit) => void;
}

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

const VisitList: React.FC<VisitListProps> = ({ onPetSelect: _onPetSelect, onVisitClick }) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await visitService.findAll();
      setVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load visits');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>Loading visits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
      <div className="container mx-auto px-8 py-8">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#00032c', marginBottom: '4px' }}>All Visits</h2>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#747474' }}>View all veterinary visits across all pets</p>
        </div>

        {visits.length === 0 ? (
          <p style={{ color: '#7a7a7a' }}>No visits found.</p>
        ) : (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f4ff' }}>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>User ID</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Date &amp; Time</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Clinic</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Pet Name</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Owner of Pet</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Veterinarian</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Specialty</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, index) => (
                  <tr
                    key={visit.id}
                    onClick={() => onVisitClick && onVisitClick(visit)}
                    style={{
                      cursor: onVisitClick ? 'pointer' : 'default',
                      borderTop: index > 0 ? '1px solid #e5e7eb' : undefined,
                      backgroundColor: '#ffffff',
                    }}
                    onMouseEnter={(e) => { if (onVisitClick) e.currentTarget.style.backgroundColor = '#f9f9ff'; }}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{String(visit.id).padStart(2, '0')}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{formatDateTime(visit.dateTime)}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{visit.clinic}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{visit.pet?.name || 'N/A'}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{visit.pet?.ownerName || 'N/A'}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{visit.vet?.name || 'N/A'}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px' }}>
                      {visit.vet?.specialty ? (
                        <span style={specialtyBadgeStyle(visit.vet.specialty)}>{visit.vet.specialty}</span>
                      ) : (
                        <span style={{ color: '#7a7a7a' }}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitList;
