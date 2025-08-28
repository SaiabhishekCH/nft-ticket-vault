import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";

interface NFTTicketProps {
  ticketId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  seatSection?: string;
  price: number;
  currency?: string;
  status: "valid" | "used" | "burnt";
  txHash?: string;
  onViewOnExplorer?: () => void;
}

export const NFTTicket = ({
  ticketId,
  eventTitle,
  eventDate,
  eventLocation,
  seatSection,
  price,
  currency = "STX",
  status,
  txHash,
  onViewOnExplorer
}: NFTTicketProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "valid":
        return {
          badge: "Valid",
          badgeClass: "bg-success text-success-foreground",
          cardClass: "border-success/30 shadow-success",
        };
      case "used":
        return {
          badge: "Used",
          badgeClass: "bg-muted text-muted-foreground",
          cardClass: "border-muted/30 opacity-75",
        };
      case "burnt":
        return {
          badge: "Burnt (Fraud)",
          badgeClass: "bg-fraud text-fraud-foreground",
          cardClass: "border-fraud/30 shadow-fraud opacity-60",
        };
      default:
        return {
          badge: "Unknown",
          badgeClass: "bg-muted text-muted-foreground",
          cardClass: "border-muted/30",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Card className={`overflow-hidden bg-gradient-card ${config.cardClass} relative`}>
      {/* Holographic Header */}
      <div className="bg-gradient-holographic p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary-foreground/20">
              <Ticket className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-primary-foreground font-bold text-lg">NFT TICKET</div>
              <div className="text-primary-foreground/80 text-sm font-mono">#{ticketId}</div>
            </div>
          </div>
          
          <Badge className={config.badgeClass}>
            {config.badge}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-foreground mb-4">{eventTitle}</h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-foreground">{eventDate}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-foreground">{eventLocation}</span>
          </div>
          
          {seatSection && (
            <div className="flex items-center gap-3">
              <Ticket className="w-4 h-4 text-accent" />
              <span className="text-foreground">Section: {seatSection}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Price: <span className="text-foreground font-semibold">{price} {currency}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {status === "valid" && (
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <QrCode className="w-6 h-6 text-accent" />
              </div>
            )}
            
            {onViewOnExplorer && txHash && (
              <Button variant="ghost" size="sm" onClick={onViewOnExplorer}>
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};