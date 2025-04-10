
// Mock data for the IPL management system

// Teams data
export const teams = [
  {
    id: 1,
    name: "Mumbai Indians",
    code: "MI",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png",
    primaryColor: "#004BA0",
    captain: "Hardik Pandya",
    owner: "Reliance Industries",
    homeGround: "Wankhede Stadium, Mumbai",
    titles: 5,
    description: "Mumbai Indians are the most successful team in IPL history with five championship titles. Known for their strong squad development and consistent performances.",
    players: ["Rohit Sharma", "Jasprit Bumrah", "Hardik Pandya", "Suryakumar Yadav", "Ishan Kishan"]
  },
  {
    id: 2,
    name: "Chennai Super Kings",
    code: "CSK",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png",
    primaryColor: "#FFFF00",
    captain: "Ruturaj Gaikwad",
    owner: "India Cements",
    homeGround: "M. A. Chidambaram Stadium, Chennai",
    titles: 5,
    description: "Chennai Super Kings, led formerly by MS Dhoni, are known for their consistency and experience. They've reached the playoff stage in most seasons they've participated in.",
    players: ["MS Dhoni", "Ruturaj Gaikwad", "Ravindra Jadeja", "Deepak Chahar", "Moeen Ali"]
  },
  {
    id: 3,
    name: "Royal Challengers Bangalore",
    code: "RCB",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png",
    primaryColor: "#E31E24",
    captain: "Faf du Plessis",
    owner: "United Spirits",
    homeGround: "M. Chinnaswamy Stadium, Bangalore",
    titles: 0,
    description: "Royal Challengers Bangalore are known for their batting powerhouse but are yet to win an IPL title despite having some of the best batsmen in the world.",
    players: ["Virat Kohli", "Faf du Plessis", "Glenn Maxwell", "Mohammed Siraj", "Dinesh Karthik"]
  },
  {
    id: 4,
    name: "Kolkata Knight Riders",
    code: "KKR",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png",
    primaryColor: "#3A225D",
    captain: "Shreyas Iyer",
    owner: "Red Chillies Entertainment",
    homeGround: "Eden Gardens, Kolkata",
    titles: 2,
    description: "Kolkata Knight Riders, owned by Bollywood star Shah Rukh Khan, have won the IPL twice. Known for their quality spin bowling and aggressive batting.",
    players: ["Shreyas Iyer", "Sunil Narine", "Andre Russell", "Varun Chakravarthy", "Rinku Singh"]
  },
  {
    id: 5,
    name: "Delhi Capitals",
    code: "DC",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png",
    primaryColor: "#0078BC",
    captain: "Rishabh Pant",
    owner: "JSW Group and GMR Group",
    homeGround: "Arun Jaitley Stadium, Delhi",
    titles: 0,
    description: "Delhi Capitals (formerly Delhi Daredevils) are known for nurturing young Indian talent. They've shown improvement in recent seasons but are yet to win a title.",
    players: ["Rishabh Pant", "Axar Patel", "David Warner", "Anrich Nortje", "Kuldeep Yadav"]
  },
  {
    id: 6,
    name: "Rajasthan Royals",
    code: "RR",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png",
    primaryColor: "#FF1493",
    captain: "Sanju Samson",
    owner: "Manoj Badale",
    homeGround: "Sawai Mansingh Stadium, Jaipur",
    titles: 1,
    description: "Rajasthan Royals won the inaugural IPL season in 2008. They're known for their cost-effective team building and ability to unearth unknown talents.",
    players: ["Sanju Samson", "Jos Buttler", "Yuzvendra Chahal", "Shimron Hetmyer", "Yashasvi Jaiswal"]
  },
  {
    id: 7,
    name: "Sunrisers Hyderabad",
    code: "SRH",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png",
    primaryColor: "#FF822A",
    captain: "Pat Cummins",
    owner: "Sun TV Network",
    homeGround: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
    titles: 1,
    description: "Sunrisers Hyderabad are known for their bowling strength. They won the IPL in 2016 and have consistently made it to the playoffs in recent seasons.",
    players: ["Pat Cummins", "Bhuvneshwar Kumar", "Heinrich Klaasen", "Aiden Markram", "Travis Head"]
  },
  {
    id: 8,
    name: "Punjab Kings",
    code: "PBKS",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png",
    primaryColor: "#ED1B24",
    captain: "Shikhar Dhawan",
    owner: "Mohit Burman, Ness Wadia, Preity Zinta, and Karan Paul",
    homeGround: "IS Bindra Stadium, Mohali",
    titles: 0,
    description: "Punjab Kings (formerly Kings XI Punjab) are known for their aggressive batting approach. Despite some strong seasons, they haven't won an IPL title yet.",
    players: ["Shikhar Dhawan", "Liam Livingstone", "Kagiso Rabada", "Arshdeep Singh", "Sam Curran"]
  },
  {
    id: 9,
    name: "Gujarat Titans",
    code: "GT",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png",
    primaryColor: "#1B2133",
    captain: "Shubman Gill",
    owner: "CVC Capital Partners",
    homeGround: "Narendra Modi Stadium, Ahmedabad",
    titles: 1,
    description: "Gujarat Titans won the IPL in their debut season in 2022. They're known for their balanced squad and strategic gameplay under the leadership of Hardik Pandya.",
    players: ["Shubman Gill", "Rashid Khan", "Mohammed Shami", "Rahul Tewatia", "David Miller"]
  },
  {
    id: 10,
    name: "Lucknow Super Giants",
    code: "LSG",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png",
    primaryColor: "#A1E8F7",
    captain: "KL Rahul",
    owner: "RPSG Group",
    homeGround: "BRSABV Ekana Cricket Stadium, Lucknow",
    titles: 0,
    description: "Lucknow Super Giants made their IPL debut in 2022. Led by KL Rahul, they've quickly established themselves as a competitive team in the tournament.",
    players: ["KL Rahul", "Nicholas Pooran", "Marcus Stoinis", "Ravi Bishnoi", "Avesh Khan"]
  }
];

// Matches data
export const matches = [
  {
    id: 1,
    homeTeam: 1, // Mumbai Indians
    awayTeam: 2, // Chennai Super Kings
    date: "2025-04-15T14:00:00Z",
    venue: "Wankhede Stadium, Mumbai",
    homeTeamScore: null, // Upcoming match
    awayTeamScore: null,
    isCompleted: false,
    tickets: {
      available: true,
      priceCategories: [
        { name: "Premium", price: 12000 },
        { name: "Executive", price: 8000 },
        { name: "Regular", price: 4000 }
      ]
    }
  },
  {
    id: 2,
    homeTeam: 3, // Royal Challengers Bangalore
    awayTeam: 4, // Kolkata Knight Riders
    date: "2025-04-18T14:00:00Z",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    homeTeamScore: null,
    awayTeamScore: null,
    isCompleted: false,
    tickets: {
      available: true,
      priceCategories: [
        { name: "Premium", price: 10000 },
        { name: "Executive", price: 7000 },
        { name: "Regular", price: 3500 }
      ]
    }
  },
  {
    id: 3,
    homeTeam: 5, // Delhi Capitals
    awayTeam: 6, // Rajasthan Royals
    date: "2025-04-20T14:00:00Z",
    venue: "Arun Jaitley Stadium, Delhi",
    homeTeamScore: null,
    awayTeamScore: null,
    isCompleted: false,
    tickets: {
      available: true,
      priceCategories: [
        { name: "Premium", price: 8500 },
        { name: "Executive", price: 5500 },
        { name: "Regular", price: 3000 }
      ]
    }
  },
  {
    id: 4,
    homeTeam: 7, // Sunrisers Hyderabad
    awayTeam: 8, // Punjab Kings
    date: "2025-04-22T14:00:00Z",
    venue: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
    homeTeamScore: null,
    awayTeamScore: null,
    isCompleted: false,
    tickets: {
      available: true,
      priceCategories: [
        { name: "Premium", price: 7500 },
        { name: "Executive", price: 5000 },
        { name: "Regular", price: 2500 }
      ]
    }
  },
  {
    id: 5,
    homeTeam: 9, // Gujarat Titans
    awayTeam: 10, // Lucknow Super Giants
    date: "2025-04-25T14:00:00Z",
    venue: "Narendra Modi Stadium, Ahmedabad",
    homeTeamScore: null,
    awayTeamScore: null,
    isCompleted: false,
    tickets: {
      available: true,
      priceCategories: [
        { name: "Premium", price: 9000 },
        { name: "Executive", price: 6000 },
        { name: "Regular", price: 3000 }
      ]
    }
  },
  {
    id: 6,
    homeTeam: 2, // Chennai Super Kings
    awayTeam: 3, // Royal Challengers Bangalore
    date: "2025-04-10T14:00:00Z", // Past match
    venue: "M. A. Chidambaram Stadium, Chennai",
    homeTeamScore: "182/6",
    awayTeamScore: "176/7",
    isCompleted: true,
    result: "Chennai Super Kings won by 6 runs"
  },
  {
    id: 7,
    homeTeam: 4, // Kolkata Knight Riders
    awayTeam: 5, // Delhi Capitals
    date: "2025-04-08T14:00:00Z", // Past match
    venue: "Eden Gardens, Kolkata",
    homeTeamScore: "210/7",
    awayTeamScore: "196/8",
    isCompleted: true,
    result: "Kolkata Knight Riders won by 14 runs"
  },
  {
    id: 8,
    homeTeam: 6, // Rajasthan Royals
    awayTeam: 1, // Mumbai Indians
    date: "2025-04-07T14:00:00Z", // Past match
    venue: "Sawai Mansingh Stadium, Jaipur",
    homeTeamScore: "188/6",
    awayTeamScore: "189/4",
    isCompleted: true,
    result: "Mumbai Indians won by 6 wickets"
  }
];

