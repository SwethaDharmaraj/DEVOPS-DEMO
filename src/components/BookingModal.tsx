import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard, Download, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TravelPackage } from './TravelCard';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: TravelPackage | null;
  currency: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  package: pkg,
  currency
}) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const { toast } = useToast();

  if (!isOpen || !pkg) return null;

  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$',
      AUD: 'A$', CHF: 'Fr', CNY: '¥', INR: '₹'
    };
    return symbols[curr] || '$';
  };

  const totalPrice = pkg.price * bookingData.guests;
  const taxes = Math.round(totalPrice * 0.15);
  const finalTotal = totalPrice + taxes;

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBookingId = 'TPB' + Date.now().toString().slice(-8);
    setBookingId(newBookingId);
    setBookingConfirmed(true);
    setIsProcessing(false);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking ID is ${newBookingId}. Check your email for details.`
    });
  };

  const downloadBill = () => {
    const billContent = `
TRAVEL PLANNER BOOKING RECEIPT
================================

Booking ID: ${bookingId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

CUSTOMER DETAILS
----------------
Name: ${bookingData.fullName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

TRIP DETAILS
------------
Package: ${pkg.title}
Destination: ${pkg.location}
Duration: ${pkg.duration}
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Guests: ${bookingData.guests}
Rooms: ${bookingData.rooms}

PRICE BREAKDOWN
---------------
Base Price (${bookingData.guests} guests): ${getCurrencySymbol(currency)}${totalPrice}
Taxes & Fees: ${getCurrencySymbol(currency)}${taxes}
--------------------------------
TOTAL AMOUNT: ${getCurrencySymbol(currency)}${finalTotal}

PAYMENT DETAILS
---------------
Payment Method: Credit Card (**** **** **** ${bookingData.cardNumber.slice(-4)})
Payment Status: CONFIRMED
Transaction ID: TXN${Date.now()}

HIGHLIGHTS INCLUDED
-------------------
${pkg.highlights.map(highlight => `• ${highlight}`).join('\n')}

TERMS & CONDITIONS
------------------
• Booking is non-refundable after 24 hours
• Changes subject to availability and fees
• Travel insurance recommended
• Valid ID required for check-in

For support: support@travelplanner.com
Phone: +1-800-TRAVEL-1
Website: www.travelplanner.com

Thank you for choosing Travel Planner!
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TravelPlanner-Receipt-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Receipt Downloaded",
      description: "Your booking receipt has been downloaded successfully."
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-float)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {bookingConfirmed ? 'Booking Confirmed' : 'Book Your Trip'}
            </h2>
            <p className="text-muted-foreground">{pkg.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!bookingConfirmed ? (
          <div className="p-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNum 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-20 h-1 mx-4 ${
                      step > stepNum ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Trip Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-in Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            type="date"
                            value={bookingData.checkIn}
                            onChange={(e) => handleInputChange('checkIn', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-out Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            type="date"
                            value={bookingData.checkOut}
                            onChange={(e) => handleInputChange('checkOut', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Guests</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <select
                            value={bookingData.guests}
                            onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                            className="w-full h-12 pl-10 pr-4 bg-background border border-input rounded-md text-foreground"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                              <option key={num} value={num}>
                                {num} Guest{num > 1 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Rooms</label>
                        <select
                          value={bookingData.rooms}
                          onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                          className="w-full h-12 px-3 bg-background border border-input rounded-md text-foreground"
                        >
                          {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>
                              {num} Room{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requests</label>
                      <textarea
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        placeholder="Any special requirements or requests..."
                        className="w-full h-24 px-3 py-2 bg-background border border-input rounded-md text-foreground resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        type="text"
                        value={bookingData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <Input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Payment Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          type="text"
                          value={bookingData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <Input
                          type="text"
                          value={bookingData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          type="text"
                          value={bookingData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                        <Input
                          type="text"
                          value={bookingData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Booking Summary */}
              <div className="bg-muted/30 p-6 rounded-xl h-fit">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{pkg.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {pkg.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {pkg.duration}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price ({bookingData.guests} guests)</span>
                      <span>{getCurrencySymbol(currency)}{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span>{getCurrencySymbol(currency)}{taxes}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{getCurrencySymbol(currency)}{finalTotal}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h5 className="font-semibold mb-2">Includes:</h5>
                    <ul className="space-y-1">
                      {pkg.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={step === 1 ? onClose : handleBack}
                disabled={isProcessing}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              
              <Button
                onClick={step === 3 ? handlePayment : handleNext}
                disabled={isProcessing}
                className="btn-hero"
              >
                {isProcessing ? 'Processing...' : step === 3 ? 'Confirm Payment' : 'Next'}
              </Button>
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-6 text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              Your trip to {pkg.location} has been successfully booked.
            </p>

            <div className="bg-muted/30 p-4 rounded-lg mb-6">
              <div className="text-sm text-muted-foreground">Booking ID</div>
              <div className="text-lg font-bold">{bookingId}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div className="text-muted-foreground">Check-in</div>
                <div className="font-semibold">{bookingData.checkIn}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Check-out</div>
                <div className="font-semibold">{bookingData.checkOut}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Guests</div>
                <div className="font-semibold">{bookingData.guests}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Paid</div>
                <div className="font-semibold">{getCurrencySymbol(currency)}{finalTotal}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadBill}
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button
                onClick={onClose}
                className="btn-hero"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};