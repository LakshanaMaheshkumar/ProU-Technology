import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Lightbulb, CheckCircle } from 'lucide-react';

export function LearnSection() {
  const [selectedAnswer, setSelectedAnswer] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const infoCards = [
    {
      icon: BookOpen,
      title: 'What is Sustainable Fashion?',
      content: 'Sustainable fashion refers to clothing, shoes, and accessories that are manufactured, marketed, and used in the most sustainable manner possible, taking into account both environmental and socio-economic aspects.',
      color: 'from-[#2e4e2c] to-[#3d6a38]',
    },
    {
      icon: Award,
      title: 'Top Eco Certifications',
      content: 'Fair Trade ensures fair wages and ethical treatment of workers. GOTS (Global Organic Textile Standard) certifies organic fibers. B Corp certification proves a company meets high social and environmental standards.',
      color: 'from-[#3d6a38] to-[#4d8544]',
    },
    {
      icon: Lightbulb,
      title: 'Tips for Ethical Shopping',
      content: 'Look for transparent supply chains, check for certifications, choose quality over quantity, support local artisans, buy second-hand when possible, and research brands before purchasing.',
      color: 'from-[#4d8544] to-[#b5d6b2]',
    },
  ];

  const quizQuestions = [
    {
      question: 'What percentage of clothing ends up in landfills each year?',
      options: ['20%', '40%', '60%', '85%'],
      correct: '85%',
    },
    {
      question: 'Which material requires the most water to produce?',
      options: ['Cotton', 'Polyester', 'Linen', 'Hemp'],
      correct: 'Cotton',
    },
    {
      question: 'What does GOTS certification stand for?',
      options: [
        'Green Organic Trade System',
        'Global Organic Textile Standard',
        'General Organic Testing Service',
        'Global Organization for Textile Safety',
      ],
      correct: 'Global Organic Textile Standard',
    },
  ];

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswer({ ...selectedAnswer, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswer[index] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#2e4e2c] mb-4">Learn About Sustainability</h2>
          <p className="text-gray-600">Expand your knowledge on eco-friendly fashion</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateY: 5, scale: 1.05 }}
              className="group perspective-1000"
            >
              <div className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-lg p-6 text-white transform transition-all duration-300 group-hover:shadow-2xl`}>
                <card.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{card.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#f2ebd9] to-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-[#2e4e2c] mb-6 text-center">Eco Quiz</h3>
          <p className="text-gray-600 text-center mb-8">Test your sustainable fashion knowledge</p>

          <div className="space-y-6 max-w-3xl mx-auto">
            {quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white rounded-xl p-6 shadow">
                <p className="font-semibold text-gray-800 mb-4">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => {
                    const isSelected = selectedAnswer[qIndex] === option;
                    const isCorrect = option === q.correct;
                    const showCorrect = showResults && isCorrect;
                    const showIncorrect = showResults && isSelected && !isCorrect;

                    return (
                      <motion.button
                        key={oIndex}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !showResults && handleAnswerSelect(qIndex, option)}
                        disabled={showResults}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                          showCorrect
                            ? 'border-green-500 bg-green-50'
                            : showIncorrect
                            ? 'border-red-500 bg-red-50'
                            : isSelected
                            ? 'border-[#2e4e2c] bg-[#b5d6b2]/20'
                            : 'border-gray-200 hover:border-[#b5d6b2]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!showResults ? (
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswer).length !== quizQuestions.length}
                className="px-8 py-3 bg-gradient-to-r from-[#2e4e2c] to-[#3d6a38] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center bg-white rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-2xl font-bold text-[#2e4e2c] mb-2">
                Your Score: {getScore()} / {quizQuestions.length}
              </h4>
              <p className="text-gray-600">
                {getScore() === quizQuestions.length
                  ? 'Perfect! You are an eco-fashion expert!'
                  : getScore() >= 2
                  ? 'Great job! Keep learning about sustainability!'
                  : 'Keep exploring to learn more about sustainable fashion!'}
              </p>
              <button
                onClick={() => {
                  setSelectedAnswer({});
                  setShowResults(false);
                }}
                className="mt-4 px-6 py-2 bg-[#2e4e2c] text-white rounded-lg hover:bg-[#3d6a38] transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
