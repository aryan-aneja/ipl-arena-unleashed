
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { matches, teams, paymentMethods } from '@/lib/data';
import SeatSelector from '@/components/SeatSelector';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { ArrowLeft, CalendarDays, Clock, MapPin, CreditCard, AlertCircle, CheckCircle2, QrCode, Download } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface Seat {
  id: string;
  row: number;
  number: number;
  category: string;
  price: number;
  status: 'available' | 'reserved' | 'selected';
}

const BookTickets = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // Form data for payment
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  const parsedMatchId = parseInt(matchId || '0');
  const match = matches.find(m => m.id === parsedMatchId);
  const homeTeam = match ? teams.find(t => t.id === match.homeTeam) : null;
  const awayTeam = match ? teams.find(t => t.id === match.awayTeam) : null;
  
  // Redirect if match not found or no tickets available
  if (!match || !match.tickets || !match.tickets.available) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Match Not Available</h2>
            <p className="text-gray-600 mb-6">
              This match is either not found or tickets are not available for booking.
            </p>
            <Link to="/matches">
              <Button>Back to Matches</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Parse date
  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = matchDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSeats([]);
    setTotalPrice(0);
  };
  
  // Handle seat selection
  const handleSeatSelection = (seats: Seat[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setCurrentStep(2);
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle payment submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        variant: "destructive",
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
      });
      return;
    }
    
    if (paymentMethod === 'upi') {
      setShowQrCode(true);
      setTimeout(() => {
        setShowQrCode(false);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setIsPaymentComplete(true);
          setCurrentStep(3);
          toast({
            title: "Payment Successful!",
            description: "Your tickets have been booked successfully.",
          });
        }, 2000);
      }, 3000);
      return;
    }
    
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      // Validate credit/debit card details
      if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvv) {
        toast({
          variant: "destructive",
          title: "Incomplete Card Details",
          description: "Please fill in all card details to proceed with payment.",
        });
        return;
      }
    }
    
    // Process payment
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentComplete(true);
      setCurrentStep(3);
      
      // Show success toast
      toast({
        title: "Payment Successful!",
        description: "Your tickets have been booked successfully.",
      });
    }, 2000);
  };

  // Function to download the ticket as PDF (simulated)
  const downloadTicket = () => {
    if (!ticketRef.current) return;
    
    toast({
      title: "Downloading Ticket",
      description: "Your e-ticket is being downloaded.",
    });
    
    // In a real implementation, you would use a library like html2canvas + jspdf
    // to convert the ticket DOM element to a PDF
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your e-ticket has been downloaded successfully.",
      });
    }, 1500);
  };
  
  // Reset booking when payment is completed
  useEffect(() => {
    if (isPaymentComplete) {
      // In a real app, we would save the booking to the database
      console.log("Booking completed:", {
        match,
        seats: selectedSeats,
        totalAmount: totalPrice,
        paymentMethod
      });
    }
  }, [isPaymentComplete]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header with match details */}
        <div className="bg-ipl-blue text-white py-8">
          <div className="container mx-auto px-4">
            <Link to="/matches" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Matches
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Book Tickets</h1>
                <div className="flex items-center mb-1">
                  <span className="font-medium">{homeTeam?.name} vs {awayTeam?.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center text-sm text-white/80 gap-y-1 md:gap-x-4">
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formattedTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {match.venue}
                  </div>
                </div>
              </div>
              
              {/* Booking progress indicator */}
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-ipl-gold text-black' : 'bg-white/30 text-white'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm">Select Seats</span>
                </div>
                <div className={`mx-2 w-8 h-1 ${currentStep >= 2 ? 'bg-ipl-gold' : 'bg-white/30'}`}></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-ipl-gold text-black' : 'bg-white/30 text-white'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm">Payment</span>
                </div>
                <div className={`mx-2 w-8 h-1 ${currentStep >= 3 ? 'bg-ipl-gold' : 'bg-white/30'}`}></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-ipl-gold text-black' : 'bg-white/30 text-white'}`}>
                    3
                  </div>
                  <span className="ml-2 text-sm">Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          {/* Step 1: Select Seats */}
          {currentStep === 1 && (
            <div>
              {/* Select Ticket Category */}
              {!selectedCategory ? (
                <div>
                  <h2 className="text-xl font-bold mb-6">Select Ticket Category</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {match.tickets.priceCategories.map((category) => (
                      <Card 
                        key={category.name} 
                        className={`p-6 cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 ${
                          selectedCategory === category.name.toLowerCase() ? 'border-ipl-blue' : 'border-transparent'
                        }`}
                        onClick={() => handleCategorySelect(category.name.toLowerCase())}
                      >
                        <div className="flex flex-col h-full">
                          <div className="mb-4">
                            <div className={`w-full h-1 mb-2 bg-${
                              category.name === 'Premium' ? 'ipl-gold' : 
                              category.name === 'Executive' ? 'ipl-blue' : 'ipl-green'
                            }`}></div>
                            <h3 className="font-bold text-xl">{category.name}</h3>
                            <p className="text-gray-500 my-2">
                              {category.name === 'Premium' 
                                ? 'Best seats with perfect view and comfort' 
                                : category.name === 'Executive'
                                ? 'Good view with covered seating'
                                : 'Economic seating with decent view'
                              }
                            </p>
                          </div>
                          <div className="mt-auto">
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500">Starting from</p>
                              <p className="text-2xl font-bold">₹{category.price.toLocaleString()}</p>
                            </div>
                            <div className="w-full mt-4">
                              <Button 
                                variant="outline" 
                                className="w-full border-ipl-blue text-ipl-blue hover:bg-ipl-blue hover:text-white"
                              >
                                Select {category.name}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h2 className="text-xl font-bold">Select Your Seats</h2>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedCategory('')}
                      className="mt-2 md:mt-0"
                    >
                      Change Category
                    </Button>
                  </div>
                  
                  <SeatSelector 
                    matchId={parsedMatchId}
                    category={selectedCategory}
                    onSelectionComplete={handleSeatSelection}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Complete Your Payment</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="font-semibold mb-4">Select Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.id}
                            className={`border rounded-md p-4 flex items-center cursor-pointer ${
                              paymentMethod === method.id ? 'border-ipl-blue bg-blue-50' : 'border-gray-200'
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} className="mr-3" />
                            <Label htmlFor={method.id} className="flex-grow cursor-pointer">
                              {method.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* QR Code for UPI payment */}
                  {showQrCode && paymentMethod === 'upi' && (
                    <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg bg-white mb-6">
                      <QrCode className="w-32 h-32 mb-4 text-ipl-blue" />
                      <p className="text-center mb-2 font-medium">Scan to pay ₹{totalPrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Payment will be processed automatically once completed</p>
                      <div className="mt-4 animate-pulse bg-blue-50 text-center rounded p-2 w-full">
                        <p className="text-sm text-ipl-blue">Waiting for payment...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Card details form (shown only for credit/debit card options) */}
                  {(paymentMethod === 'credit' || paymentMethod === 'debit') && !showQrCode && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Name on card"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </form>
                  )}
                  
                  {/* UPI/Wallet/NetBanking options would go here in a real app */}
                  {(paymentMethod === 'netbanking' || paymentMethod === 'wallet') && !showQrCode && (
                    <div className="rounded-md border border-gray-200 p-6 text-center bg-gray-50">
                      <p className="mb-2">In a real application, this would show:</p>
                      {paymentMethod === 'netbanking' && <p>Bank selection options</p>}
                      {paymentMethod === 'wallet' && <p>Digital wallet login options</p>}
                    </div>
                  )}
                  
                  <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back to Seat Selection
                    </Button>
                    <Button 
                      onClick={handlePaymentSubmit} 
                      disabled={isProcessing || !paymentMethod || showQrCode}
                      className="bg-ipl-blue hover:bg-ipl-blue/90"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Pay ₹{totalPrice.toLocaleString()}
                          <CreditCard size={16} className="ml-2" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4">
                    <h3 className="font-semibold mb-4 pb-2 border-b border-gray-200">Order Summary</h3>
                    
                    <div className="space-y-4 mb-4">
                      <div className="flex justify-between">
                        <span>Match</span>
                        <span className="font-medium">{homeTeam?.code} vs {awayTeam?.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date</span>
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time</span>
                        <span>{formattedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Venue</span>
                        <span>{match.venue.split(',')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category</span>
                        <span className="capitalize">{selectedCategory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seats</span>
                        <span>{selectedSeats.length} tickets</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between mb-1">
                        <span>Ticket Price</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm text-gray-500">
                        <span>Convenience Fee</span>
                        <span>₹{(totalPrice * 0.05).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>₹{(totalPrice + parseInt((totalPrice * 0.05).toFixed(0))).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-center">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-8 text-center">
                Your tickets have been booked successfully. An email with your e-tickets has been sent to your registered email address.
              </p>
              
              <div ref={ticketRef} className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <div className="border-b border-dashed border-gray-300 pb-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-xl">IPL 2025</h3>
                      <p className="text-ipl-blue font-medium">{homeTeam?.name} vs {awayTeam?.name}</p>
                    </div>
                    <div className="h-20 w-20 flex items-center justify-center">
                      <img src={homeTeam?.logo} alt={homeTeam?.name} className="h-16 w-16 object-contain" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{formattedDate}, {formattedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-medium">{match.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium capitalize">{selectedCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-medium">
                      {selectedSeats.map(seat => `R${seat.row}-${seat.number}`).join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-medium">IPL-{Date.now().toString().substring(5, 13)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium">₹{(totalPrice + parseInt((totalPrice * 0.05).toFixed(0))).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-sm">Please show this ticket at the entrance. Have a great match day!</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-ipl-blue hover:bg-ipl-blue/90 flex items-center"
                  onClick={downloadTicket}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download E-Tickets
                </Button>
                <Link to="/">
                  <Button variant="outline">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default BookTickets;
