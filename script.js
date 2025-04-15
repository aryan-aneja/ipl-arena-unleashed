// Theme Toggle
const themeToggle = document.getElementById('toggle-theme');
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Show theme change toast
    toast.create({
      type: 'info',
      title: 'Theme Updated',
      message: `Switched to ${isDark ? 'dark' : 'light'} mode`,
      duration: 2000
    });
  });
}

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

// Enhanced Toast Notification System
const toast = {
  create({ type = 'info', title, message, duration = 3000 }) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
      <i class="toast-icon fa-solid ${this.getIcon(type)}"></i>
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);
    
    // Auto dismiss
    setTimeout(() => this.dismiss(toast), duration);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.dismiss(toast);
    });
  },
  
  dismiss(toast) {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  },
  
  getIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }
};

// Mobile Navigation
const navbarBurger = document.getElementById('navbar-burger');
const navbarMenu = document.getElementById('navbar-menu');

if (navbarBurger && navbarMenu) {
  navbarBurger.addEventListener('click', () => {
    navbarBurger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    // Animate burger menu
    const spans = navbarBurger.getElementsByTagName('span');
    Array.from(spans).forEach(span => span.classList.toggle('active'));
  });
}

// Tab System
const initTabs = () => {
  const tabButtons = document.querySelectorAll('.tab-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
};

// Initialize tabs if they exist
if (document.querySelector('.tab-item')) {
  initTabs();
}

// Form Validation
const initFormValidation = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation example
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Show error toast
          toast.create({
            type: 'error',
            title: 'Validation Error',
            message: `Please fill in all required fields`,
            duration: 3000
          });
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Show success toast
        toast.create({
          type: 'success',
          title: 'Success',
          message: 'Form submitted successfully!',
          duration: 3000
        });
      }
    });
  });
};

// Initialize form validation
initFormValidation();

// Update copyright year
const yearElem = document.getElementById('current-year');
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}

// Function to simulate user login
function loginUser(email, password) {
    // Basic validation
    if (!email || !password) {
        return { success: false, error: 'Please enter both email and password.' };
    }

    // In a real application, you would validate against a database
    if (email === 'user@example.com' && password === 'password') {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        return { success: true, message: 'Login successful.' };
    } else {
        return { success: false, error: 'Invalid email or password.' };
    }
}

// Function to simulate user signup
function signupUser(email, password, confirmPassword) {
    // Basic validation
    if (!email || !password || !confirmPassword) {
        return { success: false, error: 'Please fill in all fields.' };
    }

    if (password !== confirmPassword) {
        return { success: false, error: 'Passwords do not match.' };
    }

    // More robust password validation would be needed in a real app

    // In a real application, you would store the user in a database
    localStorage.setItem('isLoggedIn', 'true');
    return { success: true, message: 'Signup successful.' };
}

document.addEventListener('DOMContentLoaded', function() {
    // Get current year for footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle
    const navbarBurger = document.getElementById('navbar-burger');
    const navbarMenu = document.getElementById('navbar-menu');

    if (navbarBurger && navbarMenu) {
        navbarBurger.addEventListener('click', function() {
            navbarBurger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }
});

// Book Tickets Page - Seat Selection
document.addEventListener('DOMContentLoaded', function() {
    const seatSelectionContainer = document.querySelector('.seat-selection-container');
    const seatCountDisplay = document.getElementById('seat-count');
    const totalPriceDisplay = document.getElementById('total-price');
    const confirmBookingButton = document.getElementById('confirm-booking');

    // Match details (replace with actual data)
    const matchTitle = "Mumbai Indians vs Chennai Super Kings";
    const matchVenue = "Wankhede Stadium, Mumbai";
    const matchDate = "April 10, 2025, 7:30 PM";
    const seatPrice = 750; // Price per seat

    // Update match details on the page
    document.querySelector('.match-title').textContent = matchTitle;
    document.querySelector('.match-venue').textContent = matchVenue;
    document.querySelector('.match-date').textContent = matchDate;

    const numRows = 10;
    const seatsPerRow = 12;
    let selectedSeats = [];

    // Function to generate seat layout
    function generateSeats() {
        let seatsHTML = '';
        for (let row = 1; row <= numRows; row++) {
            seatsHTML += '<div class="seat-row">';
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                const seatId = `seat-${row}-${seatNum}`;
                seatsHTML += `
                    <div class="seat seat-available" data-seat-id="${seatId}">
                        ${seatNum}
                    </div>
                `;
            }
            seatsHTML += '</div>';
        }
        seatSelectionContainer.innerHTML = seatsHTML;
    }

    // Function to update booking summary
    function updateBookingSummary() {
        const seatCount = selectedSeats.length;
        const totalPrice = seatCount * seatPrice;

        seatCountDisplay.textContent = seatCount;
        totalPriceDisplay.textContent = `₹${totalPrice}`;

        // Enable/disable confirm booking button based on seat selection
        if (seatCount > 0) {
            confirmBookingButton.removeAttribute('disabled');
        } else {
            confirmBookingButton.setAttribute('disabled', 'true');
        }
    }

    // Seat click event
    function setupSeatClickListeners() {
        seatSelectionContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('seat')) {
                const seat = event.target;
                const seatId = seat.dataset.seatId;

                if (seat.classList.contains('seat-available')) {
                    seat.classList.remove('seat-available');
                    seat.classList.add('seat-selected');
                    selectedSeats.push(seatId);
                } else if (seat.classList.contains('seat-selected')) {
                    seat.classList.remove('seat-selected');
                    seat.classList.add('seat-available');
                    selectedSeats = selectedSeats.filter(id => id !== seatId);
                }

                updateBookingSummary();
            }
        });
    }

    // Confirm booking action
    confirmBookingButton.addEventListener('click', function() {
        // Implement booking confirmation and payment process here
        alert(`Booking confirmed for seats: ${selectedSeats.join(', ')}! Total: ₹${selectedSeats.length * seatPrice}`);
    });

    // Initialize seat layout and click listeners
    generateSeats();
    setupSeatClickListeners();
});
