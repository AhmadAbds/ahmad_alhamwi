import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Calendar,
  Star,
} from 'lucide-react';

const HelloDash = () => {
  const currentDate = new Date().toLocaleDateString('en-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* الهيدر الرئيسي */}
        <div className="text-center mb-12 pt-8">
          <Badge variant="secondary" className="mb-4 px-4 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            <Sparkles className="w-4 h-4 ml-1" />
            welcome back
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to the Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                       We're glad you're back! Pick up where you left off.
          </p>
        </div>

        {/* بطاقة التاريخ والترحيب */}
        <Card className="max-w-2xl mx-auto mb-8 border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between flex-wrap-reverse gap-4 sm:flex-row">
              <div className="flex items-center space-x-3 space-x-reverse gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Today is</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentDate}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-4 sm:ml-0">System status</p>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2 mr-2"></div>
                  Everything is working normally
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <div className="flex justify-center items-center gap-2 text-xl  text-gray-500 dark:text-gray-400 mb-4">
            <Star className="w-lg h-lg fill-yellow-400 text-yellow-400" /> 
            <span>﴾
وَأَصْلِحْ لِي شَأْنِي كُلَّهُ ﴿
             </span>
            <Star className="w-lg h-lg fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloDash;