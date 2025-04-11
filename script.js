
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
  
  // Check for any bookings in local storage
  checkForBookings();
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
    },
    {
      id: 4,
      homeTeam: 'SRH',
      homeTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png',
      awayTeam: 'GT',
      awayTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png',
      date: 'Mon, 15 Apr',
      time: '7:30 PM',
      venue: 'Rajiv Gandhi International Stadium, Hyderabad',
      matchNumber: 4
    },
    {
      id: 5,
      homeTeam: 'RR',
      homeTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png',
      awayTeam: 'LSG',
      awayTeamLogo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png',
      date: 'Tue, 16 Apr',
      time: '7:30 PM',
      venue: 'Sawai Mansingh Stadium, Jaipur',
      matchNumber: 5
    }
  ];
  
  // Populate teams section if we're on the teams page
  if (document.querySelector('.teams-grid')) {
    populateTeams();
  }
  
  // If we're on the dashboard, initialize user data
  if (document.querySelector('.dashboard-header')) {
    initializeDashboardUser();
  }
}

// Function to check if there are bookings in localStorage
function checkForBookings() {
  const bookingsData = localStorage.getItem('bookings');
  if (bookingsData) {
    try {
      const bookings = JSON.parse(bookingsData);
      updateTicketCount(bookings.length);
    } catch (e) {
      console.error('Error parsing bookings data', e);
    }
  } else {
    // No bookings yet
    updateTicketCount(0);
  }
}

// Update ticket count on dashboard cards
function updateTicketCount(count) {
  const ticketCountElement = document.querySelector('.dashboard-cards .card:first-child p.text-3xl');
  if (ticketCountElement) {
    ticketCountElement.textContent = count;
  }
}

// Book Tickets functionality
function bookTickets(matchId, seats, price) {
  // Get match details
  const match = getMatchById(matchId);
  
  if (!match) {
    toast.create({
      type: 'error',
      title: 'Error',
      message: 'Match not found.',
      duration: 3000
    });
    return;
  }
  
  // Generate unique booking ID
  const bookingId = 'IPL-' + new Date().getFullYear() + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  // Create booking object
  const booking = {
    id: bookingId,
    matchId: parseInt(matchId),
    date: match.date,
    teams: `${match.homeTeam} vs ${match.awayTeam}`,
    venue: match.venue,
    seats: seats,
    price: price,
    bookingTime: new Date().toISOString(),
    paymentMethod: 'UPI'
  };
  
  // Save to localStorage
  let bookings = [];
  const existingBookings = localStorage.getItem('bookings');
  
  if (existingBookings) {
    try {
      bookings = JSON.parse(existingBookings);
    } catch (e) {
      console.error('Error parsing bookings', e);
    }
  }
  
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  // Show success message
  toast.create({
    type: 'success',
    title: 'Booking Confirmed!',
    message: 'Your tickets have been booked successfully.',
    duration: 3000
  });
  
  // Redirect to dashboard after a delay
  setTimeout(() => {
    window.location.href = 'index.html'; // Redirect to dashboard
  }, 2000);
}

function getMatchById(id) {
  // Sample match data - in a real app, this would come from a database
  const matches = [
    {
      id: 1,
      homeTeam: 'Mumbai Indians',
      awayTeam: 'Chennai Super Kings',
      date: 'Wed, 10 Apr',
      time: '7:30 PM',
      venue: 'Wankhede Stadium, Mumbai'
    },
    {
      id: 2,
      homeTeam: 'Royal Challengers Bangalore',
      awayTeam: 'Kolkata Knight Riders',
      date: 'Fri, 12 Apr',
      time: '7:30 PM',
      venue: 'M. Chinnaswamy Stadium, Bangalore'
    },
    {
      id: 3,
      homeTeam: 'Delhi Capitals',
      awayTeam: 'Punjab Kings',
      date: 'Sun, 14 Apr',
      time: '3:30 PM',
      venue: 'Arun Jaitley Stadium, Delhi'
    },
    {
      id: 4,
      homeTeam: 'Sunrisers Hyderabad',
      awayTeam: 'Gujarat Titans',
      date: 'Mon, 15 Apr',
      time: '7:30 PM',
      venue: 'Rajiv Gandhi International Stadium, Hyderabad'
    },
    {
      id: 5,
      homeTeam: 'Rajasthan Royals',
      awayTeam: 'Lucknow Super Giants',
      date: 'Tue, 16 Apr',
      time: '7:30 PM',
      venue: 'Sawai Mansingh Stadium, Jaipur'
    }
  ];
  
  return matches.find(m => m.id === parseInt(id));
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
        // Redirect to booking page instead of directly booking
        window.location.href = 'book-tickets.html?match=' + matchNumber;
      }
    });
  });

  // Update navbar based on login status
  updateNavbarAuthStatus();
  
  // Check if we're on the index page and user is logged in, show welcome message
  displayWelcomeMessage();
  
  // If we're on the booking page, initialize the booking form
  if (window.location.pathname.includes('book-tickets.html')) {
    initializeBookingPage();
  }
  
  // Handle settings and notifications buttons
  setupSettingsAndNotifications();
  
  // Load bookings on dashboard if we're there
  if (document.getElementById('tickets-tab')) {
    loadBookings();
  }
  
  // If we're on teams page, populate teams
  if (document.querySelector('.teams-grid')) {
    populateTeams();
  }
});

