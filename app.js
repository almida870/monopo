/* ============================================
   MONOPOLY GO - ENHANCED JAVASCRIPT V2.0
   ============================================ */

// === GLOBAL STATE ===
const state = {
    userCountry: 'Global User',
    userIP: 'Hidden IP',
    selectedDice: 0,
    username: '',
    platform: 'ios',
    exitModalShown: false,
    currentStep: 1
};

// === DOM ELEMENTS ===
const els = {
    // Sections
    inputSection: document.getElementById('inputSection'),
    selectionSection: document.getElementById('selectionSection'),
    simulationSection: document.getElementById('simulationSection'),
    lockerSection: document.getElementById('lockerSection'),
    testimonialsSection: document.getElementById('testimonialsSection'),
    
    // Forms
    username: document.getElementById('username'),
    platform: document.getElementById('platform'),
    connectBtn: document.getElementById('connectBtn'),
    verifyBtn: document.getElementById('verifyBtn'),
    
    // Terminal & Display
    terminalLog: document.getElementById('terminalLog'),
    finalDiceAmount: document.getElementById('finalDiceAmount'),
    
    // Progress
    progressSteps: document.querySelectorAll('.step'),
    
    // Chat & Activity
    chatBox: document.getElementById('chatBox'),
    activityFeed: document.getElementById('activityFeed'),
    onlineCount: document.getElementById('onlineCount'),
    
    // Stats
    todayCount: document.getElementById('todayCount'),
    activeCount: document.getElementById('activeCount'),
    
    // Timer
    timer: document.getElementById('timer'),
    
    // Exit Modal
    exitModal: document.getElementById('exitModal'),
    exitStayBtn: document.getElementById('exitStayBtn'),
    exitLeaveBtn: document.getElementById('exitLeaveBtn'),
    exitDiceAmount: document.getElementById('exitDiceAmount')
};

// === UTILITY FUNCTIONS ===
function updateProgress(step) {
    state.currentStep = step;
    els.progressSteps.forEach((s, i) => {
        if (i < step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

function hideAll() {
    els.inputSection.classList.add('hidden');
    els.selectionSection.classList.add('hidden');
    els.simulationSection.classList.add('hidden');
    els.lockerSection.classList.add('hidden');
}

// === GEO-LOCATION ===
async function fetchGeo() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        state.userCountry = data.country_name || 'Global User';
        state.userIP = data.ip || 'Hidden IP';
    } catch (e) {
        // Silent fail
    }
}

// === TIMER SYSTEM ===
function startPersonalTimer() {
    let timeLeft = 300; // 5 minutes
    
    const interval = setInterval(() => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        if (els.timer) {
            els.timer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            
            // Change color when < 1 min
            if (timeLeft <= 60) {
                els.timer.parentElement.style.background = '#CC0000';
                els.timer.style.animation = 'flash 1s infinite';
            }
        }
        
        if (--timeLeft < 0) {
            clearInterval(interval);
            timeLeft = 120; // Reset to 2 min
        }
    }, 1000);
}

// === STEP 1: CONNECT ===
function handleConnect() {
    const username = els.username.value.trim();
    
    // Validation
    if (username === '') {
        alert('Please enter your Monopoly GO username');
        return;
    }
    
    if (username.length < 3) {
        alert('Username must be at least 3 characters');
        return;
    }
    
    // Store state
    state.username = username;
    state.platform = els.platform.value;
    
    // Disable button
    els.connectBtn.disabled = true;
    els.connectBtn.innerHTML = '<span>Connecting...</span>';
    
    // Proceed
    setTimeout(() => {
        hideAll();
        els.selectionSection.classList.remove('hidden');
        updateProgress(2);
        
        // Scroll to view
        els.selectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Re-enable
        els.connectBtn.disabled = false;
        els.connectBtn.innerHTML = '<span>Start Generator</span><span class="btn-arrow">→</span>';
    }, 800);
}

// === STEP 2: SELECT DICE ===
function handleDiceSelection(amount) {
    state.selectedDice = amount;
    
    // Update display
    if (els.finalDiceAmount) {
        els.finalDiceAmount.textContent = amount.toLocaleString();
    }
    if (els.exitDiceAmount) {
        els.exitDiceAmount.textContent = amount.toLocaleString();
    }
    
    // Proceed to simulation
    hideAll();
    els.simulationSection.classList.remove('hidden');
    updateProgress(3);
    
    // Scroll to view
    els.simulationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Run simulation
    runSimulation(amount);
}

// === STEP 3: SIMULATION ===
function runSimulation(amount) {
    const logs = [
        '> Connecting to Monopoly GO servers...',
        '> Bypassing security protocols...',
        `> Username "${state.username}" found!`,
        `> Platform: ${state.platform.toUpperCase()}`,
        `> Location: ${state.userCountry} (IP: ${state.userIP})`,
        `> Injecting ${amount.toLocaleString()} dice...`,
        '> Processing resources... (32%)',
        '> Processing resources... (67%)',
        '> Processing resources... (94%)',
        '> Processing resources... (100%)',
        '> Finalizing injection...',
        '> ERROR: Manual Verification Required.'
    ];
    
    els.terminalLog.innerHTML = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < logs.length) {
            const p = document.createElement('p');
            p.textContent = logs[i];
            
            // Color coding
            if (logs[i].includes('ERROR')) {
                p.style.color = '#ff4444';
            } else if (logs[i].includes('found') || logs[i].includes('Location')) {
                p.style.color = '#00ddff';
            } else if (logs[i].includes('100%')) {
                p.style.color = '#00ff00';
            }
            
            els.terminalLog.appendChild(p);
            els.terminalLog.scrollTop = els.terminalLog.scrollHeight;
            i++;
        } else {
            clearInterval(interval);
            
            // Proceed to verification
            setTimeout(() => {
                hideAll();
                els.lockerSection.classList.remove('hidden');
                updateProgress(4);
                
                // Scroll to view
                els.lockerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1500);
        }
    }, 600);
}

