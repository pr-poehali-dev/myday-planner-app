import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('piggy');
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState<string | null>(null);
  const [removeDialogOpen, setRemoveDialogOpen] = useState<string | null>(null);
  
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Новый велосипед', current: 15000, target: 50000, image: '🚴' },
    { id: '2', title: 'Отпуск на море', current: 30000, target: 100000, image: '🏖️' },
  ]);
  
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', title: 'Откладывать 10$ в неделю', type: 'financial', streak: 5, completed: true },
    { id: '2', title: 'Заниматься спортом', type: 'general', streak: 12, completed: false },
    { id: '3', title: 'Читать 30 минут', type: 'general', streak: 8, completed: true },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Внести данные в копилку', period: 'today', completed: false },
    { id: '2', title: 'Накопить 20,000₽', period: 'week', completed: false },
    { id: '3', title: 'Купить велосипед', period: 'month', completed: false },
    { id: '4', title: 'Съездить в отпуск', period: 'year', completed: false },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Мария',
      avatar: '👩',
      text: 'Достигла цели! Купила новый велосипед! 🚴 #мечтасбылась',
      likes: 24,
      comments: 8,
      badges: 24,
      liked: false,
    },
    {
      id: '2',
      author: 'Алексей',
      avatar: '👨',
      text: 'Неделя без импульсивных покупок пройдена! 💪 #финансоваясвобода',
      likes: 15,
      comments: 3,
      badges: 15,
      liked: false,
    },
  ]);

  const quote = "Каждый день — это новая возможность стать лучше! ✨";

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MyDay
            </h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Bell" size={24} />
            </Button>
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
              <Dialog>
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
                    <Input placeholder="Название цели" className="rounded-2xl" />
                    <Input type="number" placeholder="Целевая сумма" className="rounded-2xl" />
                    <Input placeholder="Эмодзи мечты (🚴, 🏖️, 🎮)" className="rounded-2xl" />
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent">
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
              <Dialog>
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
                    <Input placeholder="Название привычки" className="rounded-2xl" />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-2xl">
                        💰 Финансовая
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-2xl">
                        ⭐ Общая
                      </Button>
                    </div>
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent">
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
              <Dialog>
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
                    <Input placeholder="Название цели" className="rounded-2xl" />
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="rounded-2xl">Сегодня</Button>
                      <Button variant="outline" className="rounded-2xl">Неделя</Button>
                      <Button variant="outline" className="rounded-2xl">Месяц</Button>
                      <Button variant="outline" className="rounded-2xl">Год</Button>
                    </div>
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent">
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
              <Dialog>
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
                    <Textarea placeholder="Поделитесь достижением..." className="rounded-2xl min-h-[120px]" />
                    <Button variant="outline" className="w-full rounded-2xl">
                      <Icon name="Image" size={20} className="mr-2" />
                      Добавить фото
                    </Button>
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent">
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
                <h2 className="text-2xl font-bold mb-1">Ваше имя</h2>
                <p className="text-muted-foreground mb-4">Москва</p>
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
                <Button className="rounded-full bg-gradient-to-r from-primary to-accent w-full">
                  Редактировать профиль
                </Button>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;