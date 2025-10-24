import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Brand } from "./BrandCard"; // Import Brand interface from BrandCard.tsx

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (brand: Partial<Brand>) => void;
  brand?: Brand | null;
}

export function BrandModal({
  isOpen,
  onClose,
  onSubmit,
  brand,
}: BrandModalProps) {
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: "",
    category: "",
    country: "",
    price_range: "",
    sustainability_score: 50,
    material: "",
    ethical_practices: "",
    rating: 0,
    description: "",
  });

  useEffect(() => {
    if (brand) {
      setFormData({ ...brand });
    } else {
      setFormData({
        name: "",
        category: "",
        country: "",
        price_range: "",
        sustainability_score: 50,
        material: "",
        ethical_practices: "",
        rating: 0,
        description: "",
      });
    }
  }, [brand, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-2xl font-bold text-[#2e4e2c]">
                  {brand ? "Edit Brand" : "Add New Brand"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Brand Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Bags">Bags</option>
                      <option value="Activewear">Activewear</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range *
                    </label>
                    <select
                      value={formData.price_range || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price_range: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="$">$ (Budget)</option>
                      <option value="$$">$$ (Moderate)</option>
                      <option value="$$$">$$$ (Premium)</option>
                      <option value="$$$$">$$$$ (Luxury)</option>
                    </select>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material *
                    </label>
                    <input
                      type="text"
                      value={formData.material || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      placeholder="e.g., Organic Cotton, Recycled Polyester"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (0-5) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Sustainability Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sustainability Score (0-100):{" "}
                    {formData.sustainability_score || 0}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.sustainability_score || 50}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sustainability_score: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2e4e2c]"
                  />
                </div>

                {/* Ethical Practices */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ethical Practices *
                  </label>
                  <input
                    type="text"
                    value={formData.ethical_practices || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ethical_practices: e.target.value,
                      })
                    }
                    placeholder="e.g., Fair Trade, Carbon Neutral"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b5d6b2] focus:border-transparent outline-none"
                    rows={3}
                    placeholder="Tell us about this brand..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2e4e2c] to-[#3d6a38] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    {brand ? "Update Brand" : "Add Brand"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
