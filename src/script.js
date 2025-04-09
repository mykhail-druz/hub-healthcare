// <----- Burger menu ------>
document.querySelector('.burger-menu').addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.toggle('open')
    document.querySelector('.nav-mobile').classList.toggle('open')
})

// <----- Pill button animation ------>
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

// <----- Video carousel ------>
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

// <----- Workflow Carousel ----->

// Данные для слайдов карусели
const workflowSlides = [
    {
        id: 1,
        title: 'Care Coordination',
        description:
            'HUB Healthcare revolutionizes care coordination with automated workflows and real-time up dates, empowering healthcare teams to deliver faster, more efficient care.',
        quote: {
            text: 'HUB Healthcare has transformed how we coordinate care, cutting down delays and ensuring everyone stays informed.',
            author: 'Healthcare Operations Manager',
            avatar: 'images/avatars/avatar-1.png',
        },
        metrics: [
            { value: '93%', description: 'Reduction in coordination time.' },
            {
                value: '85%',
                description:
                    'Faster task completion for scheduling and communication.',
            },
            {
                value: '50%',
                description:
                    'Fewer missed updates through automated notifications.',
            },
        ],
        background: 'images/slider/slider-1.webp',
    },
    {
        id: 2,
        title: 'Materials Management',
        description:
            'HUB helps eliminate overstocking, miscommunication, and missed items by streamlining materials workflows—giving you complete visibility into your supply chain.',
        quote: {
            text: "We finally stopped over-ordering supplies and started actually tracking what we used. It's made a huge difference.",
            author: 'Surgical Inventory Lead',
            avatar: 'images/avatars/avatar-2.png',
        },
        metrics: [
            { value: '40%', description: 'Decrease in supply overages' },
            { value: '90%', description: 'Inventory visibility across cases' },
            { value: '2x', description: 'Faster supply prep time' },
        ],
        background: 'images/slider/slider-2.webp',
    },
    {
        id: 3,
        title: 'Clinical Pathways',
        description:
            'With HUB, practices can standardize care across conditions and teams—reducing variability, increasing consistency, and improving outcomes.',
        quote: {
            text: "Now our teams are finally aligned on who does what, when, and how. It's made complex care coordination actually manageable.",
            author: 'Medical Director of Care Optimization',
            avatar: 'images/avatars/avatar-3.png',
        },
        metrics: [
            {
                value: '30%',
                description: 'Increase in adherence to care pathways',
            },
            { value: '60%', description: 'Reduction in communication delays' },
            { value: '75%', description: 'More tasks completed on time' },
        ],
        background: 'images/slider/slider-3.webp',
    },
]

// Инициализация карусели при загрузке документа
document.addEventListener('DOMContentLoaded', function () {
    initWorkflowCarousel()
})

