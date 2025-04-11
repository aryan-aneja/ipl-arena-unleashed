
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
  
  // Toggle theme on button click
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

// Mobile navbar toggle
function initializeNavbarToggle() {
  const burger = document.getElementById('navbar-burger');
  const menu = document.getElementById('navbar-menu');
  
  burger.addEventListener('click', function() {
    menu.classList.toggle('active');
    
    // Toggle burger animation
    const spans = burger.querySelectorAll('span');
    spans.forEach(function(span, index) {
      span.classList.toggle('active');
    });
  });
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
  
  // Initialize with the first tab active
  document.querySelector('.tab-item').click();
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
    container.appendChild(toastEl);
    
    // Add close event
    const closeBtn = toastEl.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
      closeToast(toastEl);
    });
    
    // Auto close after duration
    setTimeout(() => closeToast(toastEl), duration);
    
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
});
