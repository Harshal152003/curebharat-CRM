'use client';

import { useDesignerStore } from '@/store/designerStore';
import { IComponent, ISection } from '@/types';
import { HiOutlineTrash } from 'react-icons/hi';

export default function A4Preview() {
  const store = useDesignerStore();
  const page = store.getActivePage();

  if (!page) {
    return <div style={{ color: 'var(--foreground-dim)' }}>No page selected</div>;
  }

  const bgStyle: React.CSSProperties = {};
  if (page.background) {
    if (page.background.type === 'color') bgStyle.backgroundColor = page.background.value;
    else if (page.background.type === 'gradient') bgStyle.background = page.background.value;
    else if (page.background.type === 'image') {
      bgStyle.backgroundImage = `url(${page.background.value})`;
      bgStyle.backgroundSize = 'cover';
      bgStyle.backgroundPosition = 'center';
    }
  }

  return (
    <div className="a4-container">
      <div className="a4-page" style={bgStyle}>
        {/* Watermark */}
        {page.watermark?.enabled && (
          <div className="a4-watermark" style={{ opacity: page.watermark.opacity, transform: `rotate(${page.watermark.rotation || -30}deg)` }}>
            {page.watermark.type === 'text' ? (
              <span style={{ fontSize: page.watermark.size || '80px', color: '#ccc' }}>{page.watermark.value}</span>
            ) : (
              <img src={page.watermark.value} alt="watermark" style={{ width: page.watermark.size || '200px' }} />
            )}
          </div>
        )}

        {/* Header */}
        {page.header?.enabled && page.showGlobalHeader && (
          <div className="a4-header" style={{ height: page.header.height, backgroundColor: page.header.backgroundColor, color: page.header.textColor }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', height: '100%' }}>
              {page.header.logo && <img src={page.header.logo} alt="logo" style={{ height: 40 }} />}
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{page.header.companyName || 'Company Name'}</div>
                {page.header.website && <div style={{ fontSize: 11, opacity: 0.7 }}>{page.header.website}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="a4-content">
          {page.sections.length === 0 ? (
            <div className="a4-empty">
              <p>Click components from the left panel to add content</p>
            </div>
          ) : (
            page.sections.map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                pageIndex={store.activePageIndex}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {page.footer?.enabled && page.showGlobalFooter && (
          <div className="a4-footer" style={{ height: page.footer.height, backgroundColor: page.footer.backgroundColor, color: page.footer.textColor }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '100%', fontSize: 10 }}>
              <span>{page.footer.companyDetails || 'CureBharat Wellness Pvt. Ltd.'}</span>
              {page.footer.showPageNumbers && <span>Page {store.activePageIndex + 1} of {store.pages.length}</span>}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .a4-container {
          width: 595px;
          min-height: 842px;
          flex-shrink: 0;
        }
        .a4-page {
          width: 595px;
          min-height: 842px;
          background: white;
          border-radius: 4px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          color: #333;
          font-family: 'Inter', sans-serif;
        }
        .a4-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          pointer-events: none;
          z-index: 0;
        }
        .a4-header {
          position: relative;
          z-index: 2;
          border-bottom: 2px solid rgba(0,0,0,0.08);
        }
        .a4-content {
          flex: 1;
          position: relative;
          z-index: 1;
          padding: 12px;
        }
        .a4-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 300px;
          border: 2px dashed rgba(0,0,0,0.15);
          border-radius: 8px;
          color: #999;
          font-size: 13px;
          text-align: center;
        }
        .a4-footer {
          position: relative;
          z-index: 2;
          border-top: 2px solid rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}

function SectionRenderer({ section, pageIndex }: { section: ISection; pageIndex: number }) {
  const store = useDesignerStore();
  const isSelected = store.selectedSectionId === section.id;

  const gridStyle: React.CSSProperties = {
    display: section.layout !== 'full' ? 'grid' : 'block',
    gridTemplateColumns:
      section.layout === 'two-column' ? '1fr 1fr' :
      section.layout === 'three-column' ? '1fr 1fr 1fr' :
      section.layout === 'sidebar-left' ? '200px 1fr' :
      section.layout === 'sidebar-right' ? '1fr 200px' : undefined,
    gap: '12px',
    ...section.style,
  };

  return (
    <div
      className={`section-wrapper ${isSelected ? 'section-selected' : ''}`}
      style={gridStyle}
      onClick={(e) => { e.stopPropagation(); store.selectSection(section.id); store.selectComponent(null); }}
    >
      {section.components.map((comp) => (
        <ComponentRenderer
          key={comp.id}
          component={comp}
          sectionId={section.id}
          pageIndex={pageIndex}
        />
      ))}
      {isSelected && (
        <button
          className="section-delete-btn"
          onClick={(e) => { e.stopPropagation(); store.removeSection(pageIndex, section.id); }}
        >
          <HiOutlineTrash size={12} />
        </button>
      )}

      <style jsx>{`
        .section-wrapper {
          position: relative;
          border: 1px solid transparent;
          border-radius: 4px;
          margin-bottom: 8px;
          min-height: 40px;
          transition: border-color 0.15s;
          cursor: pointer;
        }
        .section-wrapper:hover {
          border-color: rgba(13, 124, 62, 0.3);
        }
        .section-selected {
          border-color: var(--brand-primary) !important;
          outline: 2px solid rgba(13, 124, 62, 0.2);
        }
        .section-delete-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

function ComponentRenderer({ component, sectionId, pageIndex }: { component: IComponent; sectionId: string; pageIndex: number }) {
  const store = useDesignerStore();
  const isSelected = store.selectedComponentId === component.id;
  const props = component.props as Record<string, string>;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.selectComponent(component.id);
    store.selectSection(sectionId);
  };

  const style: React.CSSProperties = {
    ...component.style,
    position: component.position.type === 'absolute' ? 'absolute' : 'relative',
    ...(component.position.type === 'absolute' && {
      top: component.position.top,
      left: component.position.left,
    }),
  };

  const renderContent = () => {
    switch (component.type) {
      case 'text':
        return <div style={{ ...style }} dangerouslySetInnerHTML={{ __html: props.content || 'Text' }} />;
      case 'dynamic-field':
        return (
          <div style={{ ...style, background: 'rgba(59,130,246,0.08)', border: '1px dashed rgba(59,130,246,0.4)', borderRadius: 4, display: 'inline-block', padding: '4px 10px' }}>
            <span style={{ fontSize: 11, color: '#3b82f6' }}>{props.placeholder || '{{field}}'}</span>
          </div>
        );
      case 'image':
        return props.src ? <img src={props.src} alt={props.alt || ''} style={{ ...style, maxWidth: '100%' }} /> : <div style={{ ...style, height: 120, background: '#f3f4f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 13 }}>Image Placeholder</div>;
      case 'logo':
        return props.src ? <img src={props.src} alt="Logo" style={{ ...style, maxWidth: props.maxWidth || '150px' }} /> : <div style={{ ...style, height: 50, width: 150, background: '#f3f4f6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 12 }}>Logo</div>;
      case 'divider':
        return <hr style={{ border: 'none', borderTop: `2px ${props.style || 'solid'} ${props.color || '#e2e8f0'}`, margin: '8px 0' }} />;
      case 'table':
        const headers = (component.props.headers || ['Col 1', 'Col 2']) as string[];
        const rows = (component.props.rows || [['Data', 'Data']]) as string[][];
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, ...style }}>
            <thead>
              <tr>
                {headers.map((h: string, i: number) => (
                  <th key={i} style={{ padding: '8px 12px', background: (props.headerBg as string) || '#1a5c2e', color: (props.headerColor as string) || '#fff', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: string[], ri: number) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                  {row.map((cell: string, ci: number) => (
                    <td key={ci} style={{ padding: '8px 12px', borderBottom: '1px solid #e9ecef' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'card':
        return (
          <div style={{ ...style, border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: '#1a5c2e' }}>{props.title || 'Card Title'}</h4>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{props.content || 'Card content'}</p>
          </div>
        );
      case 'qr-code':
        return <div style={{ ...style, width: 100, height: 100, background: '#f3f4f6', border: '2px solid #e2e8f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#9ca3af' }}>QR Code</div>;
      case 'signature':
        return (
          <div style={{ ...style, textAlign: 'center', padding: '20px 0' }}>
            <div style={{ borderBottom: '2px solid #333', width: 200, margin: '0 auto 8px', height: 40 }} />
            <p style={{ fontSize: 12, color: '#666' }}>{props.label || 'Authorized Signatory'}</p>
          </div>
        );
      case 'icon-block':
        return (
          <div style={{ ...style, display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
            <span style={{ fontSize: 28 }}>{props.icon || '🏥'}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{props.title || 'Feature'}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{props.description || 'Description'}</div>
            </div>
          </div>
        );
      case 'spacer':
        return <div style={{ height: props.height || '20px' }} />;
      default:
        return <div style={style}>Unknown component</div>;
    }
  };

  return (
    <div
      className={`comp-wrapper ${isSelected ? 'comp-selected' : ''}`}
      onClick={handleClick}
    >
      {renderContent()}
      {isSelected && (
        <button
          className="comp-delete-btn"
          onClick={(e) => { e.stopPropagation(); store.removeComponent(pageIndex, sectionId, component.id); }}
        >
          <HiOutlineTrash size={10} />
        </button>
      )}

      <style jsx>{`
        .comp-wrapper {
          position: relative;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .comp-wrapper:hover { border-color: rgba(232, 116, 42, 0.3); }
        .comp-selected { border-color: var(--brand-secondary) !important; outline: 2px solid rgba(232, 116, 42, 0.15); }
        .comp-delete-btn {
          position: absolute; top: -6px; right: -6px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #ef4444; color: white; border: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; z-index: 10;
        }
      `}</style>
    </div>
  );
}
