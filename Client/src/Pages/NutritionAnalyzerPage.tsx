import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";
import { Link,useNavigate } from "react-router-dom";
import { Loader2, Upload, Pizza } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Chatbot } from '../components/Chatbot';
 // Assuming this is your API function

function NutritionAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState("");
  const [foodName, setFoodName] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!foodName.trim()) {
      setError("Please enter the name of the food item.");
      return;
    }

    if (!quantity.trim()) {
      setError("Please enter the quantity of the food item.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      // Simulate nutrition analysis API call
      const nutritionData = await simulateNutritionAnalysis(foodName, quantity);

      setAnalysis(nutritionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error during analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const switchToUserHome=()=>{
    navigate('/userhome');
}
  return (
    <div className="min-h-screen relative bg-black">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:14px_24px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#000000,transparent)]" />
     
      <div className="relative z-10">
        <div className="container mx-auto">
         <nav className="p-4 sm:p-6">
             <motion.button
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               onClick={switchToUserHome}
               className="cursor-pointer flex items-center text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent gap-2 sm:gap-3"
             >
               <img src="/icons.webp" alt="Logo" className="w-10 h-10 sm:w-14 sm:h-14" />
               <span>medify.me</span>
             </motion.button>
           </nav>
          <div className="max-w-2xl mx-auto">
            <header className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <Pizza className="w-8 h-8 text-green-400" />
                <h1 className="text-4xl font-bold text-white">
                  Nutrition Analyzer
                </h1>
              </motion.div>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Food Name Input */}
              <div>
                <label
                  htmlFor="foodName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Food Item Name (Required)
                </label>
                <input
                  type="text"
                  id="foodName"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g., Dal Chawal, Pizza, Burger"
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-xl
                           text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500/50
                           focus:border-green-500/50 transition-all duration-300"
                />
              </div>

              {/* Quantity Input */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Quantity (Required)
                </label>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g., 100g, 1 cup, 2 pieces"
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-xl
                           text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500/50
                           focus:border-green-500/50 transition-all duration-300"
                />
              </div>

              {/* Image Upload */}
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-neutral-800 rounded-xl p-12 text-center 
                         cursor-pointer transition-all duration-300 hover:border-neutral-700 
                         hover:bg-white/5 bg-black/20 backdrop-blur-sm shadow-md hover:shadow-lg 
                         transform hover:scale-105 active:scale-95 active:translate-y-2"
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-neutral-400">
                  {file
                    ? `Uploaded: ${file.name}`
                    : "Drag & drop a food image (Optional)"}
                </p>
              </div>
              <Chatbot />
              {/* Analyze Button */}
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={loading || !foodName.trim() || !quantity.trim()}
                  className="px-12 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 
                           disabled:opacity-50 disabled:hover:bg-neutral-900 disabled:cursor-not-allowed 
                           text-white font-medium py-3 rounded-lg transition-all duration-300 
                           flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Analyze Nutrition</span>
                  )}
                </motion.button>
              </div>

              {/* Results */}
              <AnimatePresence>
                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 
                             backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-medium mb-4 text-white text-center">
                      Nutrition Analysis for {foodName}
                    </h3>
                    <div className="prose prose-invert max-w-none text-white">
                      <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg 
                             text-red-200 text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionAnalyzer;

// Simulated nutrition analysis API call
// Simulated nutrition analysis API call
async function simulateNutritionAnalysis(foodName: string, quantity: string) {
  // Enhanced nutritional values for Daal Chawal (example for 250gm serving)
  const nutritionDatabase: Record<string, string> = {
    "dal chawal": `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | 250 kcal                    |
| **Protein**     | 12 g                        |
| **Carbohydrates** | 42 g                      |
| **Fats**        | 5 g                         |
| **Fiber**       | 6 g                         |
| **Vitamins**    | Vitamin A, Vitamin C, B6    |
| **Minerals**    | Calcium, Iron, Magnesium    |
| **Sodium**      | 400 mg                      |
| **Potassium**   | 350 mg                      |
| **Cholesterol** | 0 mg                        |
| **Sugar**       | 3 g                         |

### Additional Information
- **Dal Chawal** is a nutritious meal typically made with lentils and rice.
- It is a great source of plant-based protein, dietary fiber, and essential vitamins and minerals.
- Lentils provide slow-digesting carbohydrates, making this dish a good option for sustained energy levels.
- Low in fats and free of cholesterol, making it heart-healthy.
    `,
    "pizza": `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | 285 kcal                    |
| **Protein**     | 12 g                        |
| **Carbohydrates** | 36 g                      |
| **Fats**        | 10 g                        |
| **Fiber**       | 2 g                         |
| **Vitamins**    | Vitamin A, Vitamin C, B12   |
| **Minerals**    | Calcium, Iron               |
| **Sodium**      | 640 mg                      |
| **Potassium**   | 200 mg                      |
| **Cholesterol** | 18 mg                       |
| **Sugar**       | 4 g                         |

### Additional Information
- **Pizza** is a popular dish made with dough, cheese, and various toppings.
- It can be a rich source of calcium due to the cheese and provides carbohydrates for quick energy.
- Moderation is key, as it can be high in sodium and saturated fats depending on the toppings.
    `,
    "burger": `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | 354 kcal                    |
| **Protein**     | 17 g                        |
| **Carbohydrates** | 29 g                      |
| **Fats**        | 19 g                        |
| **Fiber**       | 2 g                         |
| **Vitamins**    | Vitamin B12, Vitamin D      |
| **Minerals**    | Iron, Calcium, Zinc         |
| **Sodium**      | 500 mg                      |
| **Potassium**   | 300 mg                      |
| **Cholesterol** | 40 mg                       |
| **Sugar**       | 5 g                         |

### Additional Information
- **Burger** is a convenient and delicious meal, often featuring a patty, cheese, and vegetables between buns.
- It is a good source of protein but can be high in fats and sodium.
- Opt for whole-grain buns and lean meat to make it a healthier choice.
    `,

    "pasta": `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | 220 kcal                    |
| **Protein**     | 8 g                         |
| **Carbohydrates** | 40 g                      |
| **Fats**        | 3 g                         |
| **Fiber**       | 2 g                         |
| **Vitamins**    | Vitamin B6, Vitamin K       |
| **Minerals**    | Calcium, Iron               |
| **Sodium**      | 15 mg                       |
| **Potassium**   | 120 mg                      |
| **Cholesterol** | 0 mg                        |
| **Sugar**       | 2 g                         |

### Additional Information
- **Pasta** is a versatile dish made from durum wheat and can be combined with various sauces and proteins.
- It is rich in carbohydrates and a good source of energy.
- Opt for whole-grain pasta for added fiber and nutrients.
    `,
  "biryani": `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | 320 kcal                    |
| **Protein**     | 15 g                        |
| **Carbohydrates** | 45 g                      |
| **Fats**        | 10 g                        |
| **Fiber**       | 3 g                         |
| **Vitamins**    | Vitamin A, Vitamin C        |
| **Minerals**    | Calcium, Iron, Zinc         |
| **Sodium**      | 500 mg                      |
| **Potassium**   | 400 mg                      |
| **Cholesterol** | 20 mg                       |
| **Sugar**       | 3 g                         |

### Additional Information
- **Biryani** is a flavorful and aromatic rice dish prepared with spices, rice, and often meat or vegetables.
- It provides a balanced mix of protein, carbohydrates, and fats.
- Customizations like adding more vegetables can enhance its nutritional value.
    `,
  "idli sambar": `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | 180 kcal                    |
| **Protein**     | 6 g                         |
| **Carbohydrates** | 34 g                      |
| **Fats**        | 3 g                         |
| **Fiber**       | 4 g                         |
| **Vitamins**    | Vitamin A, Vitamin C        |
| **Minerals**    | Calcium, Iron               |
| **Sodium**      | 150 mg                      |
| **Potassium**   | 200 mg                      |
| **Cholesterol** | 0 mg                        |
| **Sugar**       | 2 g                         |

### Additional Information
- **Idli Sambar** is a traditional South Indian breakfast, low in calories and rich in protein and fiber.
- It is a light and easily digestible meal, making it suitable for all age groups.
    `,
  };

  const normalizedFoodName = foodName.trim().toLowerCase();

  if (nutritionDatabase[normalizedFoodName]) {
    return nutritionDatabase[normalizedFoodName];
  } else {
    return `
| **Nutrient**   | **Amount (per ${quantity})** |
|-----------------|------------------------------|
| **Calories**    | Data not available          |
| **Protein**     | Data not available          |
| **Carbohydrates** | Data not available        |
| **Fats**        | Data not available          |
| **Fiber**       | Data not available          |
| **Vitamins**    | Data not available          |
| **Minerals**    | Data not available          |
| **Sodium**      | Data not available          |
| **Potassium**   | Data not available          |
| **Cholesterol** | Data not available          |
| **Sugar**       | Data not available          |

### Additional Information
- Sorry, we do not have nutritional data for **${foodName}** at the moment.
- Please try another food item.
    `;
  }
}

//   return nutritionInfo;
// }
