const CACHE_NAME = 'zmax-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-72x72.png',
  './icon-96x96.png',
  './icon-128x128.png',
  './icon-144x144.png',
  './icon-152x152.png',
  './icon-192x192.png',
  './icon-384x384.png',
  './icon-512x512.png'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
  // استثناء طلبات Firebase
  if (event.request.url.includes('firebaseio.com') || 
      event.request.url.includes('firebasestorage.googleapis.com')) {
    return fetch(event.request);
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // التحقق مما إذا كانت الاستجابة صالحة للتخزين
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // استنساخ الاستجابة
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch failed:', error);
            
            // إذا كان الطلب لصفحة HTML، ارجع إلى الصفحة الرئيسية
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// استقبال الرسائل من التطبيق
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// معالجة الإشعارات
self.addEventListener('push', event => {
  console.log('[Service Worker] Push received:', event);
  
  let data = {
    title: 'ZMAX',
    body: 'رسالة جديدة',
    icon: './icon-192x192.png',
    badge: './icon-96x96.png'
  };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }
  
  const options = {
    body: data.body,
    icon: data.icon || './icon-192x192.png',
    badge: data.badge || './icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'open',
        title: 'فتح التطبيق'
      },
      {
        action: 'close',
        title: 'إغلاق'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// التعامل مع النقر على الإشعارات
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      // إذا كان هناك نافذة مفتوحة بالفعل، ركز عليها
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      
      // إذا لم تكن هناك نافذة، افتح واحدة جديدة
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});

// تفعيل خلفية التزامن
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    console.log('[Service Worker] Background sync for messages');
    event.waitUntil(syncMessages());
  }
});

// مزامنة الرسائل
async function syncMessages() {
  console.log('[Service Worker] Syncing messages...');
  // هنا يمكنك إضافة كود مزامنة الرسائل
  return Promise.resolve();
}