// Функция инициализации карусели
function initWorkflowCarousel() {
    const container = document.querySelector('.workflow-carousel')
    const slidesContainer = document.querySelector('.workflow-slides-container')

    // Создаем контейнер для точек навигации внутри карусели, если его еще нет
    let dotsContainer = container.querySelector('.workflow-navigation')
    if (!dotsContainer) {
        dotsContainer = document.createElement('div')
        dotsContainer.className = 'workflow-navigation'

        const dotsInner = document.createElement('div')
        dotsInner.className = 'carousel-dots'

        dotsContainer.appendChild(dotsInner)
        container.appendChild(dotsContainer)
    } else {
        dotsContainer = dotsContainer.querySelector('.carousel-dots')
    }

    if (!slidesContainer || !dotsContainer) return

    let currentSlide = 0
    let autoplayInterval
    let isAnimating = false

    // Рендеринг слайдов
    renderSlides()

    // Рендеринг точек навигации
    renderDots()

    // Установка начального слайда
    goToSlide(0)

    // Автопрокрутка
    startAutoplay()

    // Пауза автопрокрутки при наведении
    container.addEventListener('mouseenter', stopAutoplay)
    container.addEventListener('mouseleave', startAutoplay)

    // Обработка свайпов на мобильных устройствах
    setupSwipeHandlers()

    // Изменения в функции renderSlides в инициализации карусели
    function renderSlides() {
        // Очищаем текущее содержимое
        slidesContainer.innerHTML = ''

        // Создаем слайды из данных
        workflowSlides.forEach((slide, index) => {
            const slideElement = document.createElement('div')
            slideElement.className = `workflow-slide ${index === 0 ? 'active' : ''}`
            slideElement.style.backgroundImage = `url(${slide.background})`

            const slideInner = document.createElement('div')
            slideInner.className = 'slide-inner'

            // Создаем контентную часть (левая сторона)
            const contentElement = document.createElement('div')
            contentElement.className = 'slide-content'

            // Заголовок
            const titleElement = document.createElement('h3')
            titleElement.className = 'slide-title'
            titleElement.textContent = slide.title

            // Описание
            const descriptionElement = document.createElement('p')
            descriptionElement.className = 'slide-description'
            descriptionElement.textContent = slide.description

            // Цитата
            const quoteElement = document.createElement('div')
            quoteElement.className = 'slide-quote'

            // Иконка цитаты

            const quoteImage = document.createElement('img')
            quoteImage.className = 'quote-image'
            quoteImage.src = 'icons/quotes.svg'

            // Текст цитаты
            const quoteText = document.createElement('p')
            quoteText.className = 'quote-text'
            quoteText.textContent = slide.quote.text

            // Автор цитаты
            const quoteAuthor = document.createElement('div')
            quoteAuthor.className = 'quote-author'

            // Аватар автора
            const authorAvatar = document.createElement('div')
            authorAvatar.className = 'author-avatar'
            const avatarImg = document.createElement('img')
            avatarImg.src = slide.quote.avatar
            avatarImg.alt = slide.quote.author
            authorAvatar.appendChild(avatarImg)

            // Информация об авторе
            const authorInfo = document.createElement('div')
            authorInfo.className = 'author-info'
            authorInfo.textContent = slide.quote.author

            // Собираем блок автора
            quoteAuthor.appendChild(authorAvatar)
            quoteAuthor.appendChild(authorInfo)

            // Собираем блок цитаты
            quoteElement.appendChild(quoteImage)
            quoteElement.appendChild(quoteText)
            quoteElement.appendChild(quoteAuthor)

            // Добавляем все в контент
            contentElement.appendChild(titleElement)
            contentElement.appendChild(descriptionElement)
            contentElement.appendChild(quoteElement)

            // Создаем метрики (правая сторона)
            const metricsElement = document.createElement('div')
            metricsElement.className = 'slide-metrics'

            // Добавляем метрики
            slide.metrics.forEach((metric) => {
                const metricItem = document.createElement('div')
                metricItem.className = 'metric-item'

                const metricLine = document.createElement('div')
                metricLine.className = 'metric-line'

                // Создаем контейнер для значения и описания метрики
                const metricContent = document.createElement('div')
                metricContent.className = 'metric-content'

                const metricValue = document.createElement('div')
                metricValue.className = 'metric-value'
                metricValue.textContent = metric.value

                const metricDescription = document.createElement('div')
                metricDescription.className = 'metric-description'
                metricDescription.textContent = metric.description

                // Добавляем значение и описание в общий контейнер
                metricContent.appendChild(metricValue)
                metricContent.appendChild(metricDescription)

                // Добавляем линию и контент в метрику
                metricItem.appendChild(metricLine)
                metricItem.appendChild(metricContent)

                metricsElement.appendChild(metricItem)
            })

            // Добавляем все в слайд
            slideInner.appendChild(contentElement)
            slideInner.appendChild(metricsElement)
            slideElement.appendChild(slideInner)

            // Добавляем слайд в контейнер
            slidesContainer.appendChild(slideElement)
        })
    }

    // Рендеринг точек навигации
    function renderDots() {
        dotsContainer.innerHTML = ''

        workflowSlides.forEach((_, index) => {
            const dot = document.createElement('span')
            dot.className = `carousel-dot ${index === currentSlide ? 'active' : ''}`
            dot.addEventListener('click', () => goToSlide(index))
            dotsContainer.appendChild(dot)
        })
    }

    // Переход к определенному слайду
    function goToSlide(index) {
        if (isAnimating) return
        isAnimating = true

        // Обновляем активную точку
        const dots = dotsContainer.querySelectorAll('.carousel-dot')
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index)
        })

        // Получаем все слайды
        const slides = slidesContainer.querySelectorAll('.workflow-slide')

        // Убираем активный класс со всех слайдов
        slides.forEach((slide) => {
            slide.classList.remove('active')
        })

        // Добавляем активный класс текущему слайду
        slides[index].classList.add('active')

        // Обновляем текущий слайд
        currentSlide = index

        // Сбрасываем флаг анимации
        setTimeout(() => {
            isAnimating = false
        }, 500)
    }

    // Переход к предыдущему слайду
    function goToPrevSlide() {
        const newIndex =
            (currentSlide - 1 + workflowSlides.length) % workflowSlides.length
        goToSlide(newIndex)
        resetAutoplay()
    }

    // Переход к следующему слайду
    function goToNextSlide() {
        const newIndex = (currentSlide + 1) % workflowSlides.length
        goToSlide(newIndex)
        resetAutoplay()
    }

    // Автопрокрутка
    function startAutoplay() {
        stopAutoplay()
        autoplayInterval = setInterval(goToNextSlide, 5000)
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval)
        }
    }

    function resetAutoplay() {
        stopAutoplay()
        startAutoplay()
    }

    // Добавляем кнопки для навигации (они могут быть скрыты, но функциональность будет)
    function addNavigationButtons() {
        // Создаем кнопки "предыдущий" и "следующий"
        const prevButton = document.createElement('button')
        prevButton.className = 'hidden' // Скрываем кнопку, но оставляем функциональность
        prevButton.addEventListener('click', goToPrevSlide)

        const nextButton = document.createElement('button')
        nextButton.className = 'hidden' // Скрываем кнопку, но оставляем функциональность
        nextButton.addEventListener('click', goToNextSlide)

        // Добавляем кнопки к контейнеру
        container.appendChild(prevButton)
        container.appendChild(nextButton)
    }

    // Добавляем кнопки навигации
    addNavigationButtons()

    // Обработка свайпов
    function setupSwipeHandlers() {
        let touchStartX = 0
        let touchEndX = 0

        container.addEventListener(
            'touchstart',
            (e) => {
                touchStartX = e.changedTouches[0].screenX
                stopAutoplay()
            },
            { passive: true }
        )

        container.addEventListener(
            'touchend',
            (e) => {
                touchEndX = e.changedTouches[0].screenX

                const swipeThreshold = 50
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Свайп влево - следующий слайд
                    goToNextSlide()
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Свайп вправо - предыдущий слайд
                    goToPrevSlide()
                }

                startAutoplay()
            },
            { passive: true }
        )
    }
}

