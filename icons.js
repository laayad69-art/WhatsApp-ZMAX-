// هذا ملف لإنشاء الأيقونات البرمجياً إذا أردت
// أو يمكنك استخدام أيقونات جاهزة

// يمكنك حفظ هذا كـ generate-icons.html لتوليد الأيقونات
const generateIconsHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>إنشاء أيقونات ZMAX</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            direction: rtl;
        }
        .icon-preview {
            display: inline-block;
            margin: 10px;
            text-align: center;
        }
        .icon-canvas {
            border: 1px solid #ccc;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <h1>مولد أيقونات ZMAX</h1>
    
    <div id="iconsContainer"></div>
    
    <button onclick="generateAllIcons()">توليد كل الأيقونات</button>
    <button onclick="downloadAllIcons()">تحميل كل الأيقونات</button>
    
    <script>
        const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
        
        function createIcon(size) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            canvas.className = 'icon-canvas';
            
            const ctx = canvas.getContext('2d');
            
            // الخلفية البرتقالية
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#FFD700');
            gradient.addColorStop(0.5, '#FFA500');
            gradient.addColorStop(1, '#FF8C00');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
            
            // المربع الأبيض المائل
            ctx.save();
            ctx.translate(size/2, size/2);
            ctx.rotate(45 * Math.PI / 180);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            const rectSize = size * 0.4;
            ctx.fillRect(-rectSize/2, -rectSize/2, rectSize, rectSize);
            ctx.restore();
            
            // نص ZMAX
            ctx.fillStyle = '#FF8C00';
            ctx.font = \`bold \${size/8}px Arial\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('ZMAX', size/2, size/2);
            
            return canvas;
        }
        
        function generateAllIcons() {
            const container = document.getElementById('iconsContainer');
            container.innerHTML = '';
            
            sizes.forEach(size => {
                const div = document.createElement('div');
                div.className = 'icon-preview';
                
                const canvas = createIcon(size);
                div.appendChild(canvas);
                
                const label = document.createElement('div');
                label.textContent = \`\${size}x\${size}\`;
                div.appendChild(label);
                
                container.appendChild(div);
            });
        }
        
        function downloadAllIcons() {
            sizes.forEach(size => {
                const canvas = createIcon(size);
                const link = document.createElement('a');
                link.download = \`icon-\${size}x\${size}.png\`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
            alert('تم تحميل جميع الأيقونات!');
        }
        
        // توليد عند التحميل
        window.onload = generateAllIcons;
    </script>
</body>
</html>
`;