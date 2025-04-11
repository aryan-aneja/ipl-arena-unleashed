// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize UI components
  initializeThemeToggle();
  initializeNavbarToggle();
  initializeTabSystem();
  
  // Initialize demo data for the dashboard
  setupDemoData();
});

// Theme toggle functionality
function initializeThemeToggle() {
  const toggleThemeBtn = document.getElementById('toggle-theme');
  
  // Check for saved theme preference or respect OS preference
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  
  // Check if the toggle button exists before adding event listener
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', function() {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

// Mobile navbar toggle
function initializeNavbarToggle() {
  const burger = document.getElementById('navbar-burger');
  const menu = document.getElementById('navbar-menu');
  
  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('active');
      
      // Toggle burger animation
      const spans = burger.querySelectorAll('span');
      spans.forEach(function(span, index) {
        span.classList.toggle('active');
      });
    });
  }
}

// Tab system for dashboard
function initializeTabSystem() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(function(tab) {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabItems.forEach(function(item) {
        item.classList.remove('active');
      });
      
      // Add active class to current tab
      this.classList.add('active');
      
      // Hide all tab panes
      const tabPanes = document.querySelectorAll('.tab-pane');
      tabPanes.forEach(function(pane) {
        pane.classList.remove('active');
      });
      
      // Show selected tab pane
      const targetId = this.getAttribute('data-tab') + '-tab';
      document.getElementById(targetId).classList.add('active');
    });
  });
  
  // Initialize with the first tab active if it exists
  const firstTab = document.querySelector('.tab-item');
  if (firstTab) {
    firstTab.click();
  }
}

// Set up team details button event
document.addEventListener('DOMContentLoaded', function() {
  const teamDetailsBtn = document.getElementById('team-details-btn');
  if (teamDetailsBtn) {
    teamDetailsBtn.addEventListener('click', function() {
      // Switch to team tab when team details button is clicked
      const teamTab = document.querySelector('[data-tab="team"]');
      if (teamTab) {
        teamTab.click();
      }
    });
  }
});

