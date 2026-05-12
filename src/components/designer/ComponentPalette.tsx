'use client';

import { useDesignerStore } from '@/store/designerStore';
import { ComponentType } from '@/types';
import { v4 as uuid } from 'uuid';
import {
  HiOutlineMenuAlt2,
  HiOutlinePhotograph,
  HiOutlineTable,
  HiOutlineCode,
  HiOutlineMinus,
  HiOutlineQrcode,
  HiOutlinePencilAlt,
  HiOutlineViewGrid,
  HiOutlineTag,
  HiOutlineCube,
} from 'react-icons/hi';

interface PaletteItem {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
  defaultProps: Record<string, unknown>;
}

const paletteItems: PaletteItem[] = [
  { type: 'text', label: 'Text Block', icon: <HiOutlineMenuAlt2 size={18} />, defaultProps: { content: 'Enter your text here', tag: 'p' } },
  { type: 'dynamic-field', label: 'Dynamic Field', icon: <HiOutlineCode size={18} />, defaultProps: { placeholder: '{{member_name}}', label: 'Member Name' } },
  { type: 'image', label: 'Image', icon: <HiOutlinePhotograph size={18} />, defaultProps: { src: '', alt: 'Image' } },
  { type: 'logo', label: 'Logo', icon: <HiOutlineCube size={18} />, defaultProps: { src: '', alt: 'Logo', maxWidth: '150px' } },
  { type: 'divider', label: 'Divider', icon: <HiOutlineMinus size={18} />, defaultProps: { style: 'solid', color: '#e2e8f0' } },
  { type: 'table', label: 'Table', icon: <HiOutlineTable size={18} />, defaultProps: { headers: ['Benefit', 'Coverage', 'Limit'], rows: [['OPD', 'Covered', '₹5,000'], ['IPD', 'Covered', '₹50,000']], headerBg: '#1a5c2e', headerColor: '#ffffff' } },
  { type: 'card', label: 'Card Section', icon: <HiOutlineViewGrid size={18} />, defaultProps: { title: 'Section Title', content: 'Section content goes here' } },
  { type: 'qr-code', label: 'QR Code', icon: <HiOutlineQrcode size={18} />, defaultProps: { value: 'https://curebharat.com', size: 100 } },
  { type: 'signature', label: 'Signature', icon: <HiOutlinePencilAlt size={18} />, defaultProps: { label: 'Authorized Signatory', name: '' } },
  { type: 'icon-block', label: 'Icon Block', icon: <HiOutlineTag size={18} />, defaultProps: { icon: '🏥', title: 'Feature', description: 'Description' } },
  { type: 'spacer', label: 'Spacer', icon: <HiOutlineMinus size={18} />, defaultProps: { height: '20px' } },
];

export default function ComponentPalette() {
  const store = useDesignerStore();

  const handleAddComponent = (item: PaletteItem) => {
    const page = store.getActivePage();
    if (!page) return;

    // If no sections exist, create one
    if (page.sections.length === 0) {
      store.addSection(store.activePageIndex, 'full');
    }

    const updatedPage = store.getActivePage();
    if (!updatedPage || updatedPage.sections.length === 0) return;

    const lastSection = updatedPage.sections[updatedPage.sections.length - 1];

    store.addComponent(store.activePageIndex, lastSection.id, {
      id: uuid(),
      type: item.type,
      props: { ...item.defaultProps },
      style: { fontSize: '14px', color: '#333333', padding: '8px', textAlign: 'left' },
      position: { type: 'flow' },
    });
  };

  return (
    <div className="palette">
      <div className="palette-header">
        <h3>Components</h3>
      </div>
      <div className="palette-section">
        <p className="palette-section-label">Add to page</p>
        <div className="palette-grid">
          {paletteItems.map((item) => (
            <button
              key={item.type}
              className="palette-item"
              onClick={() => handleAddComponent(item)}
              title={item.label}
            >
              <span className="palette-item-icon">{item.icon}</span>
              <span className="palette-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section controls */}
      <div className="palette-section">
        <p className="palette-section-label">Add Section</p>
        <div className="palette-layouts">
          {(['full', 'two-column', 'three-column'] as const).map((layout) => (
            <button
              key={layout}
              className="palette-layout-btn"
              onClick={() => store.addSection(store.activePageIndex, layout)}
            >
              {layout === 'full' ? '█' : layout === 'two-column' ? '█ █' : '█ █ █'}
              <span>{layout.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .palette { padding: 0; }
        .palette-header {
          padding: 16px; border-bottom: 1px solid var(--border);
        }
        .palette-header h3 {
          font-size: 14px; font-weight: 600; color: var(--foreground);
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .palette-section { padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .palette-section-label {
          font-size: 11px; font-weight: 500; color: var(--foreground-dim);
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;
        }
        .palette-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
        }
        .palette-item {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: var(--radius-sm);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--foreground-muted); font-size: 12px;
          cursor: pointer; transition: all var(--transition-fast); text-align: left;
        }
        .palette-item:hover {
          background: var(--surface-hover); color: var(--foreground);
          border-color: var(--brand-primary);
        }
        .palette-item-icon { min-width: 18px; }
        .palette-item-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .palette-layouts { display: flex; flex-direction: column; gap: 6px; }
        .palette-layout-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: var(--radius-sm);
          border: 1px solid var(--border); background: var(--surface);
          color: var(--foreground-muted); font-size: 12px;
          cursor: pointer; transition: all var(--transition-fast); text-transform: capitalize;
        }
        .palette-layout-btn:hover {
          background: var(--surface-hover); color: var(--foreground);
          border-color: var(--brand-primary);
        }
      `}</style>
    </div>
  );
}
