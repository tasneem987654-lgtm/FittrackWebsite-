// ============================================
// FitTrack - ملف JavaScript الرئيسي (نسخة Live Server)
// ============================================

// بيانات التمارين
const mockWorkouts = [
    {
        id: 1,
        name: 'تمارين الضغط',
        nameEn: 'Push-ups',
        type: 'قوة',
        typeEn: 'Strength',
        duration: '15 دقيقة',
        calories: 150,
        difficulty: 'easy',
        description: 'تمرين ممتاز لتقوية عضلات الصدر والذراعين والكتفين'
    },
    {
        id: 2,
        name: 'القفز بالحبل',
        nameEn: 'Jump Rope',
        type: 'كارديو',
        typeEn: 'Cardio',
        duration: '10 دقائق',
        calories: 200,
        difficulty: 'medium',
        description: 'تمرين رائع لحرق السعرات وتحسين اللياقة القلبية والتنفسية'
    },
    {
        id: 3,
        name: 'تمارين البطن',
        nameEn: 'Crunches',
        type: 'قوة',
        typeEn: 'Strength',
        duration: '12 دقيقة',
        calories: 120,
        difficulty: 'easy',
        description: 'لتقوية عضلات البطن وتحسين المظهر العام'
    },
    {
        id: 4,
        name: 'الجري في المكان',
        nameEn: 'Running in Place',
        type: 'كارديو',
        typeEn: 'Cardio',
        duration: '20 دقيقة',
        calories: 250,
        difficulty: 'medium',
        description: 'تمرين كارديو ممتاز لتحسين اللياقة العامة وحرق الدهون'
    },
    {
        id: 5,
        name: 'تمارين السكوات',
        nameEn: 'Squats',
        type: 'قوة',
        typeEn: 'Strength',
        duration: '15 دقيقة',
        calories: 180,
        difficulty: 'medium',
        description: 'تمرين فعال لتقوية عضلات الأرجل والأرداف'
    },
    {
        id: 6,
        name: 'تمارين اليوجا',
        nameEn: 'Yoga',
        type: 'مرونة',
        typeEn: 'Flexibility',
        duration: '25 دقيقة',
        calories: 130,
        difficulty: 'easy',
        description: 'تحسين المرونة والاسترخاء وتقليل التوتر'
    }
];

// بيانات الأهداف الافتراضية
const defaultGoals = [
    {
        id: 1,
        goalName: 'فقدان الوزن',
        activityType: 'كارديو',
        duration: 30,
        targetCalories: 500,
        targetWeight: 70,
        notes: 'ممارسة الكارديو 5 أيام في الأسبوع',
        status: 'قيد التنفيذ'
    },
    {
        id: 2,
        goalName: 'بناء العضلات',
        activityType: 'قوة',
        duration: 60,
        targetCalories: 300,
        targetWeight: 75,
        notes: 'تمارين المقاومة 4 أيام في الأسبوع',
        status: 'مكتمل'
    }
];

// بيانات المستخدمين الافتراضية
const defaultUsers = [
    {
        id: 1,
        fullName: 'Admin User',
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123456',
        createdAt: new Date().toISOString()
    }
];

// ============================================
// دوال مساعدة
// ============================================

function getUsers() {
    const stored = localStorage.getItem('fitTrackUsers');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('fitTrackUsers', JSON.stringify(defaultUsers));
    return defaultUsers;
}

function saveUsers(users) {
    localStorage.setItem('fitTrackUsers', JSON.stringify(users));
}

function getGoals() {
    const stored = localStorage.getItem('fitTrackGoals');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('fitTrackGoals', JSON.stringify(defaultGoals));
    return defaultGoals;
}

function saveGoals(goals) {
    localStorage.setItem('fitTrackGoals', JSON.stringify(goals));
}

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function checkAuth() {
    const currentUser = localStorage.getItem('fitTrackUser');
    const currentPage = window.location.pathname;
    
    if (!currentUser && !currentPage.includes('login.html') && !currentPage.includes('register.html')) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (currentUser && (currentPage.includes('login.html') || currentPage.includes('register.html'))) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function logoutUser() {
    localStorage.removeItem('fitTrackUser');
    window.location.href = 'login.html';
}

function initLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                logoutUser();
            }
        });
    }
}

