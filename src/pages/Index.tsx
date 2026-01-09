import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type Goal = {
  id: string;
  title: string;
  image?: string;
  current: number;
  target: number;
};

type Habit = {
  id: string;
  title: string;
  type: 'financial' | 'general';
  streak: number;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  period: 'today' | 'week' | 'month' | 'year';
  completed: boolean;
};

type Post = {
  id: string;
  author: string;
  avatar: string;
  image?: string;
  text: string;
  likes: number;
  comments: number;
  badges: number;
  liked: boolean;
};

const Index = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('piggy');
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState<string | null>(null);
  const [removeDialogOpen, setRemoveDialogOpen] = useState<string | null>(null);
  
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalEmoji, setNewGoalEmoji] = useState('');
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [newHabitType, setNewHabitType] = useState<'financial' | 'general'>('general');
  const [habitDialogOpen, setHabitDialogOpen] = useState(false);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPeriod, setNewTaskPeriod] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  
  const [newPostText, setNewPostText] = useState('');
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  
  const [profileName, setProfileName] = useState('Ваше имя');
  const [profileCity, setProfileCity] = useState('Москва');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  
  const defaultGoals: Goal[] = [
    { id: 'demo-1', title: 'Новый велосипед', current: 15000, target: 50000, image: '🚴' },
    { id: 'demo-2', title: 'Отпуск на море', current: 30000, target: 100000, image: '🏖️' },
  ];
  
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  
  const defaultHabits: Habit[] = [
    { id: 'demo-1', title: 'Откладывать 10$ в неделю', type: 'financial', streak: 5, completed: true },
    { id: 'demo-2', title: 'Заниматься спортом', type: 'general', streak: 12, completed: false },
    { id: 'demo-3', title: 'Читать 30 минут', type: 'general', streak: 8, completed: true },
  ];
  
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);

  const defaultTasks: Task[] = [
    { id: 'demo-1', title: 'Внести данные в копилку', period: 'today', completed: false },
    { id: 'demo-2', title: 'Накопить 20,000₽', period: 'week', completed: false },
    { id: 'demo-3', title: 'Купить велосипед', period: 'month', completed: false },
    { id: 'demo-4', title: 'Съездить в отпуск', period: 'year', completed: false },
  ];
  
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const defaultPosts: Post[] = [
    {
      id: 'demo-1',
      author: 'Мария',
      avatar: '👩',
      text: 'Достигла цели! Купила новый велосипед! 🚴 #мечтасбылась',
      likes: 24,
      comments: 8,
      badges: 24,
      liked: false,
    },
    {
      id: 'demo-2',
      author: 'Алексей',
      avatar: '👨',
      text: 'Неделя без импульсивных покупок пройдена! 💪 #финансоваясвобода',
      likes: 15,
      comments: 3,
      badges: 15,
      liked: false,
    },
  ];
  
  const [posts, setPosts] = useState<Post[]>(defaultPosts);

  const quote = "Каждый день — это новая возможность стать лучше! ✨";

  useEffect(() => {
    const visited = localStorage.getItem('myday_visited');
    if (!visited) {
      setIsFirstVisit(true);
      localStorage.setItem('myday_visited', 'true');
    }

    const savedGoals = localStorage.getItem('myday_goals');
    const savedHabits = localStorage.getItem('myday_habits');
    const savedTasks = localStorage.getItem('myday_tasks');
    const savedPosts = localStorage.getItem('myday_posts');
    const savedProfile = localStorage.getItem('myday_profile');

    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileName(profile.name);
      setProfileCity(profile.city);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myday_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('myday_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('myday_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('myday_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('myday_profile', JSON.stringify({ name: profileName, city: profileCity }));
  }, [profileName, profileCity]);

  const clearAllData = () => {
    setGoals([]);
    setHabits([]);
    setTasks([]);
    setPosts([]);
    setProfileName('Ваше имя');
    setProfileCity('Москва');
    localStorage.removeItem('myday_goals');
    localStorage.removeItem('myday_habits');
    localStorage.removeItem('myday_tasks');
    localStorage.removeItem('myday_posts');
    localStorage.removeItem('myday_profile');
  };

  const startFresh = () => {
    clearAllData();
    setIsFirstVisit(false);
  };

  const continueWithDemo = () => {
    setIsFirstVisit(false);
  };

  const addMoney = (goalId: string, amount: number) => {
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, current: Math.min(g.current + amount, g.target) } : g
    ));
  };

  const removeMoney = (goalId: string, amount: number) => {
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, current: Math.max(g.current - amount, 0) } : g
    ));
  };

  const handleAddMoney = (goalId: string) => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      addMoney(goalId, amount);
      setAddAmount('');
      setAddDialogOpen(null);
    }
  };

  const handleRemoveMoney = (goalId: string) => {
    const amount = parseFloat(removeAmount);
    if (!isNaN(amount) && amount > 0) {
      removeMoney(goalId, amount);
      setRemoveAmount('');
      setRemoveDialogOpen(null);
    }
  };

  const createGoal = () => {
    if (newGoalTitle && newGoalTarget) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        image: newGoalEmoji || '🎯',
        current: 0,
        target: parseFloat(newGoalTarget)
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalTarget('');
      setNewGoalEmoji('');
      setGoalDialogOpen(false);
    }
  };

  const createHabit = () => {
    if (newHabitTitle) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        title: newHabitTitle,
        type: newHabitType,
        streak: 0,
        completed: false
      };
      setHabits([...habits, newHabit]);
      setNewHabitTitle('');
      setNewHabitType('general');
      setHabitDialogOpen(false);
    }
  };

  const createTask = () => {
    if (newTaskTitle) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        period: newTaskPeriod,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskPeriod('today');
      setTaskDialogOpen(false);
    }
  };

  const createPost = () => {
    if (newPostText) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: profileName,
        avatar: '👤',
        text: newPostText,
        likes: 0,
        comments: 0,
        badges: 0,
        liked: false
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
      setPostDialogOpen(false);
    }
  };

  const updateProfile = () => {
    setProfileDialogOpen(false);
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : h.streak } : h
    ));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, liked: !p.liked, likes: !p.liked ? p.likes + 1 : p.likes - 1, badges: !p.liked ? p.badges + 1 : p.badges - 1 } : p
    ));
  };

  if (isFirstVisit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 bg-gradient-to-br from-card to-primary/10 border-primary/30 rounded-3xl animate-scale-in">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4 animate-bounce-soft">🎉</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Добро пожаловать в MyDay!
            </h1>
            <p className="text-muted-foreground">
              Ваш личный ежедневник для достижения целей и отслеживания привычек
            </p>
            
            <div className="space-y-3 text-left bg-background/50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="PiggyBank" size={20} className="text-primary" />
                </div>
                <p className="text-sm">Копилка для ваших мечт</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-accent" />
                </div>
                <p className="text-sm">Трекер привычек и целей</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <p className="text-sm">Социальная лента достижений</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent h-12 text-base"
                onClick={startFresh}
              >
                Начать с чистого листа
              </Button>
              <Button 
                variant="outline" 
                className="w-full rounded-2xl h-12 text-base"
                onClick={continueWithDemo}
              >
                Посмотреть пример
              </Button>
            </div>

            <Button 
              variant="ghost" 
              className="text-sm text-muted-foreground"
              onClick={() => setShowInstallGuide(true)}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Как установить на главный экран?
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showInstallGuide) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setShowInstallGuide(false)}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <Card className="p-6 bg-card border-border rounded-3xl space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-2xl font-bold mb-2">Установка на главный экран</h2>
              <p className="text-muted-foreground">
                Используйте MyDay как обычное приложение!
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Smartphone" size={20} className="text-primary" />
                  Для iPhone (Safari)
                </h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>Откройте этот сайт в <strong>Safari</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>Нажмите на кнопку "Поделиться" <Icon name="Share" size={14} className="inline" /> внизу экрана</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>Прокрутите вниз и выберите <strong>"На экран Домой"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>Нажмите <strong>"Добавить"</strong></span>
                  </li>
                </ol>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Smartphone" size={20} className="text-accent" />
                  Для Android (Chrome)
                </h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">1.</span>
                    <span>Откройте этот сайт в <strong>Chrome</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">2.</span>
                    <span>Нажмите на меню <Icon name="MoreVertical" size={14} className="inline" /> (три точки)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">3.</span>
                    <span>Выберите <strong>"Добавить на главный экран"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">4.</span>
                    <span>Нажмите <strong>"Добавить"</strong></span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-2xl">
              <p className="text-sm text-center">
                <Icon name="Sparkles" size={16} className="inline mr-2" />
                После установки приложение будет работать как обычное, даже без интернета!
              </p>
            </div>

            <Button 
              className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
              onClick={() => setShowInstallGuide(false)}
            >
              Понятно, спасибо!
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MyDay
            </h1>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setShowInstallGuide(true)}
              >
                <Icon name="Download" size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="p-4">
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 p-4 animate-fade-in">
            <p className="text-center font-medium text-foreground">{quote}</p>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-5 mb-4 bg-card">
            <TabsTrigger value="piggy" className="rounded-2xl">
              <Icon name="PiggyBank" size={20} />
            </TabsTrigger>
            <TabsTrigger value="habits" className="rounded-2xl">
              <Icon name="Target" size={20} />
            </TabsTrigger>
            <TabsTrigger value="goals" className="rounded-2xl">
              <Icon name="Trophy" size={20} />
            </TabsTrigger>
            <TabsTrigger value="feed" className="rounded-2xl">
              <Icon name="Users" size={20} />
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-2xl">
              <Icon name="User" size={20} />
            </TabsTrigger>
          </TabsList>

          {/* Piggy Bank Tab */}
          <TabsContent value="piggy" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Копилка</h2>
              <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-primary to-accent">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Новая цель</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Название цели" 
                      className="rounded-2xl" 
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                    />
                    <Input 
                      type="number" 
                      placeholder="Целевая сумма" 
                      className="rounded-2xl" 
                      value={newGoalTarget}
                      onChange={(e) => setNewGoalTarget(e.target.value)}
                    />
                    <Input 
                      placeholder="Эмодзи мечты (🚴, 🏖️, 🎮)" 
                      className="rounded-2xl" 
                      value={newGoalEmoji}
                      onChange={(e) => setNewGoalEmoji(e.target.value)}
                    />
                    <Button 
                      className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                      onClick={createGoal}
                    >
                      Создать цель
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {goals.map(goal => (
              <Card key={goal.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all rounded-3xl animate-scale-in">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-6xl animate-bounce-soft">{goal.image}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{goal.title}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{goal.current.toLocaleString()}₽</span>
                      <span>{goal.target.toLocaleString()}₽</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-3 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((goal.current / goal.target) * 100)}% достигнуто
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog open={addDialogOpen === goal.id} onOpenChange={(open) => setAddDialogOpen(open ? goal.id : null)}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-accent">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Добавить деньги</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input 
                          type="number" 
                          placeholder="Сумма" 
                          className="rounded-2xl" 
                          value={addAmount}
                          onChange={(e) => setAddAmount(e.target.value)}
                        />
                        <Button 
                          className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                          onClick={() => handleAddMoney(goal.id)}
                        >
                          Добавить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={removeDialogOpen === goal.id} onOpenChange={(open) => setRemoveDialogOpen(open ? goal.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 rounded-2xl">
                        <Icon name="Minus" size={16} className="mr-2" />
                        Снять
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Снять деньги</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input 
                          type="number" 
                          placeholder="Сумма" 
                          className="rounded-2xl" 
                          value={removeAmount}
                          onChange={(e) => setRemoveAmount(e.target.value)}
                        />
                        <Button 
                          className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                          onClick={() => handleRemoveMoney(goal.id)}
                        >
                          Снять
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Habits Tab */}
          <TabsContent value="habits" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Привычки</h2>
              <Dialog open={habitDialogOpen} onOpenChange={setHabitDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-primary to-accent">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Новая привычка</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Название привычки" 
                      className="rounded-2xl" 
                      value={newHabitTitle}
                      onChange={(e) => setNewHabitTitle(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant={newHabitType === 'financial' ? 'default' : 'outline'} 
                        className="flex-1 rounded-2xl"
                        onClick={() => setNewHabitType('financial')}
                      >
                        💰 Финансовая
                      </Button>
                      <Button 
                        variant={newHabitType === 'general' ? 'default' : 'outline'} 
                        className="flex-1 rounded-2xl"
                        onClick={() => setNewHabitType('general')}
                      >
                        ⭐ Общая
                      </Button>
                    </div>
                    <Button 
                      className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                      onClick={createHabit}
                    >
                      Создать привычку
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {habits.map(habit => (
              <Card 
                key={habit.id} 
                className={`p-4 bg-card border-2 rounded-3xl transition-all cursor-pointer hover:scale-[1.02] animate-scale-in ${
                  habit.completed ? 'border-primary bg-primary/10' : 'border-border'
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                    habit.completed ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    {habit.type === 'financial' ? '💰' : '⭐'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{habit.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon name="Flame" size={16} className="text-accent" />
                      <span className="text-sm text-muted-foreground">{habit.streak} дней</span>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    habit.completed ? 'bg-primary border-primary' : 'border-muted'
                  }`}>
                    {habit.completed && <Icon name="Check" size={20} className="text-white" />}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Цели</h2>
              <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-primary to-accent">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Новая цель</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Название цели" 
                      className="rounded-2xl" 
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={newTaskPeriod === 'today' ? 'default' : 'outline'} 
                        className="rounded-2xl"
                        onClick={() => setNewTaskPeriod('today')}
                      >
                        Сегодня
                      </Button>
                      <Button 
                        variant={newTaskPeriod === 'week' ? 'default' : 'outline'} 
                        className="rounded-2xl"
                        onClick={() => setNewTaskPeriod('week')}
                      >
                        Неделя
                      </Button>
                      <Button 
                        variant={newTaskPeriod === 'month' ? 'default' : 'outline'} 
                        className="rounded-2xl"
                        onClick={() => setNewTaskPeriod('month')}
                      >
                        Месяц
                      </Button>
                      <Button 
                        variant={newTaskPeriod === 'year' ? 'default' : 'outline'} 
                        className="rounded-2xl"
                        onClick={() => setNewTaskPeriod('year')}
                      >
                        Год
                      </Button>
                    </div>
                    <Button 
                      className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                      onClick={createTask}
                    >
                      Создать цель
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {['today', 'week', 'month', 'year'].map(period => {
              const periodTasks = tasks.filter(t => t.period === period);
              const periodLabels = { today: 'Сегодня', week: 'Неделя', month: 'Месяц', year: 'Год' };
              
              return periodTasks.length > 0 && (
                <div key={period}>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="Calendar" size={18} />
                    {periodLabels[period as keyof typeof periodLabels]}
                  </h3>
                  <div className="space-y-2">
                    {periodTasks.map(task => (
                      <Card 
                        key={task.id}
                        className={`p-4 border-2 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all animate-scale-in ${
                          task.completed ? 'border-primary bg-primary/10' : 'border-border bg-card'
                        }`}
                        onClick={() => toggleTask(task.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            task.completed ? 'bg-primary border-primary' : 'border-muted'
                          }`}>
                            {task.completed && <Icon name="Check" size={16} className="text-white" />}
                          </div>
                          <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                            {task.title}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Лента</h2>
              <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-primary to-accent">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Новый пост</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Поделитесь достижением..." 
                      className="rounded-2xl min-h-[120px]" 
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                    />
                    <Button variant="outline" className="w-full rounded-2xl">
                      <Icon name="Image" size={20} className="mr-2" />
                      Добавить фото
                    </Button>
                    <Button 
                      className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                      onClick={createPost}
                    >
                      Опубликовать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {posts.map(post => (
                  <Card key={post.id} className="p-4 bg-card border-border rounded-3xl animate-scale-in">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-2xl flex items-center justify-center">
                        {post.avatar}
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{post.author}</h4>
                        <p className="text-xs text-muted-foreground">2 часа назад</p>
                      </div>
                    </div>
                    <p className="mb-3">{post.text}</p>
                    <div className="flex items-center gap-4 pt-3 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => toggleLike(post.id)}
                      >
                        <Icon name={post.liked ? "Heart" : "Heart"} size={20} className={post.liked ? "text-red-500 fill-red-500" : ""} />
                        <span className="ml-2">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <Icon name="MessageCircle" size={20} />
                        <span className="ml-2">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full ml-auto">
                        <span className="mr-2">Молодец</span>
                        <Badge className="bg-accent text-accent-foreground">{post.badges}</Badge>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/10 border-border rounded-3xl animate-scale-in">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 bg-gradient-to-br from-primary to-accent text-5xl flex items-center justify-center">
                  👤
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">{profileName}</h2>
                <p className="text-muted-foreground mb-4">{profileCity}</p>
                <div className="flex gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">156</p>
                    <p className="text-xs text-muted-foreground">Молодец</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">89</p>
                    <p className="text-xs text-muted-foreground">Подписки</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">234</p>
                    <p className="text-xs text-muted-foreground">Подписчики</p>
                  </div>
                </div>
                <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-gradient-to-r from-primary to-accent w-full">
                      Редактировать профиль
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl">
                    <DialogHeader>
                      <DialogTitle>Редактировать профиль</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Ваше имя" 
                        className="rounded-2xl" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                      />
                      <Input 
                        placeholder="Город" 
                        className="rounded-2xl" 
                        value={profileCity}
                        onChange={(e) => setProfileCity(e.target.value)}
                      />
                      <Button 
                        className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent"
                        onClick={updateProfile}
                      >
                        Сохранить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card border-border rounded-2xl text-center hover:border-primary/50 transition-all cursor-pointer">
                <Icon name="Heart" size={24} className="mx-auto mb-2 text-primary" />
                <p className="font-bold">Избранное</p>
                <p className="text-2xl font-bold text-primary">23</p>
              </Card>
              <Card className="p-4 bg-card border-border rounded-2xl text-center hover:border-primary/50 transition-all cursor-pointer">
                <Icon name="BookmarkCheck" size={24} className="mx-auto mb-2 text-accent" />
                <p className="font-bold">Мои посты</p>
                <p className="text-2xl font-bold text-accent">12</p>
              </Card>
            </div>

            <Card className="p-4 bg-card border-border rounded-2xl">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Trophy" size={20} className="text-accent" />
                Достижения
              </h3>
              <div className="flex gap-3 flex-wrap">
                {['🔥', '💪', '🎯', '🌟', '💎', '🏆'].map((emoji, i) => (
                  <div 
                    key={i} 
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-card border-border rounded-2xl">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Settings" size={20} className="text-muted-foreground" />
                Настройки
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full rounded-2xl justify-start"
                  onClick={() => setShowInstallGuide(true)}
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  Установить приложение
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-2xl justify-start text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={18} className="mr-2" />
                      Очистить все данные
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl">
                    <DialogHeader>
                      <DialogTitle>Очистить все данные?</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Это действие удалит все ваши цели, привычки, задачи и посты. Вы уверены?
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-2xl"
                        >
                          Отмена
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1 rounded-2xl"
                          onClick={clearAllData}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;