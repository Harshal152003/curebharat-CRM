'use client';

import { useDesignerStore } from '@/store/designerStore';
import { DYNAMIC_FIELDS } from '@/types';

export default function PropertyPanel() {
  const store = useDesignerStore();
  const page = store.getActivePage();
  const selectedComp = store.getSelectedComponent();

  if (selectedComp) {
    return <ComponentProperties />;
  }

  if (!page) return <div style={{ padding: 16, color: 'var(--foreground-dim)' }}>No page selected</div>;

  return (
    <div className="props-panel">
      <div className="props-header">
        <h3>Page Settings</h3>
      </div>

      {/* Page Info */}
      <div className="props-section">
        <label className="props-label">Page Title</label>
        <input className="input" value={page.title} onChange={(e) => store.updatePage(store.activePageIndex, { title: e.target.value })} />
      </div>

      <div className="props-section">
        <label className="props-label">Page Type</label>
        <select className="input" value={page.pageType} onChange={(e) => store.updatePage(store.activePageIndex, { pageType: e.target.value as 'cover' | 'welcome' | 'certificate' | 'benefits' | 'terms' | 'custom' })}>
          <option value="cover">Cover</option>
          <option value="welcome">Welcome</option>
          <option value="certificate">Certificate</option>
          <option value="benefits">Benefits</option>
          <option value="terms">Terms</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* Background */}
      <div className="props-section">
        <p className="props-section-title">Background</p>
        <label className="props-label">Type</label>
        <select className="input" value={page.background?.type || 'color'} onChange={(e) => store.updatePage(store.activePageIndex, { background: { ...page.background!, type: e.target.value as 'color' | 'image' | 'gradient' } })}>
          <option value="color">Color</option>
          <option value="gradient">Gradient</option>
          <option value="image">Image</option>
        </select>
        <label className="props-label" style={{ marginTop: 8 }}>Value</label>
        {page.background?.type === 'color' ? (
          <input type="color" className="input" style={{ height: 36, cursor: 'pointer' }} value={page.background.value} onChange={(e) => store.updatePage(store.activePageIndex, { background: { ...page.background!, value: e.target.value } })} />
        ) : (
          <input className="input" placeholder={page.background?.type === 'gradient' ? 'linear-gradient(...)' : 'https://...'} value={page.background?.value || ''} onChange={(e) => store.updatePage(store.activePageIndex, { background: { ...page.background!, value: e.target.value } })} />
        )}
      </div>

      {/* Watermark */}
      <div className="props-section">
        <p className="props-section-title">Watermark</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--foreground-muted)', cursor: 'pointer' }}>
          <input type="checkbox" checked={page.watermark?.enabled || false} onChange={(e) => store.updatePage(store.activePageIndex, { watermark: { ...page.watermark!, enabled: e.target.checked } })} />
          Enable Watermark
        </label>
        {page.watermark?.enabled && (
          <>
            <input className="input" style={{ marginTop: 8 }} placeholder="Watermark text or image URL" value={page.watermark.value} onChange={(e) => store.updatePage(store.activePageIndex, { watermark: { ...page.watermark!, value: e.target.value } })} />
            <label className="props-label" style={{ marginTop: 8 }}>Opacity: {page.watermark.opacity}</label>
            <input type="range" min="0" max="1" step="0.05" value={page.watermark.opacity} onChange={(e) => store.updatePage(store.activePageIndex, { watermark: { ...page.watermark!, opacity: parseFloat(e.target.value) } })} style={{ width: '100%' }} />
          </>
        )}
      </div>

      {/* Header */}
      <div className="props-section">
        <p className="props-section-title">Header</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--foreground-muted)', cursor: 'pointer' }}>
          <input type="checkbox" checked={page.showGlobalHeader} onChange={(e) => store.updatePage(store.activePageIndex, { showGlobalHeader: e.target.checked })} />
          Show Header
        </label>
        {page.showGlobalHeader && (
          <>
            <input className="input" style={{ marginTop: 8 }} placeholder="Company Name" value={page.header?.companyName || ''} onChange={(e) => store.updatePage(store.activePageIndex, { header: { ...page.header!, companyName: e.target.value } })} />
            <input className="input" style={{ marginTop: 8 }} placeholder="Website" value={page.header?.website || ''} onChange={(e) => store.updatePage(store.activePageIndex, { header: { ...page.header!, website: e.target.value } })} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1 }}>
                <label className="props-label">BG Color</label>
                <input type="color" className="input" style={{ height: 32 }} value={page.header?.backgroundColor || '#fff'} onChange={(e) => store.updatePage(store.activePageIndex, { header: { ...page.header!, backgroundColor: e.target.value } })} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="props-label">Text Color</label>
                <input type="color" className="input" style={{ height: 32 }} value={page.header?.textColor || '#333'} onChange={(e) => store.updatePage(store.activePageIndex, { header: { ...page.header!, textColor: e.target.value } })} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="props-section">
        <p className="props-section-title">Footer</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--foreground-muted)', cursor: 'pointer' }}>
          <input type="checkbox" checked={page.showGlobalFooter} onChange={(e) => store.updatePage(store.activePageIndex, { showGlobalFooter: e.target.checked })} />
          Show Footer
        </label>
        {page.showGlobalFooter && (
          <>
            <input className="input" style={{ marginTop: 8 }} placeholder="Company Details" value={page.footer?.companyDetails || ''} onChange={(e) => store.updatePage(store.activePageIndex, { footer: { ...page.footer!, companyDetails: e.target.value } })} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1 }}>
                <label className="props-label">BG Color</label>
                <input type="color" className="input" style={{ height: 32 }} value={page.footer?.backgroundColor || '#1a5c2e'} onChange={(e) => store.updatePage(store.activePageIndex, { footer: { ...page.footer!, backgroundColor: e.target.value } })} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="props-label">Text</label>
                <input type="color" className="input" style={{ height: 32 }} value={page.footer?.textColor || '#fff'} onChange={(e) => store.updatePage(store.activePageIndex, { footer: { ...page.footer!, textColor: e.target.value } })} />
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .props-panel { }
        .props-header { padding: 16px; border-bottom: 1px solid var(--border); }
        .props-header h3 { font-size: 14px; font-weight: 600; color: var(--foreground); text-transform: uppercase; letter-spacing: 0.05em; }
        .props-section { padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .props-section-title { font-size: 12px; font-weight: 600; color: var(--foreground); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
        .props-label { display: block; font-size: 11px; font-weight: 500; color: var(--foreground-dim); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em; }
      `}</style>
    </div>
  );
}

function ComponentProperties() {
  const store = useDesignerStore();
  const selected = store.getSelectedComponent();
  if (!selected) return null;

  const { component, sectionId } = selected;
  const props = component.props as Record<string, unknown>;
  const style = component.style;

  const updateProp = (key: string, value: unknown) => {
    store.updateComponent(store.activePageIndex, sectionId, component.id, {
      props: { ...props, [key]: value },
    });
  };

  const updateStyle = (key: string, value: string | number) => {
    store.updateComponent(store.activePageIndex, sectionId, component.id, {
      style: { ...style, [key]: value },
    });
  };

  return (
    <div className="props-panel">
      <div className="props-header">
        <h3>{component.type.replace('-', ' ')} Properties</h3>
      </div>

      {/* Content props */}
      {component.type === 'text' && (
        <div className="props-section">
          <label className="props-label">Content</label>
          <textarea className="input" rows={4} value={(props.content as string) || ''} onChange={(e) => updateProp('content', e.target.value)} />
        </div>
      )}

      {component.type === 'dynamic-field' && (
        <div className="props-section">
          <label className="props-label">Field</label>
          <select className="input" value={(props.placeholder as string) || ''} onChange={(e) => { updateProp('placeholder', e.target.value); updateProp('label', DYNAMIC_FIELDS.find(f => f.key === e.target.value)?.label || ''); }}>
            {DYNAMIC_FIELDS.map((f) => (
              <option key={f.key} value={f.key}>{f.label} — {f.key}</option>
            ))}
          </select>
        </div>
      )}

      {(component.type === 'image' || component.type === 'logo') && (
        <div className="props-section">
          <label className="props-label">Image URL</label>
          <input className="input" value={(props.src as string) || ''} onChange={(e) => updateProp('src', e.target.value)} placeholder="https://..." />
        </div>
      )}

      {component.type === 'card' && (
        <div className="props-section">
          <label className="props-label">Title</label>
          <input className="input" value={(props.title as string) || ''} onChange={(e) => updateProp('title', e.target.value)} />
          <label className="props-label" style={{ marginTop: 8 }}>Content</label>
          <textarea className="input" rows={3} value={(props.content as string) || ''} onChange={(e) => updateProp('content', e.target.value)} />
        </div>
      )}

      {component.type === 'icon-block' && (
        <div className="props-section">
          <label className="props-label">Icon (emoji)</label>
          <input className="input" value={(props.icon as string) || ''} onChange={(e) => updateProp('icon', e.target.value)} />
          <label className="props-label" style={{ marginTop: 8 }}>Title</label>
          <input className="input" value={(props.title as string) || ''} onChange={(e) => updateProp('title', e.target.value)} />
          <label className="props-label" style={{ marginTop: 8 }}>Description</label>
          <input className="input" value={(props.description as string) || ''} onChange={(e) => updateProp('description', e.target.value)} />
        </div>
      )}

      {/* Typography */}
      <div className="props-section">
        <p className="props-section-title">Typography</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <label className="props-label">Font Size</label>
            <input className="input" value={style.fontSize || ''} onChange={(e) => updateStyle('fontSize', e.target.value)} placeholder="14px" />
          </div>
          <div>
            <label className="props-label">Font Weight</label>
            <select className="input" value={style.fontWeight || '400'} onChange={(e) => updateStyle('fontWeight', e.target.value)}>
              {['300', '400', '500', '600', '700', '800'].map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="props-label">Text Align</label>
            <select className="input" value={style.textAlign || 'left'} onChange={(e) => updateStyle('textAlign', e.target.value)}>
              {['left', 'center', 'right', 'justify'].map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="props-label">Line Height</label>
            <input className="input" value={style.lineHeight || ''} onChange={(e) => updateStyle('lineHeight', e.target.value)} placeholder="1.6" />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="props-section">
        <p className="props-section-title">Colors</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label className="props-label">Text</label>
            <input type="color" className="input" style={{ height: 32 }} value={style.color || '#333333'} onChange={(e) => updateStyle('color', e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="props-label">Background</label>
            <input type="color" className="input" style={{ height: 32 }} value={style.backgroundColor || '#ffffff'} onChange={(e) => updateStyle('backgroundColor', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div className="props-section">
        <p className="props-section-title">Spacing</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <label className="props-label">Padding</label>
            <input className="input" value={style.padding || ''} onChange={(e) => updateStyle('padding', e.target.value)} placeholder="8px" />
          </div>
          <div>
            <label className="props-label">Margin</label>
            <input className="input" value={style.margin || ''} onChange={(e) => updateStyle('margin', e.target.value)} placeholder="0px" />
          </div>
          <div>
            <label className="props-label">Border Radius</label>
            <input className="input" value={style.borderRadius || ''} onChange={(e) => updateStyle('borderRadius', e.target.value)} placeholder="0px" />
          </div>
          <div>
            <label className="props-label">Opacity</label>
            <input type="number" className="input" min="0" max="1" step="0.1" value={style.opacity ?? 1} onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .props-panel { }
        .props-header { padding: 16px; border-bottom: 1px solid var(--border); }
        .props-header h3 { font-size: 13px; font-weight: 600; color: var(--foreground); text-transform: uppercase; letter-spacing: 0.04em; }
        .props-section { padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .props-section-title { font-size: 11px; font-weight: 600; color: var(--foreground); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
        .props-label { display: block; font-size: 10px; font-weight: 500; color: var(--foreground-dim); margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.04em; }
      `}</style>
    </div>
  );
}