// Initialize the booking page with match details
function initializeBookingPage() {
  // Get match ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const matchId = urlParams.get('match');
  
  if (!matchId) {
    toast.create({
      type: 'error',
      title: 'Error',
      message: 'Match ID not specified.',
      duration: 3000
    });
    return;
  }
  
  // Get match details
  const match = getMatchById(parseInt(matchId));
  
  if (!match) {
    toast.create({
      type: 'error',
      title: 'Error',
      message: 'Match not found.',
      duration: 3000
    });
    return;
  }
  
  // Update match details on the page
  document.querySelector('.match-title').textContent = `${match.homeTeam} vs ${match.awayTeam}`;
  document.querySelector('.match-venue').textContent = match.venue;
  document.querySelector('.match-date').textContent = `${match.date} | ${match.time}`;
  
  // Set up seat selection functionality
  setupSeatSelection(matchId);
}

// Setup seat selection
function setupSeatSelection(matchId) {
  const seatContainer = document.querySelector('.seat-selection-container');
  if (!seatContainer) return;
  
  // Generate seat grid
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;
  let seatsHtml = '<div class="mb-6 text-center"><div class="bg-gray-300 h-6 inline-block px-16 rounded-t-lg">PITCH VIEW</div></div>';
  
  rows.forEach(row => {
    seatsHtml += `<div class="flex justify-center mb-2">
      <div class="w-6 flex items-center justify-center font-semibold text-sm mr-2">${row}</div>`;
    
    for (let i = 1; i <= seatsPerRow; i++) {
      // Randomly make some seats reserved
      const isReserved = Math.random() < 0.2;
      const seatClass = isReserved ? 'seat-reserved' : 'seat-available';
      const seatId = `${row}${i}`;
      
      seatsHtml += `<div class="seat ${seatClass}" data-seat-id="${seatId}" data-row="${row}" data-number="${i}">${i}</div>`;
    }
    
    seatsHtml += `<div class="w-6 flex items-center justify-center font-semibold text-sm ml-2">${row}</div>
    </div>`;
  });
  
  seatContainer.innerHTML = seatsHtml;
  
  // Add event listeners to seats
  const seats = document.querySelectorAll('.seat-available');
  const selectedSeats = [];
  
  seats.forEach(seat => {
    seat.addEventListener('click', function() {
      const seatId = this.getAttribute('data-seat-id');
      
      if (this.classList.contains('seat-selected')) {
        this.classList.remove('seat-selected');
        this.classList.add('seat-available');
        
        // Remove from selected seats
        const index = selectedSeats.indexOf(seatId);
        if (index > -1) {
          selectedSeats.splice(index, 1);
        }
      } else {
        this.classList.remove('seat-available');
        this.classList.add('seat-selected');
        selectedSeats.push(seatId);
      }
      
      // Update summary
      updateBookingSummary(selectedSeats);
    });
  });
  
  // Set up confirm booking button
  const confirmButton = document.getElementById('confirm-booking');
  if (confirmButton) {
    confirmButton.addEventListener('click', function() {
      if (selectedSeats.length === 0) {
        toast.create({
          type: 'warning',
          title: 'No seats selected',
          message: 'Please select at least one seat to continue.',
          duration: 3000
        });
        return;
      }
      
      // Calculate price (in a real app this would come from the backend)
      const price = selectedSeats.length * 1500; // 1500 per seat
      
      // Show payment confirmation modal
      showPaymentModal(matchId, selectedSeats, price);
    });
  }
}

// Update booking summary
function updateBookingSummary(selectedSeats) {
  const summaryContainer = document.querySelector('.booking-summary');
  if (!summaryContainer) return;
  
  const seatCountElement = document.getElementById('seat-count');
  const totalPriceElement = document.getElementById('total-price');
  
  if (seatCountElement) {
    seatCountElement.textContent = selectedSeats.length;
  }
  
  if (totalPriceElement) {
    const price = selectedSeats.length * 1500; // 1500 per seat
    totalPriceElement.textContent = '₹' + price.toLocaleString();
  }
  
  // Update confirm button state
  const confirmButton = document.getElementById('confirm-booking');
  if (confirmButton) {
    confirmButton.disabled = selectedSeats.length === 0;
  }
}

