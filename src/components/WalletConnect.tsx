import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, CheckCircle, AlertTriangle } from "lucide-react";

interface WalletConnectProps {
  onConnectionChange: (connected: boolean, address?: string) => void;
}

export const WalletConnect = ({ onConnectionChange }: WalletConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection for demo
      // In production, you'd use @stacks/connect here
      setTimeout(() => {
        const mockAddress = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";
        setWalletAddress(mockAddress);
        setIsConnected(true);
        onConnectionChange(true, mockAddress);
        setIsConnecting(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    onConnectionChange(false);
  };

  return (
    <Card className="p-6 bg-gradient-card border-accent/20">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Leather Wallet</h3>
          {isConnected ? (
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Connect to buy NFT tickets</p>
          )}
        </div>

        {isConnected ? (
          <Button variant="outline" onClick={disconnectWallet}>
            Disconnect
          </Button>
        ) : (
          <Button 
            variant="wallet" 
            onClick={connectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </div>
    </Card>
  );
};