// 模擬數據
const mockData = {
    stats: {
        totalUsers: 15847,
        totalGenerations: 42156,
        popularAttractions: 127,
        avgRating: 4.6
    },
    attractions: [
        { rank: 1, name: '台北101', region: '台北市', visits: 8542, growth: 15.3, rating: 4.8, category: '購物商圈',
          contentGenerated: 2847, topActivities: ['購物', '觀景台', '美食餐廳', '拍照打卡'] },
        { rank: 2, name: '日月潭', region: '南投縣', visits: 7234, growth: 12.7, rating: 4.7, category: '自然風景',
          contentGenerated: 2456, topActivities: ['遊湖', '騎自行車', '日出攝影', '纜車體驗'] },
        { rank: 3, name: '阿里山', region: '嘉義縣', visits: 6891, growth: 8.5, rating: 4.9, category: '自然風景',
          contentGenerated: 2298, topActivities: ['看日出', '森林步道', '小火車', '賞櫻花'] },
        { rank: 4, name: '墾丁國家公園', region: '屏東縣', visits: 6453, growth: -3.2, rating: 4.6, category: '自然風景',
          contentGenerated: 2134, topActivities: ['沙灘戲水', '浮潛', '夜市逛街', '海景餐廳'] },
        { rank: 5, name: '太魯閣國家公園', region: '花蓮縣', visits: 5876, growth: 18.9, rating: 4.8, category: '自然風景',
          contentGenerated: 1987, topActivities: ['峽谷健行', '燕子口', '九曲洞', '自然攝影'] },
        { rank: 6, name: '九份老街', region: '新北市', visits: 5432, growth: 6.4, rating: 4.5, category: '文化古蹟',
          contentGenerated: 1823, topActivities: ['逛老街', '茶樓品茶', '夜景拍攝', '美食探索'] },
        { rank: 7, name: '西門町', region: '台北市', visits: 5123, growth: 4.2, rating: 4.4, category: '購物商圈',
          contentGenerated: 1712, topActivities: ['逛街購物', '街頭藝術', '美食小吃', '看電影'] },
        { rank: 8, name: '淡水老街', region: '新北市', visits: 4876, growth: 7.8, rating: 4.5, category: '文化古蹟',
          contentGenerated: 1634, topActivities: ['漁人碼頭', '夕陽觀賞', '小吃美食', '古蹟巡禮'] },
        { rank: 9, name: '高美濕地', region: '台中市', visits: 4654, growth: 22.1, rating: 4.7, category: '自然風景',
          contentGenerated: 1556, topActivities: ['夕陽攝影', '濕地生態', '風車景觀', '踩水體驗'] },
        { rank: 10, name: '清境農場', region: '南投縣', visits: 4321, growth: 9.3, rating: 4.6, category: '自然風景',
          contentGenerated: 1443, topActivities: ['餵羊咩咩', '綿羊秀', '高山步道', '民宿住宿'] },
        { rank: 11, name: '士林夜市', region: '台北市', visits: 4198, growth: 1.5, rating: 4.3, category: '夜市美食',
          contentGenerated: 1402, topActivities: ['美食小吃', '大雞排', '夜市遊戲', '逛街購物'] },
        { rank: 12, name: '野柳地質公園', region: '新北市', visits: 3987, growth: 5.6, rating: 4.6, category: '自然風景',
          contentGenerated: 1329, topActivities: ['女王頭拍照', '地質探索', '海岸步道', '自然教育'] },
        { rank: 13, name: '七星潭', region: '花蓮縣', visits: 3765, growth: 13.2, rating: 4.7, category: '自然風景',
          contentGenerated: 1255, topActivities: ['海邊散步', '看海放鬆', '撿石頭', '自行車'] },
        { rank: 14, name: '六合夜市', region: '高雄市', visits: 3543, growth: -1.8, rating: 4.2, category: '夜市美食',
          contentGenerated: 1181, topActivities: ['海鮮美食', '木瓜牛奶', '烤肉串', '南部小吃'] },
        { rank: 15, name: '赤崁樓', region: '台南市', visits: 3421, growth: 8.9, rating: 4.5, category: '文化古蹟',
          contentGenerated: 1140, topActivities: ['古蹟參觀', '歷史導覽', '建築攝影', '文化學習'] }
    ],
    categories: [
        { type: '自然風景', count: 18234, percentage: 35.2, trend: 'up' },
        { type: '文化古蹟', count: 12456, percentage: 24.1, trend: 'up' },
        { type: '夜市美食', count: 10234, percentage: 19.8, trend: 'stable' },
        { type: '主題樂園', count: 6543, percentage: 12.6, trend: 'up' },
        { type: '購物商圈', count: 4321, percentage: 8.3, trend: 'down' }
    ],
    trendData: {
        labels: [],
        visits: [],
        generations: []
    }
};

