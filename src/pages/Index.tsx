import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WalletConnect } from "@/components/WalletConnect";
import { EventCard } from "@/components/EventCard";
import { TransactionStatus, TransactionStatus as TxStatus } from "@/components/TransactionStatus";
import { NFTTicket } from "@/components/NFTTicket";
import { Zap, Shield, Ticket, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const mockEvents = [
  {
    id: "1",
    title: "Neon Dreams Festival",
    date: "March 15, 2024 • 8:00 PM",
    location: "Digital Arena, Metaverse City",
    price: 50,
    availableTickets: 120,
    soldTickets: 365,
    burntTickets: 15,
    totalTickets: 500,
    category: "Music Festival",
  },
  {
    id: "2", 
    title: "Blockchain Summit 2024",
    date: "April 2, 2024 • 10:00 AM",
    location: "Convention Center, Tech District",
    price: 75,
    availableTickets: 0,
    soldTickets: 185,
    burntTickets: 15,
    totalTickets: 200,
    category: "Conference",
  },
  {
    id: "3",
    title: "Cyber Punk Concert",
    date: "May 20, 2024 • 9:00 PM", 
    location: "Holographic Hall, Neo Tokyo",
    price: 35,
    availableTickets: 89,
    soldTickets: 205,
    burntTickets: 6,
    totalTickets: 300,
    category: "Concert",
  },
];

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<TxStatus | null>(null);
  const [purchasedTickets, setPurchasedTickets] = useState<any[]>([]);
  const [events, setEvents] = useState(mockEvents);

  const handleWalletConnection = (connected: boolean, address?: string) => {
    setIsWalletConnected(connected);
    setWalletAddress(address || null);
  };

  const handleBuyTicket = (eventId: string) => {
    if (!isWalletConnected) return;
    
    const event = events.find(e => e.id === eventId);
    if (!event || event.availableTickets === 0) return;

    setTransactionStatus("pending");
    
    // Simulate transaction processing
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.8) {
        // 20% chance of fraud detection - ticket gets burnt
        setTransactionStatus("fraud");
        setEvents(prevEvents => 
          prevEvents.map(e => 
            e.id === eventId 
              ? { ...e, availableTickets: e.availableTickets - 1, burntTickets: e.burntTickets + 1 }
              : e
          )
        );
      } else {
        // 80% chance of success
        const ticketId = `TKT${Date.now()}`;
        const newTicket = {
          ticketId,
          eventTitle: event.title,
          eventDate: event.date,
          eventLocation: event.location,
          price: event.price,
          status: "valid" as const,
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        };
        setPurchasedTickets(prev => [...prev, newTicket]);
        setTransactionStatus("success");
        
        // Update event statistics
        setEvents(prevEvents => 
          prevEvents.map(e => 
            e.id === eventId 
              ? { ...e, availableTickets: e.availableTickets - 1, soldTickets: e.soldTickets + 1 }
              : e
          )
        );
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            NFT TICKETS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure, verifiable, and fraud-proof event tickets powered by blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Zap className="mr-2" />
              Explore Events
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Why Choose NFT Tickets?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card border-accent/20 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Fraud Protection</h3>
              <p className="text-muted-foreground">
                Advanced blockchain verification prevents counterfeiting and automatically burns fraudulent tickets
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-accent/20 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">True Ownership</h3>
              <p className="text-muted-foreground">
                Own your tickets as NFTs - transfer, resell, or keep as collectibles with full ownership rights
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-accent/20 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                No hidden fees, transparent blockchain transactions, and fair market-driven resale prices
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Wallet Connection - Only show if not connected */}
      {!isWalletConnected && (
        <section className="py-12 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground">Connect your Leather wallet once to start buying NFT tickets</p>
            </div>
            <WalletConnect onConnectionChange={handleWalletConnection} />
          </div>
        </section>
      )}

      {/* Wallet Status - Show if connected */}
      {isWalletConnected && (
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-success">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="font-medium">Wallet Connected: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
            </div>
          </div>
        </section>
      )}

      {/* Transaction Status */}
      {transactionStatus && (
        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto">
            <TransactionStatus
              status={transactionStatus}
              txId={transactionStatus === "success" ? `0x${Math.random().toString(16).substr(2, 64)}` : undefined}
              ticketId={transactionStatus === "success" ? `TKT${Date.now()}` : undefined}
              eventName="Neon Dreams Festival"
              onClose={() => setTransactionStatus(null)}
            />
          </div>
        </section>
      )}

      {/* Events Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onBuyTicket={handleBuyTicket}
                walletConnected={isWalletConnected}
              />
            ))}
          </div>
        </div>
      </section>

      {/* My Tickets Section */}
      {purchasedTickets.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-r from-accent/5 to-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
              My NFT Tickets
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedTickets.map((ticket, index) => (
                <NFTTicket
                  key={index}
                  {...ticket}
                  onViewOnExplorer={() => console.log("View on explorer:", ticket.txHash)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;