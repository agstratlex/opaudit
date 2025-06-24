// AG Strategies Operations Audit - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAudit();
});

function initializeAudit() {
    // Add smooth scrolling for navigation
    addSmoothScrolling();
    
    // Add form validation and interaction enhancements
    enhanceFormInteractions();
    
    // Add visual feedback for completed sections
    trackProgress();
    
    // Initialize print optimization
    optimizeForPrint();
}

function calculateScore() {
    let totalScore = 0;
    let answeredQuestions = 0;
    const totalQuestions = 15;
    
    // Calculate score from all radio button selections
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            totalScore += parseInt(selectedOption.value);
            answeredQuestions++;
        }
    }
    
    // Update score display
    const scoreElement = document.getElementById('totalScore');
    if (scoreElement) {
        scoreElement.textContent = totalScore;
        
        // Add animation to score reveal
        scoreElement.style.transform = 'scale(1.2)';
        scoreElement.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Highlight appropriate score range
    highlightScoreRange(totalScore);
    
    // Show completion message if all questions answered
    if (answeredQuestions === totalQuestions) {
        showCompletionFeedback(totalScore);
    } else {
        showIncompleteWarning(answeredQuestions, totalQuestions);
    }
    
    // Scroll to results
    const scoreSection = document.querySelector('.score-calculator');
    if (scoreSection) {
        scoreSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    return totalScore;
}

function highlightScoreRange(score) {
    // Remove previous highlights
    const rangeItems = document.querySelectorAll('.range-item');
    rangeItems.forEach(item => {
        item.style.border = '';
        item.style.boxShadow = '';
        item.style.transform = '';
    });
    
    // Determine and highlight appropriate range
    let targetRange = null;
    
    if (score >= 60) {
        targetRange = document.querySelector('.range-item.excellent');
    } else if (score >= 45) {
        targetRange = document.querySelector('.range-item.good');
    } else if (score >= 30) {
        targetRange = document.querySelector('.range-item.fair');
    } else if (score >= 15) {
        targetRange = document.querySelector('.range-item.poor');
    } else {
        targetRange = document.querySelector('.range-item.critical');
    }
    
    if (targetRange) {
        targetRange.style.border = '3px solid var(--gold-accent)';
        targetRange.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
        targetRange.style.transform = 'scale(1.02)';
        targetRange.style.transition = 'all 0.3s ease';
    }
}

function showCompletionFeedback(score) {
    // Create or update completion message
    let messageElement = document.getElementById('completion-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'completion-message';
        messageElement.style.cssText = `
            background: linear-gradient(135deg, var(--gold-accent), var(--gold-light));
            color: var(--primary-black);
            padding: var(--spacing-lg);
            border-radius: 8px;
            margin-top: var(--spacing-lg);
            text-align: center;
            font-weight: 600;
            animation: slideIn 0.5s ease;
        `;
        
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn && calculateBtn.parentNode) {
            calculateBtn.parentNode.insertBefore(messageElement, calculateBtn.nextSibling);
        }
    }
    
    // Customize message based on score
    let message = '';
    let recommendation = '';
    
    if (score >= 60) {
        message = '🎉 Excellent! Your operations are highly optimized.';
        recommendation = 'Focus on maintaining your systems and staying ahead of industry trends.';
    } else if (score >= 45) {
        message = '👍 Good foundation! Minor improvements can yield significant results.';
        recommendation = 'Consider strategic refinements to reach peak performance.';
    } else if (score >= 30) {
        message = '⚡ Significant opportunities identified!';
        recommendation = 'Strategic improvements could dramatically boost your efficiency.';
    } else if (score >= 15) {
        message = '🚨 Critical operational gaps detected.';
        recommendation = 'A comprehensive operational overhaul could transform your business.';
    } else {
        message = '🆘 Foundational systems need immediate attention.';
        recommendation = 'Professional guidance is essential to establish effective operations.';
    }
    
    messageElement.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">${message}</div>
        <div style="font-size: 1rem; opacity: 0.9;">${recommendation}</div>
    `;
}

function showIncompleteWarning(answered, total) {
    let messageElement = document.getElementById('completion-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'completion-message';
        messageElement.style.cssText = `
            background: #fff3cd;
            border: 2px solid #ffc107;
            color: #856404;
            padding: var(--spacing-lg);
            border-radius: 8px;
            margin-top: var(--spacing-lg);
            text-align: center;
            font-weight: 600;
        `;
        
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn && calculateBtn.parentNode) {
            calculateBtn.parentNode.insertBefore(messageElement, calculateBtn.nextSibling);
        }
    }
    
    messageElement.innerHTML = `
        <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">
            ⚠️ Incomplete Assessment
        </div>
        <div style="font-size: 1rem;">
            You've answered ${answered} of ${total} questions. Please complete all questions for an accurate assessment.
        </div>
    `;
}

function addSmoothScrolling() {
    // Add smooth scrolling to internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function enhanceFormInteractions() {
    // Add visual feedback to radio button selections
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            const questionName = this.querySelector('input').name;
            
            // Remove selection styling from other options in the same question
            const sameQuestionOptions = document.querySelectorAll(`input[name="${questionName}"]`);
            sameQuestionOptions.forEach(input => {
                input.closest('.radio-option').classList.remove('selected');
            });
            
            // Add selection styling to clicked option
            this.classList.add('selected');
            
            // Add subtle animation
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effects
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateX(2px)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
}

function trackProgress() {
    // Track completion of questions and show progress
    const questions = document.querySelectorAll('input[type="radio"]');
    questions.forEach(question => {
        question.addEventListener('change', function() {
            updateProgressIndicator();
        });
    });
}

function updateProgressIndicator() {
    const totalQuestions = 15;
    let answeredQuestions = 0;
    
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            answeredQuestions++;
        }
    }
    
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    
    // Create or update progress indicator
    let progressElement = document.getElementById('progress-indicator');
    if (!progressElement) {
        progressElement = document.createElement('div');
        progressElement.id = 'progress-indicator';
        progressElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-white);
            border: 2px solid var(--gold-accent);
            border-radius: 50px;
            padding: 10px 20px;
            font-family: var(--font-heading);
            font-weight: 600;
            color: var(--primary-black);
            box-shadow: var(--shadow-gold);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(progressElement);
    }
    
    progressElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 0.9rem;">Progress:</div>
            <div style="font-size: 1.1rem; color: var(--gold-accent);">${answeredQuestions}/${totalQuestions}</div>
        </div>
    `;
    
    // Hide progress indicator when complete
    if (answeredQuestions === totalQuestions) {
        setTimeout(() => {
            progressElement.style.opacity = '0';
            setTimeout(() => {
                progressElement.style.display = 'none';
            }, 300);
        }, 2000);
    }
}