// === STEP 4: VERIFICATION ===
function handleVerify() {
    // Check if locker loaded
    if (typeof og_load === 'undefined') {
        alert('⚠️ AdBlock Detected!\n\nPlease disable AdBlock to continue.');
        return;
    }
    
    // Disable button
    els.verifyBtn.disabled = true;
    els.verifyBtn.innerHTML = '<span>Loading Verification...</span>';
    
    // Trigger locker
    try {
        og_load();
    } catch (e) {
        alert('Verification system error. Please refresh the page.');
        els.verifyBtn.disabled = false;
        els.verifyBtn.innerHTML = '<span>Complete Verification</span><span class="btn-arrow">→</span>';
    }
}

// === LIVE CHAT SYSTEM ===
const chatData = {
    users: ['MonopolyKing', 'Sarah_22', 'DiceQueen', 'AlexGamer', 'ProPlayer', 'Lisa_M', 'Mike_R', 'GameMaster'],
    messages: [
        'Just got my dice!',
        'omg it actually worked!!',
        'Verification was super quick',
        'Is this legit?',
        'Yes! Got 5000 dice in 2 mins',
        'Works on iOS perfectly',
        'Android user here, works great',
        'Best generator I\'ve found',
        'How long does it take?',
        'Usually 1-2 minutes',
        'No ban risk?',
        'Been using for weeks, no issues'
    ]
};

