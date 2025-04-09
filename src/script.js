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

    function updateActiveElements() {
        statGroups.forEach((group) => {
            if (parseInt(group.dataset.card) === currentCard) {
                group.classList.add('active')
            } else {
                group.classList.remove('active')
            }
        })

        quoteItems.forEach((quote) => {
            if (parseInt(quote.dataset.card) === currentCard) {
                quote.classList.add('active')
            } else {
                quote.classList.remove('active')
            }
        })
    }

    function nextCard() {
        if (isAnimating) return
        isAnimating = true

        const firstCard = cardsContainer.firstElementChild
        cardsContainer.appendChild(firstCard)

        currentCard = (currentCard % totalCards) + 1

        updateActiveElements()

        setTimeout(() => {
            isAnimating = false
        }, 500)
    }

    function prevCard() {
        if (isAnimating) return
        isAnimating = true

        const lastCard = cardsContainer.lastElementChild
        cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild)

        currentCard = ((currentCard - 2 + totalCards) % totalCards) + 1

        updateActiveElements()

        setTimeout(() => {
            isAnimating = false
        }, 500)
    }

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

    cardsContainer.addEventListener('mouseenter', () => {
        stopAutoplay()
    })

    cardsContainer.addEventListener('mouseleave', () => {
        startAutoplay()
    })

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

    startAutoplay()
})

// <----- Workflow Carousel ----->

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

document.addEventListener('DOMContentLoaded', function () {
    initWorkflowCarousel()
})

function initWorkflowCarousel() {
    const container = document.querySelector('.workflow-carousel')
    const slidesContainer = document.querySelector('.workflow-slides-container')

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

    renderSlides()

    renderDots()

    goToSlide(0)

    startAutoplay()

    container.addEventListener('mouseenter', stopAutoplay)
    container.addEventListener('mouseleave', startAutoplay)

    setupSwipeHandlers()

    function renderSlides() {
        slidesContainer.innerHTML = ''

        workflowSlides.forEach((slide, index) => {
            const slideElement = document.createElement('div')
            slideElement.className = `workflow-slide ${index === 0 ? 'active' : ''}`
            slideElement.style.backgroundImage = `url(${slide.background})`

            const slideInner = document.createElement('div')
            slideInner.className = 'slide-inner'

            const contentElement = document.createElement('div')
            contentElement.className = 'slide-content'

            const titleElement = document.createElement('h3')
            titleElement.className = 'slide-title'
            titleElement.textContent = slide.title

            const descriptionElement = document.createElement('p')
            descriptionElement.className = 'slide-description'
            descriptionElement.textContent = slide.description

            const quoteElement = document.createElement('div')
            quoteElement.className = 'slide-quote'

            const quoteImage = document.createElement('img')
            quoteImage.className = 'quote-image'
            quoteImage.src = 'icons/quotes.svg'

            const quoteText = document.createElement('p')
            quoteText.className = 'quote-text'
            quoteText.textContent = slide.quote.text

            const quoteAuthor = document.createElement('div')
            quoteAuthor.className = 'quote-author'

            const authorAvatar = document.createElement('div')
            authorAvatar.className = 'author-avatar'
            const avatarImg = document.createElement('img')
            avatarImg.src = slide.quote.avatar
            avatarImg.alt = slide.quote.author
            authorAvatar.appendChild(avatarImg)

            const authorInfo = document.createElement('div')
            authorInfo.className = 'author-info'
            authorInfo.textContent = slide.quote.author

            quoteAuthor.appendChild(authorAvatar)
            quoteAuthor.appendChild(authorInfo)

            quoteElement.appendChild(quoteImage)
            quoteElement.appendChild(quoteText)
            quoteElement.appendChild(quoteAuthor)

            contentElement.appendChild(titleElement)
            contentElement.appendChild(descriptionElement)
            contentElement.appendChild(quoteElement)

            const metricsElement = document.createElement('div')
            metricsElement.className = 'slide-metrics'

            slide.metrics.forEach((metric) => {
                const metricItem = document.createElement('div')
                metricItem.className = 'metric-item'

                const metricLine = document.createElement('div')
                metricLine.className = 'metric-line'

                const metricContent = document.createElement('div')
                metricContent.className = 'metric-content'

                const metricValue = document.createElement('div')
                metricValue.className = 'metric-value'
                metricValue.textContent = metric.value

                const metricDescription = document.createElement('div')
                metricDescription.className = 'metric-description'
                metricDescription.textContent = metric.description

                metricContent.appendChild(metricValue)
                metricContent.appendChild(metricDescription)

                metricItem.appendChild(metricLine)
                metricItem.appendChild(metricContent)

                metricsElement.appendChild(metricItem)
            })

            slideInner.appendChild(contentElement)
            slideInner.appendChild(metricsElement)
            slideElement.appendChild(slideInner)

            slidesContainer.appendChild(slideElement)
        })
    }

    function renderDots() {
        dotsContainer.innerHTML = ''

        workflowSlides.forEach((_, index) => {
            const dot = document.createElement('span')
            dot.className = `carousel-dot ${index === currentSlide ? 'active' : ''}`
            dot.addEventListener('click', () => goToSlide(index))
            dotsContainer.appendChild(dot)
        })
    }

    function goToSlide(index) {
        if (isAnimating) return
        isAnimating = true

        const dots = dotsContainer.querySelectorAll('.carousel-dot')
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index)
        })

        const slides = slidesContainer.querySelectorAll('.workflow-slide')

        slides.forEach((slide) => {
            slide.classList.remove('active')
        })

        slides[index].classList.add('active')

        currentSlide = index

        setTimeout(() => {
            isAnimating = false
        }, 500)
    }

    function goToPrevSlide() {
        const newIndex =
            (currentSlide - 1 + workflowSlides.length) % workflowSlides.length
        goToSlide(newIndex)
        resetAutoplay()
    }

    function goToNextSlide() {
        const newIndex = (currentSlide + 1) % workflowSlides.length
        goToSlide(newIndex)
        resetAutoplay()
    }

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

    function addNavigationButtons() {
        const prevButton = document.createElement('button')
        prevButton.className = 'hidden'
        prevButton.addEventListener('click', goToPrevSlide)

        const nextButton = document.createElement('button')
        nextButton.className = 'hidden'
        nextButton.addEventListener('click', goToNextSlide)

        container.appendChild(prevButton)
        container.appendChild(nextButton)
    }

    addNavigationButtons()

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
                    goToNextSlide()
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    goToPrevSlide()
                }

                startAutoplay()
            },
            { passive: true }
        )
    }
}

