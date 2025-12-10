/**
 * Wegbegleitung - Main JavaScript
 * Interaktivität für Fragebogen, Navigation und Chat
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initQuestionnaire();
    initChatWidget();
    initScrollEffects();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const mainNav = document.getElementById('mainNav');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // Scroll effect for navigation
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Questionnaire functionality
 */
function initQuestionnaire() {
    const form = document.getElementById('needsQuestionnaire');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const resultsContainer = document.getElementById('questionnaireResults');
    const resultsContent = document.getElementById('resultsContent');
    const restartBtn = document.getElementById('restartBtn');

    if (!form) return;

    let currentStep = 1;
    const totalSteps = 4;

    // Update step display
    function updateStepDisplay() {
        // Hide all steps
        document.querySelectorAll('.question-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }

        // Update buttons
        prevBtn.disabled = currentStep === 1;

        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    // Validate current step
    function validateStep(step) {
        const stepEl = document.querySelector(`[data-step="${step}"]`);
        if (!stepEl) return true;

        // Check for radio buttons
        const radios = stepEl.querySelectorAll('input[type="radio"]');
        if (radios.length > 0) {
            const checked = stepEl.querySelector('input[type="radio"]:checked');
            return checked !== null;
        }

        // For checkbox step (step 3), optional validation
        const checkboxes = stepEl.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length > 0) {
            // At least one should be checked, but it's optional
            return true;
        }

        return true;
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStepDisplay();
                }
            } else {
                // Show gentle reminder
                showValidationMessage(currentStep);
            }
        });
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                updateStepDisplay();
            }
        });
    }

    // Submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateStep(currentStep)) {
                showResults();
            } else {
                showValidationMessage(currentStep);
            }
        });
    }

    // Restart button
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            form.reset();
            currentStep = 1;
            updateStepDisplay();
            form.style.display = 'block';
            resultsContainer.style.display = 'none';
        });
    }

    // Show validation message
    function showValidationMessage(step) {
        const stepEl = document.querySelector(`[data-step="${step}"]`);
        if (!stepEl) return;

        // Add gentle shake animation
        stepEl.style.animation = 'none';
        stepEl.offsetHeight; // Trigger reflow
        stepEl.style.animation = 'shake 0.5s ease';
    }

    // Generate and show results
    function showResults() {
        const formData = new FormData(form);
        const situation = formData.get('situation');
        const relationship = formData.get('relationship');
        const needs = formData.getAll('needs');
        const supportType = formData.get('support-type');

        const recommendations = generateRecommendations(situation, relationship, needs, supportType);

        resultsContent.innerHTML = recommendations.map(rec => `
            <a href="${rec.link}" class="result-card">
                <div class="result-icon">
                    ${rec.icon}
                </div>
                <div class="result-text">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <span>Mehr erfahren →</span>
                </div>
            </a>
        `).join('');

        form.style.display = 'none';
        resultsContainer.style.display = 'block';

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Generate personalized recommendations
    function generateRecommendations(situation, relationship, needs, supportType) {
        const recommendations = [];

        // Based on situation
        if (situation === 'diagnosis' || situation === 'dying') {
            recommendations.push({
                title: 'Die Sterbephase verstehen',
                description: 'Informationen über körperliche und emotionale Veränderungen in der letzten Lebensphase.',
                link: 'pages/sterbephase.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
            });
        }

        if (situation === 'recent-death') {
            recommendations.push({
                title: 'Die ersten Tage nach dem Verlust',
                description: 'Praktische Schritte und emotionale Unterstützung für die unmittelbare Zeit nach einem Todesfall.',
                link: 'pages/nach-dem-tod.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>'
            });
            recommendations.push({
                title: 'Praktische Schritte',
                description: 'Checklisten für Formalitäten, Behördengänge und organisatorische Aufgaben.',
                link: 'pages/praktisches.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>'
            });
        }

        if (situation === 'grief') {
            recommendations.push({
                title: 'Trauer verstehen und verarbeiten',
                description: 'Über Trauerphasen, den Umgang mit Gefühlen und den Weg zurück ins Leben.',
                link: 'pages/psychologie.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'
            });
        }

        // Based on needs
        if (needs.includes('emotional') || needs.includes('self-care')) {
            recommendations.push({
                title: 'Selbstfürsorge',
                description: 'Wie Sie auf sich selbst achten können, während Sie diese schwierige Zeit durchleben.',
                link: 'pages/selbstfuersorge.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
            });
        }

        if (needs.includes('resources') || supportType === 'professional') {
            recommendations.push({
                title: 'Professionelle Hilfsangebote',
                description: 'Beratungsstellen, Hospize, Therapeuten und Selbsthilfegruppen in Ihrer Nähe.',
                link: 'pages/ressourcen.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'
            });
        }

        if (supportType === 'exchange' || needs.includes('communication')) {
            recommendations.push({
                title: 'Austausch mit Anderen',
                description: 'Verbinden Sie sich mit Menschen, die Ähnliches durchleben oder durchlebt haben.',
                link: 'pages/forum.html',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>'
            });
        }

        // Ensure we always have at least 3 recommendations
        if (recommendations.length < 3) {
            const defaultRecs = [
                {
                    title: 'Psychologische Begleitung',
                    description: 'Verstehen Sie die emotionalen Phasen und finden Sie Wege, mit Ihren Gefühlen umzugehen.',
                    link: 'pages/psychologie.html',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'
                },
                {
                    title: 'Hilfsangebote',
                    description: 'Finden Sie professionelle Unterstützung und Anlaufstellen in Ihrer Nähe.',
                    link: 'pages/ressourcen.html',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'
                }
            ];

            for (const rec of defaultRecs) {
                if (recommendations.length >= 4) break;
                if (!recommendations.find(r => r.link === rec.link)) {
                    recommendations.push(rec);
                }
            }
        }

        return recommendations.slice(0, 4);
    }

    // Initial display
    updateStepDisplay();
}

