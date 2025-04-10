
import React, { useRef } from 'react';
import { Barcode, Calendar, MapPin, User, Clock, CreditCard } from 'lucide-react';
import html2canvas from 'html2canvas';

interface TicketProps {
  matchId: number;
  matchDate: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  venue: string;
  seatInfo: string[];
  totalAmount: number;
  paymentMethod: string;
  bookingId: string;
}

const DownloadableTicket: React.FC<TicketProps> = ({
  matchId,
  matchDate,
  homeTeam,
  homeTeamLogo,
  awayTeam,
  awayTeamLogo,
  venue,
  seatInfo,
  totalAmount,
  paymentMethod,
  bookingId
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `IPL_Ticket_${bookingId}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating ticket:', error);
    }
  };

  return (
    <div className="mb-6">
      <div ref={ticketRef} className="ticket max-w-2xl mx-auto">
        <div className="ticket-header">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">IPL ARENA</h2>
              <p className="text-sm">Official Match Ticket</p>
            </div>
            <div>
              <p className="text-sm">Booking ID: {bookingId}</p>
            </div>
          </div>
        </div>
        
        <div className="ticket-body">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-ipl-blue" />
              <span className="font-medium">{matchDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-ipl-blue" />
              <span>7:30 PM IST</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <div className="h-16 w-16 flex items-center justify-center mx-auto">
                <img 
                  src={homeTeamLogo} 
                  alt={homeTeam}
                  className="max-w-full max-h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Team";
                  }}
                />
              </div>
              <p className="font-bold mt-2">{homeTeam}</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Match {matchId}</p>
              <p className="font-bold text-xl">VS</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 flex items-center justify-center mx-auto">
                <img 
                  src={awayTeamLogo} 
                  alt={awayTeam}
                  className="max-w-full max-h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Team";
                  }}
                />
              </div>
              <p className="font-bold mt-2">{awayTeam}</p>
            </div>
          </div>
        </div>
        
        <div className="ticket-divider"></div>
        
        <div className="ticket-details">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Venue</p>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                <p className="font-medium">{venue}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Seats</p>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-500" />
                <p className="font-medium">{seatInfo.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ticket-footer">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-bold">₹ {totalAmount.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <div className="flex items-center">
                <CreditCard className="mr-1 h-4 w-4 text-gray-500" />
                <p>{paymentMethod}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center">
              <Barcode className="h-12 w-full text-black" />
              <p className="text-xs text-center mt-1 text-gray-500">
                {Array(12).fill(0).map(() => Math.floor(Math.random() * 10)).join('')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button
          onClick={downloadTicket}
          className="bg-ipl-blue hover:bg-ipl-blue/80 text-white font-bold py-2 px-4 rounded"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default DownloadableTicket;
