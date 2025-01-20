import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertCircle, Loader2, Brain, Heart, ClipboardList } from 'lucide-react';
import { analyzeSymptoms } from '../lib/gemini';
import { Chatbot } from '../components/Chatbot';
import { useNavigate } from 'react-router-dom';

type Medicine = {
  name: string;
  details: string;
};

const SymptomAnalyzerPage = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError('');
    setAnalysis('');
    setMedicines([]);

    try {
      const analysisOptions: AnalyserOptions = {
        symptoms,
        includeConditions: true,
        includePrecautions: true,
        includeMedicalAttention: true,
        includeLifestyleRecommendations: true,
      };
      const result = await analyzeSymptoms(analysisOptions);
      
      if (typeof result === 'string') {
        setAnalysis(result);
      } else if (result && typeof result === 'object') {
        setAnalysis(result.analysis || '');
        setMedicines(result.medicines || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSwitch=()=>{
    navigate('/userhome')
  }
  return (
    <div className="min-h-screen relative bg-black">
       {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:14px_24px]" />
      
       {/* Radial gradient overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#000000,transparent)]" />
    {/* <div className="min-h-screen relative bg-black"> */}
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(...)]" />
      <div className="absolute inset-0 bg-[radial-gradient(...)]" />
  
      <nav className="sm:p-4 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-6 flex items-center gap-3"
        >
          <div className="relative flex gap-4 py-4 z-10" onClick={handleUserSwitch}>
            <img src="/icons.webp" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <span className="text-xl sm:text-3xl font-bold text-cyan-400"><button>medify.me</button></span>
          </div>
        </motion.div>
      </nav>
  
      {/* Main content */}
      <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg sm:max-w-xl mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
              </motion.div>
              <h1 className="text-xl sm:text-4xl font-bold text-white">Symptom Analyzer</h1>
            </div>
            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
              Describe your symptoms in detail and let our AI-powered system analyze them for you.
            </p>
          </motion.div>
  
          {/* Main Form */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 space-y-6 border border-neutral-800 shadow-md">
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="symptoms" className="block text-lg font-medium text-gray-300">
                  What symptoms are you experiencing?
                </label>
                <div className="relative">
                  <textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full h-32 sm:h-40 px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-xl
                             text-white placeholder-gray-500 focus:ring focus:ring-blue-500/50 
                             focus:border-blue-500/50 transition-all duration-300"
                    placeholder="Please describe your symptoms in detail..."
                  />
                  <Brain className="absolute right-3 top-3 text-gray-600 w-5 h-5" />
                </div>
              </div>
  
              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full py-4 px-6 bg-neutral-900 border border-neutral-800 text-white rounded-xl 
                         font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:hover:bg-neutral-900 
                         transition-all duration-300 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6" />
                    <span>Analyze Symptoms</span>
                  </>
                )}
              </motion.button>
            </form>
  
            {/* Error and Analysis Display */}
            {/* Error Handling */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red/10 border border-red/20 rounded-xl text-red text-center"
              >
                {error}
              </motion.div>
            )}
  
            {/* Analysis Result */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-neutral/50 rounded-xl border border-neutral backdrop-blur-sm"
              >
                <h2 className="text-xl font-semibold text-blue mb-4">Analysis</h2>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
              </motion.div>
            )}
  
            {/* Recommended Medicines */}
            {medicines.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 bg-neutral/50 rounded-xl border border-neutral backdrop-blur-sm"
              >
                <h2 className="text-xl font-semibold text-green flex items-center space-x-2">
                  <ClipboardList className="w=6 h=6" />
                  <span>Recommended Medicines</span>
                </h2>
                <ul className="mt=4 list-disc list-inside text-gray space-y=1">
                  {medicines.map((med, index) => (
                    <li key={index} className="leading=6">
                      <ReactMarkdown>{`**${med.name}** - ${med.details}`}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
  
          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray text-center max-w-md mx-auto"
          >
            <AlertCircle className="inline-block w=4 h=4 mr=2 mb=1" />
            This AI-powered analysis is for informational purposes only and should not replace professional medical advice.
          </motion.p>
        </motion.div>
      </div>
      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default SymptomAnalyzerPage;



  // return (
    // <div className="min-h-screen relative bg-black">
    //   {/* Grid pattern background */}
    //   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:14px_24px]" />
      
    //   {/* Radial gradient overlay */}
    //   <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#000000,transparent)]" />
      
    //   <nav className=" p-1 mb-1">
    //   <motion.div
    //     initial={{ opacity: 0, x: -20 }}
    //     animate={{ opacity: 1, x: 0 }}
    //     className="mx-6 flex items-center gap-3"
    //     >
    //           <div className="relative flex gap-4 py-4 z-10" onClick={handleUserSwitch} >
    //             <img src="/icons.webp" alt="logo" className="w-12 h-12" />
    //           <span className="text-3xl font-bold text-cyan-400"><button>medify.me</button></span>
    //           </div>
    //     </motion.div>
    //     </nav>

    //   {/* Main content */}
    //   <div className="relative z-10 py-12 px-4 sm:px-6">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       className="max-w-4xl mx-auto space-y-8"
    //     >
    //       {/* Header */}
    //       <motion.div
    //         className="text-center space-y-4"
    //         initial={{ opacity: 0, y: -20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.2 }}
    //       >
    //         <div className="flex items-center justify-center space-x-4">
    //           <motion.div
    //             animate={{
    //               rotate: [0, 360],
    //               scale: [1, 1.1, 1],
    //             }}
    //             transition={{
    //               duration: 3,
    //               repeat: Infinity,
    //               repeatType: 'reverse',
    //             }}
    //           >
    //             <Stethoscope className="w-12 h-12 text-blue-400" />
    //           </motion.div>
    //           <h1 className="text-4xl font-bold text-white">Symptom Analyzer</h1>
    //         </div>
    //         <p className="text-gray-400 max-w-2xl mx-auto">
    //           Describe your symptoms in detail and let our AI-powered system analyze them for you.
    //         </p>
    //       </motion.div>

    //       {/* Main Form */}
    //       <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 space-y-6 border border-neutral-800 shadow-md">
    //         <form onSubmit={handleAnalyze} className="space-y-6">
    //           <div className="space-y-2">
    //             <label htmlFor="symptoms" className="block text-lg font-medium text-gray-300">
    //               What symptoms are you experiencing?
    //             </label>
    //             <div className="relative">
    //               <textarea
    //                 id="symptoms"
    //                 value={symptoms}
    //                 onChange={(e) => setSymptoms(e.target.value)}
    //                 className="w-full h-40 px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-xl
    //                          text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 
    //                          focus:border-blue-500/50 transition-all duration-300"
    //                 placeholder="Please describe your symptoms in detail..."
    //               />
    //               <Brain className="absolute right-3 top-3 text-gray-600 w-5 h-5" />
    //             </div>
    //           </div>

    //           <motion.button
    //             whileHover={{ scale: 1.02 }}
    //             whileTap={{ scale: 0.98 }}
    //             disabled={loading}
    //             className="w-full py-4 px-6 bg-neutral-900 border border-neutral-800 text-white rounded-xl 
    //                      font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:hover:bg-neutral-900 
    //                      transition-all duration-300 flex items-center justify-center space-x-3"
    //           >
    //             {loading ? (
    //               <>
    //                 <Loader2 className="w-6 h-6 animate-spin" />
    //                 <span>Analyzing...</span>
    //               </>
    //             ) : (
    //               <>
    //                 <Heart className="w-6 h-6" />
    //                 <span>Analyze Symptoms</span>
    //               </>
    //             )}
    //           </motion.button>
    //         </form>

    //         <AnimatePresence>
    //           {error && (
    //             <motion.div
    //               initial={{ opacity: 0, y: 10 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               exit={{ opacity: 0, y: -10 }}
    //               className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center"
    //             >
    //               {error}
    //             </motion.div>
    //           )}

    //           {analysis && (
    //             <motion.div
    //               initial={{ opacity: 0, y: 20 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               exit={{ opacity: 0, y: -20 }}
    //               className="mt-8 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 backdrop-blur-sm"
    //             >
    //               <h2 className="text-xl font-semibold text-blue-400 mb-4">Analysis</h2>
    //               <div className="prose prose-invert max-w-none">
    //                 <ReactMarkdown>{analysis}</ReactMarkdown>
    //               </div>
    //             </motion.div>
    //           )}

    //           {medicines.length > 0 && (
    //             <motion.div
    //               initial={{ opacity: 0, y: 20 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               exit={{ opacity: 0, y: -20 }}
    //               className="p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 backdrop-blur-sm"
    //             >
    //               <h2 className="text-xl font-semibold text-green-400 flex items-center space-x-2">
    //                 <ClipboardList className="w-6 h-6" />
    //                 <span>Recommended Medicines</span>
    //               </h2>
    //               <ul className="mt-4 list-disc list-inside text-gray-300 space-y-1">
    //                 {medicines.map((med, index) => (
    //                   <li key={index} className="leading-6">
    //                     <ReactMarkdown className="inline">
    //                       {`**${med.name}** - ${med.details}`}
    //                     </ReactMarkdown>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </motion.div>
    //           )}
    //         </AnimatePresence>
    //       </div>

    //       {/* Disclaimer */}
    //       <motion.p
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ delay: 0.5 }}
    //         className="text-sm text-gray-400 text-center max-w-2xl mx-auto"
    //       >
    //         <AlertCircle className="inline-block w-4 h-4 mr-2 mb-1" />
    //         This AI-powered analysis is for informational purposes only and should not replace professional medical advice.
    //         Always consult with a qualified healthcare provider for proper diagnosis and treatment.
    //       </motion.p>
    //     </motion.div>
    //   </div>
    //   <Chatbot />
    // </div>
  // );