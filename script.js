// 가상 상품 데이터
const products = [
    {
        id: 1,
        name: "[로켓프레시] 유기농 고당도 대저 토마토 1kg",
        price: 15900,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80",
        rocket: true,
        rating: 4.5,
        reviewCount: 1250
    },
    {
        id: 2,
        name: "삼성전자 갤럭시 S24 울트라 256GB 자급제",
        price: 1598000,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80",
        rocket: true,
        rating: 5.0,
        reviewCount: 342
    },
    {
        id: 3,
        name: "나이키 에어 맥스 97 올블랙 남성용",
        price: 189000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
        rocket: false,
        rating: 4.0,
        reviewCount: 890
    },
    {
        id: 4,
        name: "LG전자 디오스 오브제컬렉션 양문형 냉장고",
        price: 2450000,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80",
        rocket: true,
        rating: 4.8,
        reviewCount: 156
    },
    {
        id: 5,
        name: "커클랜드 시그니춰 먹는 샘물 2L x 12개",
        price: 12900,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80",
        rocket: true,
        rating: 4.7,
        reviewCount: 45000
    },
    {
        id: 6,
        name: "소니 WH-1000XM5 노이즈캔슬링 헤드셋",
        price: 398000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
        rocket: true,
        rating: 4.9,
        reviewCount: 720
    },
    {
        id: 7,
        name: "무선 기계식 키보드 K8 프리미엄 에디션",
        price: 125000,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=300&q=80",
        rocket: false,
        rating: 4.3,
        reviewCount: 210
    },
    {
        id: 8,
        name: "인공지능 스마트 공기청정기 360도",
        price: 219000,
        image: "https://images.unsplash.com/photo-1585771724684-252702b64408?auto=format&fit=crop&w=300&q=80",
        rocket: true,
        rating: 4.6,
        reviewCount: 1100
    }
];

// 상품 렌더링 함수
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString()}원</div>
                ${product.rocket ? `
                    <div class="rocket-delivery">
                        <img src="https://image7.coupangcdn.com/image/coupang/common/logo_rocket_delivery_v2.png" alt="로켓배송">
                        <span style="font-size: 11px; color: #0074E9; font-weight: bold;">내일(월) 새벽 도착 보장</span>
                    </div>
                ` : ''}
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 !== 0 ? '½' : ''} 
                    <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 장바구니 카운트 증가 기능
let cartCount = 0;
function setupEventListeners() {
    const cards = document.querySelectorAll('.product-card');
    const badge = document.querySelector('.cart-count');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cartCount++;
            badge.textContent = cartCount;
            
            // 간단한 애니메이션 효과
            badge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);

            const productName = card.querySelector('.product-name').textContent;
            console.log(`${productName} 상품이 장바구니에 담겼습니다!`);
        });
    });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log("코다리 부장: 쿠팡 클론 초기화 완료!");
    renderProducts();
    setupEventListeners();
});
