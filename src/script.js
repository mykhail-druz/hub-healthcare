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

// Карусель с карточками и сменой статистики
document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cards-container')
    if (!cardsContainer) return

    const cards = document.querySelectorAll('.card-item')
    const statGroups = document.querySelectorAll('.stat-group')
    const quoteItems = document.querySelectorAll('.quote-item')
    const prevButton = document.querySelector('.cards-prev')
    const nextButton = document.querySelector('.cards-next')

    const totalCards = cards.length
    let currentCard = 1
    let autoplayInterval
    let isAnimating = false

    // Обновление активных элементов (карточка, статистика, цитата)
    function updateActiveElements() {
        // Обновление статистики
        statGroups.forEach((group) => {
            if (parseInt(group.dataset.card) === currentCard) {
                group.classList.add('active')
            } else {
                group.classList.remove('active')
            }
        })

        // Обновление цитат
        quoteItems.forEach((quote) => {
            if (parseInt(quote.dataset.card) === currentCard) {
                quote.classList.add('active')
            } else {
                quote.classList.remove('active')
            }
        })
    }

    // Переход к следующей карточке
    function nextCard() {
        if (isAnimating) return
        isAnimating = true

        // Получаем АКТУАЛЬНЫЙ первый элемент
        const firstCard = cardsContainer.firstElementChild
        cardsContainer.appendChild(firstCard)

        // Обновить текущую карточку
        currentCard = (currentCard % totalCards) + 1

        // Обновить активные элементы
        updateActiveElements()

        // Сброс флага анимации
        setTimeout(() => {
            isAnimating = false
        }, 500)
    }

    // Переход к предыдущей карточке
    function prevCard() {
        if (isAnimating) return
        isAnimating = true

        // Получаем АКТУАЛЬНЫЙ последний элемент
        const lastCard = cardsContainer.lastElementChild
        cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild)

        // Обновить текущую карточку
        currentCard = ((currentCard - 2 + totalCards) % totalCards) + 1

        // Обновить активные элементы
        updateActiveElements()

        // Сброс флага анимации
        setTimeout(() => {
            isAnimating = false
        }, 500)
    }

    // Автоматическая прокрутка
    function startAutoplay() {
        stopAutoplay()
        autoplayInterval = setInterval(() => {
            nextCard()
        }, 5000)
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval)
        }
    }

    // Обработчики событий
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevCard()
            stopAutoplay()
            startAutoplay()
        })
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextCard()
            stopAutoplay()
            startAutoplay()
        })
    }

    // Остановка автопрокрутки при наведении
    cardsContainer.addEventListener('mouseenter', () => {
        stopAutoplay()
    })

    // Возобновление автопрокрутки при уходе мыши
    cardsContainer.addEventListener('mouseleave', () => {
        startAutoplay()
    })

    // Свайпы на мобильных устройствах
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

            const swipeThreshold = 50
            if (touchEndX < touchStartX - swipeThreshold) {
                // Свайп влево - следующая карточка
                nextCard()
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Свайп вправо - предыдущая карточка
                prevCard()
            }

            startAutoplay()
        },
        { passive: true }
    )

    // Инициализация
    startAutoplay()
})
