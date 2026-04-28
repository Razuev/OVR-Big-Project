// Модули приложения
const App = {};

// Модуль навигации
App.Navigation = (() => {
   const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
   const navMenu = document.querySelector('.nav-list');

   mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ?
         '<i class=\"fas fa-times\"></i>' : '<i class=\"fas fa-bars\"></i>';
   });

   // Плавная прокрутка к якорям
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
})();

// Модуль анимаций при скролле
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
})();

// Модуль форм (Бронирование)
App.Forms = (() => {
   const bookingForm = document.getElementById('bookingForm');
   const bookingResponse = document.getElementById('bookingResponse');

   bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData);
      // Симуляция отправки на сервер (демо)
      bookingResponse.textContent = 'Заявка принята! Мы свяжемся с вами.';
      bookingResponse.style.color = 'green';
      bookingResponse.style.display = 'block';
      setTimeout(() => bookingResponse.style.display = 'none', 5000);
      bookingForm.reset();
   });
})();