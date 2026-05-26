const App = {};

// === Модуль навигации ===
App.Navigation = (() => {
    document.addEventListener('DOMContentLoaded', () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-list');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ?
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - (window.innerWidth > 768 ? 70 : 64),
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
})();

// === Модуль анимаций при скролле ===
App.Animations = (() => {
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const pos = el.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (pos < screenPos) el.classList.add('animated');
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('DOMContentLoaded', animateOnScroll);
})();

// === Модуль форм (основная форма) ===
App.Forms = (() => {
    document.addEventListener('DOMContentLoaded', () => {
        const bookingForm = document.getElementById('bookingForm');
        const bookingResponse = document.getElementById('bookingResponse');
        
        if (bookingForm) {
            bookingForm.addEventListener('submit', e => {
                e.preventDefault();
                const formData = new FormData(bookingForm);
                
                if (bookingResponse) {
                    bookingResponse.textContent = '✅ Заявка принята! Мы свяжемся с вами.';
                    bookingResponse.style.color = 'green';
                    bookingResponse.style.display = 'block';
                    setTimeout(() => bookingResponse.style.display = 'none', 5000);
                }
                bookingForm.reset();
            });
        }
    });
})();

// === Модуль модального окна бронирования (ЕДИНСТВЕННЫЙ) ===
App.ModalBooking = (() => {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('bookingModal');
        const openBtns = document.querySelectorAll('.open-booking-modal');
        const closeBtn = document.querySelector('.close-modal-btn');
        const form = document.getElementById('popupBookingForm');
        const responseDiv = document.getElementById('modalResponse');

        if (!modal) return; // Выходим, если модального окна нет в HTML

        const openModal = () => {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => { modal.style.display = 'none'; }, 300);
            document.body.style.overflow = '';
            if (responseDiv) responseDiv.style.display = 'none';
            if (form) form.reset();
        };

        // Открытие по кнопкам
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        // Закрытие по крестику
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        // Закрытие по клику вне окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Обработка формы
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                console.log('📋 Бронирование:', data);
                
                if (responseDiv) {
                    responseDiv.textContent = '✅ Заявка принята! Мы свяжемся с вами.';
                    responseDiv.style.color = 'green';
                    responseDiv.style.backgroundColor = '#d4edda';
                    responseDiv.style.display = 'block';
                }
                
                setTimeout(() => { closeModal(); }, 2500);
            });
        }

        // Минимальная дата — сегодня
        const dateInput = document.getElementById('modal-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        // Обработка ошибки загрузки изображения схемы
        const schemeImg = document.querySelector('.modal-image-container img');
        if (schemeImg) {
            schemeImg.addEventListener('error', function() {
                this.style.display = 'none';
                const container = this.parentElement;
                if (container) {
                    container.innerHTML = `
                        <div style="padding: 30px; background: #f5f5f5; border-radius: 8px; text-align: center; color: #666;">
                            <div style="font-size: 2.5rem; margin-bottom: 10px;">🗺️</div>
                            <p style="margin: 0;">Схема зала будет добавлена позже</p>
                        </div>
                    `;
                }
            });
        }
    });
})();