function addChatMessage() {
    if (!els.chatBox) return;
    
    const user = chatData.users[Math.floor(Math.random() * chatData.users.length)];
    const msg = chatData.messages[Math.floor(Math.random() * chatData.messages.length)];
    const avatar = user.substring(0, 2).toUpperCase();
    
    const div = document.createElement('div');
    div.className = 'msg-enhanced';
    div.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-content">
            <div class="msg-header">
                <strong>${user}</strong>
                <span class="msg-time">Just now</span>
            </div>
            <p>${msg}</p>
        </div>
    `;
    
    els.chatBox.appendChild(div);
    
    // Keep max 15 messages
    if (els.chatBox.children.length > 15) {
        els.chatBox.removeChild(els.chatBox.firstChild);
    }
    
    els.chatBox.scrollTop = els.chatBox.scrollHeight;
}

// === 🔥 NEW: ACTIVITY FEED ===
const activities = [
    { user: 'Sarah M.', loc: 'USA', action: 'claimed 5,000 dice' },
    { user: 'Mike R.', loc: 'Canada', action: 'claimed 9,999 dice' },
    { user: 'Alex K.', loc: 'UK', action: 'claimed 1,500 dice' },
    { user: 'Lisa P.', loc: 'Australia', action: 'completed verification' },
    { user: 'John D.', loc: 'Germany', action: 'claimed 5,000 dice' },
    { user: 'Emma S.', loc: 'France', action: 'claimed 9,999 dice' }
];

function showActivity() {
    if (!els.activityFeed) return;
    
    const activity = activities[Math.floor(Math.random() * activities.length)];
    
    const notification = document.createElement('div');
    notification.className = 'activity-notification';
    notification.innerHTML = `
        <div class="activity-icon">🎲</div>
        <div class="activity-text">
            <strong>${activity.user}</strong> from ${activity.loc}<br>
            ${activity.action}
            <span class="activity-time">Just now</span>
        </div>
    `;
    
    els.activityFeed.appendChild(notification);
    
    // Show
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide & remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// === 🔥 UPDATE STATS ===
function updateStats() {
    // Today count
    if (els.todayCount) {
        const base = 47000;
        const rand = Math.floor(Math.random() * 500);
        els.todayCount.textContent = (base + rand).toLocaleString();
    }
    
    // Active count
    if (els.activeCount) {
        const base = 120;
        const rand = Math.floor(Math.random() * 40);
        els.activeCount.textContent = base + rand;
    }
    
    // Online count
    if (els.onlineCount) {
        const base = 400;
        const rand = Math.floor(Math.random() * 60);
        els.onlineCount.textContent = `${base + rand} Online`;
    }
}

// === 🔥 EXIT INTENT MODAL ===
function showExitModal() {
    if (state.exitModalShown || state.selectedDice === 0) return;
    
    state.exitModalShown = true;
    
    if (els.exitModal) {
        els.exitModal.classList.add('show');
    }
}

function hideExitModal() {
    if (els.exitModal) {
        els.exitModal.classList.remove('show');
    }
}

// Detect exit intent
document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !state.exitModalShown && state.selectedDice > 0) {
        // Don't show if on locker section
        if (!els.lockerSection.classList.contains('hidden')) {
            return;
        }
        showExitModal();
    }
});

// === EVENT LISTENERS ===

// Connect button
if (els.connectBtn) {
    els.connectBtn.addEventListener('click', handleConnect);
}

// Dice selection cards
document.querySelectorAll('.dice-card-enhanced').forEach(card => {
    card.addEventListener('click', function() {
        const amount = parseInt(this.getAttribute('data-amount'));
        handleDiceSelection(amount);
    });
});

// Verify button
if (els.verifyBtn) {
    els.verifyBtn.addEventListener('click', handleVerify);
}

// Exit modal buttons
if (els.exitStayBtn) {
    els.exitStayBtn.addEventListener('click', () => {
        hideExitModal();
        if (!els.lockerSection.classList.contains('hidden')) {
            els.lockerSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (els.exitLeaveBtn) {
    els.exitLeaveBtn.addEventListener('click', hideExitModal);
}

// Close exit modal on backdrop
if (els.exitModal) {
    els.exitModal.addEventListener('click', (e) => {
        if (e.target === els.exitModal) {
            hideExitModal();
        }
    });
}

// Enter key on username
if (els.username) {
    els.username.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleConnect();
        }
    });
}

// === INITIALIZATION ===
window.addEventListener('load', function() {
    // Start timer
    startPersonalTimer();
    
    // Fetch geo
    fetchGeo();
    
    // Start chat
    setInterval(addChatMessage, 8000);
    
    // Start activity feed
    setInterval(showActivity, 20000); // Every 20s
    
    // Update stats
    updateStats();
    setInterval(updateStats, 45000); // Every 45s
    
    // Initial chat messages
    setTimeout(addChatMessage, 2000);
    setTimeout(addChatMessage, 5000);
});

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    // Silent in production
});

// === PREVENT ACCIDENTAL REFRESH ===
window.addEventListener('beforeunload', function(e) {
    if (state.selectedDice > 0 && !els.inputSection.classList.contains('hidden')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// === FLASH ANIMATION ===
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);
/* ============================================
   JAVASCRIPT PATCHES - ADD MISSING FEATURES
   ============================================ */

// === ADD CHAT CLOSE/MINIMIZE FUNCTIONALITY ===
window.addEventListener('load', function() {
    const chatWidget = document.querySelector('.chat-widget-enhanced');
    const chatHeader = document.querySelector('.chat-header-enhanced');
    
    if (chatWidget && chatHeader) {
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'chat-close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.title = 'Close chat';
        
        // Create minimize button
        const minimizeBtn = document.createElement('button');
        minimizeBtn.className = 'chat-minimize-btn';
        minimizeBtn.innerHTML = '−';
        minimizeBtn.title = 'Minimize chat';
        
        // Add buttons to header
        chatHeader.appendChild(minimizeBtn);
        chatHeader.appendChild(closeBtn);
        
        // Close button functionality
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            chatWidget.style.display = 'none';
        });
        
        // Minimize button functionality
        minimizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            chatWidget.classList.toggle('minimized');
            if (chatWidget.classList.contains('minimized')) {
                minimizeBtn.innerHTML = '+';
                minimizeBtn.title = 'Expand chat';
            } else {
                minimizeBtn.innerHTML = '−';
                minimizeBtn.title = 'Minimize chat';
            }
        });
        
        // Double-click header to toggle minimize
        chatHeader.addEventListener('dblclick', function() {
            minimizeBtn.click();
        });
    }
});

// === ANIMATE POPULARITY BARS ON LOAD ===
window.addEventListener('load', function() {
    setTimeout(function() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(function(bar) {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(function() {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
});

// === ADD DICE CARD CLICK ANIMATION ===
document.addEventListener('DOMContentLoaded', function() {
    const diceCards = document.querySelectorAll('.dice-card-enhanced');
    diceCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});
