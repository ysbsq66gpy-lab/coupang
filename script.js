// 가상 상품 데이터
const products = [
    { id: 1, name: "[로켓프레시] 유기농 고당도 대저 토마토 1kg", price: 15900, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80", rocket: true, fresh: true, rating: 4.5, reviewCount: 1250, isNew: true },
    { id: 2, name: "삼성전자 갤럭시 S24 울트라 256GB 자급제", price: 1598000, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80", rocket: true, fresh: false, rating: 5.0, reviewCount: 342, isNew: false },
    { id: 3, name: "나이키 에어 맥스 97 올블랙 남성용", price: 189000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80", rocket: false, fresh: false, rating: 4.0, reviewCount: 890, isNew: true },
    { id: 4, name: "LG전자 디오스 오브제컬렉션 양문형 냉장고", price: 2450000, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80", rocket: true, fresh: false, rating: 4.8, reviewCount: 156, isNew: false },
    { id: 5, name: "커클랜드 시그니춰 먹는 샘물 2L x 12개", price: 12900, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80", rocket: true, fresh: false, rating: 4.7, reviewCount: 45000, isNew: false },
    { id: 6, name: "소니 WH-1000XM5 노이즈캔슬링 헤드셋", price: 398000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80", rocket: true, fresh: false, rating: 4.9, reviewCount: 720, isNew: true },
    { id: 7, name: "무선 기계식 키보드 K8 프리미엄 에디션", price: 125000, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=300&q=80", rocket: false, fresh: false, rating: 4.3, reviewCount: 210, isNew: false },
    { id: 8, name: "인공지능 스마트 공기청정기 360도", price: 219000, image: "https://images.unsplash.com/photo-1585771724684-252702b64408?auto=format&fit=crop&w=300&q=80", rocket: true, fresh: false, rating: 4.6, reviewCount: 1100, isNew: true }
];

let cart = [];
let filteredProducts = [...products];

// 1. 상품 렌더링 (배지 및 미니 장바구니 추가)
function renderProducts(items = filteredProducts) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = items.map(product => `
        <div class="product-card" onclick="openModal(${product.id})">
            ${product.isNew ? '<span class="badge-new">NEW</span>' : ''}
            <div class="add-cart-mini" onclick="event.stopPropagation(); addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i>
            </div>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString()}원</div>
                ${product.rocket ? `
                    <div class="rocket-delivery">
                        <img src="https://image7.coupangcdn.com/image/coupang/common/logo_rocket_delivery_v2.png" alt="로켓배송">
                        <span style="font-size: 11px; color: #0074E9; font-weight: bold;">내일(화) 도착 보장</span>
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

// 2. 장바구니 추가 & 3. 토스트 알림
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    showToast(`${product.name} 상품을 담았습니다!`);
}

function updateCartUI() {
    const badge = document.querySelector('.cart-count');
    const cartList = document.getElementById('cart-items-list');
    const totalPriceEl = document.getElementById('total-price');

    badge.textContent = cart.length;

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">장바구니가 비어있습니다.</p>';
        totalPriceEl.textContent = '0원';
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()}원</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceEl.textContent = total.toLocaleString() + '원';
}

// 4. 장바구니 삭제
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 5. 상품 상세 모달
function openModal(id) {
    const product = products.find(p => p.id === id);
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <img src="${product.image}" class="modal-img">
        <div class="modal-info">
            <h2>${product.name}</h2>
            <p style="color:red; font-size:24px; font-weight:bold;">${product.price.toLocaleString()}원</p>
            <p style="margin-top:20px; color:#555;">쿠팡 상품평: ${product.reviewCount}개</p>
            <button class="checkout-btn" style="margin-top:30px;" onclick="addToCart(${product.id})">장바구니 담기</button>
        </div>
    `;
    modal.style.display = 'block';
}

// 6. 실시간 검색 필터
function setupSearch() {
    const input = document.querySelector('.search-input-wrapper input');
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
        renderProducts();
    });
}

// 7. 카테고리 필터링
function setupCategoryFilter() {
    const tags = document.querySelectorAll('#category-list a');
    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            const category = tag.dataset.category;
            if (category === 'all') filteredProducts = [...products];
            else if (category === 'rocket') filteredProducts = products.filter(p => p.rocket);
            else if (category === 'fresh') filteredProducts = products.filter(p => p.fresh);

            renderProducts();
        });
    });
}

// 8. 정렬 기능
function setupSort() {
    const btns = document.querySelectorAll('.sort-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const sortType = btn.dataset.sort;
            if (sortType === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
            else if (sortType === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
            else if (sortType === 'review') filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
            else filteredProducts = [...products];

            renderProducts();
        });
    });
}

// 9. 토스트 알림 로직
function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 10. 상단 이동 버튼 & 장바구니 사이드바 제어
function setupUIInteractions() {
    // 장바구니 사이드바 제어
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');

    cartIcon.addEventListener('click', () => cartDrawer.classList.add('active'));
    closeCart.addEventListener('click', () => cartDrawer.classList.remove('active'));

    // 모달 닫기
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('product-modal').style.display = 'none';
    };

    // 상단 버튼
    const topBtn = document.getElementById('top-btn');
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };
    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log("코다리 부장: 쿠팡 2.0 (기능 10개 추가) 로딩 완료!");
    renderProducts();
    setupSearch();
    setupCategoryFilter();
    setupSort();
    setupUIInteractions();
});