// Stadium seating layout (simplified)
export const stadiumLayout = {
  premium: {
    rows: 5,
    seatsPerRow: 10,
    startingPrice: 12000
  },
  executive: {
    rows: 8,
    seatsPerRow: 12,
    startingPrice: 8000
  },
  regular: {
    rows: 10,
    seatsPerRow: 15,
    startingPrice: 4000
  }
};

// Generate seats with some random unavailability
export const generateSeats = (matchId: number, category: string) => {
  const layout = stadiumLayout[category as keyof typeof stadiumLayout];
  const seats = [];
  
  for (let row = 0; row < layout.rows; row++) {
    for (let seat = 0; seat < layout.seatsPerRow; seat++) {
      // Some seats are randomly unavailable
      const isAvailable = Math.random() > 0.2;
      seats.push({
        id: `${category}-${row+1}-${seat+1}`,
        row: row + 1,
        number: seat + 1,
        category,
        price: layout.startingPrice + (row * 100),
        status: isAvailable ? 'available' : 'reserved'
      });
    }
  }
  
  return seats;
};

// Mock payment methods
export const paymentMethods = [
  { id: 'credit', name: 'Credit Card' },
  { id: 'debit', name: 'Debit Card' },
  { id: 'upi', name: 'UPI Payment' },
  { id: 'netbanking', name: 'Net Banking' },
  { id: 'wallet', name: 'Digital Wallet' }
];

// Mock user for authentication simulation
export const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    name: "Cricket Fan",
    phone: "+91 9876543210"
  }
];

// Chatbot predefined responses
export const chatbotResponses = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello! Welcome to IPL Arena. How can I help you today?"
  },
  {
    keywords: ["ticket", "booking", "book"],
    response: "You can book tickets by going to the Matches section and clicking 'Book Tickets' next to any upcoming match. Would you like me to show you how?"
  },
  {
    keywords: ["team", "teams", "franchise"],
    response: "We have information about all 10 IPL teams. You can check out the Teams section to learn more about each franchise."
  },
  {
    keywords: ["match", "matches", "schedule", "fixture"],
    response: "All upcoming and past matches are listed in the Matches section. You can filter by team or date to find specific matches."
  },
  {
    keywords: ["payment", "pay", "transaction"],
    response: "We support multiple payment methods including credit/debit cards, UPI, netbanking and digital wallets for ticket purchases."
  },
  {
    keywords: ["cancel", "refund", "cancellation"],
    response: "Ticket cancellations are allowed up to 48 hours before the match. Please contact support for assistance with cancellations and refunds."
  },
  {
    keywords: ["help", "support", "contact"],
    response: "Our support team is available 24/7 at support@iplarena.com or call +91-8888888888 for immediate assistance."
  },
  {
    keywords: ["price", "cost", "fee", "charges"],
    response: "Ticket prices vary depending on the match, venue, and seating category. Premium seats range from ₹7,500 to ₹12,000, Executive from ₹5,000 to ₹8,000, and Regular from ₹2,500 to ₹4,000."
  },
  {
    keywords: ["login", "signin", "account"],
    response: "You can login using your email and password from our login page. If you're new, please sign up to create an account."
  }
];

// News feed data
export const newsFeed = [
  {
    id: 1,
    title: "Mumbai Indians Announce New Captain for IPL 2025",
    date: "2025-03-28",
    summary: "Mumbai Indians have announced Hardik Pandya as their new captain for the upcoming IPL season, taking over from Rohit Sharma.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1067&q=80"
  },
  {
    id: 2,
    title: "Chennai Super Kings Reveal New Jersey for IPL 2025",
    date: "2025-03-25",
    summary: "Chennai Super Kings have unveiled their new jersey for IPL 2025, featuring a refreshed design while maintaining their iconic yellow color.",
    image: "https://images.unsplash.com/photo-1580099595288-52de43f5d51b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 3,
    title: "IPL 2025 Schedule Released: Season to Start on April 5",
    date: "2025-03-20",
    summary: "BCCI has released the full schedule for IPL 2025, with the tournament set to begin on April 5 with a clash between defending champions CSK and MI.",
    image: "https://images.unsplash.com/photo-1624149564582-f51eb3e6a013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
  }
];
