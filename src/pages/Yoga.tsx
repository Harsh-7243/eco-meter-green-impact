
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Timer, Play, Check, Pause } from "lucide-react";
import { Link } from "react-router-dom";

interface YogaRoutine {
  id: string;
  title: string;
  pose: string;
  quote: string;
  description: string;
  imageUrl: string;
}

interface YogaAction {
  action: string;
  points: number;
  description: string;
}

const yogaRoutines: YogaRoutine[] = [
  {
    id: "morning-mindfulness",
    title: "Morning Mindfulness Yoga",
    pose: "Easy Seated Pose (Sukhasana)",
    quote: "Begin your day with stillness.",
    description: "Start your day with a simple seated position. Focus on your breath and set intentions for the day. This gentle practice helps clear your mind and prepare you for the day ahead.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYSUyMG1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "sun-salutation",
    title: "Sun Salutation Start",
    pose: "Surya Namaskar Flow",
    quote: "Salute the sun, energize your soul.",
    description: "A flowing sequence of 12 gracefully linked asanas. This dynamic sequence warms up the body, increases circulation, and creates a moving meditation to energize your system.",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VuJTIwc2FsdXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "evening-stretch",
    title: "Evening Stretch Detox",
    pose: "Child's Pose or Forward Fold",
    quote: "Let go of the day's tension.",
    description: "Release the accumulated tension of the day with gentle forward folds and restorative poses. This practice helps calm the nervous system and prepare the body for restful sleep.",
    imageUrl: "https://images.unsplash.com/photo-1552286450-4a669f880062?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHlvZ2ElMjBjaGlsZCUyMHBvc2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "calm-breath",
    title: "5-Min Calm Breath",
    pose: "Cross-Leg Sitting with Hands on Knees",
    quote: "One breath at a time.",
    description: "A quick reset for your mind focused on deep, intentional breathing. Perfect for a midday break or whenever you need to center yourself during a busy schedule.",
    imageUrl: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHlvZ2ElMjBicmVhdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "nature-connect",
    title: "Nature-Connect Yoga",
    pose: "Tree Pose (Vrikshasana)",
    quote: "Balance with the Earth beneath you.",
    description: "Connect with the stability and strength of nature through balancing poses. This practice helps develop focus, concentration, and a sense of groundedness in your daily life.",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJlZSUyMHBvc2UlMjB5b2dhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
];

const yogaActions: YogaAction[] = [
  {
    action: "10-min Yoga",
    points: 5,
    description: "Basic stretches and poses",
  },
  {
    action: "20-min Outdoor Yoga",
    points: 10,
    description: "Practiced in a natural setting",
  },
  {
    action: "Guided Meditation",
    points: 5,
    description: "Follow a meditation session",
  },
  {
    action: "Deep Breathing (5 mins)",
    points: 3,
    description: "Simple pranayama exercise",
  },
  {
    action: "Digital Detox Yoga",
    points: 8,
    description: "Yoga without screens or distractions",
  },
];

// Basic MET formula for calorie calculation
const calculateCalories = (age: number, duration: number): number => {
  // Base MET value for yoga is around 3.0
  const MET = 3.0;
  // Approximate weight based on age (very simplified)
  const estimatedWeight = Math.max(50, 65 - (Math.abs(35 - age) * 0.15));
  // Calories burned = MET × weight (kg) × duration (hours)
  return Math.round(MET * estimatedWeight * (duration / 60));
};

const YogaRoutineCard = ({ routine }: { routine: YogaRoutine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [age, setAge] = useState<number>(30);
  const [duration, setDuration] = useState<number>(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const calories = calculateCalories(age, duration);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsTimerRunning(false);
            toast({
              title: "Timer Completed!",
              description: `You've completed ${duration} minutes of ${routine.title}!`,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isTimerRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining, duration, routine.title, toast]);

  const startTimer = () => {
    setTimeRemaining(duration * 60);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleComplete = () => {
    toast({
      title: "Action Completed!",
      description: `You've earned points for completing ${routine.title}!`,
    });
  };

  return (
    <Card className="mb-4 overflow-hidden border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
          <div className="flex items-center">
            <Meditation className="mr-2 h-5 w-5 text-green-600" />
            <h3 className="text-lg font-medium">{routine.title}</h3>
          </div>
          <div className="text-sm text-gray-500">
            {isOpen ? "Hide details" : "Show details"}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 pt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <img 
                  src={routine.imageUrl} 
                  alt={routine.pose} 
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="md:w-2/3">
                <h4 className="font-medium text-lg mb-1">{routine.pose}</h4>
                <p className="text-gray-600 mb-3">{routine.description}</p>
                <blockquote className="border-l-4 border-green-500 pl-3 italic text-gray-700 mb-4">
                  "{routine.quote}"
                </blockquote>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Age
                    </label>
                    <Input
                      type="number"
                      min={10}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 30)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      min={1}
                      max={60}
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 10)}
                      className="w-full"
                      disabled={isTimerRunning}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="text-sm text-gray-600 mb-1">
                    Estimated calories: <span className="font-bold">{calories} kcal</span> 
                    {isTimerRunning && (
                      <span className="ml-2 text-green-600 animate-pulse">Burning now...</span>
                    )}
                  </div>
                  
                  {timeRemaining > 0 ? (
                    <div className="flex items-center gap-3">
                      <div className="bg-white border rounded-md px-4 py-2 font-mono text-lg font-bold">
                        <Timer className="inline-block mr-2 h-4 w-4" />
                        {formatTime(timeRemaining)}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={isTimerRunning ? pauseTimer : startTimer}
                      >
                        {isTimerRunning ? (
                          <><Pause className="mr-1 h-4 w-4" /> Pause</>
                        ) : (
                          <><Play className="mr-1 h-4 w-4" /> Resume</>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={startTimer}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="mr-1 h-4 w-4" /> 
                      Start Timer
                    </Button>
                  )}
                </div>
                
                <Button
                  onClick={handleComplete}
                  className="w-full bg-eco hover:bg-eco-dark"
                >
                  <Check className="mr-2 h-4 w-4" /> 
                  Mark as Done + Earn Points
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

const Yoga = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-eco hover:text-eco-dark">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eco-dark">Mental Exercise - Yoga</h1>
            <p className="text-gray-600 mt-1">
              Practice mindfulness through yoga routines to improve mental wellbeing
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-eco hover:bg-eco-dark text-white">
              View Your Yoga History
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-eco-dark">
                <Meditation className="mr-2" />
                Yoga Routines
              </h2>
              
              <div>
                {yogaRoutines.map((routine) => (
                  <YogaRoutineCard key={routine.id} routine={routine} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-eco-dark">
                Gamified Yoga Actions
              </h2>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yogaActions.map((action, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{action.action}</div>
                          <div className="text-gray-500 text-sm">{action.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-green-600">
                        +{action.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="font-medium mb-2">About Yoga Points</h3>
                <p className="text-gray-600 text-sm">
                  Earn points by completing yoga routines and activities. 
                  These points contribute to your overall eco score and 
                  position on the leaderboard. Regular practice leads to 
                  bonus points!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
