'use client';

import { useDesignerStore } from '@/store/designerStore';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { PageType } from '@/types';

export default function PageManager() {
  const store = useDesignerStore();

  const pageTypeColors: Record<PageType, string> = {
    cover: '#3b82f6', welcome: '#10b981', certificate: '#f59e0b',
    benefits: '#8b5cf6', terms: '#64748b', custom: '#e8742a',
  };

  return (
    <div className="page-mgr">
      <div className="page-tabs">
        {store.pages.map((page, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            className={`page-tab ${store.activePageIndex === i ? 'page-tab-active' : ''}`}
            onClick={() => store.setActivePageIndex(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                store.setActivePageIndex(i);
              }
            }}
          >
            <span className="page-tab-dot" style={{ background: pageTypeColors[page.pageType] }} />
            <span className="page-tab-label">{page.title || `Page ${i + 1}`}</span>
            {store.pages.length > 1 && (
              <button
                className="page-tab-delete"
                onClick={(e) => { e.stopPropagation(); store.removePage(i); }}
              >
                <HiOutlineTrash size={10} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="page-add-group">
        {(['cover', 'welcome', 'certificate', 'benefits', 'terms', 'custom'] as PageType[]).map((type) => (
          <button key={type} className="page-add-btn" onClick={() => store.addPage(type)} title={`Add ${type} page`}>
            <HiOutlinePlus size={10} />
            <span>{type}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .page-mgr {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: var(--background-secondary);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }
        .page-tabs { display: flex; gap: 4px; flex: 1; }
        .page-tab {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 6px;
          border: 1px solid var(--border); background: var(--surface);
          color: var(--foreground-muted); font-size: 12px;
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .page-tab:hover { background: var(--surface-hover); }
        .page-tab-active { background: var(--surface-hover) !important; border-color: var(--brand-primary); color: var(--foreground); }
        .page-tab-dot { width: 8px; height: 8px; border-radius: 50%; }
        .page-tab-label { max-width: 120px; overflow: hidden; text-overflow: ellipsis; }
        .page-tab-delete {
          width: 16px; height: 16px; border-radius: 4px;
          background: transparent; border: none; color: var(--foreground-dim);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .page-tab-delete:hover { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        .page-add-group { display: flex; gap: 4px; padding-left: 8px; border-left: 1px solid var(--border); }
        .page-add-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 4px 8px; border-radius: 4px;
          border: 1px dashed var(--border); background: transparent;
          color: var(--foreground-dim); font-size: 10px;
          cursor: pointer; text-transform: capitalize; transition: all 0.15s;
        }
        .page-add-btn:hover { border-color: var(--brand-primary); color: var(--brand-primary-light); background: rgba(13, 124, 62, 0.05); }
      `}</style>
    </div>
  );
}
