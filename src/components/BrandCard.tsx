import { motion } from "framer-motion";
import { Heart, Edit2, Trash2, Star, Leaf } from "lucide-react";

// Define the Brand type
export interface Brand {
  user_id: string | undefined;
  id: number;
  name: string;
  country: string;
  category: string;
  price_range: string;
  material: string;
  sustainability_score: number;
  rating: number;
  ethical_practices: string;
  description?: string;
}

interface BrandCardProps {
  brand: Brand;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canEdit: boolean;
}

export function BrandCard({
  brand,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  canEdit,
}: BrandCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-orange-600 bg-orange-50";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-[#b5d6b2] transition-all"
    >
      <div className="bg-gradient-to-br from-[#b5d6b2] to-[#2e4e2c] h-32 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-16 h-16 text-white/30" />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleFavorite}
            className={`p-2 rounded-full backdrop-blur-sm ${
              isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-600"
            }`}
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </motion.button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {brand.name}
            </h3>
            <p className="text-sm text-gray-500">{brand.country}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreColor(
              brand.sustainability_score
            )}`}
          >
            {brand.sustainability_score}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Category</span>
            <span className="font-medium text-gray-800">{brand.category}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Price Range</span>
            <span className="font-medium text-gray-800">
              {brand.price_range}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Material</span>
            <span className="font-medium text-gray-800 truncate ml-2">
              {brand.material}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Rating</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium text-gray-800">
                {brand.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-1">Ethical Practices</p>
          <p className="text-sm text-gray-800 line-clamp-2">
            {brand.ethical_practices}
          </p>
        </div>

        {brand.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {brand.description}
          </p>
        )}

        {canEdit && (
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
