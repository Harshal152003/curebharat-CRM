import { create } from 'zustand';
import { ITemplatePage, ISection, IComponent, PageType } from '@/types';
import { v4 as uuid } from 'uuid';

interface DesignerState {
  templateId: string | null;
  templateName: string;
  pages: ITemplatePage[];
  activePageIndex: number;
  selectedComponentId: string | null;
  selectedSectionId: string | null;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };

  // Actions
  setTemplateId: (id: string) => void;
  setTemplateName: (name: string) => void;
  setPages: (pages: ITemplatePage[]) => void;
  setBrandColors: (colors: DesignerState['brandColors']) => void;
  setActivePageIndex: (index: number) => void;
  selectComponent: (id: string | null) => void;
  selectSection: (id: string | null) => void;

  // Page actions
  addPage: (type: PageType) => void;
  removePage: (index: number) => void;
  updatePage: (index: number, data: Partial<ITemplatePage>) => void;
  reorderPages: (from: number, to: number) => void;

  // Section actions
  addSection: (pageIndex: number, layout?: ISection['layout']) => void;
  updateSection: (pageIndex: number, sectionId: string, data: Partial<ISection>) => void;
  removeSection: (pageIndex: number, sectionId: string) => void;

  // Component actions
  addComponent: (pageIndex: number, sectionId: string, component: IComponent) => void;
  updateComponent: (pageIndex: number, sectionId: string, componentId: string, data: Partial<IComponent>) => void;
  removeComponent: (pageIndex: number, sectionId: string, componentId: string) => void;

  // Helpers
  getActivePage: () => ITemplatePage | undefined;
  getSelectedComponent: () => { component: IComponent; sectionId: string } | null;
}

const defaultPage = (pageIndex: number, pageType: PageType = 'custom', title: string = 'Untitled Page'): ITemplatePage => ({
  pageIndex,
  pageType,
  title,
  background: { type: 'color', value: '#ffffff', opacity: 1, overlay: '' },
  watermark: { enabled: false, type: 'text', value: '', opacity: 0.1, rotation: -30, size: '200px', repeat: false },
  header: { enabled: true, height: '80px', logo: '', companyName: 'CureBharat', website: 'www.curebharat.com', address: '', contactDetails: '', backgroundColor: '#ffffff', textColor: '#333333' },
  footer: { enabled: true, height: '60px', showPageNumbers: true, companyDetails: '', legalText: '', backgroundColor: '#1a5c2e', textColor: '#ffffff' },
  sections: [],
  showGlobalHeader: true,
  showGlobalFooter: true,
  showGlobalWatermark: true,
});

export const useDesignerStore = create<DesignerState>((set, get) => ({
  templateId: null,
  templateName: 'Untitled Template',
  pages: [defaultPage(0, 'cover', 'Cover Page')],
  activePageIndex: 0,
  selectedComponentId: null,
  selectedSectionId: null,
  brandColors: {
    primary: '#1a5c2e',
    secondary: '#e8742a',
    accent: '#f5a623',
    background: '#ffffff',
    text: '#333333',
  },

  setTemplateId: (id) => set({ templateId: id }),
  setTemplateName: (name) => set({ templateName: name }),
  setPages: (pages) => set({ pages }),
  setBrandColors: (colors) => set({ brandColors: colors }),
  setActivePageIndex: (index) => set({ activePageIndex: index, selectedComponentId: null, selectedSectionId: null }),
  selectComponent: (id) => set({ selectedComponentId: id }),
  selectSection: (id) => set({ selectedSectionId: id }),

  addPage: (type) => {
    const pages = get().pages;
    const titles: Record<PageType, string> = {
      cover: 'Cover Page', welcome: 'Welcome Page', certificate: 'Certificate',
      benefits: 'Benefits', terms: 'Terms & Conditions', custom: 'Custom Page',
    };
    const newPage = defaultPage(pages.length, type, titles[type]);
    set({ pages: [...pages, newPage], activePageIndex: pages.length });
  },

  removePage: (index) => {
    const pages = get().pages.filter((_, i) => i !== index).map((p, i) => ({ ...p, pageIndex: i }));
    const activePageIndex = Math.min(get().activePageIndex, pages.length - 1);
    set({ pages, activePageIndex: Math.max(0, activePageIndex) });
  },

  updatePage: (index, data) => {
    const pages = [...get().pages];
    pages[index] = { ...pages[index], ...data };
    set({ pages });
  },

  reorderPages: (from, to) => {
    const pages = [...get().pages];
    const [moved] = pages.splice(from, 1);
    pages.splice(to, 0, moved);
    set({ pages: pages.map((p, i) => ({ ...p, pageIndex: i })) });
  },

  addSection: (pageIndex, layout = 'full') => {
    const pages = [...get().pages];
    const newSection: ISection = { id: uuid(), layout, components: [], style: { padding: '20px' } };
    pages[pageIndex] = { ...pages[pageIndex], sections: [...pages[pageIndex].sections, newSection] };
    set({ pages });
  },

  updateSection: (pageIndex, sectionId, data) => {
    const pages = [...get().pages];
    pages[pageIndex] = {
      ...pages[pageIndex],
      sections: pages[pageIndex].sections.map((s) => (s.id === sectionId ? { ...s, ...data } : s)),
    };
    set({ pages });
  },

  removeSection: (pageIndex, sectionId) => {
    const pages = [...get().pages];
    pages[pageIndex] = {
      ...pages[pageIndex],
      sections: pages[pageIndex].sections.filter((s) => s.id !== sectionId),
    };
    set({ pages });
  },

  addComponent: (pageIndex, sectionId, component) => {
    const pages = [...get().pages];
    pages[pageIndex] = {
      ...pages[pageIndex],
      sections: pages[pageIndex].sections.map((s) =>
        s.id === sectionId ? { ...s, components: [...s.components, component] } : s
      ),
    };
    set({ pages, selectedComponentId: component.id });
  },

  updateComponent: (pageIndex, sectionId, componentId, data) => {
    const pages = [...get().pages];
    pages[pageIndex] = {
      ...pages[pageIndex],
      sections: pages[pageIndex].sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              components: s.components.map((c) =>
                c.id === componentId ? { ...c, ...data } : c
              ),
            }
          : s
      ),
    };
    set({ pages });
  },

  removeComponent: (pageIndex, sectionId, componentId) => {
    const pages = [...get().pages];
    pages[pageIndex] = {
      ...pages[pageIndex],
      sections: pages[pageIndex].sections.map((s) =>
        s.id === sectionId
          ? { ...s, components: s.components.filter((c) => c.id !== componentId) }
          : s
      ),
    };
    set({ pages, selectedComponentId: null });
  },

  getActivePage: () => get().pages[get().activePageIndex],
  getSelectedComponent: () => {
    const { pages, activePageIndex, selectedComponentId } = get();
    if (!selectedComponentId) return null;
    const page = pages[activePageIndex];
    for (const section of page.sections) {
      const comp = section.components.find((c) => c.id === selectedComponentId);
      if (comp) return { component: comp, sectionId: section.id };
    }
    return null;
  },
}));