// 生成過去30天的趨勢數據
function generateTrendData() {
    const days = 30;
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        mockData.trendData.labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        
        // 生成模擬數據（帶有趨勢和隨機波動）
        const baseVisits = 800 + (days - i) * 15;
        const baseGenerations = 1200 + (days - i) * 20;
        mockData.trendData.visits.push(Math.floor(baseVisits + Math.random() * 200));
        mockData.trendData.generations.push(Math.floor(baseGenerations + Math.random() * 300));
    }
}

generateTrendData();

// 圖表實例
let attractionsChart, categoriesChart, trendChart;

// 初始化頁面
document.addEventListener('DOMContentLoaded', function() {
    initializeStats();
    initializeCharts();
    initializeTables();
    setupEventListeners();
});

// 創建台灣地圖
function createTaiwanMap() {
    // 初始化 Leaflet 地圖，中心設在台灣中部
    const map = L.map('taiwanMap').setView([23.8, 121.0], 7);
    
    // 添加地圖圖層（使用 OpenStreetMap）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 7
    }).addTo(map);
    
    // 根據熱門程度獲取顏色
    function getHeatColor(heat) {
        const colors = {
            1: '#3b82f6',  // 藍色
            2: '#10b981',  // 綠色
            3: '#f59e0b',  // 橙色
            4: '#ef4444',  // 紅色
            5: '#dc2626'   // 深紅色
        };
        return colors[heat] || colors[1];
    }
    
    // 根據熱度獲取標記大小
    function getMarkerSize(heat) {
        return 15 + (heat * 5);
    }
    
    // 為活動標籤獲取顏色
    function getActivityColor(index) {
        const colors = [
            'rgba(102, 126, 234, 0.15)',  // 紫藍
            'rgba(16, 185, 129, 0.15)',   // 綠色
            'rgba(245, 158, 11, 0.15)',   // 橙色
            'rgba(239, 68, 68, 0.15)'     // 紅色
        ];
        return colors[index % colors.length];
    }
    
    // 添加景點標記
    mockData.attractions.forEach(attraction => {
        const location = attractionLocations[attraction.name];
        if (!location) return;
        
        const color = getHeatColor(location.heat);
        const size = getMarkerSize(location.heat);
        
        // 創建自訂圖標
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="marker-pin" style="background: ${color}; width: ${size}px; height: ${size}px;">
                    <span style="font-size: ${size * 0.4}px;">${location.heat}</span>
                </div>
            `,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2]
        });
        
        // 創建標記
        const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);
        
        // 創建彈出視窗內容
        const popupContent = `
            <div class="popup-title">${attraction.name}</div>
            <div class="popup-badge" style="background: ${categoryColors[attraction.category]}; color: white; margin-bottom: 8px;">
                ${attraction.category}
            </div>
            <div class="popup-info">📍 地區: ${attraction.region}</div>
            <div class="popup-info">👥 使用次數: ${attraction.visits.toLocaleString()}</div>
            <div class="popup-info">📝 文案生成: ${attraction.contentGenerated.toLocaleString()} 篇</div>
            <div class="popup-info">📈 成長率: <span style="color: ${attraction.growth > 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">${attraction.growth > 0 ? '+' : ''}${attraction.growth}%</span></div>
            <div class="popup-info">⭐ 評分: ${'★'.repeat(Math.floor(attraction.rating))}${'☆'.repeat(5 - Math.floor(attraction.rating))} ${attraction.rating}</div>
            <div class="popup-divider"></div>
            <div class="popup-section-title">🔥 熱門活動</div>
            <div class="popup-activities">
                ${attraction.topActivities.map((activity, index) => 
                    `<span class="activity-tag" style="background: ${getActivityColor(index)};">${activity}</span>`
                ).join('')}
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 280,
            className: 'custom-popup'
        });
        
        // 添加 tooltip（懸停顯示景點名稱）
        marker.bindTooltip(attraction.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -size / 2]
        });
    });
    
    // 添加圖例到地圖
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'heat-legend');
        div.innerHTML = `
            <div class="heat-legend-item">
                <div class="heat-legend-color" style="background: #3b82f6;"></div>
                <span>一般</span>
            </div>
            <div class="heat-legend-item">
                <div class="heat-legend-color" style="background: #10b981;"></div>
                <span>受歡迎</span>
            </div>
            <div class="heat-legend-item">
                <div class="heat-legend-color" style="background: #f59e0b;"></div>
                <span>熱門</span>
            </div>
            <div class="heat-legend-item">
                <div class="heat-legend-color" style="background: #ef4444;"></div>
                <span>非常熱門</span>
            </div>
            <div class="heat-legend-item">
                <div class="heat-legend-color" style="background: #dc2626;"></div>
                <span>超級熱門</span>
            </div>
        `;
        return div;
    };
    
    legend.addTo(map);
}