function optimizeForPrint() {
    // Add print styles and optimization
    window.addEventListener('beforeprint', function() {
        // Ensure all form selections are visible in print
        const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
        selectedOptions.forEach(option => {
            const label = option.closest('.radio-option');
            if (label) {
                label.style.backgroundColor = '#f0f0f0';
                label.style.border = '2px solid #d4af37';
            }
        });
        
        // Show current score in print
        const totalScore = calculateScore();
        const printScore = document.createElement('div');
        printScore.id = 'print-score';
        printScore.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            background: var(--gold-accent);
            color: var(--primary-white);
            padding: 10px 20px;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 0 0 0 10px;
        `;
        printScore.innerHTML = `Score: ${totalScore}/75`;
        document.body.appendChild(printScore);
    });
    
    window.addEventListener('afterprint', function() {
        // Clean up print-specific styles
        const printScore = document.getElementById('print-score');
        if (printScore) {
            printScore.remove();
        }
        
        const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
        selectedOptions.forEach(option => {
            const label = option.closest('.radio-option');
            if (label) {
                label.style.backgroundColor = '';
                label.style.border = '';
            }
        });
    });
}

// Additional utility functions
function exportToPDF() {
    // Trigger browser's built-in print functionality for PDF export
    window.print();
}

function resetAssessment() {
    // Reset all form selections
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Remove all selection styling
    const selectedOptions = document.querySelectorAll('.radio-option.selected');
    selectedOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Reset score display
    const scoreElement = document.getElementById('totalScore');
    if (scoreElement) {
        scoreElement.textContent = '0';
    }
    
    // Remove completion message
    const messageElement = document.getElementById('completion-message');
    if (messageElement) {
        messageElement.remove();
    }
    
    // Reset progress indicator
    updateProgressIndicator();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.type === 'radio') {
        e.target.click();
    }
    
    // Add keyboard shortcut for calculating score (Ctrl+Enter)
    if (e.ctrlKey && e.key === 'Enter') {
        calculateScore();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .radio-option.selected {
        background: var(--primary-white);
        border-color: var(--gold-accent);
        box-shadow: 0 2px 10px rgba(212, 175, 55, 0.2);
    }
    
    .calculate-btn:active {
        animation: pulse 0.3s ease;
    }
    
    /* Smooth transitions for all interactive elements */
    .radio-option,
    .calculate-btn,
    .cta-button,
    .stat-card,
    .benefit-item,
    .impact-item,
    .expertise-item,
    .service-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize assessment when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAudit);
} else {
    initializeAudit();
}
