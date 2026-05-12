'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDesignerStore } from '@/store/designerStore';
import ComponentPalette from '@/components/designer/ComponentPalette';
import A4Preview from '@/components/designer/A4Preview';
import PropertyPanel from '@/components/designer/PropertyPanel';
import PageManager from '@/components/designer/PageManager';
import { HiOutlineArrowLeft, HiOutlineSave } from 'react-icons/hi';

export default function DesignerPage() {
  const params = useParams();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const store = useDesignerStore();

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const res = await fetch(`/api/templates/${params.id}`);
        const data = await res.json();
        if (data.success) {
          const t = data.data;
          store.setTemplateId(t._id);
          store.setTemplateName(t.name);
          store.setPages(t.pages && t.pages.length > 0 ? t.pages : [{
            pageIndex: 0, pageType: 'cover' as const, title: 'Cover Page',
            background: { type: 'color' as const, value: '#ffffff', opacity: 1, overlay: '' },
            watermark: { enabled: false, type: 'text' as const, value: '', opacity: 0.1, rotation: -30, size: '200px', repeat: false },
            header: { enabled: true, height: '80px', companyName: 'CureBharat', backgroundColor: '#fff', textColor: '#333' },
            footer: { enabled: true, height: '60px', showPageNumbers: true, backgroundColor: '#1a5c2e', textColor: '#fff' },
            sections: [], showGlobalHeader: true, showGlobalFooter: true, showGlobalWatermark: true,
          }]);
          store.setBrandColors(t.brandColors || {
            primary: '#1a5c2e', secondary: '#e8742a', accent: '#f5a623',
            background: '#ffffff', text: '#333333',
          });
          store.setActivePageIndex(0);
        }
      } catch (error) {
        console.error('Failed to load template:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/templates/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: store.templateName,
          pages: store.pages,
          pageCount: store.pages.length,
          brandColors: store.brandColors,
        }),
      });
    } catch (error) {
      console.error('Save failed:', error);
    }
    setSaving(false);
  };

  if (!loaded) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', color: 'var(--foreground-dim)' }}>
        Loading designer...
      </div>
    );
  }

  return (
    <div className="designer-page">
      {/* Top toolbar */}
      <div className="designer-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost btn-icon" onClick={() => router.push('/templates')}>
            <HiOutlineArrowLeft size={18} />
          </button>
          <input
            className="designer-name-input"
            value={store.templateName}
            onChange={(e) => store.setTemplateName(e.target.value)}
            placeholder="Template Name"
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <HiOutlineSave size={16} />
            {saving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      {/* Page Manager */}
      <PageManager />

      {/* 3-Panel Layout */}
      <div className="designer-layout">
        <div className="designer-left">
          <ComponentPalette />
        </div>
        <div className="designer-center">
          <A4Preview />
        </div>
        <div className="designer-right">
          <PropertyPanel />
        </div>
      </div>

      <style jsx>{`
        .designer-page {
          position: fixed;
          inset: 0;
          background: var(--background);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 100;
        }

        .designer-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: var(--background-secondary);
          border-bottom: 1px solid var(--border);
          min-height: 52px;
        }

        .designer-name-input {
          background: transparent;
          border: none;
          color: var(--foreground);
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 600;
          outline: none;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }

        .designer-name-input:focus {
          background: var(--surface);
        }

        .designer-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .designer-left {
          width: 260px;
          min-width: 260px;
          border-right: 1px solid var(--border);
          overflow-y: auto;
          background: var(--background-secondary);
        }

        .designer-center {
          flex: 1;
          overflow: auto;
          background: var(--background-tertiary);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 20px;
        }

        .designer-right {
          width: 300px;
          min-width: 300px;
          border-left: 1px solid var(--border);
          overflow-y: auto;
          background: var(--background-secondary);
        }
      `}</style>
    </div>
  );
}
