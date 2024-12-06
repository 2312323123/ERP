export const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'BEST ERP',
    short_name: 'ERP',
    description: 'system to do anything',
    icons: [
      {
        src: '/public/icons/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/public/icons/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/public/icons/pwa-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/public/icons/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 5 MB
  },
}