/**
 * Chat Widget functionality
 */
function initChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatWidget) return;

    // Open chat
    if (openChatBtn) {
        openChatBtn.addEventListener('click', function() {
            chatWidget.classList.add('open');
            chatInput.focus();
        });
    }

    // Close chat
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            chatWidget.classList.remove('open');
        });
    }

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response (placeholder for actual AI integration)
        setTimeout(() => {
            const response = generateBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simple bot response (placeholder)
    function generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Keyword-based responses (placeholder for actual AI)
        if (lowerMessage.includes('hilfe') || lowerMessage.includes('notfall')) {
            return 'Wenn Sie sich in einer akuten Krise befinden, erreichen Sie die Telefonseelsorge unter 0800 111 0 111 (kostenlos, 24 Stunden). Wie kann ich Ihnen sonst weiterhelfen?';
        }

        if (lowerMessage.includes('beerdigung') || lowerMessage.includes('bestattung')) {
            return 'Informationen zu Bestattungsarten und der Organisation einer Beerdigung finden Sie unter "Nach dem Abschied". Soll ich Ihnen weitere Informationen geben?';
        }

        if (lowerMessage.includes('trauer') || lowerMessage.includes('traurig')) {
            return 'Trauer ist ein natürlicher und wichtiger Prozess. Jeder trauert auf seine eigene Weise und in seinem eigenen Tempo. Unter "Psychologische Begleitung" finden Sie mehr über Trauerphasen und hilfreiche Strategien.';
        }

        if (lowerMessage.includes('sterben') || lowerMessage.includes('sterbephase')) {
            return 'Die Sterbephase kann für alle Beteiligten eine herausfordernde Zeit sein. Unter "Die Sterbephase verstehen" finden Sie Informationen darüber, was in dieser Zeit passiert und wie Sie begleiten können.';
        }

        if (lowerMessage.includes('danke')) {
            return 'Gern geschehen. Ich bin hier, wenn Sie weitere Fragen haben oder einfach nur reden möchten.';
        }

        // Default response
        const defaultResponses = [
            'Danke für Ihre Nachricht. Ich bin hier, um Ihnen zu helfen. Können Sie mir mehr darüber erzählen, was Sie gerade beschäftigt?',
            'Ich verstehe, dass dies eine schwierige Zeit ist. Wie kann ich Sie am besten unterstützen?',
            'Ihre Gedanken und Gefühle sind wichtig. Möchten Sie mir mehr erzählen, oder soll ich Ihnen Informationen zu einem bestimmten Thema geben?'
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

/**
 * Scroll effects
 */
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.topic-card, .result-card, .category-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