// Show payment modal
function showPaymentModal(matchId, selectedSeats, price) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('payment-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'payment-modal';
    modal.className = 'modal';
    
    document.body.appendChild(modal);
  }
  
  // Set modal content
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Complete Payment</h2>
      <div class="payment-details">
        <p>Amount: <strong>₹${price.toLocaleString()}</strong></p>
        <p>Seats: <strong>${selectedSeats.join(', ')}</strong></p>
      </div>
      <div class="payment-qr-container">
        <div class="qr-code">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Payment QR Code">
          <div class="qr-overlay">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/UPI-Logo-vector.svg" alt="UPI" class="qr-logo">
          </div>
        </div>
        <p class="text-sm text-center">Scan with any UPI app (Google Pay, PhonePe, Paytm, etc.)</p>
        <div class="payment-apps">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/PhonePe_Logo.svg" alt="PhonePe">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm">
        </div>
      </div>
      <button id="complete-payment" class="btn btn-primary w-full">Complete Payment</button>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'flex';
  
  // Add close event to modal
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Add complete payment event
  const completeBtn = document.getElementById('complete-payment');
  completeBtn.addEventListener('click', function() {
    // In a real app, this would process the payment
    
    // Close modal
    modal.style.display = 'none';
    
    // Book tickets
    bookTickets(matchId, selectedSeats, price);
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Load bookings on dashboard
function loadBookings() {
  const bookingsContainer = document.querySelector('#tickets-tab .space-y-4');
  if (!bookingsContainer) return;
  
  // Get bookings from localStorage
  const bookingsData = localStorage.getItem('bookings');
  
  if (!bookingsData || bookingsData === '[]') {
    // No bookings, show empty state
    bookingsContainer.innerHTML = `
      <div class="text-center p-10 rounded-lg bg-gray-50">
        <p class="text-gray-500">No ticket bookings found</p>
        <a href="matches.html" class="btn btn-blue mt-4">Browse Matches</a>
      </div>
    `;
    return;
  }
  
  // Parse bookings
  let bookings = [];
  try {
    bookings = JSON.parse(bookingsData);
  } catch (e) {
    console.error('Error parsing bookings data', e);
    return;
  }
  
  // Generate HTML for bookings
  let bookingsHtml = '<h3 class="text-xl font-bold mb-4">Your Ticket Bookings</h3><div class="space-y-4">';
  
  bookings.forEach(booking => {
    bookingsHtml += `
      <div class="card overflow-hidden">
        <div class="flex flex-col md-flex-row">
          <div class="bg-ipl-blue text-white p-6 flex flex-col items-center justify-center md-w-48">
            <p class="text-xs uppercase tracking-wider mb-1">Booking ID</p>
            <p class="font-bold">${booking.id}</p>
          </div>
          <div class="p-6 flex-grow">
            <p class="text-lg font-bold mb-2">${booking.teams}</p>
            <div class="grid grid-cols-1 md-grid-cols-3 gap-4 text-sm">
              <div class="flex items-start">
                <i class="fa-regular fa-calendar h-4 w-4 mr-2 mt-0.5 text-gray-500"></i>
                <span>${booking.date}</span>
              </div>
              <div class="flex items-start">
                <i class="fa-solid fa-location-dot h-4 w-4 mr-2 mt-0.5 text-gray-500"></i>
                <span>${booking.venue}</span>
              </div>
              <div class="flex items-start">
                <i class="fa-solid fa-users h-4 w-4 mr-2 mt-0.5 text-gray-500"></i>
                <span>${booking.seats.join(', ')}</span>
              </div>
            </div>
          </div>
          <div class="p-6 flex flex-col justify-center items-center md-items-end bg-gray-50">
            <button class="btn btn-ghost flex items-center view-ticket" data-booking-id="${booking.id}">
              View Tickets
              <i class="fa-solid fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  bookingsHtml += '</div>';
  bookingsContainer.innerHTML = bookingsHtml;
  
  // Add event listeners to view ticket buttons
  const viewTicketButtons = document.querySelectorAll('.view-ticket');
  viewTicketButtons.forEach(button => {
    button.addEventListener('click', function() {
      const bookingId = this.getAttribute('data-booking-id');
      showTicketDetails(bookingId);
    });
  });
}

// Show ticket details in a modal
function showTicketDetails(bookingId) {
  // Get booking details
  const bookingsData = localStorage.getItem('bookings');
  if (!bookingsData) return;
  
  let bookings = [];
  try {
    bookings = JSON.parse(bookingsData);
  } catch (e) {
    console.error('Error parsing bookings data', e);
    return;
  }
  
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;
  
  // Create modal if it doesn't exist
  let modal = document.getElementById('ticket-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ticket-modal';
    modal.className = 'modal';
    
    document.body.appendChild(modal);
  }
  
  // Format booking date
  const bookingDate = new Date(booking.bookingTime);
  const formattedBookingDate = bookingDate.toLocaleString();
  
  // Set modal content with ticket and barcode
  modal.innerHTML = `
    <div class="modal-content ticket-modal-content">
      <span class="close-modal">&times;</span>
      <div class="ticket-card">
        <div class="ticket-header bg-ipl-blue text-white p-4">
          <h2 class="text-center font-bold">IPL 2025 MATCH TICKET</h2>
        </div>
        
        <div class="ticket-body p-4">
          <div class="match-details mb-4">
            <h3 class="font-bold text-lg mb-2">${booking.teams}</h3>
            <p class="text-gray-700"><i class="fa-regular fa-calendar mr-2"></i>${booking.date}</p>
            <p class="text-gray-700"><i class="fa-solid fa-location-dot mr-2"></i>${booking.venue}</p>
          </div>
          
          <div class="ticket-info grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-500">Booking ID</p>
              <p class="font-medium">${booking.id}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Booking Date</p>
              <p class="font-medium">${formattedBookingDate}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Seats</p>
              <p class="font-medium">${booking.seats.join(', ')}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Amount Paid</p>
              <p class="font-medium">₹${booking.price.toLocaleString()}</p>
            </div>
          </div>
          
          <div class="ticket-barcode flex flex-col items-center border-t pt-4">
            <p class="text-sm text-gray-500 mb-2">Scan this barcode at the venue entrance</p>
            <div class="barcode">
              <svg class="h-16" viewBox="0 0 100 30">
                ${generateBarcodeSVG(booking.id)}
              </svg>
            </div>
            <p class="text-xs text-gray-500 mt-2">${booking.id}</p>
          </div>
        </div>
        
        <div class="ticket-footer p-4 bg-gray-50 border-t">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Payment Method: ${booking.paymentMethod}</p>
            </div>
            <button class="btn btn-outline btn-sm download-ticket">
              <i class="fa-solid fa-download mr-1"></i> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'flex';
  
  // Add close event to modal
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Generate simple barcode SVG
function generateBarcodeSVG(code) {
  const chars = code.replace(/[^A-Za-z0-9]/g, '');
  let svg = '';
  
  for (let i = 0; i < chars.length; i++) {
    const width = Math.max(1, (chars.charCodeAt(i) % 3) + 1);
    svg += `<rect x="${i * 5}" y="0" width="${width}" height="30" fill="black" />`;
  }
  
  return svg;
}

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
          <a href="index.html" class="btn btn-outline">Dashboard</a>
          <div class="dropdown">
            <button class="btn btn-primary ml-4 dropdown-toggle">
              <i class="fa-solid fa-user mr-2"></i>${userName}
              <i class="fa-solid fa-angle-down ml-2"></i>
            </button>
            <div class="dropdown-menu">
              <a href="#" id="settings-btn">Settings</a>
              <a href="#" id="notifications-btn">Notifications <span class="badge">2</span></a>
              <a href="#" id="logout-btn">Logout</a>
            </div>
          </div>
        `;
        
        // Add logout event listener
        document.getElementById('logout-btn').addEventListener('click', logoutUser);
        
        // Add settings and notifications event listeners
        document.getElementById('settings-btn').addEventListener('click', showSettings);
        document.getElementById('notifications-btn').addEventListener('click', showNotifications);
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

// Settings and notifications functionality
function setupSettingsAndNotifications() {
  // Add dropdown functionality
  document.addEventListener('click', function(e) {
    const dropdownToggle = e.target.closest('.dropdown-toggle');
    
    if (dropdownToggle) {
      const dropdown = dropdownToggle.parentElement;
      dropdown.classList.toggle('active');
      return;
    }
    
    // Close all dropdowns when clicking elsewhere
    if (!e.target.closest('.dropdown-menu')) {
      document.querySelectorAll('.dropdown').forEach(function(dropdown) {
        dropdown.classList.remove('active');
      });
    }
  });
}

function showSettings() {
  // Create modal for settings
  let modal = document.getElementById('settings-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'settings-modal';
    modal.className = 'modal';
    
    document.body.appendChild(modal);
  }
  
  // Get user data
  let userData = { name: 'User', email: 'user@example.com' };
  try {
    userData = JSON.parse(localStorage.getItem('user') || '{}');
  } catch (e) {
    console.error('Error parsing user data', e);
  }
  
  // Set modal content
  modal.innerHTML = `
    <div class="modal-content settings-modal">
      <span class="close-modal">&times;</span>
      <h2 class="text-2xl font-bold mb-6">Account Settings</h2>
      
      <div class="settings-form">
        <div class="form-group mb-4">
          <label for="settings-name" class="block text-gray-700 mb-1">Name</label>
          <input type="text" id="settings-name" class="form-control" value="${userData.name || ''}">
        </div>
        
        <div class="form-group mb-4">
          <label for="settings-email" class="block text-gray-700 mb-1">Email</label>
          <input type="email" id="settings-email" class="form-control" value="${userData.email || ''}" disabled>
        </div>
        
        <div class="form-group mb-4">
          <label class="block text-gray-700 mb-1">Theme Preference</label>
          <div class="flex items-center">
            <input type="radio" id="theme-light" name="theme" value="light" checked>
            <label for="theme-light" class="ml-2 mr-4">Light</label>
            
            <input type="radio" id="theme-dark" name="theme" value="dark">
            <label for="theme-dark" class="ml-2">Dark</label>
          </div>
        </div>
        
        <div class="form-group mb-4">
          <label class="block text-gray-700 mb-1">Notification Preferences</label>
          <div class="space-y-2">
            <div class="flex items-center">
              <input type="checkbox" id="notify-matches" checked>
              <label for="notify-matches" class="ml-2">Match Reminders</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="notify-tickets" checked>
              <label for="notify-tickets" class="ml-2">Ticket Updates</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="notify-news" checked>
              <label for="notify-news" class="ml-2">News and Announcements</label>
            </div>
          </div>
        </div>
        
        <button id="save-settings" class="btn btn-primary">Save Settings</button>
      </div>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'flex';
  
  // Add close event to modal
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Add save settings event
  const saveBtn = document.getElementById('save-settings');
  saveBtn.addEventListener('click', function() {
    // Get new name
    const newName = document.getElementById('settings-name').value.trim();
    
    if (newName) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.name = newName;
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update UI where name is displayed
        updateNavbarAuthStatus();
        
        toast.create({
          type: 'success',
          title: 'Settings Saved',
          message: 'Your account settings have been updated.',
          duration: 3000
        });
        
        // Close modal
        modal.style.display = 'none';
      } catch (e) {
        console.error('Error updating user data', e);
      }
    }
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function showNotifications() {
  // Create modal for notifications
  let modal = document.getElementById('notifications-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'notifications-modal';
    modal.className = 'modal';
    
    document.body.appendChild(modal);
  }
  
  // Set modal content with dummy notifications
  modal.innerHTML = `
    <div class="modal-content notifications-modal">
      <span class="close-modal">&times;</span>
      <h2 class="text-2xl font-bold mb-6">Notifications</h2>
      
      <div class="notifications-list space-y-4">
        <div class="notification unread">
          <div class="notification-header">
            <span class="notification-badge">New</span>
            <span class="notification-time">2 hours ago</span>
          </div>
          <h3 class="notification-title">Match Reminder</h3>
          <p class="notification-message">
            Mumbai Indians vs Chennai Super Kings starts in 3 hours. Don't miss the action!
          </p>
        </div>
        
        <div class="notification unread">
          <div class="notification-header">
            <span class="notification-badge">New</span>
            <span class="notification-time">Yesterday</span>
          </div>
          <h3 class="notification-title">Ticket Confirmation</h3>
          <p class="notification-message">
            Your tickets for RCB vs KKR have been confirmed. Check your dashboard for details.
          </p>
        </div>
        
        <div class="notification">
          <div class="notification-header">
            <span class="notification-time">3 days ago</span>
          </div>
          <h3 class="notification-title">IPL Fantasy League</h3>
          <p class="notification-message">
            The IPL Fantasy League is now open! Create your dream team and win exciting prizes.
          </p>
        </div>
        
        <div class="notification">
          <div class="notification-header">
            <span class="notification-time">1 week ago</span>
          </div>
          <h3 class="notification-title">Welcome to IPL Arena</h3>
          <p class="notification-message">
            Thank you for joining IPL Arena! Explore matches, teams, and book tickets for IPL 2025.
          </p>
        </div>
      </div>
      
      <div class="pt-4 border-t mt-4">
        <button id="mark-all-read" class="btn btn-outline">Mark All as Read</button>
      </div>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'flex';
  
  // Add close event to modal
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Add mark all as read event
  const markReadBtn = document.getElementById('mark-all-read');
  markReadBtn.addEventListener('click', function() {
    const unreadNotifications = document.querySelectorAll('.notification.unread');
    unreadNotifications.forEach(notification => {
      notification.classList.remove('unread');
      notification.querySelector('.notification-badge').remove();
    });
    
    // Update badge in navbar
    const badge = document.querySelector('.dropdown-menu .badge');
    if (badge) {
      badge.remove();
    }
    
    toast.create({
      type: 'info',
      title: 'Notifications',
      message: 'All notifications marked as read.',
      duration: 2000
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Initialize dashboard user data
function initializeDashboardUser() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = userData.name || 'User';
    
    // Update user name in dashboard header
    const userNameElement = document.querySelector('.dashboard-header h1');
    if (userNameElement) {
      userNameElement.textContent = `Welcome, ${userName}!`;
    }
  } catch (e) {
    console.error('Error parsing user data', e);
  }
}

// Populate teams page
function populateTeams() {
  // Check if we're on the teams page
  const teamsGrid = document.querySelector('.teams-grid');
  if (!teamsGrid) return;
  
  // Define IPL teams
  const teams = [
    {
      id: 1,
      name: 'Mumbai Indians',
      code: 'MI',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png',
      color: '#0078BC',
      owner: 'Reliance Industries',
      captain: 'Rohit Sharma',
      homeVenue: 'Wankhede Stadium, Mumbai',
      titles: 5,
      description: 'Mumbai Indians is the most successful team in IPL history with five championships. Known for their strong team culture and ability to nurture young talent.',
      keyPlayers: ['Rohit Sharma', 'Jasprit Bumrah', 'Suryakumar Yadav', 'Hardik Pandya']
    },
    {
      id: 2,
      name: 'Chennai Super Kings',
      code: 'CSK',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png',
      color: '#FFFF00',
      owner: 'Chennai Super Kings Cricket Ltd.',
      captain: 'MS Dhoni',
      homeVenue: 'M.A. Chidambaram Stadium, Chennai',
      titles: 4,
      description: 'Chennai Super Kings, under the leadership of MS Dhoni, have been one of the most consistent teams in IPL history.',
      keyPlayers: ['MS Dhoni', 'Ravindra Jadeja', 'Ruturaj Gaikwad', 'Deepak Chahar']
    },
    {
      id: 3,
      name: 'Royal Challengers Bangalore',
      code: 'RCB',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png',
      color: '#EC1C24',
      owner: 'United Spirits',
      captain: 'Faf du Plessis',
      homeVenue: 'M. Chinnaswamy Stadium, Bangalore',
      titles: 0,
      description: 'Royal Challengers Bangalore is known for their batting prowess and passionate fan base, despite not having won an IPL title yet.',
      keyPlayers: ['Virat Kohli', 'Faf du Plessis', 'Glenn Maxwell']
    },
    {
      id: 4,
      name: 'Kolkata Knight Riders',
      code: 'KKR',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png',
      color: '#3A225D',
      owner: 'Knight Riders Group',
      captain: 'Shreyas Iyer',
      homeVenue: 'Eden Gardens, Kolkata',
      titles: 2,
      description: 'Kolkata Knight Riders have won the IPL twice and are known for their passionate fans and innovative tactics.',
      keyPlayers: ['Shreyas Iyer', 'Andre Russell', 'Sunil Narine']
    },
    {
      id: 5,
      name: 'Delhi Capitals',
      code: 'DC',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png',
      color: '#0078BC',
      owner: 'JSW Group and GMR Group',
      captain: 'Rishabh Pant',
      homeVenue: 'Arun Jaitley Stadium, Delhi',
      titles: 0,
      description: 'Delhi Capitals, formerly Delhi Daredevils, are yet to win an IPL title but have built a strong squad in recent years.',
      keyPlayers: ['Rishabh Pant', 'Axar Patel', 'Anrich Nortje']
    },
    {
      id: 6,
      name: 'Punjab Kings',
      code: 'PBKS',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png',
      color: '#ED1B24',
      owner: 'Preity Zinta, Ness Wadia, Mohit Burman, and Karan Paul',
      captain: 'Shikhar Dhawan',
      homeVenue: 'PCA Stadium, Mohali',
      titles: 0,
      description: 'Punjab Kings, formerly Kings XI Punjab, are known for their explosive batsmen and entertaining brand of cricket.',
      keyPlayers: ['Shikhar Dhawan', 'Liam Livingstone', 'Arshdeep Singh']
    },
    {
      id: 7,
      name: 'Rajasthan Royals',
      code: 'RR',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png',
      color: '#EA1A85',
      owner: 'Manoj Badale, Lachlan Murdoch and others',
      captain: 'Sanju Samson',
      homeVenue: 'Sawai Mansingh Stadium, Jaipur',
      titles: 1,
      description: 'Rajasthan Royals won the inaugural IPL in 2008 and are known for discovering and nurturing young talent.',
      keyPlayers: ['Sanju Samson', 'Jos Buttler', 'Yuzvendra Chahal']
    },
    {
      id: 8,
      name: 'Sunrisers Hyderabad',
      code: 'SRH',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png',
      color: '#FF822A',
      owner: 'Sun TV Network',
      captain: 'Aiden Markram',
      homeVenue: 'Rajiv Gandhi International Stadium, Hyderabad',
      titles: 1,
      description: 'Sunrisers Hyderabad won the IPL in 2016 and are known for their strong bowling attack.',
      keyPlayers: ['Aiden Markram', 'Bhuvneshwar Kumar', 'Heinrich Klaasen']
    },
    {
      id: 9,
      name: 'Gujarat Titans',
      code: 'GT',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png',
      color: '#1B2133',
      owner: 'CVC Capital Partners',
      captain: 'Hardik Pandya',
      homeVenue: 'Narendra Modi Stadium, Ahmedabad',
      titles: 1,
      description: 'Gujarat Titans won the IPL in their debut season in 2022, led by Hardik Pandya.',
      keyPlayers: ['Hardik Pandya', 'Rashid Khan', 'Shubman Gill']
    },
    {
      id: 10,
      name: 'Lucknow Super Giants',
      code: 'LSG',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png',
      color: '#A4282A',
      owner: 'RPSG Group',
      captain: 'KL Rahul',
      homeVenue: 'BRSABV Ekana Cricket Stadium, Lucknow',
      titles: 0,
      description: 'Lucknow Super Giants made their IPL debut in 2022 and have quickly established themselves as a competitive team.',
      keyPlayers: ['KL Rahul', 'Nicholas Pooran', 'Ravi Bishnoi']
    }
  ];
  
  // Generate HTML for teams
  let teamsHTML = '';
  
  teams.forEach(team => {
    teamsHTML += `
      <div class="team-card">
        <div class="team-card-header" style="background-color: ${team.color};">
          <div class="team-logo-container">
            <img src="${team.logo}" alt="${team.name}" class="team-logo">
          </div>
          <div class="team-info">
            <h3 class="team-name">${team.name}</h3>
            <p class="team-details">${team.titles}x IPL Champions</p>
          </div>
        </div>
        
        <div class="team-stats">
          <div class="stat">
            <span class="stat-value">${team.titles}</span>
            <span class="stat-label">Titles</span>
          </div>
          <div class="stat">
            <span class="stat-value">${team.captain.split(' ')[0]}</span>
            <span class="stat-label">Captain</span>
          </div>
          <div class="stat">
            <span class="stat-value">${team.homeVenue.split(',')[0].substring(0, 10)}</span>
            <span class="stat-label">Home</span>
          </div>
        </div>
        
        <div class="p-4 border-t">
          <p class="text-sm mb-4">${team.description.substring(0, 100)}...</p>
          <button class="btn btn-outline w-full view-team-details" data-team-id="${team.id}" style="color: ${team.color}; border-color: ${team.color};">
            Team Details
          </button>
        </div>
      </div>
    `;
  });
  
  // Update the teams grid
  teamsGrid.innerHTML = teamsHTML;
  
  // Add event listeners to team details buttons
  const teamDetailsButtons = document.querySelectorAll('.view-team-details');
  teamDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
      const teamId = parseInt(this.getAttribute('data-team-id'));
      showTeamDetails(teamId);
    });
  });
}

// Show team details modal
function showTeamDetails(teamId) {
  // Define IPL teams (same as above)
  const teams = [
    {
      id: 1,
      name: 'Mumbai Indians',
      code: 'MI',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png',
      color: '#0078BC',
      owner: 'Reliance Industries',
      captain: 'Rohit Sharma',
      homeVenue: 'Wankhede Stadium, Mumbai',
      titles: 5,
      description: 'Mumbai Indians is the most successful team in IPL history with five championships. Known for their strong team culture and ability to nurture young talent.',
      keyPlayers: ['Rohit Sharma', 'Jasprit Bumrah', 'Suryakumar Yadav', 'Hardik Pandya']
    },
    {
      id: 2,
      name: 'Chennai Super Kings',
      code: 'CSK',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png',
      color: '#FFFF00',
      owner: 'Chennai Super Kings Cricket Ltd.',
      captain: 'MS Dhoni',
      homeVenue: 'M.A. Chidambaram Stadium, Chennai',
      titles: 4,
      description: 'Chennai Super Kings, under the leadership of MS Dhoni, have been one of the most consistent teams in IPL history.',
      keyPlayers: ['MS Dhoni', 'Ravindra Jadeja', 'Ruturaj Gaikwad', 'Deepak Chahar']
    },
    {
      id: 3,
      name: 'Royal Challengers Bangalore',
      code: 'RCB',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png',
      color: '#EC1C24',
      owner: 'United Spirits',
      captain: 'Faf du Plessis',
      homeVenue: 'M. Chinnaswamy Stadium, Bangalore',
      titles: 0,
      description: 'Royal Challengers Bangalore is known for their batting prowess and passionate fan base, despite not having won an IPL title yet.',
      keyPlayers: ['Virat Kohli', 'Faf du Plessis', 'Glenn Maxwell']
    },
    {
      id: 4,
      name: 'Kolkata Knight Riders',
      code: 'KKR',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png',
      color: '#3A225D',
      owner: 'Knight Riders Group',
      captain: 'Shreyas Iyer',
      homeVenue: 'Eden Gardens, Kolkata',
      titles: 2,
      description: 'Kolkata Knight Riders have won the IPL twice and are known for their passionate fans and innovative tactics.',
      keyPlayers: ['Shreyas Iyer', 'Andre Russell', 'Sunil Narine']
    },
    {
      id: 5,
      name: 'Delhi Capitals',
      code: 'DC',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png',
      color: '#0078BC',
      owner: 'JSW Group and GMR Group',
      captain: 'Rishabh Pant',
      homeVenue: 'Arun Jaitley Stadium, Delhi',
      titles: 0,
      description: 'Delhi Capitals, formerly Delhi Daredevils, are yet to win an IPL title but have built a strong squad in recent years.',
      keyPlayers: ['Rishabh Pant', 'Axar Patel', 'Anrich Nortje']
    },
    {
      id: 6,
      name: 'Punjab Kings',
      code: 'PBKS',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png',
      color: '#ED1B24',
      owner: 'Preity Zinta, Ness Wadia, Mohit Burman, and Karan Paul',
      captain: 'Shikhar Dhawan',
      homeVenue: 'PCA Stadium, Mohali',
      titles: 0,
      description: 'Punjab Kings, formerly Kings XI Punjab, are known for their explosive batsmen and entertaining brand of cricket.',
      keyPlayers: ['Shikhar Dhawan', 'Liam Livingstone', 'Arshdeep Singh']
    },
    {
      id: 7,
      name: 'Rajasthan Royals',
      code: 'RR',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png',
      color: '#EA1A85',
      owner: 'Manoj Badale, Lachlan Murdoch and others',
      captain: 'Sanju Samson',
      homeVenue: 'Sawai Mansingh Stadium, Jaipur',
      titles: 1,
      description: 'Rajasthan Royals won the inaugural IPL in 2008 and are known for discovering and nurturing young talent.',
      keyPlayers: ['Sanju Samson', 'Jos Buttler', 'Yuzvendra Chahal']
    },
    {
      id: 8,
      name: 'Sunrisers Hyderabad',
      code: 'SRH',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png',
      color: '#FF822A',
      owner: 'Sun TV Network',
      captain: 'Aiden Markram',
      homeVenue: 'Rajiv Gandhi International Stadium, Hyderabad',
      titles: 1,
      description: 'Sunrisers Hyderabad won the IPL in 2016 and are known for their strong bowling attack.',
      keyPlayers: ['Aiden Markram', 'Bhuvneshwar Kumar', 'Heinrich Klaasen']
    },
    {
      id: 9,
      name: 'Gujarat Titans',
      code: 'GT',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png',
      color: '#1B2133',
      owner: 'CVC Capital Partners',
      captain: 'Hardik Pandya',
      homeVenue: 'Narendra Modi Stadium, Ahmedabad',
      titles: 1,
      description: 'Gujarat Titans won the IPL in their debut season in 2022, led by Hardik Pandya.',
      keyPlayers: ['Hardik Pandya', 'Rashid Khan', 'Shubman Gill']
    },
    {
      id: 10,
      name: 'Lucknow Super Giants',
      code: 'LSG',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png',
      color: '#A4282A',
      owner: 'RPSG Group',
      captain: 'KL Rahul',
      homeVenue: 'BRSABV Ekana Cricket Stadium, Lucknow',
      titles: 0,
      description: 'Lucknow Super Giants made their IPL debut in 2022 and have quickly established themselves as a competitive team.',
      keyPlayers: ['KL Rahul', 'Nicholas Pooran', 'Ravi Bishnoi']
    }
  ];
  
  // Get team details
  const team = teams.find(t => t.id === teamId);
  if (!team) return;
  
  // Create modal if it doesn't exist
  let modal = document.getElementById('team-details-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'team-details-modal';
    modal.className = 'modal';
    
    document.body.appendChild(modal);
  }
  
  // Set modal content
  modal.innerHTML = `
    <div class="modal-content team-details-modal">
      <span class="close-modal">&times;</span>
      
      <div class="team-header" style="background-color: ${team.color};">
        <div class="flex items-center">
          <div class="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center p-2">
            <img src="${team.logo}" alt="${team.name}" class="max-w-full max-h-full object-contain">
          </div>
          <div class="ml-4 text-white">
            <h2 class="text-2xl font-bold">${team.name}</h2>
            <p class="opacity-80">${team.titles} IPL Titles</p>
          </div>
        </div>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md-grid-cols-2 gap-6">
          <div>
            <h3 class="text-xl font-bold mb-4">Team Information</h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <i class="fa-solid fa-user w-5 text-center mt-1 mr-3" style="color: ${team.color};"></i>
                <div>
                  <p class="text-sm text-gray-500">Captain</p>
                  <p class="font-medium">${team.captain}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <i class="fa-solid fa-building w-5 text-center mt-1 mr-3" style="color: ${team.color};"></i>
                <div>
                  <p class="text-sm text-gray-500">Owner</p>
                  <p class="font-medium">${team.owner}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <i class="fa-solid fa-location-dot w-5 text-center mt-1 mr-3" style="color: ${team.color};"></i>
                <div>
                  <p class="text-sm text-gray-500">Home Ground</p>
                  <p class="font-medium">${team.homeVenue}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <i class="fa-solid fa-trophy w-5 text-center mt-1 mr-3" style="color: ${team.color};"></i>
                <div>
                  <p class="text-sm text-gray-500">IPL Championship Years</p>
                  <p class="font-medium">${team.titles > 0 ? '2011, 2015, 2017, 2019, 2020'.substring(0, team.titles * 6) : 'No titles yet'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-xl font-bold mb-4">Key Players</h3>
            
            <div class="grid grid-cols-2 gap-3">
              ${team.keyPlayers.map((player, index) => `
                <div class="flex items-center p-3 rounded-lg" style="background-color: ${team.color}15;">
                  <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 text-xs font-bold" style="color: ${team.color};">
                    ${index + 1}
                  </div>
                  <span>${player}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-xl font-bold mb-4">Team History</h3>
          <p class="text-gray-700 leading-relaxed">
            ${team.description}
            ${team.description.length < 150 ? `${team.name} has been a part of the IPL since its inception, building a strong fan base over the years. The team has consistently been a force to reckon with in the tournament, known for their strategic approach to the game and team balance.` : ''}
          </p>
        </div>
        
        <div class="mt-6">
          <h3 class="text-xl font-bold mb-4">Upcoming Matches</h3>
          
          <div class="space-y-3">
            <div class="border rounded-lg p-4 flex justify-between items-center">
              <div class="flex items-center">
                <img src="${team.logo}" alt="${team.code}" class="w-10 h-10 object-contain">
                <span class="mx-3 text-lg font-bold">vs</span>
                <img src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png" alt="CSK" class="w-10 h-10 object-contain">
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500">Apr 15, 7:30 PM</p>
                <p class="font-medium">${team.homeVenue}</p>
              </div>
            </div>
            
            <div class="border rounded-lg p-4 flex justify-between items-center">
              <div class="flex items-center">
                <img src="https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png" alt="RCB" class="w-10 h-10 object-contain">
                <span class="mx-3 text-lg font-bold">vs</span>
                <img src="${team.logo}" alt="${team.code}" class="w-10 h-10 object-contain">
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500">Apr 20, 3:30 PM</p>
                <p class="font-medium">M. Chinnaswamy Stadium, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'flex';
  
  // Add close event to modal
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