function initNavToggle() {
    const toggleBtn = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ============================================
// 1. صفحة تسجيل الدخول
// ============================================

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    checkAuth();
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = '✅ تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن';
            errorMessage.style.color = '#28a745';
        }
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('errorMessage');
        
        if (!email || !password) {
            errorMessage.textContent = '❌ الرجاء ملء جميع الحقول';
            errorMessage.style.color = '#dc3545';
            return;
        }
        
        const users = getUsers();
        const foundUser = users.find(user => 
            user.email.toLowerCase() === email.toLowerCase() && 
            user.password === password
        );
        
        if (foundUser) {
            localStorage.setItem('fitTrackUser', JSON.stringify({
                id: foundUser.id,
                username: foundUser.username,
                fullName: foundUser.fullName,
                email: foundUser.email,
                loginTime: new Date().toISOString()
            }));
            
            errorMessage.textContent = '✅ تم تسجيل الدخول بنجاح! جاري التحويل...';
            errorMessage.style.color = '#28a745';
            
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            errorMessage.textContent = '❌ البريد الإلكتروني أو كلمة المرور غير صحيحة';
            errorMessage.style.color = '#dc3545';
            document.getElementById('password').value = '';
        }
    });
}

// ============================================
// 2. الصفحة الرئيسية
// ============================================

function initHomePage() {
    if (!checkAuth()) return;
    
    displayQuickWorkouts();
    updateStats();
    initLogoutButton();
    initNavToggle();
}

function displayQuickWorkouts() {
    const container = document.getElementById('quickWorkouts');
    if (!container) return;
    
    const workoutsToShow = mockWorkouts.slice(0, 3);
    
    container.innerHTML = workoutsToShow.map(workout => `
        <div class="quick-workout-card">
            <h4>${workout.name} (${workout.nameEn})</h4>
            <p>🏷️ ${workout.type} | ${workout.typeEn}</p>
            <p>⏱️ ${workout.duration}</p>
            <p>🔥 ${workout.calories} سعرة حرارية</p>
            <span class="workout-difficulty difficulty-${workout.difficulty}">
                ${workout.difficulty === 'easy' ? 'سهل' : 
                  workout.difficulty === 'medium' ? 'متوسط' : 'صعب'}
            </span>
        </div>
    `).join('');
}

function updateStats() {
    const workoutCount = document.getElementById('workoutCount');
    if (workoutCount) workoutCount.textContent = mockWorkouts.length;
    
    const userCount = document.getElementById('userCount');
    if (userCount) {
        const users = getUsers();
        userCount.textContent = users.length;
    }
    
    const goalCount = document.getElementById('goalCount');
    if (goalCount) {
        const goals = getGoals();
        goalCount.textContent = goals.length;
    }
    
    const caloriesCount = document.getElementById('caloriesCount');
    if (caloriesCount) {
        const totalCalories = mockWorkouts.reduce((sum, w) => sum + w.calories, 0);
        caloriesCount.textContent = totalCalories.toLocaleString();
    }
}

// ============================================
// 3. صفحة التمارين
// ============================================

function initWorkoutsPage() {
    if (!checkAuth()) return;
    displayAllWorkouts();
    initLogoutButton();
    initNavToggle();
}

function displayAllWorkouts() {
    const container = document.getElementById('workoutsGrid');
    if (!container) return;
    
    container.innerHTML = mockWorkouts.map(workout => `
        <div class="workout-card">
            <h3>${workout.name} (${workout.nameEn})</h3>
            <div class="workout-meta">
                <span>🏷️ ${workout.type} | ${workout.typeEn}</span>
                <span>⏱️ ${workout.duration}</span>
                <span>🔥 ${workout.calories} سعرة</span>
                <span class="workout-difficulty difficulty-${workout.difficulty}">
                    ${workout.difficulty === 'easy' ? 'سهل' : 
                      workout.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                </span>
            </div>
            <p class="workout-description">${workout.description}</p>
            <button class="btn btn-primary" onclick="viewWorkoutDetails(${workout.id})">
                📋 عرض التفاصيل
            </button>
        </div>
    `).join('');
}