// Toast notification system
const toast = {
  create: function(options) {
    const { type = 'info', title, message, duration = 5000 } = options;
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    
    // Create icon based on type
    let iconClass;
    switch(type) {
      case 'success':
        iconClass = 'fa-check-circle';
        break;
      case 'error':
        iconClass = 'fa-times-circle';
        break;
      case 'warning':
        iconClass = 'fa-exclamation-triangle';
        break;
      default:
        iconClass = 'fa-info-circle';
    }
    
    // Set toast content
    toastEl.innerHTML = `
      <div class="toast-icon">
        <i class="fas ${iconClass}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add to container
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toastEl);
      
      // Add close event
      const closeBtn = toastEl.querySelector('.toast-close');
      closeBtn.addEventListener('click', function() {
        closeToast(toastEl);
      });
      
      // Auto close after duration
      setTimeout(() => closeToast(toastEl), duration);
    }
    
    return toastEl;
  }
};

function closeToast(toastEl) {
  toastEl.style.animation = 'slideOut 0.3s ease-out forwards';
  setTimeout(() => {
    if (toastEl.parentNode) {
      toastEl.parentNode.removeChild(toastEl);
    }
  }, 300);
}

// Example data for the dashboard
function setupDemoData() {
  // Example bookings data for ticket tab
  const bookings = [
    {
      id: 'IPL-2025-0123',
      matchId: 1,
      teams: 'Mumbai Indians vs Chennai Super Kings',
      date: 'April 10, 2025',
      venue: 'Wankhede Stadium, Mumbai',
      seats: ['A1', 'A2', 'A3']
    },
    {
      id: 'IPL-2025-0124',
      matchId: 2,
      teams: 'Delhi Capitals vs Royal Challengers Bangalore',
      date: 'April 15, 2025',
      venue: 'Arun Jaitley Stadium, Delhi',
      seats: ['B5', 'B6']
    }
  ];
  
  // Example matches data for matches tab
  const matches = [
    {
      id: 1,
      homeTeam: 'MI',
      homeTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png',
      awayTeam: 'CSK',
      awayTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png',
      date: 'Wed, 10 Apr',
      time: '7:30 PM',
      venue: 'Wankhede Stadium, Mumbai',
      matchNumber: 1
    },
    {
      id: 2,
      homeTeam: 'RCB',
      homeTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png',
      awayTeam: 'KKR',
      awayTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png',
      date: 'Fri, 12 Apr',
      time: '7:30 PM',
      venue: 'M. Chinnaswamy Stadium, Bangalore',
      matchNumber: 2
    },
    {
      id: 3,
      homeTeam: 'DC',
      homeTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png',
      awayTeam: 'PBKS',
      awayTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png',
      date: 'Sun, 14 Apr',
      time: '3:30 PM',
      venue: 'Arun Jaitley Stadium, Delhi',
      matchNumber: 3
    }
  ];
}

// Book Tickets functionality
function bookTickets(matchId) {
  // Simulate booking action
  toast.create({
    type: 'info',
    title: 'Redirecting',
    message: 'Taking you to the ticket booking page...',
    duration: 3000
  });
  
  // In a real app, we would navigate to booking page
  setTimeout(() => {
    window.location.href = 'book-tickets.html?match=' + matchId;
  }, 1500);
}

// Add event listeners for "Book Tickets" buttons
document.addEventListener('DOMContentLoaded', function() {
  // Get all "Book Tickets" buttons
  const bookTicketButtons = document.querySelectorAll('.btn-blue');
  
  bookTicketButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      // Prevent default anchor behavior if it's a link
      event.preventDefault();
      
      // Find the closest match card to get the match ID
      const matchCard = button.closest('.card');
      if (matchCard) {
        const matchNumber = matchCard.querySelector('.text-xs').textContent.split(' ')[1];
        bookTickets(matchNumber);
      }
    });
  });

  // Update navbar based on login status
  updateNavbarAuthStatus();
  
  // Check if we're on the index page and user is logged in, show welcome message
  displayWelcomeMessage();
});

// Authentication related functions
function loginUser(email, password) {
  // In a real app, we would validate with a server
  // For demo, we'll use hardcoded values
  const validUsers = [
    { email: 'user@example.com', password: 'password123', name: 'Demo User' },
    { email: 'john@example.com', password: 'john123', name: 'John Smith' },
    { email: 'jane@example.com', password: 'jane123', name: 'Jane Doe' }
  ];
  
  const user = validUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store user info in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ 
      email: user.email,
      name: user.name
    }));
    
    return { success: true, user };
  }
  
  return { success: false, error: 'Invalid email or password' };
}

function signupUser(firstName, lastName, email, password) {
  // In a real app, we would send this data to a server
  // For demo, we'll just save to localStorage
  
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify({
    email: email,
    name: firstName + ' ' + lastName
  }));
  
  return { success: true };
}

function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  
  // Update navbar
  updateNavbarAuthStatus();
  
  // Redirect to home page
  window.location.href = 'index.html';
}

function updateNavbarAuthStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navbarEnd = document.querySelector('.navbar-end');
  
  if (navbarEnd) {
    if (isLoggedIn) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userName = userData.name || 'User';
        
        navbarEnd.innerHTML = `
          <a href="dashboard.html" class="btn btn-outline">Dashboard</a>
          <button id="logout-btn" class="btn btn-primary ml-4">Logout</button>
        `;
        
        // Add logout event listener
        document.getElementById('logout-btn').addEventListener('click', logoutUser);
      } catch (e) {
        console.error('Error parsing user data', e);
        // Reset to login/signup if there's an error
        resetNavbarToLoggedOut(navbarEnd);
      }
    } else {
      resetNavbarToLoggedOut(navbarEnd);
    }
  }
}

function resetNavbarToLoggedOut(navbarEnd) {
  navbarEnd.innerHTML = `
    <a href="login.html" class="btn btn-outline">Login</a>
    <a href="signup.html" class="btn btn-primary ml-4">Sign Up</a>
  `;
}

function displayWelcomeMessage() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const welcomeSection = document.getElementById('welcome-section');
  
  if (welcomeSection && isLoggedIn) {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userName = userData.name || 'Cricket Fan';
      
      const welcomeMessage = document.createElement('div');
      welcomeMessage.className = 'welcome-message';
      welcomeMessage.innerHTML = `
        <div class="container mx-auto px-4 py-4">
          <div class="bg-gradient-to-r from-ipl-blue to-ipl-orange p-4 rounded-lg text-white">
            <h2 class="text-xl font-bold">Welcome back, ${userName}! 👋</h2>
            <p>Get ready for an exciting IPL 2025 season!</p>
          </div>
        </div>
      `;
      
      // Insert after the hero section if it exists
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.parentNode.insertBefore(welcomeMessage, heroSection.nextSibling);
      } else {
        // Otherwise insert at the beginning of the main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.insertBefore(welcomeMessage, mainContent.firstChild);
        }
      }
    } catch (e) {
      console.error('Error displaying welcome message', e);
    }
  }
}
