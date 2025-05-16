
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gift, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Reward {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsRequired: number;
  category: string;
  isNew?: boolean;
  isExclusive?: boolean;
  availableUntil?: string;
}

const rewards: Reward[] = [
  {
    id: 'amazon-10',
    title: '$10 Amazon Gift Card',
    description: 'Redeem your eco points for a $10 Amazon Gift Card to use on your next purchase.',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdpZnQlMjBjYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 1000,
    category: 'shopping',
    isNew: true
  },
  {
    id: 'zoo-tickets',
    title: 'Two Zoo Tickets',
    description: 'Get free admission for two to your local zoo and learn about wildlife conservation efforts.',
    image: 'https://images.unsplash.com/photo-1503919005314-34926bf2471b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHpvb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 750,
    category: 'experience'
  },
  {
    id: 'plant-tree',
    title: 'Plant a Tree in Your Name',
    description: 'We\'ll plant a tree in a deforested area and send you a certificate with GPS coordinates.',
    image: 'https://images.unsplash.com/photo-1513264648640-5a1bd0a1db1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyZWUlMjBwbGFudGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 500,
    category: 'environment'
  },
  {
    id: 'sustainable-cup',
    title: 'Reusable Coffee Cup',
    description: 'A high-quality insulated coffee cup made from recycled materials - perfect for your daily coffee routine.',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZSUyMGN1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 350,
    category: 'lifestyle'
  },
  {
    id: 'garden-kit',
    title: 'Home Garden Starter Kit',
    description: 'Begin your gardening journey with this complete starter kit including seeds, pots, and soil.',
    image: 'https://images.unsplash.com/photo-1647354370532-0343df577fbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbiUyMGtpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 450,
    category: 'lifestyle'
  },
  {
    id: 'eco-workshop',
    title: 'Sustainability Workshop',
    description: 'Attend an exclusive online workshop with environmental experts on sustainable living practices.',
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvcmtzaG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 200,
    category: 'education',
    isExclusive: true
  },
  {
    id: 'donation-wwf',
    title: '25$ Donation to WWF',
    description: 'We\'ll make a $25 donation in your name to the World Wildlife Fund to support conservation efforts.',
    image: 'https://images.unsplash.com/photo-1566576088842-6816db6430d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3dmfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 600,
    category: 'charity'
  },
  {
    id: 'premium-month',
    title: '1 Month Premium Membership',
    description: 'Upgrade to premium membership with advanced tracking features and exclusive content.',
    image: 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByZW1pdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    pointsRequired: 800,
    category: 'membership',
    availableUntil: '2025-06-30'
  },
];

const RewardsPage = () => {
  const userPoints = 840;
  const { toast } = useToast();

  const categories = Array.from(new Set(rewards.map(reward => reward.category)));

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.pointsRequired) {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title}. Check your email for details.`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.pointsRequired - userPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
            Eco Rewards
          </h2>
          
          <div className="max-w-5xl mx-auto mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-eco-gradient p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-1">Your Eco Points</h3>
                  <p className="text-white text-opacity-80">Redeem points for exciting rewards</p>
                </div>
                <div className="text-4xl font-bold">{userPoints}</div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card className="bg-eco-light border-none">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-sm mb-1">Lifetime Points</h4>
                    <p className="text-2xl font-bold text-eco-dark">1,245</p>
                  </CardContent>
                </Card>
                <Card className="bg-eco-light border-none">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-sm mb-1">Points This Month</h4>
                    <p className="text-2xl font-bold text-eco-dark">320</p>
                  </CardContent>
                </Card>
                <Card className="bg-eco-light border-none">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-sm mb-1">Rewards Redeemed</h4>
                    <p className="text-2xl font-bold text-eco-dark">3</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Next reward milestone: $10 Amazon Gift Card</p>
                <p className="text-sm font-medium">{userPoints}/1000 points</p>
              </div>
              <Progress value={(userPoints / 1000) * 100} className="h-2" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {categories.map(category => (
              <div key={category} className="col-span-full">
                <h3 className="capitalize text-xl font-semibold mb-4 flex items-center text-eco-dark">
                  <Gift className="h-5 w-5 mr-2" />
                  {category} Rewards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rewards
                    .filter(reward => reward.category === category)
                    .map(reward => (
                      <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
                        <div className="relative h-48">
                          <img 
                            src={reward.image} 
                            alt={reward.title}
                            className="w-full h-full object-cover"
                          />
                          {reward.isNew && (
                            <Badge className="absolute top-2 right-2 bg-eco text-white">
                              New
                            </Badge>
                          )}
                          {reward.isExclusive && (
                            <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
                              Exclusive
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{reward.title}</CardTitle>
                          {reward.availableUntil && (
                            <CardDescription className="flex items-center text-amber-600">
                              <Info className="h-3 w-3 mr-1" />
                              Available until {new Date(reward.availableUntil).toLocaleDateString()}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="py-0 flex-grow">
                          <p className="text-gray-600 text-sm">{reward.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="font-bold text-eco-dark">
                            {reward.pointsRequired} points
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm" 
                                  disabled={userPoints < reward.pointsRequired}
                                  onClick={() => handleRedeemReward(reward)}
                                  className={userPoints >= reward.pointsRequired ? "bg-eco hover:bg-eco-dark text-white" : ""}
                                >
                                  Redeem
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                              </TooltipTrigger>
                              {userPoints < reward.pointsRequired && (
                                <TooltipContent>
                                  <p>You need {reward.pointsRequired - userPoints} more points</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-5xl mx-auto">
            <h3 className="font-semibold mb-4">How to Earn More Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-eco border-opacity-30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Daily Actions</h4>
                <ul className="text-sm space-y-2">
                  <li>• Record sustainable transportation (+5 pts)</li>
                  <li>• Track energy-saving activities (+3 pts)</li>
                  <li>• Waste recycling and composting (+2 pts)</li>
                </ul>
              </div>
              <div className="border border-eco border-opacity-30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Challenges</h4>
                <ul className="text-sm space-y-2">
                  <li>• Complete weekly eco challenges (+25 pts)</li>
                  <li>• Join community cleanup events (+50 pts)</li>
                  <li>• Participate in eco workshops (+15 pts)</li>
                </ul>
              </div>
              <div className="border border-eco border-opacity-30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Education</h4>
                <ul className="text-sm space-y-2">
                  <li>• Complete eco knowledge quizzes (+10 pts)</li>
                  <li>• Read sustainability articles (+5 pts)</li>
                  <li>• Share eco tips with friends (+3 pts)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsPage;