function viewWorkoutDetails(id) {
    const workout = mockWorkouts.find(w => w.id === id);
    if (workout) {
        alert(`📋 تفاصيل التمرين\n\n` +
              `اسم التمرين: ${workout.name} (${workout.nameEn})\n` +
              `النوع: ${workout.type} | ${workout.typeEn}\n` +
              `المدة: ${workout.duration}\n` +
              `السعرات المحروقة: ${workout.calories} سعرة\n` +
              `المستوى: ${workout.difficulty === 'easy' ? 'سهل' : workout.difficulty === 'medium' ? 'متوسط' : 'صعب'}\n` +
              `الوصف: ${workout.description}`);
    }
}

// ============================================
// 4. صفحة إضافة الهدف
// ============================================

function initAddGoalPage() {
    if (!checkAuth()) return;
    
    const goalForm = document.getElementById('goalForm');
    if (!goalForm) return;
    
    initLogoutButton();
    initNavToggle();
    
    goalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewGoal();
    });
}

function addNewGoal() {
    const goalName = document.getElementById('goalName').value.trim();
    const activityType = document.getElementById('activityType').value;
    const duration = parseInt(document.getElementById('duration').value);
    const targetCalories = parseInt(document.getElementById('targetCalories').value);
    const targetWeight = parseFloat(document.getElementById('targetWeight').value);
    const status = document.getElementById('goalStatus').value;
    const notes = document.getElementById('notes').value.trim();
    
    const messageDiv = document.getElementById('formMessage');
    
    if (!goalName || !activityType || !duration || !targetCalories || !targetWeight) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '❌ الرجاء ملء جميع الحقول المطلوبة';
        return;
    }
    
    const newGoal = {
        id: generateId(),
        goalName: goalName,
        activityType: activityType,
        duration: duration,
        targetCalories: targetCalories,
        targetWeight: targetWeight,
        notes: notes || 'لا توجد ملاحظات',
        status: status
    };
    
    const goals = getGoals();
    goals.push(newGoal);
    saveGoals(goals);
    
    messageDiv.className = 'form-message success';
    messageDiv.textContent = '✅ تم إضافة الهدف بنجاح!';
    document.getElementById('goalForm').reset();
    
    setTimeout(() => {
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';
    }, 3000);
}

// ============================================
// 5. صفحة إدارة الأهداف
// ============================================

function initManagePage() {
    if (!checkAuth()) return;
    renderGoalsTable();
    initLogoutButton();
    initNavToggle();
    initSearch();
}

function renderGoalsTable() {
    const tbody = document.getElementById('goalsTableBody');
    const noMessage = document.getElementById('noGoalsMessage');
    if (!tbody) return;
    
    const goals = getGoals();
    
    if (goals.length === 0) {
        tbody.innerHTML = '';
        if (noMessage) noMessage.style.display = 'block';
        return;
    }
    
    if (noMessage) noMessage.style.display = 'none';
    
    tbody.innerHTML = goals.map((goal, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${goal.goalName}</strong></td>
            <td>${goal.activityType}</td>
            <td>${goal.duration} يوم</td>
            <td>${goal.targetCalories}</td>
            <td>${goal.targetWeight} كجم</td>
            <td>
                <span class="status-badge status-${goal.status === 'قيد التنفيذ' ? 'in-progress' : 
                                                   goal.status === 'مكتمل' ? 'completed' : 'pending'}">
                    ${goal.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning" onclick="editGoal(${goal.id})">✏️ تعديل</button>
                    <button class="btn btn-danger" onclick="deleteGoal(${goal.id})">🗑️ حذف</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteGoal(id) {
    if (!confirm('هل أنت متأكد من حذف هذا الهدف؟')) return;
    
    let goals = getGoals();
    goals = goals.filter(goal => goal.id !== id);
    saveGoals(goals);
    renderGoalsTable();
}

function editGoal(id) {
    window.location.href = `add-goal.html?edit=${id}`;
    const goals = getGoals();
    const goal = goals.find(g => g.id === id);
    if (goal) {
        localStorage.setItem('editGoalData', JSON.stringify(goal));
    }
}

function initEditMode() {
    const editData = localStorage.getItem('editGoalData');
    if (!editData) return;
    
    const goal = JSON.parse(editData);
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId && document.getElementById('goalForm')) {
        document.getElementById('goalName').value = goal.goalName;
        document.getElementById('activityType').value = goal.activityType;
        document.getElementById('duration').value = goal.duration;
        document.getElementById('targetCalories').value = goal.targetCalories;
        document.getElementById('targetWeight').value = goal.targetWeight;
        document.getElementById('goalStatus').value = goal.status;
        document.getElementById('notes').value = goal.notes;
        
        const submitBtn = document.querySelector('#goalForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '💾 تحديث الهدف';
        }
        
        const goalForm = document.getElementById('goalForm');
        goalForm.removeEventListener('submit', addNewGoal);
        goalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateGoal(parseInt(editId));
        });
        
        localStorage.removeItem('editGoalData');
    }
}