// <----- Get Sarted ----->

// Инициализация интерактивности для секции Get Started
document.addEventListener('DOMContentLoaded', function () {
    const stepContainers = document.querySelectorAll('.step-container')

    if (!stepContainers.length) return

    // Для мобильных устройств добавляем обработку клика на иконку
    stepContainers.forEach((container) => {
        const infoIcon = container.querySelector('.info-icon')
        const description = container.querySelector('.step-description')

        if (infoIcon && description) {
            // Проверяем, является ли устройство мобильным
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                infoIcon.addEventListener('click', function (e) {
                    e.stopPropagation()

                    // Закрываем все другие описания
                    document
                        .querySelectorAll('.step-description.active')
                        .forEach((desc) => {
                            if (desc !== description) {
                                desc.classList.remove('active')
                                desc.style.maxHeight = '0'
                                desc.style.opacity = '0'
                            }
                        })

                    // Переключаем состояние текущего описания
                    description.classList.toggle('active')

                    if (description.classList.contains('active')) {
                        description.style.maxHeight = '100px'
                        description.style.opacity = '1'
                        description.style.transform = 'translateY(0)'
                    } else {
                        description.style.maxHeight = '0'
                        description.style.opacity = '0'
                        description.style.transform = 'translateY(-10px)'
                    }
                })

                // Закрытие при клике вне элемента
                document.addEventListener('click', function (e) {
                    if (!container.contains(e.target)) {
                        description.classList.remove('active')
                        description.style.maxHeight = '0'
                        description.style.opacity = '0'
                    }
                })
            }
        }
    })
})

