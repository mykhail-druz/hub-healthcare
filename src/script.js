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

document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cards-container')
    if (!cardsContainer) return

    const cards = document.querySelectorAll('.card-item')
    const statGroups = document.querySelectorAll('.stat-group')
    const quoteItems = document.querySelectorAll('.quote-item')
    const prevButton = document.querySelector('.cards-prev')
    const nextButton = document.querySelector('.cards-next')

    // YouTube Shorts видео URLs
    const videoUrls = [
        'https://www.youtube.com/shorts/Cn-Py71sl3E',
        'https://www.youtube.com/shorts/TkTsXOET3WA',
        'https://www.youtube.com/shorts/WUDu9B2gfYo',
        'https://www.youtube.com/shorts/F6SZnQDHhfo',
        'https://www.youtube.com/shorts/Cn-Py71sl3E',
    ]

    cards.forEach((card, index) => {
        const playButton = document.createElement('div')
        playButton.className = 'play-button'
        playButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `
        card.querySelector('.card-content').appendChild(playButton)

        const videoContainer = document.createElement('div')
        videoContainer.className = 'video-container'
        videoContainer.innerHTML = `
            <div class="close-video">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div id="youtube-container-${index}" class="youtube-container"></div>
        `
        card.appendChild(videoContainer)

        card.addEventListener('click', function (e) {
            if (e.target.closest('.close-video')) {
                closeVideo(card)
                return
            }

            if (document.querySelector('.video-container.active')) {
                return
            }

            const isFirstCard = card === cardsContainer.firstElementChild

            if (isFirstCard) {
                e.preventDefault()
                e.stopPropagation()
                openVideo(card, index)
            }
        })

        const closeButton = videoContainer.querySelector('.close-video')
        closeButton.addEventListener('click', function (e) {
            e.preventDefault()
            e.stopPropagation()
            closeVideo(card)
        })
    })

    function openVideo(card, index) {
        const videoId = getYouTubeId(videoUrls[index])

        if (!videoId) return

        const videoContainer = card.querySelector('.video-container')
        videoContainer.classList.add('active')

        stopAutoplay()

        const youtubeContainer = card.querySelector(
            `#youtube-container-${index}`
        )
        youtubeContainer.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&controls=0&showinfo=0&modestbranding=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `
    }

    function closeVideo(card) {
        const videoContainer = card.querySelector('.video-container')
        if (videoContainer) {
            videoContainer.classList.remove('active')

            const youtubeContainer = videoContainer.querySelector(
                '[id^="youtube-container-"]'
            )
            if (youtubeContainer) {
                youtubeContainer.innerHTML = ''
            }
        }

        startAutoplay()
    }

    function getYouTubeId(url) {
        if (url.includes('/shorts/')) {
            const shortsId = url.split('/shorts/')[1].split('?')[0]
            return shortsId
        }

        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const match = url.match(regex)
        return match ? match[1] : null
    }

    function updatePlayButtons() {
        const activeCard = cardsContainer.firstElementChild

        cards.forEach((card) => {
            const playButton = card.querySelector('.play-button')
            if (card === activeCard) {
                playButton.style.display = 'flex'
            } else {
                playButton.style.display = 'none'
            }
        })
    }

    updatePlayButtons()

    const totalCards = cards.length
    let currentCard = 1
    let autoplayInterval
    let isAnimating = false

    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.className = 'carousel-indicators'

    for (let i = 1; i <= totalCards; i++) {
        const dot = document.createElement('div')
        dot.className = i === 1 ? 'indicator-dot active' : 'indicator-dot'
        dot.dataset.index = i

        dot.addEventListener('click', () => {
            if (isAnimating) return

            closeAllVideos()

            const targetIndex = parseInt(dot.dataset.index)
            const currentIndex = currentCard

            let diff = targetIndex - currentIndex

            // Handle wrapping around
            if (Math.abs(diff) > totalCards / 2) {
                if (diff > 0) {
                    diff = diff - totalCards
                } else {
                    diff = totalCards + diff
                }
            }

            if (diff > 0) {
                for (let j = 0; j < diff; j++) {
                    setTimeout(() => nextCard(), j * 200)
                }
            } else if (diff < 0) {
                for (let j = 0; j < Math.abs(diff); j++) {
                    setTimeout(() => prevCard(), j * 200)
                }
            }
        })

        indicatorsContainer.appendChild(dot)
    }

    cardsContainer.parentNode.insertBefore(
        indicatorsContainer,
        cardsContainer.nextSibling
    )

    function closeAllVideos() {
        const activeVideos = document.querySelectorAll(
            '.video-container.active'
        )
        activeVideos.forEach((container) => {
            const card = container.closest('.card-item')
            closeVideo(card)
        })
    }

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

        const dots = document.querySelectorAll('.indicator-dot')
        dots.forEach((dot) => {
            if (parseInt(dot.dataset.index) === currentCard) {
                dot.classList.add('active')
            } else {
                dot.classList.remove('active')
            }
        })

        updatePlayButtons()
    }

    function nextCard() {
        if (isAnimating) return

        closeAllVideos()

        isAnimating = true

        cards.forEach((card) => card.classList.add('slide-transition'))

        const firstCard = cardsContainer.firstElementChild
        cardsContainer.appendChild(firstCard)

        currentCard = (currentCard % totalCards) + 1

        updateActiveElements()

        setTimeout(() => {
            isAnimating = false

            cards.forEach((card) => card.classList.remove('slide-transition'))

            updatePlayButtons()
        }, 500)
    }

    function prevCard() {
        if (isAnimating) return

        closeAllVideos()

        isAnimating = true

        cards.forEach((card) => card.classList.add('slide-transition'))

        const lastCard = cardsContainer.lastElementChild
        cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild)

        currentCard = ((currentCard - 2 + totalCards) % totalCards) + 1

        updateActiveElements()

        setTimeout(() => {
            isAnimating = false

            cards.forEach((card) => card.classList.remove('slide-transition'))

            updatePlayButtons()
        }, 500)
    }

    function startAutoplay() {
        stopAutoplay()

        // Проверяем, открыто ли видео
        if (document.querySelector('.video-container.active')) {
            return
        }

        autoplayInterval = setInterval(() => {
            nextCard()
        }, 7500)
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

        prevButton.addEventListener('mouseenter', () => {
            if (prevButton.querySelector('svg')) {
                prevButton.querySelector('svg').style.transform =
                    'translateX(-2px)'
                prevButton.querySelector('svg').style.transition =
                    'transform 0.3s'
            }
        })

        prevButton.addEventListener('mouseleave', () => {
            if (prevButton.querySelector('svg')) {
                prevButton.querySelector('svg').style.transform =
                    'translateX(0)'
            }
        })
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextCard()
            stopAutoplay()
            startAutoplay()
        })

        nextButton.addEventListener('mouseenter', () => {
            if (nextButton.querySelector('svg')) {
                nextButton.querySelector('svg').style.transform =
                    'translateX(2px)'
                nextButton.querySelector('svg').style.transition =
                    'transform 0.3s'
            }
        })

        nextButton.addEventListener('mouseleave', () => {
            if (nextButton.querySelector('svg')) {
                nextButton.querySelector('svg').style.transform =
                    'translateX(0)'
            }
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

            if (document.querySelector('.video-container.active')) {
                return
            }

            const swipeThreshold = 50
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next card
                nextCard()
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous card
                prevCard()
            }

            startAutoplay()
        },
        { passive: true }
    )

    document.addEventListener('keydown', (e) => {
        // Если открыто видео и нажата клавиша Escape, закрываем видео
        if (e.key === 'Escape') {
            closeAllVideos()
            return
        }

        if (document.querySelector('.video-container.active')) {
            return
        }

        if (e.key === 'ArrowRight') {
            nextCard()
            stopAutoplay()
            startAutoplay()
        } else if (e.key === 'ArrowLeft') {
            prevCard()
            stopAutoplay()
            startAutoplay()
        }
    })

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
            avatar: 'images/avatars/avatar-4.png',
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

    stepContainers.forEach((container) => {
        container.addEventListener('mouseenter', function () {
            stepContainers.forEach((otherContainer) => {
                otherContainer.classList.remove('hovered')
            })

            container.classList.add('hovered')
        })

        container.addEventListener('mouseleave', function () {
            container.classList.remove('hovered')
        })

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            const icon = container.querySelector('.step-icon')
            const card = container.querySelector('.step-card')

            const toggleCard = function (e) {
                e.preventDefault()
                e.stopPropagation()

                stepContainers.forEach((otherContainer) => {
                    if (otherContainer !== container) {
                        otherContainer.classList.remove('active')
                    }
                })

                container.classList.toggle('active')
            }

            if (icon) {
                icon.addEventListener('click', toggleCard)
            }

            if (card) {
                card.addEventListener('click', toggleCard)
            }
        }
    })

    document.addEventListener('click', function (e) {
        let clickedOutside = true

        stepContainers.forEach((container) => {
            if (container.contains(e.target)) {
                clickedOutside = false
            }
        })

        if (clickedOutside) {
            stepContainers.forEach((container) => {
                container.classList.remove('active')
            })
        }
    })

    stepContainers.forEach((container, index) => {
        container.style.opacity = '0'
        container.style.transform = 'translateY(20px)'

        setTimeout(
            () => {
                container.style.opacity = '1'
                container.style.transform = 'translateY(0)'
            },
            100 * (index + 1)
        )
    })
})

// <----- Simplify ----->

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

        const isMobile = window.innerWidth <= 767
        const translateXValue = isMobile ? 150 : 180

        goodIcons.forEach((icon, index) => {
            const parent = icon.closest('div')
            const iconClone = icon.cloneNode(true)

            const iconContainer = document.createElement('div')
            iconContainer.className = 'orbital-icon-container'

            iconClone.style.width = '120px'
            iconClone.style.height = '120px'
            iconClone.style.objectFit = 'contain'

            iconContainer.appendChild(iconClone)

            const angle = (360 / goodIcons.length) * index
            iconContainer.style.transform = `rotate(${angle}deg) translateX(${translateXValue}px) rotate(-${angle}deg)`

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