function updateGoal(id) {
    const goals = getGoals();
    const goalIndex = goals.findIndex(g => g.id === id);
    if (goalIndex === -1) return;
    
    const goalName = document.getElementById('goalName').value.trim();
    const activityType = document.getElementById('activityType').value;
    const duration = parseInt(document.getElementById('duration').value);
    const targetCalories = parseInt(document.getElementById('targetCalories').value);
    const targetWeight = parseFloat(document.getElementById('targetWeight').value);
    const status = document.getElementById('goalStatus').value;
    const notes = document.getElementById('notes').value.trim();
    
    const messageDiv = document.getElementById('formMessage');
    
    if (!goalName || !activityType || !duration || !targetCalories || !targetWeight) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '❌ الرجاء ملء جميع الحقول المطلوبة';
        return;
    }
    
    goals[goalIndex] = {
        ...goals[goalIndex],
        goalName: goalName,
        activityType: activityType,
        duration: duration,
        targetCalories: targetCalories,
        targetWeight: targetWeight,
        notes: notes || 'لا توجد ملاحظات',
        status: status
    };
    
    saveGoals(goals);
    messageDiv.className = 'form-message success';
    messageDiv.textContent = '✅ تم تحديث الهدف بنجاح!';
    
    setTimeout(() => {
        window.location.href = 'manage.html';
    }, 1500);
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const goals = getGoals();
        
        if (!searchTerm) {
            renderGoalsTable();
            return;
        }
        
        const filtered = goals.filter(goal => 
            goal.goalName.toLowerCase().includes(searchTerm) ||
            goal.activityType.toLowerCase().includes(searchTerm) ||
            goal.status.toLowerCase().includes(searchTerm)
        );
        
        const tbody = document.getElementById('goalsTableBody');
        if (!tbody) return;
        
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">❌ لا توجد نتائج</td></tr>';
            return;
        }
        
        tbody.innerHTML = filtered.map((goal, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${goal.goalName}</strong></td>
                <td>${goal.activityType}</td>
                <td>${goal.duration} يوم</td>
                <td>${goal.targetCalories}</td>
                <td>${goal.targetWeight} كجم</td>
                <td>
                    <span class="status-badge status-${goal.status === 'قيد التنفيذ' ? 'in-progress' : 
                                                       goal.status === 'مكتمل' ? 'completed' : 'pending'}">
                        ${goal.status}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-warning" onclick="editGoal(${goal.id})">✏️ تعديل</button>
                        <button class="btn btn-danger" onclick="deleteGoal(${goal.id})">🗑️ حذف</button>
                    </div>
                </td>
            </tr>
        `).join('');
    });
}

// ============================================
// 6. صفحة التواصل
// ============================================

function initContactPage() {
    if (!checkAuth()) return;
    initLogoutButton();
    initNavToggle();
    
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // ✅ جلب بيانات المستخدم وعرضها في الفورم
    const user = localStorage.getItem('fitTrackUser');
    if (user) {
        const userData = JSON.parse(user);
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        
        if (nameInput && userData.fullName) {
            nameInput.value = userData.fullName;
            nameInput.readOnly = true;
        }
        
        if (emailInput && userData.email) {
            emailInput.value = userData.email;
            emailInput.readOnly = true;
        }
    }
    
    // ✅ عرض رسالة الترحيب
    const welcomeText = document.getElementById('welcomeText');
    const userInfo = document.getElementById('userInfo');
    if (user) {
        const userData = JSON.parse(user);
        if (welcomeText) {
            welcomeText.innerHTML = `👋 مرحباً بك، ${userData.fullName || 'صديقنا'}`;
        }
        if (userInfo) {
            userInfo.innerHTML = `📧 ${userData.email || ''} | نرحب بكم في صفحة التواصل مع فريق FitTrack`;
        }
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const alertDiv = document.getElementById('contactMessageAlert');
        
        if (!name || !email || !phone || !message) {
            alertDiv.className = 'form-message error';
            alertDiv.textContent = '❌ الرجاء ملء جميع الحقول';
            return;
        }
        
        // ✅ حفظ الرسالة في Local Storage
        const messages = JSON.parse(localStorage.getItem('fitTrackMessages') || '[]');
        messages.push({
            id: generateId(),
            name: name,
            email: email,
            phone: phone,
            message: message,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('fitTrackMessages', JSON.stringify(messages));
        
        alertDiv.className = 'form-message success';
        alertDiv.textContent = '✅ تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا';
        
        document.getElementById('contactPhone').value = '';
        document.getElementById('contactMessage').value = '';
        
        setTimeout(() => {
            alertDiv.className = 'form-message';
            alertDiv.textContent = '';
        }, 3000);
    });
}

// ============================================
// 7. صفحة إنشاء حساب
// ============================================

function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    const currentUser = localStorage.getItem('fitTrackUser');
    if (currentUser) {
        window.location.href = 'index.html';
        return;
    }

    initTermsModal();

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });

    registerForm.addEventListener('reset', function() {
        document.getElementById('registerError').textContent = '';
    });
}

function handleRegister() {
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const errorDiv = document.getElementById('registerError');

    if (!fullName || !username || !email || !password || !confirmPassword) {
        errorDiv.textContent = '❌ الرجاء ملء جميع الحقول';
        errorDiv.style.color = '#dc3545';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorDiv.textContent = '❌ البريد الإلكتروني غير صحيح';
        errorDiv.style.color = '#dc3545';
        return;
    }

    if (username.includes(' ')) {
        errorDiv.textContent = '❌ اسم المستخدم لا يجب أن يحتوي على مسافات';
        errorDiv.style.color = '#dc3545';
        return;
    }

    if (password.length < 6) {
        errorDiv.textContent = '❌ كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
        errorDiv.style.color = '#dc3545';
        return;
    }

    if (password !== confirmPassword) {
        errorDiv.textContent = '❌ كلمة المرور غير متطابقة';
        errorDiv.style.color = '#dc3545';
        return;
    }

    if (!agreeTerms) {
        errorDiv.textContent = '❌ يجب الموافقة على الشروط والأحكام';
        errorDiv.style.color = '#dc3545';
        return;
    }

    const users = getUsers();
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        errorDiv.textContent = '❌ اسم المستخدم موجود بالفعل';
        errorDiv.style.color = '#dc3545';
        return;
    }

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        errorDiv.textContent = '❌ البريد الإلكتروني موجود بالفعل';
        errorDiv.style.color = '#dc3545';
        return;
    }

    const newUser = {
        id: generateId(),
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    errorDiv.textContent = '✅ تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول...';
    errorDiv.style.color = '#28a745';

    setTimeout(function() {
        window.location.href = 'login.html?registered=true';
    }, 2000);
}

// ============================================
// نافذة الشروط والأحكام
// ============================================

function initTermsModal() {
    const modal = document.getElementById('termsModal');
    const termsLink = document.getElementById('termsLink');
    const termsLinkEn = document.getElementById('termsLinkEn');
    const closeBtn = document.querySelector('.modal-close');
    const agreeBtn = document.getElementById('agreeBtn');
    const checkbox = document.getElementById('agreeTerms');

    function openModal(e) {
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (termsLink) termsLink.addEventListener('click', openModal);
    if (termsLinkEn) termsLinkEn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            if (checkbox) checkbox.checked = true;
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// تهيئة الصفحات
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('login.html')) {
        initLoginPage();
    } else if (currentPage.includes('register.html')) {
        initRegisterPage();
    } else if (currentPage.includes('index.html') || 
               currentPage.endsWith('/') || 
               currentPage === '' || 
               currentPage === '/') {
        initHomePage();
    } else if (currentPage.includes('workouts.html')) {
        initWorkoutsPage();
    } else if (currentPage.includes('add-goal.html')) {
        initAddGoalPage();
        setTimeout(initEditMode, 100);
    } else if (currentPage.includes('manage.html')) {
        initManagePage();
    } else if (currentPage.includes('contact.html')) {
        initContactPage();
    }
});

// دوال عامة
window.viewWorkoutDetails = viewWorkoutDetails;
window.deleteGoal = deleteGoal;
window.editGoal = editGoal;
window.logoutUser = logoutUser;
