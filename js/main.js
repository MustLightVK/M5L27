//menu
const burgerIcon = document.getElementById('burgerIcon');
const burgerMenu = document.getElementById('burgerMenu');
const closeIcon = document.querySelector('.menu__burger_close');
const burgerTitles = document.querySelectorAll('.menu__burger_title');

burgerIcon.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
});

closeIcon.addEventListener('click', function() {
    burgerMenu.classList.remove('active');
});

burgerTitles.forEach(title => {
    title.addEventListener('click', function() {
        const targetId = this.getAttribute('data-title');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            burgerMenu.classList.remove('active');
        }
    });
});

document.addEventListener('click', (event) => {
    const clickInsideMenu = burgerMenu.contains(event.target);
    const clickOnBurgerIcon = burgerIcon.contains(event.target);

    if (!clickInsideMenu && !clickOnBurgerIcon) {
        burgerMenu.classList.remove('active');
    }
});

//tabs
const tabBtns = document.querySelectorAll('.tab__btn');
const contents = document.querySelectorAll('.contents');

function changeClass(el) {
    tabBtns.forEach(tabBtn => {
        tabBtn.classList.remove('active');
        tabBtn.querySelector('.tab__img_1')?.classList.remove('active');
        tabBtn.querySelector('.tab__img_2')?.classList.remove('active');
        tabBtn.querySelector('.tab__img_3')?.classList.remove('active');
    });

    el.classList.add('active');
    el.querySelector('.tab__img_1')?.classList.add('active');
    el.querySelector('.tab__img_2')?.classList.add('active');
    el.querySelector('.tab__img_3')?.classList.add('active');
}

tabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener('click', function(event) {
        const currentTab = event.target.dataset.btn;
        changeClass(event.target);
        contents.forEach((item) => {
            item.classList.remove('active');
            if (item.dataset.content == currentTab) {
                item.classList.add('active');
            }
        });
    });
});

// modal-"подробнее"
document.addEventListener('DOMContentLoaded', function() {
    const btnOpen = document.getElementById('btn-more');
    const btnClose = document.querySelectorAll('.modal_close-product');
    const overlay = document.getElementById('overlay');
    const modalProduct = document.getElementById('modalProduct');
    const modalItems = document.querySelectorAll('.modal-content-item');
    const btnMore = document.getElementById('btn-more');

    function openModal() {
        modalProduct.classList.add('active');
    }

    function closeModal() {
        modalProduct.classList.remove('active');
    }

    btnOpen.addEventListener('click', openModal);

    overlay.addEventListener('click', closeModal);

    btnClose.forEach(function(btn){
        btn.addEventListener('click', closeModal);
    });

    btnMore.addEventListener('click', function () {
        let currentActive = document.querySelector('.slider-text.active');
        let productValue = btnMore.getAttribute('data-product');

        if (currentActive) {
            productValue = currentActive.getAttribute('data-product');
            btnMore.setAttribute('data-product', productValue);
        } else {
            btnMore.removeAttribute('data-product');
        }

        modalItems.forEach(function (item) {
            let itemNumber = item.getAttribute('data-number');
            
            if (itemNumber === productValue) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

});

//slider
const slides = document.querySelectorAll('.slide');
const next = document.getElementById('btn-next');
const prev = document.getElementById('btn-prev');
const dots = document.querySelectorAll('.dot');

let index = 0;

function activeSlide(n) {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === n);
    });
}

function activeDot(n) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === n);
    });
}

function nextSlide(){
    if (index == slides.length - 1){
        index = 0
        prepearCurrentSlide(index);
    } else {
        index++;
        prepearCurrentSlide(index);
    }
}
function prevSlide(){
    if (index == 0){
        index = slides.length - 1
        prepearCurrentSlide(index);
    } else {
        index--;
        prepearCurrentSlide(index);
    }
}
function updateText(){
    slides.forEach(slide => {
        if (slide.classList.contains('active')) {
            const imgValue = slide.querySelector('img').getAttribute('data-img');
            const sliderTexts = document.querySelectorAll('.slider-text');

            sliderTexts.forEach(text => {
                const productValue = text.getAttribute('data-product');

                if (imgValue === productValue) {
                    text.classList.add('active');
                } else {
                    text.classList.remove('active');
                }
            });
        }
    });
}
function prepearCurrentSlide(n){
    activeSlide(n);
    activeDot(n);
    updateText();
}

dots.forEach(function(item, indexDot) {
    item.addEventListener('click', function(){
        index = indexDot;
        prepearCurrentSlide(index);
    })
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

//form
const form = document.querySelector('.order-section form');
const modalWrapper = document.querySelector('.wrapper-modal-input');
const closeModalButton = document.querySelector('.input-item-close');
const modal = document.getElementById('modal-window-input');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    modalWrapper.classList.add('active');
});

closeModalButton.addEventListener('click', function() {
    closeModal();
});

document.addEventListener('click', function(event) {
    if (!modal.contains(event.target)) {
        closeModal();
    }
});

function closeModal() {
    modalWrapper.classList.remove('active');
}


