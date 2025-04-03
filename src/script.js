// Burger menu
document.querySelector('.burger-menu').addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.toggle('open')
    document.querySelector('.nav-mobile').classList.toggle('open')
})

// Pill button animation
const pillBtn = document.querySelector('.pill-btn')
const pillText = document.querySelector('.pill-text')
const texts = [
    'Provider Documentation',
    'Referral Management',
    'Inventory Tracking',
    'Case Coordination',
    'EHR Integration',
    'Compliance Oversight',
    'Homecare Support',
    'Surgical Readiness',
    'Care Team Messaging',
]
let currentIndex = 0

setInterval(() => {
    pillText.classList.remove('animate')
    void pillText.offsetWidth
    pillText.textContent = texts[currentIndex]
    pillText.classList.add('animate')
    currentIndex = (currentIndex + 1) % texts.length
}, 3000)

// Стековая карусель с карточками
document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cards-container')
    if (!cardsContainer) return // Проверка наличия контейнера карточек на странице

    const cards = document.querySelectorAll('.card-item')
    const prevButton = document.querySelector('.cards-prev')
    const nextButton = document.querySelector('.cards-next')

    const totalCards = cards.length
    let autoplayInterval
    let isAnimating = false // Флаг для предотвращения множественных кликов во время анимации

    // Инициализация начального положения карточек
    function initCards() {
        cards.forEach((card, index) => {
            card.setAttribute('data-position', index)
        })
        startAutoplay()
    }

    // Сдвиг карточек вперед (следующая карточка становится активной)
    function shiftForward() {
        if (isAnimating) return
        isAnimating = true

        // Получаем текущие позиции
        cards.forEach((card) => {
            let position = parseInt(card.getAttribute('data-position'))
            // Перемещаем каждую карточку на одну позицию назад
            position = (position - 1 + totalCards) % totalCards

            // Применяем новую позицию с анимацией
            card.setAttribute('data-position', position)
        })

        // Сбрасываем флаг анимации после завершения перехода
        setTimeout(() => {
            isAnimating = false
        }, 500) // Должно соответствовать duration анимации
    }

    // Сдвиг карточек назад (предыдущая карточка становится активной)
    function shiftBackward() {
        if (isAnimating) return
        isAnimating = true

        // Получаем текущие позиции
        cards.forEach((card) => {
            let position = parseInt(card.getAttribute('data-position'))
            // Перемещаем каждую карточку на одну позицию вперед
            position = (position + 1) % totalCards

            // Применяем новую позицию с анимацией
            card.setAttribute('data-position', position)
        })

        // Сбрасываем флаг анимации после завершения перехода
        setTimeout(() => {
            isAnimating = false
        }, 500) // Должно соответствовать duration анимации
    }

    // Запуск автоматической прокрутки
    function startAutoplay() {
        stopAutoplay()
        autoplayInterval = setInterval(() => {
            shiftForward()
        }, 5000) // Переход каждые 5 секунд
    }

    // Остановка автоматической прокрутки
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval)
        }
    }

    // Обработчики событий для кнопок
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            shiftBackward()
            stopAutoplay()
            startAutoplay()
        })
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            shiftForward()
            stopAutoplay()
            startAutoplay()
        })
    }

    // Обработка свайпов для мобильных устройств
    let touchStartX = 0
    let touchEndX = 0

    cardsContainer.addEventListener(
        'touchstart',
        (e) => {
            touchStartX = e.changedTouches[0].screenX
            stopAutoplay()
        },
        { passive: true }
    )

    cardsContainer.addEventListener(
        'touchend',
        (e) => {
            touchEndX = e.changedTouches[0].screenX
            handleSwipe()
            startAutoplay()
        },
        { passive: true }
    )

    function handleSwipe() {
        const swipeThreshold = 50
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующая карточка
            shiftForward()
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущая карточка
            shiftBackward()
        }
    }

    // Остановка автопрокрутки при наведении на карточки
    cardsContainer.addEventListener('mouseenter', () => {
        stopAutoplay()
    })

    // Возобновление автопрокрутки при уходе мыши с карточек
    cardsContainer.addEventListener('mouseleave', () => {
        startAutoplay()
    })

    // Инициализация
    initCards()
})