// <----- Get Sarted ----->

document.addEventListener('DOMContentLoaded', function () {
    const stepContainers = document.querySelectorAll('.step-container')

    if (!stepContainers.length) return

    stepContainers.forEach((container) => {
        const infoIcon = container.querySelector('.info-icon')
        const description = container.querySelector('.step-description')

        if (infoIcon && description) {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                infoIcon.addEventListener('click', function (e) {
                    e.stopPropagation()

                    document
                        .querySelectorAll('.step-description.active')
                        .forEach((desc) => {
                            if (desc !== description) {
                                desc.classList.remove('active')
                                desc.style.maxHeight = '0'
                                desc.style.opacity = '0'
                            }
                        })

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
    const slider = document.querySelector('.simplify-slider')
    const sliderLogo = document.querySelector('.slider-logo')
    const badIcons = document.querySelectorAll(
        'img[src*="alert"], img[src*="question"], img[src*="cross"], img[src*="chain"]'
    )
    const confusionIcon = document.querySelector('img[src*="confusion"]')
    const goodIcons = document.querySelectorAll(
        'img[src*="calc"], img[src*="wagon"], img[src*="card"], img[src*="fax"], img[src*="books"], img[src*="desktop"], img[src*="phone-missed"], img[src*="calendar"], img[src*="email"], img[src*="note"]'
    )

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

    let isSimplified = false

    const startPosition = 5
    const endPosition = slider.offsetWidth - sliderLogo.offsetWidth - 15

    let isDragging = false
    let startX = 0
    let currentX = 0

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

    function hideIcons() {
        badIcons.forEach((icon) => {
            const parent = icon.closest('div')
            parent.classList.add('hiding-element')

            setTimeout(() => {
                parent.style.display = 'none'
            }, 600)
        })

        if (confusionIcon) {
            const parent = confusionIcon.closest('div')
            parent.classList.add('hiding-element')

            setTimeout(() => {
                parent.style.display = 'none'
            }, 600)
        }

        createOrbitalSystem()
    }

    function showIcons() {
        badIcons.forEach((icon) => {
            const parent = icon.closest('div')
            parent.style.display = ''

            setTimeout(() => {
                parent.classList.remove('hiding-element')
            }, 10)
        })

        if (confusionIcon) {
            const parent = confusionIcon.closest('div')
            parent.style.display = ''

            setTimeout(() => {
                parent.classList.remove('hiding-element')
            }, 10)
        }

        resetIconPositions()
    }

    function createOrbitalSystem() {
        // Очищаем предыдущие элементы
        while (orbitalSystem.firstChild) {
            orbitalSystem.removeChild(orbitalSystem.firstChild)
        }

        const hubElement = document.createElement('div')
        hubElement.className = 'hub-center'
        hubElement.innerHTML = '<div class="hub-text">HUB</div>'
        orbitalSystem.appendChild(hubElement)

        const orbit = document.createElement('div')
        orbit.className = 'orbit'
        orbitalSystem.appendChild(orbit)

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

            iconClone.style.width = '120px'
            iconClone.style.height = '120px'
            iconClone.style.objectFit = 'contain'

            iconContainer.appendChild(iconClone)

            const angle = (360 / goodIcons.length) * index
            iconContainer.style.transform = `rotate(${angle}deg) translateX(180px) rotate(-${angle}deg)`

            setTimeout(() => {
                orbit.appendChild(iconContainer)
            }, index * 100)

            parent.style.opacity = '0'
            parent.style.pointerEvents = 'none'
        })

        setTimeout(
            () => {
                orbit.classList.add('orbit-animation')
                connectionsContainer.classList.add('connections-animation')
                hubElement.classList.add('hub-animation')
            },
            goodIcons.length * 100 + 200
        )
    }

    function resetIconPositions() {
        const orbit = document.querySelector('.orbit')
        if (orbit) {
            orbit.classList.remove('orbit-animation')
        }

        setTimeout(() => {
            while (orbitalSystem.firstChild) {
                orbitalSystem.removeChild(orbitalSystem.firstChild)
            }
        }, 300)

        originalPositions.forEach((pos, index) => {
            pos.element.style.transition =
                'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            pos.element.style.opacity = '1'
            pos.element.style.pointerEvents = 'auto'

            pos.element.style.transform = ''

            if (pos.top) pos.element.style.top = pos.top
            if (pos.left) pos.element.style.left = pos.left
            if (pos.right) pos.element.style.right = pos.right
            if (pos.bottom) pos.element.style.bottom = pos.bottom
        })
    }

    function resetLogo() {
        sliderLogo.style.transition = 'left 0.3s ease-out'
        sliderLogo.style.left = startPosition + 'px'
        setTimeout(() => {
            sliderLogo.style.transition = ''
        }, 300)
    }

    function completeSwipeRight() {
        sliderLogo.style.transition = 'left 0.3s ease-out'

        sliderLogo.style.left =
            slider.offsetWidth - sliderLogo.offsetWidth - 5 + 'px'

        isSimplified = true
        hideIcons()

        const sliderText = document.querySelector('.slider-text')
        if (sliderText) {
            sliderText.textContent = 'Simplified!'
            sliderText.classList.add('text-simplified')
        }

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

    function completeSwipeLeft() {
        sliderLogo.style.transition = 'left 0.3s ease-out'
        sliderLogo.style.left = startPosition + 'px'
        isSimplified = false
        showIcons()

        const sliderText = document.querySelector('.slider-text')
        if (sliderText) {
            sliderText.textContent = 'Slide to Simplify'
            sliderText.classList.remove('text-simplified')
        }

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

    sliderLogo.addEventListener('mousedown', function (e) {
        isDragging = true
        startX = e.clientX
        currentX = parseInt(
            sliderLogo.style.left ||
                (isSimplified ? endPosition : startPosition)
        )

        e.preventDefault()
    })

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return

        const deltaX = e.clientX - startX
        let newPosition = currentX + deltaX

        if (newPosition < startPosition) newPosition = startPosition
        if (newPosition > endPosition) newPosition = endPosition

        sliderLogo.style.left = newPosition + 'px'
    })

    document.addEventListener('mouseup', function () {
        if (!isDragging) return
        isDragging = false

        const currentPosition = parseInt(
            sliderLogo.style.left ||
                (isSimplified ? endPosition : startPosition)
        )
        const threshold = startPosition + (endPosition - startPosition) * 0.5 // Пороговое значение посередине

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

    sliderLogo.addEventListener(
        'touchstart',
        function (e) {
            isDragging = true
            startX = e.touches[0].clientX
            currentX = parseInt(
                sliderLogo.style.left ||
                    (isSimplified ? endPosition : startPosition)
            )

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

            if (newPosition < startPosition) newPosition = startPosition
            if (newPosition > endPosition) newPosition = endPosition

            sliderLogo.style.left = newPosition + 'px'
        },
        { passive: true }
    )

    document.addEventListener('touchend', function () {
        if (!isDragging) return
        isDragging = false

        const currentPosition = parseInt(
            sliderLogo.style.left ||
                (isSimplified ? endPosition : startPosition)
        )
        const threshold = startPosition + (endPosition - startPosition) * 0.5

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

    sliderLogo.style.cursor = 'grab'
    sliderLogo.addEventListener('mousedown', function () {
        sliderLogo.style.cursor = 'grabbing'
    })
    document.addEventListener('mouseup', function () {
        sliderLogo.style.cursor = 'grab'
    })

    sliderLogo.querySelector('img').style.maxWidth = '50px'
    sliderLogo.querySelector('img').style.maxHeight = '50px'
})