document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы
    const slider = document.querySelector('.simplify-slider')
    const sliderLogo = document.querySelector('.slider-logo')
    const badIcons = document.querySelectorAll(
        'img[src*="alert"], img[src*="question"], img[src*="cross"], img[src*="chain"]'
    )
    const confusionIcon = document.querySelector('img[src*="confusion"]')
    const goodIcons = document.querySelectorAll(
        'img[src*="calc"], img[src*="wagon"], img[src*="card"], img[src*="fax"], img[src*="books"], img[src*="desktop"], img[src*="phone-missed"], img[src*="calendar"], img[src*="email"], img[src*="note"]'
    )

    // Сохраняем исходные позиции хороших иконок для возможности возвращения
    const originalPositions = Array.from(goodIcons).map((icon) => {
        const parent = icon.closest('div')
        return {
            element: parent,
            top: parent.style.top || window.getComputedStyle(parent).top,
            left: parent.style.left || window.getComputedStyle(parent).left,
            right: parent.style.right || window.getComputedStyle(parent).right,
            bottom:
                parent.style.bottom || window.getComputedStyle(parent).bottom,
        }
    })

    // Флаг для отслеживания состояния слайдера
    let isSimplified = false

    // Начальная и конечная позиция логотипа
    const startPosition = 5
    const endPosition = slider.offsetWidth - sliderLogo.offsetWidth - 15

    // Переменные для отслеживания перетаскивания
    let isDragging = false
    let startX = 0
    let currentX = 0

    // Создаем орбитальный контейнер, если его еще нет
    let orbitalSystem = document.querySelector('.orbital-system')
    if (!orbitalSystem) {
        orbitalSystem = document.createElement('div')
        orbitalSystem.className = 'orbital-system'
        const interactiveBlock = document.querySelector(
            '.interactive-elements-block'
        )
        if (interactiveBlock) {
            interactiveBlock.appendChild(orbitalSystem)
        }
    }

    // Функция для скрытия "плохих" иконок
    function hideIcons() {
        // Скрываем "плохие" иконки
        badIcons.forEach((icon) => {
            const parent = icon.closest('div')
            parent.classList.add('hiding-element')

            // После завершения анимации скрываем элемент полностью
            setTimeout(() => {
                parent.style.display = 'none'
            }, 600)
        })

        // Скрываем иконку confusion
        if (confusionIcon) {
            const parent = confusionIcon.closest('div')
            parent.classList.add('hiding-element')

            setTimeout(() => {
                parent.style.display = 'none'
            }, 600)
        }

        // Создаем орбитальную систему
        createOrbitalSystem()
    }

    // Функция для показа "плохих" иконок
    function showIcons() {
        // Показываем "плохие" иконки
        badIcons.forEach((icon) => {
            const parent = icon.closest('div')
            parent.style.display = ''

            // Небольшая задержка перед анимацией появления
            setTimeout(() => {
                parent.classList.remove('hiding-element')
            }, 10)
        })

        // Показываем иконку confusion
        if (confusionIcon) {
            const parent = confusionIcon.closest('div')
            parent.style.display = ''

            setTimeout(() => {
                parent.classList.remove('hiding-element')
            }, 10)
        }

        // Возвращаем хорошие иконки на их исходные позиции
        resetIconPositions()
    }

    // Функция для создания орбитальной системы иконок
    function createOrbitalSystem() {
        // Очищаем предыдущие элементы
        while (orbitalSystem.firstChild) {
            orbitalSystem.removeChild(orbitalSystem.firstChild)
        }

        // Создаем центральный HUB
        const hubElement = document.createElement('div')
        hubElement.className = 'hub-center'
        hubElement.innerHTML = '<div class="hub-text">HUB</div>'
        orbitalSystem.appendChild(hubElement)

        // Создаем круговую орбиту
        const orbit = document.createElement('div')
        orbit.className = 'orbit'
        orbitalSystem.appendChild(orbit)

        // Создаем соединительные линии
        const connectionsContainer = document.createElement('div')
        connectionsContainer.className = 'connections-container'
        orbitalSystem.appendChild(connectionsContainer)

        // Добавляем иконки на орбиту
        goodIcons.forEach((icon, index) => {
            const parent = icon.closest('div')
            const iconClone = icon.cloneNode(true)

            // Создаем контейнер для иконки
            const iconContainer = document.createElement('div')
            iconContainer.className = 'orbital-icon-container'

            // Устанавливаем размер
            iconClone.style.width = '120px'
            iconClone.style.height = '120px'
            iconClone.style.objectFit = 'contain'

            // Добавляем иконку в контейнер
            iconContainer.appendChild(iconClone)

            // Позиционируем иконки равномерно вокруг орбиты
            const angle = (360 / goodIcons.length) * index
            iconContainer.style.transform = `rotate(${angle}deg) translateX(180px) rotate(-${angle}deg)`

            // Задержка перед появлением каждой иконки
            setTimeout(() => {
                orbit.appendChild(iconContainer)
            }, index * 100)

            // Скрываем оригинальную иконку
            parent.style.opacity = '0'
            parent.style.pointerEvents = 'none'
        })

        // Запускаем вращение орбиты после добавления всех иконок
        setTimeout(
            () => {
                orbit.classList.add('orbit-animation')
                connectionsContainer.classList.add('connections-animation')
                hubElement.classList.add('hub-animation')
            },
            goodIcons.length * 100 + 200
        )
    }

    // Функция для возвращения хороших иконок на исходные позиции
    function resetIconPositions() {
        // Останавливаем вращение и очищаем орбитальную систему
        const orbit = document.querySelector('.orbit')
        if (orbit) {
            orbit.classList.remove('orbit-animation')
        }

        setTimeout(() => {
            while (orbitalSystem.firstChild) {
                orbitalSystem.removeChild(orbitalSystem.firstChild)
            }
        }, 300)

        // Возвращаем видимость оригинальным иконкам
        originalPositions.forEach((pos, index) => {
            pos.element.style.transition =
                'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            pos.element.style.opacity = '1'
            pos.element.style.pointerEvents = 'auto'

            // Сбрасываем трансформацию
            pos.element.style.transform = ''

            // Возвращаем исходные позиции
            if (pos.top) pos.element.style.top = pos.top
            if (pos.left) pos.element.style.left = pos.left
            if (pos.right) pos.element.style.right = pos.right
            if (pos.bottom) pos.element.style.bottom = pos.bottom
        })
    }

    // Функция для сброса позиции логотипа
    function resetLogo() {
        sliderLogo.style.transition = 'left 0.3s ease-out'
        sliderLogo.style.left = startPosition + 'px'
        setTimeout(() => {
            sliderLogo.style.transition = ''
        }, 300)
    }

    // Функция для завершения свайпа вправо (упрощение)
    function completeSwipeRight() {
        sliderLogo.style.transition = 'left 0.3s ease-out'

        // Устанавливаем позицию логотипа справа (не слишком далеко)
        sliderLogo.style.left =
            slider.offsetWidth - sliderLogo.offsetWidth - 5 + 'px'

        isSimplified = true
        hideIcons()

        // Заменяем текст на "Simplified!"
        const sliderText = document.querySelector('.slider-text')
        if (sliderText) {
            sliderText.textContent = 'Simplified!'
            sliderText.classList.add('text-simplified')
        }

        // Меняем стрелки (центрируем вертикально и поворачиваем)
        const sliderArrows = document.querySelector('.slider-arrows')
        if (sliderArrows) {
            sliderArrows.style.right = 'auto'
            sliderArrows.style.left = '25px'
            sliderArrows.style.top = '50%'
            sliderArrows.style.transform = 'translateY(-50%) rotate(180deg)'
        }

        setTimeout(() => {
            sliderLogo.style.transition = ''
        }, 300)
    }

    // Функция для обратного свайпа (возврат к исходному состоянию)
    function completeSwipeLeft() {
        sliderLogo.style.transition = 'left 0.3s ease-out'
        sliderLogo.style.left = startPosition + 'px'
        isSimplified = false
        showIcons()

        // Возвращаем исходный текст
        const sliderText = document.querySelector('.slider-text')
        if (sliderText) {
            sliderText.textContent = 'Slide to Simplify'
            sliderText.classList.remove('text-simplified')
        }

        // Возвращаем стрелки в исходное положение
        const sliderArrows = document.querySelector('.slider-arrows')
        if (sliderArrows) {
            sliderArrows.style.transform = 'translateY(-50%) rotate(0deg)'
            sliderArrows.style.right = '25px'
            sliderArrows.style.left = 'auto'
        }

        setTimeout(() => {
            sliderLogo.style.transition = ''
        }, 300)
    }

    // События мыши
    sliderLogo.addEventListener('mousedown', function (e) {
        isDragging = true
        startX = e.clientX
        currentX = parseInt(
            sliderLogo.style.left ||
                (isSimplified ? endPosition : startPosition)
        )

        // Предотвращаем выделение текста при перетаскивании
        e.preventDefault()
    })

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return

        const deltaX = e.clientX - startX
        let newPosition = currentX + deltaX

        // Ограничиваем перемещение в пределах слайдера
        if (newPosition < startPosition) newPosition = startPosition
        if (newPosition > endPosition) newPosition = endPosition

        sliderLogo.style.left = newPosition + 'px'
    })

    document.addEventListener('mouseup', function () {
        if (!isDragging) return
        isDragging = false

        // Определяем, достаточно ли далеко перетащили логотип
        const currentPosition = parseInt(
            sliderLogo.style.left ||
                (isSimplified ? endPosition : startPosition)
        )
        const threshold = startPosition + (endPosition - startPosition) * 0.5 // Пороговое значение посередине

        // Обрабатываем в зависимости от текущего состояния
        if (!isSimplified && currentPosition >= threshold) {
            // Если не упрощено и перетащили вправо за середину
            completeSwipeRight()
        } else if (isSimplified && currentPosition <= threshold) {
            // Если упрощено и перетащили влево за середину
            completeSwipeLeft()
        } else if (isSimplified) {
            // Если упрощено и не дотащили до середины - возвращаем вправо
            sliderLogo.style.transition = 'left 0.3s ease-out'
            sliderLogo.style.left =
                slider.offsetWidth - sliderLogo.offsetWidth - 5 + 'px'
            setTimeout(() => {
                sliderLogo.style.transition = ''
            }, 300)
        } else {
            // Если не упрощено и не дотащили до середины - возвращаем влево
            resetLogo()
        }
    })

    // События касания для мобильных устройств
    sliderLogo.addEventListener(
        'touchstart',
        function (e) {
            isDragging = true
            startX = e.touches[0].clientX
            currentX = parseInt(
                sliderLogo.style.left ||
                    (isSimplified ? endPosition : startPosition)
            )

            // Предотвращаем прокрутку страницы при свайпе
            e.preventDefault()
        },
        { passive: false }
    )

    document.addEventListener(
        'touchmove',
        function (e) {
            if (!isDragging) return

            const deltaX = e.touches[0].clientX - startX
            let newPosition = currentX + deltaX

            // Ограничиваем перемещение в пределах слайдера
            if (newPosition < startPosition) newPosition = startPosition
            if (newPosition > endPosition) newPosition = endPosition

            sliderLogo.style.left = newPosition + 'px'
        },
        { passive: true }
    )

    document.addEventListener('touchend', function () {
        if (!isDragging) return
        isDragging = false

        // Определяем, достаточно ли далеко перетащили логотип
        const currentPosition = parseInt(
            sliderLogo.style.left ||
                (isSimplified ? endPosition : startPosition)
        )
        const threshold = startPosition + (endPosition - startPosition) * 0.5

        // Обрабатываем в зависимости от текущего состояния
        if (!isSimplified && currentPosition >= threshold) {
            completeSwipeRight()
        } else if (isSimplified && currentPosition <= threshold) {
            completeSwipeLeft()
        } else if (isSimplified) {
            sliderLogo.style.transition = 'left 0.3s ease-out'
            sliderLogo.style.left =
                slider.offsetWidth - sliderLogo.offsetWidth - 5 + 'px'
            setTimeout(() => {
                sliderLogo.style.transition = ''
            }, 300)
        } else {
            resetLogo()
        }
    })

    // Добавляем указатель курсора при наведении для лучшего UX
    sliderLogo.style.cursor = 'grab'
    sliderLogo.addEventListener('mousedown', function () {
        sliderLogo.style.cursor = 'grabbing'
    })
    document.addEventListener('mouseup', function () {
        sliderLogo.style.cursor = 'grab'
    })

    // Инициализируем слайдер с правильным размером лого
    sliderLogo.querySelector('img').style.maxWidth = '50px'
    sliderLogo.querySelector('img').style.maxHeight = '50px'
})
