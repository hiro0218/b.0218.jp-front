/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-react-svg" />

interface Window {
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string });
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      event_label: string;
      event_category: string;
      value?: string;
    },
  );

  twttr?: {
    widgets: {
      load: (el: HTMLElement) => void;
    };
  };
}