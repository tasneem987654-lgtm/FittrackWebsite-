
// ============================================
// FitTrack - ملف JavaScript الرئيسي
// جميع الصفحات
// ============================================

// ============================================
// البيانات الوهمية (Mock Data)
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
        description: 'لتقوية عضلات البطن وتحسين المظهر العام وتحسين الاستقامة'
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
        description: 'تمرين فعال لتقوية عضلات الأرجل والأرداف وتحسين التوازن'
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
        description: 'تحسين المرونة والاسترخاء وتقليل التوتر والقلق'
    }
];

// بيانات الأهداف الوهمية للتهيئة الأولية
const defaultGoals = [
    {
        id: 1,
        goalName: 'فقدان الوزن',
        activityType: 'كارديو',
        duration: 30,
        targetCalories: 500,
        targetWeight: 70,
        notes: 'ممارسة الكارديو 5 أيام في الأسبوع مع نظام غذائي صحي',
        status: 'قيد التنفيذ'
    },
    {
        id: 2,
        goalName: 'بناء العضلات',
        activityType: 'قوة',
        duration: 60,
        targetCalories: 300,
        targetWeight: 75,
        notes: 'تمارين المقاومة 4 أيام في الأسبوع مع بروتين إضافي',
        status: 'مكتمل'
    }
];

// ============================================
// دوال مساعدة (Helper Functions)
// ============================================

/**
 * دالة التحقق من حالة تسجيل الدخول
 */
function checkAuth() {
    const currentUser = localStorage.getItem('fitTrackUser');
    const currentPage = window.location.pathname;
    
    // إذا كان المستخدم غير مسجل ويحاول الوصول لصفحة غير login
    if (!currentUser && !currentPage.includes('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    
    // إذا كان المستخدم مسجل ويحاول الوصول لصفحة login
    if (currentUser && currentPage.includes('login.html')) {
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

/**
 * دالة تسجيل الخروج
 */
function logoutUser() {
    localStorage.removeItem('fitTrackUser');
    window.location.href = 'login.html';
}

/**
 * دالة تهيئة زر تسجيل الخروج
 */
function initLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟ | Are you sure you want to logout?')) {
                logoutUser();
            }
        });
    }
}

/**
 * دالة تهيئة قائمة التنقل للشاشات الصغيرة
 */
function initNavToggle() {
    const toggleBtn = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تغيير شكل الأيقونة
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

/**
 * دالة الحصول على الأهداف من Local Storage
 */
function getGoals() {
    const storedGoals = localStorage.getItem('fitTrackGoals');
    if (storedGoals) {
        return JSON.parse(storedGoals);
    } else {
        // تهيئة البيانات الافتراضية
        localStorage.setItem('fitTrackGoals', JSON.stringify(defaultGoals));
        return defaultGoals;
    }
}

/**
 * دالة حفظ الأهداف في Local Storage
 */
function saveGoals(goals) {
    localStorage.setItem('fitTrackGoals', JSON.stringify(goals));
}

/**
 * دالة إنشاء ID فريد
 */
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// ============================================
// 1. صفحة تسجيل الدخول - login.html
// ============================================

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    // التحقق من المصادقة
    checkAuth();
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('errorMessage');
        
        // التحقق من الحقول الفارغة
        if (!username || !password) {
            errorMessage.textContent = '❌ الرجاء ملء جميع الحقول | Please fill all fields';
            errorMessage.style.color = '#dc3545';
            return;
        }
        
        // بيانات تسجيل الدخول الوهمية
        const validUsername = 'admin';
        const validPassword = 'admin123';
        
        // التحقق من صحة البيانات
        if (username === validUsername && password === validPassword) {
            // حفظ بيانات المستخدم في Local Storage
            localStorage.setItem('fitTrackUser', JSON.stringify({
                username: username,
                loginTime: new Date().toISOString()
            }));
            
            errorMessage.textContent = '✅ تم تسجيل الدخول بنجاح! جاري التحويل...';
            errorMessage.style.color = '#28a745';
            
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            errorMessage.textContent = '❌ اسم المستخدم أو كلمة المرور غير صحيحة | Invalid credentials';
            errorMessage.style.color = '#dc3545';
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    });
    
    // إعادة تعيين رسالة الخطأ عند الضغط على Reset
    loginForm.addEventListener('reset', function() {
        document.getElementById('errorMessage').textContent = '';
    });
}

// ============================================
// 2. الصفحة الرئيسية - index.html
// ============================================

function initHomePage() {
    if (!checkAuth()) return;
    
    // عرض التمارين السريعة
    displayQuickWorkouts();
    
    // تحديث الإحصائيات
    updateStats();
    
    // تهيئة زر تسجيل الخروج
    initLogoutButton();
    
    // تهيئة قائمة التنقل
    initNavToggle();
}

/**
 * دالة عرض التمارين السريعة في الصفحة الرئيسية
 */
