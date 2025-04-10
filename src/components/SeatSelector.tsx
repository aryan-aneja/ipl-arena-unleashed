
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateSeats } from '@/lib/data';

interface Seat {
  id: string;
  row: number;
  number: number;
  category: string;
  price: number;
  status: 'available' | 'reserved' | 'selected';
}

interface SeatSelectorProps {
  matchId: number;
  category: string;
  onSelectionComplete: (selectedSeats: Seat[], totalPrice: number) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ matchId, category, onSelectionComplete }) => {
  // Generate seats for the given match and category
  const initialSeats = generateSeats(matchId, category);
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  // Calculate total price
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  // Group seats by rows for display
  const seatsByRow = seats.reduce((acc: { [key: number]: Seat[] }, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});
  
  const handleSeatClick = (seatId: string) => {
    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId) {
        if (seat.status === 'available') {
          const updatedSeat = { ...seat, status: 'selected' as const };
          setSelectedSeats([...selectedSeats, updatedSeat]);
          return updatedSeat;
        } else if (seat.status === 'selected') {
          setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
          return { ...seat, status: 'available' as const };
        }
      }
      return seat;
    });
    
    setSeats(updatedSeats);
  };
  
  const handleConfirmSelection = () => {
    if (selectedSeats.length > 0) {
      onSelectionComplete(selectedSeats, totalPrice);
    }
  };
  
  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-2 text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Seating</h3>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <div className="w-full bg-gray-300 h-6 rounded-t-lg flex items-center justify-center text-sm font-medium mb-6">
          PITCH VIEW
        </div>
        
        <div className="overflow-x-auto">
          {/* Seat rows */}
          {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
            <div key={rowNum} className="flex justify-center mb-2">
              <div className="w-6 flex items-center justify-center font-semibold text-sm mr-2">
                {rowNum}
              </div>
              {rowSeats.map(seat => (
                <div 
                  key={seat.id}
                  className={`
                    seat rounded
                    ${seat.status === 'available' ? 'seat-available' : ''}
                    ${seat.status === 'selected' ? 'seat-selected' : ''}
                    ${seat.status === 'reserved' ? 'seat-reserved' : ''}
                  `}
                  onClick={() => seat.status !== 'reserved' && handleSeatClick(seat.id)}
                >
                  {seat.number}
                </div>
              ))}
              <div className="w-6 flex items-center justify-center font-semibold text-sm ml-2">
                {rowNum}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-ipl-green rounded mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-ipl-blue rounded mr-2"></div>
            <span className="text-sm">Selected ({selectedSeats.length})</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
            <span className="text-sm">Reserved</span>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-sm mb-1">Selected: <span className="font-bold">{selectedSeats.length} seats</span></p>
          <p className="text-lg font-bold mb-3">Total: ₹{totalPrice.toLocaleString()}</p>
          <Button 
            disabled={selectedSeats.length === 0}
            onClick={handleConfirmSelection}
            className="bg-ipl-blue hover:bg-ipl-blue/90"
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
