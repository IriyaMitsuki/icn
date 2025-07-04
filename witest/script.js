class WikiApp {
    constructor() {
        this.currentTheme = 'light';
        this.searchData = [];
        this.activeSection = 'introduction';
        
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupSearch();
        this.setupMobileMenu();
        this.setupScrollSpy();
        this.setupKeyboardShortcuts();
        this.generateSearchData();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('wiki-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        this.currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme(this.currentTheme);
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('wiki-theme', theme);
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const tocLinks = document.querySelectorAll('.toc-link');
        
        [...navLinks, ...tocLinks].forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateToSection(targetId);
            });
        });
    }

    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            this.updateActiveNavigation(sectionId);
            this.updateBreadcrumbs(sectionId);
        }
    }

    updateActiveNavigation(sectionId) {
        // Update sidebar navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Update table of contents
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        this.activeSection = sectionId;
    }

    updateBreadcrumbs(sectionId) {
        const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
        const sectionTitles = {
            'introduction': 'Введение',
            'installation': 'Установка',
            'quick-start': 'Быстрый старт',
            'configuration': 'Конфигурация',
            'git-basics': 'Основы Git',
            'repositories': 'Репозитории',
            'commits': 'Коммиты',
            'branches': 'Ветки',
            'merging': 'Слияние',
            'pull-requests': 'Pull Requests',
            'issues': 'Issues',
            'actions': 'GitHub Actions',
            'pages': 'GitHub Pages',
            'security': 'Безопасность',
            'workflows': 'Рабочие процессы',
            'api': 'GitHub API',
            'integrations': 'Интеграции',
            'best-practices': 'Лучшие практики'
        };
        
        if (breadcrumbCurrent && sectionTitles[sectionId]) {
            breadcrumbCurrent.textContent = sectionTitles[sectionId];
        }
    }

    // Search Functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        const searchResults = document.getElementById('searchResults');
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    this.performSearch(query);
                    this.showSearchOverlay();
                }, 300);
            } else {
                this.hideSearchOverlay();
            }
        });
        
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                this.showSearchOverlay();
            }
        });
        
        searchClose.addEventListener('click', () => {
            this.hideSearchOverlay();
        });
        
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                this.hideSearchOverlay();
            }
        });
    }

    generateSearchData() {
        this.searchData = [
            {
                title: 'Введение в GitHub',
                content: 'GitHub веб-платформа хостинг проекты совместная разработка Git система контроля версий',
                url: '#introduction',
                section: 'Начало работы'
            },
            {
                title: 'Установка Git',
                content: 'установка Git настройка конфигурация пользователь email имя',
                url: '#installation',
                section: 'Начало работы'
            },
            {
                title: 'Быстрый старт',
                content: 'первый репозиторий создание клонирование коммит push pull',
                url: '#quick-start',
                section: 'Начало работы'
            },
            {
                title: 'Основы Git',
                content: 'команды git add commit push pull clone status log diff',
                url: '#git-basics',
                section: 'Основы Git'
            },
            {
                title: 'Репозитории',
                content: 'создание репозитория клонирование форк приватный публичный',
                url: '#repositories',
                section: 'Основы Git'
            },
            {
                title: 'Коммиты',
                content: 'коммит сообщение история изменения staging area',
                url: '#commits',
                section: 'Основы Git'
            },
            {
                title: 'Ветки',
                content: 'ветки branch создание переключение merge checkout',
                url: '#branches',
                section: 'Основы Git'
            },
            {
                title: 'Pull Requests',
                content: 'pull request код ревью слияние изменения предложение',
                url: '#pull-requests',
                section: 'GitHub Features'
            },
            {
                title: 'Issues',
                content: 'issues баги задачи трекинг проблемы отчеты',
                url: '#issues',
                section: 'GitHub Features'
            },
            {
                title: 'GitHub Actions',
                content: 'автоматизация CI CD workflow действия тестирование развертывание',
                url: '#actions',
                section: 'GitHub Features'
            },
            {
                title: 'GitHub Pages',
                content: 'хостинг статические сайты публикация веб-сайт бесплатно',
                url: '#pages',
                section: 'GitHub Features'
            },
            {
                title: 'Лучшие практики',
                content: 'советы рекомендации эффективная работа команда проект',
                url: '#best-practices',
                section: 'Продвинутые темы'
            }
        ];
    }

    performSearch(query) {
        const results = this.searchData.filter(item => {
            const searchText = `${item.title} ${item.content}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });
        
        this.displaySearchResults(results, query);
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>Ничего не найдено по запросу "<strong>${this.escapeHtml(query)}</strong>"</p>
                    <p>Попробуйте изменить поисковый запрос или воспользуйтесь навигацией.</p>
                </div>
            `;
            return;
        }
        
        const resultsHtml = results.map(result => `
            <div class="search-result-item">
                <h4><a href="${result.url}" class="search-result-link">${this.highlightText(result.title, query)}</a></h4>
                <p class="search-result-section">${result.section}</p>
                <p class="search-result-content">${this.highlightText(this.truncateText(result.content, 150), query)}</p>
            </div>
        `).join('');
        
        searchResults.innerHTML = `
            <div class="search-results-header">
                <p>Найдено результатов: <strong>${results.length}</strong></p>
            </div>
            <div class="search-results-list">
                ${resultsHtml}
            </div>
        `;
        
        // Add click handlers to search result links
        searchResults.querySelectorAll('.search-result-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateToSection(targetId);
                this.hideSearchOverlay();
            });
        });
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    showSearchOverlay() {
        const searchOverlay = document.getElementById('searchOverlay');
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideSearchOverlay() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.blur();
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Scroll Spy
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const options = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.updateActiveNavigation(sectionId);
                    this.updateBreadcrumbs(sectionId);
                }
            });
        }, options);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                searchInput.focus();
            }
            
            // Escape to close search overlay
            if (e.key === 'Escape') {
                const searchOverlay = document.getElementById('searchOverlay');
                if (searchOverlay.classList.contains('active')) {
                    this.hideSearchOverlay();
                }
            }
            
            // Ctrl/Cmd + D for theme toggle
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Additional CSS for search results (injected via JavaScript)
const searchStyles = `
    .search-no-results {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-secondary);
    }

    .search-results-header {
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
        font-size: 14px;
        color: var(--text-secondary);
    }

    .search-results-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .search-result-item {
        padding: 16px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--bg-secondary);
        transition: all var(--transition-fast);
    }

    .search-result-item:hover {
        border-color: var(--accent-color);
        box-shadow: var(--shadow-sm);
    }

    .search-result-link {
        color: var(--accent-color);
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.4;
    }

    .search-result-link:hover {
        text-decoration: underline;
    }

    .search-result-section {
        font-size: 12px;
        color: var(--text-muted);
        margin: 4px 0 8px 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .search-result-content {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.5;
        margin: 0;
    }

    .search-result-content mark {
        background-color: rgba(59, 130, 246, 0.2);
        color: var(--accent-color);
        padding: 1px 2px;
        border-radius: 2px;
    }

    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    @media (max-width: 768px) {
        .search-overlay {
            padding-top: 80px;
        }
        
        .search-results {
            margin: 0 16px;
        }
    }
`;

// Inject search styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);

// Initialize the wiki app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WikiApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers if needed
    } else {
        // Page is visible again, resume if needed
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}