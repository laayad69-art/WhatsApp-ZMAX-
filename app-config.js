// إعدادات التطبيق
const appConfig = {
    // إعدادات التطبيق
    appName: "ZMAX",
    appVersion: "3.0.0",
    appDescription: "تطبيق المراسلة المتقدم",
    
    // الألوان
    colors: {
        primary: "#FF8C00",
        secondary: "#FFA500",
        background: "#0c1317",
        text: "#e9edef"
    },
    
    // الإعدادات الافتراضية
    defaultSettings: {
        notifications: true,
        sound: true,
        vibration: true,
        darkMode: true,
        lastSeenPrivacy: "contacts",
        profilePicPrivacy: "contacts",
        language: "ar"
    },
    
    // بيانات الاختبار
    testUsers: {
        admin: {
            username: "admin",
            password: "admin123",
            name: "المسؤول",
            email: "admin@zmax.com"
        },
        ahmed: {
            username: "ahmed",
            password: "test123",
            name: "أحمد محمد",
            email: "ahmed@test.com"
        },
        sara: {
            username: "sara",
            password: "sara2024",
            name: "سارة عبدالله",
            email: "sara@test.com"
        }
    },
    
    // روابط مهمة
    links: {
        privacyPolicy: "https://zmax.app/privacy",
        termsOfService: "https://zmax.app/terms",
        support: "https://zmax.app/support"
    },
    
    // ميزات التطبيق
    features: {
        stories: true,
        groups: true,
        voiceMessages: false,
        videoCalls: false,
        fileSharing: true,
        locationSharing: true
    }
};

// تصدير الإعدادات
window.appConfig = appConfig;