// 初始化統計數據
function initializeStats() {
    animateNumber('totalUsers', mockData.stats.totalUsers);
    animateNumber('totalGenerations', mockData.stats.totalGenerations);
    animateNumber('popularAttractions', mockData.stats.popularAttractions);
    animateNumber('avgRating', mockData.stats.avgRating, 1);
}

// 數字動畫效果
function animateNumber(elementId, target, decimals = 0) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString();
    }, 16);
}

// 景點類型顏色映射
const categoryColors = {
    '自然風景': 'rgba(16, 185, 129, 0.8)',      // 綠色
    '文化古蹟': 'rgba(245, 158, 11, 0.8)',     // 橙色
    '夜市美食': 'rgba(239, 68, 68, 0.8)',       // 紅色
    '主題樂園': 'rgba(168, 85, 247, 0.8)',     // 紫色
    '購物商圈': 'rgba(59, 130, 246, 0.8)'      // 藍色
};

// 景點地理位置（真實經緯度）
const attractionLocations = {
    '台北101': { lat: 25.0340, lng: 121.5645, heat: 5 },
    '日月潭': { lat: 23.8571, lng: 120.9155, heat: 5 },
    '阿里山': { lat: 23.5081, lng: 120.8134, heat: 4 },
    '墾丁國家公園': { lat: 21.9453, lng: 120.8014, heat: 4 },
    '太魯閣國家公園': { lat: 24.1939, lng: 121.4911, heat: 5 },
    '九份老街': { lat: 25.1095, lng: 121.8456, heat: 4 },
    '西門町': { lat: 25.0420, lng: 121.5071, heat: 4 },
    '淡水老街': { lat: 25.1677, lng: 121.4411, heat: 3 },
    '高美濕地': { lat: 24.3126, lng: 120.5497, heat: 5 },
    '清境農場': { lat: 24.0395, lng: 121.1625, heat: 3 },
    '士林夜市': { lat: 25.0880, lng: 121.5240, heat: 3 },
    '野柳地質公園': { lat: 25.2034, lng: 121.6895, heat: 3 },
    '七星潭': { lat: 24.0324, lng: 121.6225, heat: 3 },
    '六合夜市': { lat: 22.6318, lng: 120.3012, heat: 2 },
    '赤崁樓': { lat: 22.9973, lng: 120.2025, heat: 3 }
};