function displayQuickWorkouts() {
    const container = document.getElementById('quickWorkouts');
    if (!container) return;
    
    // عرض أول 3 تمارين فقط
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

/**
 * دالة تحديث الإحصائيات
 */
function updateStats() {
    const workoutCount = document.getElementById('workoutCount');
    if (workoutCount) {
        workoutCount.textContent = mockWorkouts.length;
    }
    
    const userCount = document.getElementById('userCount');
    if (userCount) {
        userCount.textContent = '1,247';
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
// 3. صفحة التمارين - workouts.html
// ============================================

function initWorkoutsPage() {
    if (!checkAuth()) return;
    
    displayAllWorkouts();
    initLogoutButton();
    initNavToggle();
}

/**
 * دالة عرض جميع التمارين
 */
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
                📋 عرض التفاصيل | View Details
            </button>
        </div>
    `).join('');
}

/**
 * دالة عرض تفاصيل التمرين
 */
function viewWorkoutDetails(id) {
    const workout = mockWorkouts.find(w => w.id === id);
    if (workout) {
        alert(`📋 تفاصيل التمرين | Workout Details\n\n` +
              `اسم التمرين: ${workout.name} (${workout.nameEn})\n` +
              `النوع: ${workout.type} | ${workout.typeEn}\n` +
              `المدة: ${workout.duration}\n` +
              `السعرات المحروقة: ${workout.calories} سعرة\n` +
              `المستوى: ${workout.difficulty === 'easy' ? 'سهل' : workout.difficulty === 'medium' ? 'متوسط' : 'صعب'}\n` +
              `الوصف: ${workout.description}`);
    }
}

// ============================================
// 4. صفحة إضافة الهدف - add-goal.html
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

/**
 * دالة إضافة هدف جديد
 */
function addNewGoal() {
    // الحصول على القيم من النموذج
    const goalName = document.getElementById('goalName').value.trim();
    const activityType = document.getElementById('activityType').value;
    const duration = parseInt(document.getElementById('duration').value);
    const targetCalories = parseInt(document.getElementById('targetCalories').value);
    const targetWeight = parseFloat(document.getElementById('targetWeight').value);
    const status = document.getElementById('goalStatus').value;
    const notes = document.getElementById('notes').value.trim();
    
    const messageDiv = document.getElementById('formMessage');
    
    // التحقق من صحة الحقول
    if (!goalName || !activityType || !duration || !targetCalories || !targetWeight) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '❌ الرجاء ملء جميع الحقول المطلوبة | Please fill all required fields';
        return;
    }
    
    if (duration <= 0 || targetCalories <= 0 || targetWeight <= 0) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '❌ الرجاء إدخال قيم صحيحة (أكبر من صفر) | Please enter valid values (greater than zero)';
        return;
    }
    
    // إنشاء كائن الهدف الجديد
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
    
    // حفظ الهدف في Local Storage
    const goals = getGoals();
    goals.push(newGoal);
    saveGoals(goals);
    
    // عرض رسالة نجاح
    messageDiv.className = 'form-message success';
    messageDiv.textContent = '✅ تم إضافة الهدف بنجاح! | Goal added successfully!';
    
    // إعادة تعيين النموذج
    document.getElementById('goalForm').reset();
    
    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';
    }, 3000);
}

// ============================================
// 5. صفحة إدارة الأهداف - manage.html
// ============================================

let currentEditId = null;

function initManagePage() {
    if (!checkAuth()) return;
    
    renderGoalsTable();
    initLogoutButton();
    initNavToggle();
    initSearch();
}

/**
 * دالة عرض الأهداف في الجدول
 */
function renderGoalsTable(filteredGoals = null) {
    const tbody = document.getElementById('goalsTableBody');
    const noMessage = document.getElementById('noGoalsMessage');
    
    if (!tbody) return;
    
    const goals = filteredGoals || getGoals();
    
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

/**
 * دالة حذف هدف
 */
function deleteGoal(id) {
    if (!confirm('هل أنت متأكد من حذف هذا الهدف؟ | Are you sure you want to delete this goal?')) {
        return;
    }
    
    let goals = getGoals();
    goals = goals.filter(goal => goal.id !== id);
    saveGoals(goals);
    renderGoalsTable();
    
    // عرض رسالة نجاح
    showTemporaryMessage('✅ تم حذف الهدف بنجاح | Goal deleted successfully');
}

/**
 * دالة تعديل هدف (تحويل الصف إلى نموذج تعديل)
 */
function editGoal(id) {
    const goals = getGoals();
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    
    currentEditId = id;
    
    // ملء النموذج في صفحة الإضافة
    window.location.href = `add-goal.html?edit=${id}`;
    
    // تخزين الهدف للتعديل
    localStorage.setItem('editGoalData', JSON.stringify(goal));
}

/**
 * دالة تهيئة صفحة الإضافة مع وضع التعديل
 */
function initEditMode() {
    const editData = localStorage.getItem('editGoalData');
    if (!editData) return;
    
    const goal = JSON.parse(editData);
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId && document.getElementById('goalForm')) {
        // ملء الحقول بالبيانات
        document.getElementById('goalName').value = goal.goalName;
        document.getElementById('activityType').value = goal.activityType;
        document.getElementById('duration').value = goal.duration;
        document.getElementById('targetCalories').value = goal.targetCalories;
        document.getElementById('targetWeight').value = goal.targetWeight;
        document.getElementById('goalStatus').value = goal.status;
        document.getElementById('notes').value = goal.notes;
        
        // تغيير زر الإرسال
        const submitBtn = document.querySelector('#goalForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '💾 تحديث الهدف | Update Goal';
        }
        
        // تعديل حدث الإرسال
        const goalForm = document.getElementById('goalForm');
        goalForm.removeEventListener('submit', addNewGoal);
        goalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateGoal(parseInt(editId));
        });
        
        // مسح بيانات التعديل المؤقتة
        localStorage.removeItem('editGoalData');
    }
}

/**
 * دالة تحديث هدف
 */
function updateGoal(id) {
    const goals = getGoals();
    const goalIndex = goals.findIndex(g => g.id === id);
    
    if (goalIndex === -1) return;
    
    // الحصول على القيم الجديدة
    const goalName = document.getElementById('goalName').value.trim();
    const activityType = document.getElementById('activityType').value;
    const duration = parseInt(document.getElementById('duration').value);
    const targetCalories = parseInt(document.getElementById('targetCalories').value);
    const targetWeight = parseFloat(document.getElementById('targetWeight').value);
    const status = document.getElementById('goalStatus').value;
    const notes = document.getElementById('notes').value.trim();
    
    const messageDiv = document.getElementById('formMessage');
    
    // التحقق من صحة الحقول
    if (!goalName || !activityType || !duration || !targetCalories || !targetWeight) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '❌ الرجاء ملء جميع الحقول المطلوبة | Please fill all required fields';
        return;
    }
    
    // تحديث الهدف
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
    
    // عرض رسالة نجاح
    messageDiv.className = 'form-message success';
    messageDiv.textContent = '✅ تم تحديث الهدف بنجاح! | Goal updated successfully!';
    
    // إعادة تعيين النموذج والعودة للإدارة
    setTimeout(() => {
        window.location.href = 'manage.html';
    }, 1500);
}

/**
 * دالة عرض رسالة مؤقتة
 */
function showTemporaryMessage(message) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.className = 'form-message success';
        messageDiv.textContent = message;
        setTimeout(() => {
            messageDiv.className = 'form-message';
            messageDiv.textContent = '';
        }, 3000);
    } else {
        alert(message);
    }
}

/**
 * دالة البحث في الأهداف
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (!searchTerm) {
            renderGoalsTable();
            return;
        }
        
        const goals = getGoals();
        const filtered = goals.filter(goal => 
            goal.goalName.toLowerCase().includes(searchTerm) ||
            goal.activityType.toLowerCase().includes(searchTerm) ||
            goal.status.toLowerCase().includes(searchTerm)
        );
        
        renderGoalsTable(filtered);
    });
}

// ============================================
// 6. صفحة التواصل - contact.html
// ============================================

function initContactPage() {
    if (!checkAuth()) return;
    
    initLogoutButton();
    initNavToggle();
    
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const alertDiv = document.getElementById('contactMessageAlert');
        
        // التحقق من الحقول
        if (!name || !email || !phone || !message) {
            alertDiv.className = 'form-message error';
            alertDiv.textContent = '❌ الرجاء ملء جميع الحقول | Please fill all fields';
            return;
        }
        
        // عرض رسالة نجاح
        alertDiv.className = 'form-message success';
        alertDiv.textContent = '✅ تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا | Message sent successfully!';
        
        // إعادة تعيين النموذج
        this.reset();
        
        // إخفاء الرسالة بعد 3 ثواني
        setTimeout(() => {
            alertDiv.className = 'form-message';
            alertDiv.textContent = '';
        }, 3000);
    });
}

// ============================================
// تهيئة الصفحات حسب اسم الملف
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    // تحديد الصفحة الحالية وتشغيل الدالة المناسبة
    if (currentPage.includes('login.html')) {
        initLoginPage();
    } else if (currentPage.includes('index.html') || 
               currentPage.endsWith('/') || 
               currentPage === '' || 
               currentPage === '/') {
        initHomePage();
    } else if (currentPage.includes('workouts.html')) {
        initWorkoutsPage();
    } else if (currentPage.includes('add-goal.html')) {
        initAddGoalPage();
        // التحقق من وجود وضع التعديل
        setTimeout(initEditMode, 100);
    } else if (currentPage.includes('manage.html')) {
        initManagePage();
    } else if (currentPage.includes('contact.html')) {
        initContactPage();
    }
});

// ============================================
// دوال عامة للاستخدام في HTML (onclick)
// ============================================

// جعل الدوال عامة للاستخدام في onclick
window.viewWorkoutDetails = viewWorkoutDetails;
window.deleteGoal = deleteGoal;
window.editGoal = editGoal;
window.logoutUser = logoutUser;
