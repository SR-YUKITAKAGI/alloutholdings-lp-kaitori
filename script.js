// Phone call function
function makePhoneCall() {
    const phoneNumber = 'tel:0120-XXX-XXX'; // Replace with actual phone number
    window.location.href = phoneNumber;
}

// LINE function
function openLine() {
    // Replace with actual LINE URL
    const lineUrl = 'https://line.me/R/ti/p/@XXXXX';
    window.open(lineUrl, '_blank');
}

// Select purchase method
function selectMethod(method) {
    switch(method) {
        case 'line':
            openLine();
            break;
        case 'phone':
            makePhoneCall();
            break;
        case 'delivery':
            // Scroll to contact section or open modal
            alert('宅配買取のお申し込みは、お電話またはLINEからお願いいたします。');
            break;
    }
}

// FAQ toggle function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add sparkle effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });
    
    // Create sparkle effect
    function createSparkle(element) {
        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFF;
            border-radius: 50%;
            animation: sparkleAnim 1s ease-out forwards;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Add floating animation to price cards
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add lottery-style number animation to prices
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const originalText = price.textContent;
        price.addEventListener('mouseenter', function() {
            animatePrice(this, originalText);
        });
    });
    
    function animatePrice(element, originalText) {
        let counter = 0;
        const interval = setInterval(() => {
            element.textContent = '¥' + Math.floor(Math.random() * 100000) + '〜';
            counter++;
            if (counter > 10) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 50);
    }
    
    // Add confetti effect to urgency section
    const urgencySection = document.querySelector('.urgency');
    if (urgencySection) {
        createConfetti(urgencySection);
    }
    
    function createConfetti(container) {
        const colors = ['#FF0000', '#FFD700', '#FFA500', '#FF6347'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 0.8;
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            container.appendChild(confetti);
        }
    }
});

// Gold Price Chart
document.addEventListener('DOMContentLoaded', function() {
    // Create gold price chart
    const ctx = document.getElementById('goldPriceChart');
    if (ctx) {
        const years = [];
        const prices = [];
        
        // Historical data (approximate)
        const historicalData = {
            2015: [4400, 4420, 4380, 4450, 4400, 4350, 4400, 4450, 4380, 4420, 4400, 4410],
            2016: [4300, 4320, 4280, 4350, 4300, 4250, 4300, 4350, 4280, 4320, 4300, 4310],
            2017: [4500, 4520, 4480, 4550, 4500, 4450, 4500, 4550, 4480, 4520, 4500, 4510],
            2018: [4700, 4720, 4680, 4750, 4700, 4650, 4700, 4750, 4680, 4720, 4700, 4710],
            2019: [5200, 5220, 5180, 5250, 5200, 5150, 5200, 5250, 5180, 5220, 5200, 5210],
            2020: [5500, 5800, 6200, 6500, 6800, 7000, 6900, 6800, 6700, 6600, 6500, 6550],
            2021: [6800, 6900, 7000, 7100, 7200, 7300, 7250, 7200, 7150, 7100, 7200, 7250],
            2022: [7500, 7800, 8200, 8500, 8800, 9000, 9100, 9000, 8900, 8800, 8700, 8800],
            2023: [9000, 9300, 9600, 9900, 10200, 10500, 10800, 11000, 10900, 10800, 11000, 11200],
            2024: [11500, 11800, 12000, 12200, 12400, 12600, 12700, 12831, 13057, 14297, 14477, 14392]
        };
        
        // 2025年の実際のデータ
        const data2025 = [
            15068,  // 1月
            15625,  // 2月
            15754,  // 3月
            16554,  // 4月
            16869,  // 5月
            17220,  // 6月
            17421,  // 7月
            17339   // 8月（現在）
        ];
        
        // Compile all data
        for (let year = 2015; year <= 2024; year++) {
            const monthlyData = historicalData[year];
            for (let month = 0; month < monthlyData.length; month++) {
                years.push(`${year}/${month + 1}`);
                prices.push(monthlyData[month]);
            }
        }
        
        // Add 2025 data
        for (let month = 0; month < data2025.length; month++) {
            years.push(`2025/${month + 1}`);
            prices.push(data2025[month]);
        }
        
        // Show only every 6th label to avoid crowding
        const displayedLabels = years.map((label, index) => {
            return index % 6 === 0 ? label : '';
        });
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: displayedLabels,
                datasets: [{
                    label: '金買取価格 (円/g)',
                    data: prices,
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#FFD700',
                    pointBorderColor: '#FF0000',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '金買取価格推移（2015年〜2025年8月）史上最高値 ¥17,339/g 更新中！',
                        color: '#FF0000',
                        font: {
                            size: 20,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '¥' + context.parsed.y.toLocaleString() + '/g';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#666',
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: '#666',
                            callback: function(value) {
                                return '¥' + value.toLocaleString();
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
});

// Modal functions - グローバルスコープに配置
window.showModal = function(contentType) {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modal-body');

    let content = '';

    switch(contentType) {
        case 'company':
            content = `
                <h2>会社情報</h2>
                <h3>株式会社オールアウト・ホールディングス</h3>

                <p><strong>東京本社</strong><br>
                〒154-0024<br>
                東京都世田谷区三軒茶屋2－10－9　エスタシオ1号室</p>

                <p><strong>TEL:</strong> 〇〇〇</p>

                <p><strong>運営責任者:</strong> 福田　将大</p>

                <p><strong>適格請求書発行事業者登録番号:</strong><br>
                T9010901051074</p>
            `;
            break;

        case 'legal':
            content = `
                <h2>古物営業法の規定に基づく表示</h2>

                <h3>古物営業法許可番号</h3>
                <p style="font-size: 1.5rem; font-weight: bold;">第303252417678号</p>
            `;
            break;

        case 'privacy':
            content = `
                <h2>プライバシーポリシー</h2>

                <h3>個人情報の取り扱いについて</h3>
                <p>ALL OUT HOLDINGS株式会社（以下、当社）は、お客様の個人情報を以下の通り適切に取り扱います。</p>

                <h3>1. 個人情報の収集</h3>
                <p>当社は、以下の目的で個人情報を収集します：</p>
                <ul>
                    <li>買取査定サービスの提供</li>
                    <li>お客様からのお問い合わせへの対応</li>
                    <li>サービス向上のための分析</li>
                    <li>法令に基づく対応</li>
                </ul>

                <h3>2. 個人情報の利用目的</h3>
                <p>収集した個人情報は、以下の目的でのみ利用します：</p>
                <ul>
                    <li>買取サービスの提供・運営</li>
                    <li>お客様へのご連絡・ご案内</li>
                    <li>本人確認</li>
                    <li>サービス改善のための統計データ作成</li>
                </ul>

                <h3>3. 個人情報の第三者提供</h3>
                <p>当社は、以下の場合を除き、個人情報を第三者に提供しません：</p>
                <ul>
                    <li>お客様の同意がある場合</li>
                    <li>法令に基づく場合</li>
                    <li>人の生命・身体・財産の保護に必要な場合</li>
                </ul>

                <h3>4. 個人情報の安全管理</h3>
                <p>当社は、個人情報の漏洩・紛失・改ざん等を防止するため、適切な安全管理措置を講じます。</p>

                <h3>5. お問い合わせ窓口</h3>
                <p>個人情報に関するお問い合わせは以下までご連絡ください：<br>
                電話: 0120-XXX-XXX<br>
                メール: privacy@alloutholdings.co.jp</p>
            `;
            break;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

window.closeModal = function() {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('infoModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);