// 初始化圖表
function initializeCharts() {
    // 生成台灣地圖
    createTaiwanMap();

    // 旅遊類型圓餅圖
    const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    
    categoriesChart = new Chart(categoriesCtx, {
        type: 'doughnut',
        data: {
            labels: mockData.categories.map(c => c.type),
            datasets: [{
                data: mockData.categories.map(c => c.count),
                backgroundColor: [
                    'rgba(16, 185, 129, 0.85)',    // 自然風景 - 綠色
                    'rgba(245, 158, 11, 0.85)',     // 文化古蹟 - 橙色
                    'rgba(239, 68, 68, 0.85)',       // 夜市美食 - 紅色
                    'rgba(168, 85, 247, 0.85)',     // 主題樂園 - 紫色
                    'rgba(59, 130, 246, 0.85)'      // 購物商圈 - 藍色
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '0%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = mockData.categories[context.dataIndex].percentage;
                            return label + ': ' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'textInSlices',
            afterDatasetDraw: function(chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                const meta = chart.getDatasetMeta(0);
                
                ctx.save();
                ctx.font = 'bold 14px sans-serif';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 4;
                
                meta.data.forEach((arc, index) => {
                    const category = mockData.categories[index];
                    const angle = (arc.startAngle + arc.endAngle) / 2;
                    
                    // 計算文字位置（在扇形的中心）
                    const radius = (arc.innerRadius + arc.outerRadius) / 2;
                    const x = arc.x + Math.cos(angle) * radius;
                    const y = arc.y + Math.sin(angle) * radius;
                    
                    // 繪製類別名稱
                    ctx.font = 'bold 15px sans-serif';
                    ctx.fillText(category.type, x, y - 8);
                    
                    // 繪製百分比
                    ctx.font = 'bold 13px sans-serif';
                    ctx.fillText(category.percentage + '%', x, y + 10);
                });
                
                ctx.restore();
            }
        }]
    });

    // 趨勢折線圖
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: mockData.trendData.labels,
            datasets: [
                {
                    label: '景點瀏覽',
                    data: mockData.trendData.visits,
                    borderColor: 'rgba(79, 70, 229, 1)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '文案生成',
                    data: mockData.trendData.generations,
                    borderColor: 'rgba(6, 182, 212, 1)',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// 初始化表格
function initializeTables() {
    // 景點表格
    const attractionsTableBody = document.getElementById('attractionsTableBody');
    attractionsTableBody.innerHTML = mockData.attractions.map(attraction => `
        <tr>
            <td><strong>#${attraction.rank}</strong></td>
            <td>
                <strong>${attraction.name}</strong>
                <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">
                    ${attraction.topActivities.slice(0, 2).join(' · ')}
                </div>
            </td>
            <td><span class="badge badge-primary">${attraction.region}</span></td>
            <td>${attraction.visits.toLocaleString()}</td>
            <td><strong style="color: #667eea;">${attraction.contentGenerated.toLocaleString()}</strong></td>
            <td>
                <span class="trend-indicator ${attraction.growth > 0 ? 'trend-up' : attraction.growth < 0 ? 'trend-down' : 'trend-stable'}">
                    ${attraction.growth > 0 ? '↑' : attraction.growth < 0 ? '↓' : '→'} ${Math.abs(attraction.growth)}%
                </span>
            </td>
            <td>
                <span class="rating-stars">
                    ${'★'.repeat(Math.floor(attraction.rating))}${'☆'.repeat(5 - Math.floor(attraction.rating))}
                </span>
                ${attraction.rating}
            </td>
        </tr>
    `).join('');

    // 類型表格
    const categoriesTableBody = document.getElementById('categoriesTableBody');
    categoriesTableBody.innerHTML = mockData.categories.map(category => `
        <tr>
            <td><strong>${category.type}</strong></td>
            <td>${category.count.toLocaleString()}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="flex: 1; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${category.percentage}%; background: linear-gradient(90deg, #4f46e5, #06b6d4); height: 100%;"></div>
                    </div>
                    <span>${category.percentage}%</span>
                </div>
            </td>
            <td>
                <span class="trend-indicator ${
                    category.trend === 'up' ? 'trend-up' : 
                    category.trend === 'down' ? 'trend-down' : 
                    'trend-stable'
                }">
                    ${category.trend === 'up' ? '↑ 上升' : category.trend === 'down' ? '↓ 下降' : '→ 持平'}
                </span>
            </td>
        </tr>
    `).join('');
}

// 設置事件監聽器
function setupEventListeners() {
    // 時間範圍選擇器
    document.getElementById('timeRange').addEventListener('change', function(e) {
        console.log('時間範圍變更:', e.target.value + '天');
        refreshData();
    });

    // 景點搜尋
    document.getElementById('searchAttractions').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#attractionsTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // 導航菜單
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 重新整理數據
function refreshData() {
    // 添加載入動畫
    document.querySelectorAll('.stat-number').forEach(el => {
        el.style.opacity = '0.5';
    });

    // 模擬數據載入
    setTimeout(() => {
        // 隨機調整數據（模擬真實數據變化）
        mockData.stats.totalUsers += Math.floor(Math.random() * 100);
        mockData.stats.totalGenerations += Math.floor(Math.random() * 200);
        
        initializeStats();
        
        document.querySelectorAll('.stat-number').forEach(el => {
            el.style.opacity = '1';
        });
        
        // 顯示成功訊息
        showNotification('數據已更新', 'success');
    }, 500);
}

// 通知訊息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#4f46e5'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 添加動畫樣式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 導出功能（可選）
function exportData(format) {
    if (format === 'csv') {
        let csv = '排名,景點名稱,地區,使用次數,成長率,平均評分\n';
        mockData.attractions.forEach(a => {
            csv += `${a.rank},${a.name},${a.region},${a.visits},${a.growth},${a.rating}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '景點數據.csv';
        a.click();
    }
}

console.log('🚀 旅遊數據分析儀表板已載入');
