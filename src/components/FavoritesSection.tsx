import { motion } from "framer-motion";
import { Heart, Star, Leaf } from "lucide-react";

// ✅ Define the Brand interface locally (since Supabase is removed)
export interface Brand {
  id: string;
  name: string;
  country: string;
  category: string;
  material: string;
  sustainability_score: number;
  rating: number;
  isFavorite?: boolean;
}

interface FavoritesSectionProps {
  favorites: Brand[];
  onRemoveFavorite: (brandId: string) => void;
}

export function FavoritesSection({
  favorites,
  onRemoveFavorite,
}: FavoritesSectionProps) {
  if (favorites.length === 0) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-[#2e4e2c] mb-4">
              Your Favorites
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No favorite brands yet</p>
              <p className="text-gray-400 mt-2">
                Start exploring and add brands to your favorites!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#2e4e2c] mb-4">
            Your Favorites
          </h2>
          <p className="text-gray-600">
            Your curated collection of sustainable brands
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-red-200 transition-all"
            >
              <div className="bg-gradient-to-br from-red-100 to-pink-100 h-32 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-red-300/50" />
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
                  <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {brand.sustainability_score}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-800">
                      {brand.category}
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onRemoveFavorite(brand.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">
                    Remove from Favorites
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
