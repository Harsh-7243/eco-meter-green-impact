
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Home, Calculator, Award, MessageSquare, Users, Gift, User, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item: string) => {
    toast({
      title: `Navigating to ${item}`,
      description: `You selected the ${item} page`,
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative z-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-eco-dark" />
            </Button>
            <div className="flex items-center">
              <div className="bg-eco rounded-full p-2 mr-2">
                <div className="text-white text-xl font-bold">🍃</div>
              </div>
              <h1 className="text-eco-dark font-bold text-xl hidden sm:block">Eco Meter</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavItem icon={<Home className="h-4 w-4 mr-1" />} label="Home" onClick={() => handleMenuItemClick("Home")} />
            <NavItem icon={<Calculator className="h-4 w-4 mr-1" />} label="Calculator" onClick={() => handleMenuItemClick("Calculator")} />
            <NavItem icon={<Award className="h-4 w-4 mr-1" />} label="Achievements" onClick={() => handleMenuItemClick("Achievements")} />
            <NavItem icon={<MessageSquare className="h-4 w-4 mr-1" />} label="Eco Tips" onClick={() => handleMenuItemClick("Eco Tips")} />
            <NavItem icon={<Users className="h-4 w-4 mr-1" />} label="Leaderboard" onClick={() => handleMenuItemClick("Leaderboard")} />
          </div>

          <Button variant="ghost" onClick={() => handleMenuItemClick("Profile")} className="flex items-center">
            <User className="h-5 w-5 text-eco-dark mr-1" />
            <span className="hidden sm:inline">Profile</span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleMenuToggle}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform z-50 overflow-y-auto",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-eco rounded-full p-2 mr-2">
              <div className="text-white text-xl font-bold">🍃</div>
            </div>
            <h1 className="text-eco-dark font-bold text-xl">Eco Meter</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleMenuToggle}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-2">
          <SidebarItem icon={<Home className="h-5 w-5" />} label="Home" onClick={() => handleMenuItemClick("Home")} />
          <SidebarItem icon={<Menu className="h-5 w-5" />} label="Quick Actions" onClick={() => handleMenuItemClick("Quick Actions")} />
          <SidebarItem icon={<Calculator className="h-5 w-5" />} label="Calculator" onClick={() => handleMenuItemClick("Calculator")} />
          <SidebarItem icon={<MessageSquare className="h-5 w-5" />} label="Eco Tips" onClick={() => handleMenuItemClick("Eco Tips")} />
          <SidebarItem icon={<Award className="h-5 w-5" />} label="Achievements" onClick={() => handleMenuItemClick("Achievements")} />
          <SidebarItem icon={<MessageSquare className="h-5 w-5" />} label="Posts" onClick={() => handleMenuItemClick("Posts")} />
          <SidebarItem icon={<Users className="h-5 w-5" />} label="Leaderboard" onClick={() => handleMenuItemClick("Leaderboard")} />
          <SidebarItem icon={<Gift className="h-5 w-5" />} label="Rewards" onClick={() => handleMenuItemClick("Rewards")} />
          <SidebarItem icon={<User className="h-5 w-5" />} label="Profile" onClick={() => handleMenuItemClick("Profile")} />
          
          <div className="border-t mt-4 pt-4">
            <SidebarItem icon={<LogOut className="h-5 w-5" />} label="Logout" onClick={() => handleMenuItemClick("Logout")} />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <Button variant="ghost" onClick={onClick} className="flex items-center text-muted-foreground hover:text-foreground">
    {icon}
    <span>{label}</span>
  </Button>
);

const SidebarItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <div
    className="flex items-center px-4 py-3 hover:bg-eco-light cursor-pointer"
    onClick={onClick}
  >
    <div className="mr-3 text-eco-dark">{icon}</div>
    <span className="text-gray-800">{label}</span>
  </div>
);

export default Navbar;
