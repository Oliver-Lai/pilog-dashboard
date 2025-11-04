// 模擬數據
const mockData = {
    stats: {
        totalUsers: 15847,
        totalGenerations: 42156,
        popularAttractions: 127,
        avgRating: 4.6
    },
    attractions: [
        { rank: 1, name: '台北101', region: '台北市', visits: 8542, growth: 15.3, rating: 4.8 },
        { rank: 2, name: '日月潭', region: '南投縣', visits: 7234, growth: 12.7, rating: 4.7 },
        { rank: 3, name: '阿里山', region: '嘉義縣', visits: 6891, growth: 8.5, rating: 4.9 },
        { rank: 4, name: '墾丁國家公園', region: '屏東縣', visits: 6453, growth: -3.2, rating: 4.6 },
        { rank: 5, name: '太魯閣國家公園', region: '花蓮縣', visits: 5876, growth: 18.9, rating: 4.8 },
        { rank: 6, name: '九份老街', region: '新北市', visits: 5432, growth: 6.4, rating: 4.5 },
        { rank: 7, name: '西門町', region: '台北市', visits: 5123, growth: 4.2, rating: 4.4 },
        { rank: 8, name: '淡水老街', region: '新北市', visits: 4876, growth: 7.8, rating: 4.5 },
        { rank: 9, name: '高美濕地', region: '台中市', visits: 4654, growth: 22.1, rating: 4.7 },
        { rank: 10, name: '清境農場', region: '南投縣', visits: 4321, growth: 9.3, rating: 4.6 },
        { rank: 11, name: '士林夜市', region: '台北市', visits: 4198, growth: 1.5, rating: 4.3 },
        { rank: 12, name: '野柳地質公園', region: '新北市', visits: 3987, growth: 5.6, rating: 4.6 },
        { rank: 13, name: '七星潭', region: '花蓮縣', visits: 3765, growth: 13.2, rating: 4.7 },
        { rank: 14, name: '六合夜市', region: '高雄市', visits: 3543, growth: -1.8, rating: 4.2 },
        { rank: 15, name: '赤崁樓', region: '台南市', visits: 3421, growth: 8.9, rating: 4.5 }
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

// 初始化圖表
function initializeCharts() {
    // 熱門景點長條圖
    const attractionsCtx = document.getElementById('attractionsChart').getContext('2d');
    const top10Attractions = mockData.attractions.slice(0, 10);
    
    attractionsChart = new Chart(attractionsCtx, {
        type: 'bar',
        data: {
            labels: top10Attractions.map(a => a.name),
            datasets: [{
                label: '使用次數',
                data: top10Attractions.map(a => a.visits),
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
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

    // 旅遊類型圓餅圖
    const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    
    categoriesChart = new Chart(categoriesCtx, {
        type: 'doughnut',
        data: {
            labels: mockData.categories.map(c => c.type),
            datasets: [{
                data: mockData.categories.map(c => c.count),
                backgroundColor: [
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(6, 182, 212, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
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
            <td><strong>${attraction.name}</strong></td>
            <td><span class="badge badge-primary">${attraction.region}</span></td>
            <td>${attraction.visits.toLocaleString()}</td>
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
