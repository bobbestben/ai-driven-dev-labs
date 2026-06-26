import React, { useEffect, useState } from 'react';
import { invoiceService, type Invoice } from './invoiceService';

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await invoiceService.findAll();
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await invoiceService.downloadPdf(id);
    } catch (err) {
      console.error('Failed to download PDF', err);
      alert('Failed to download PDF');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
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
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>Loading invoices...</div>
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
          <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#00032c', marginBottom: '4px' }}>All Invoices</h2>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#747474' }}>View and manage all billing and payment records</p>
        </div>

        {invoices.length === 0 ? (
          <p style={{ color: '#7a7a7a' }}>No invoices found.</p>
        ) : (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f4ff' }}>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Invoice No.</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Date &amp; Time</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Amount</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Clinic</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Pet Name</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    style={{
                      borderTop: index > 0 ? '1px solid #e5e7eb' : undefined,
                      backgroundColor: '#ffffff',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{invoice.invoiceNumber}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{formatDate(invoice.invoiceDate)}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>${invoice.amount.toFixed(2)}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{invoice.visit?.clinic}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{invoice.visit?.pet?.name}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px' }}>
                      <button
                        onClick={() => handleDownload(invoice.id)}
                        style={{
                          fontSize: '14px',
                          color: '#040826',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: 0,
                        }}
                      >
                        Download PDF
                      </button>
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

export default InvoiceList;
