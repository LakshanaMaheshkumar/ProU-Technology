import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { GlobeHero } from "./GlobeHero";
import { BrandCard, Brand } from "./BrandCard";
import { BrandModal } from "./BrandModal";
import { DataInsights } from "./DataInsights";
import { LearnSection } from "./LearnSection";
import { FavoritesSection } from "./FavoritesSection";

const API_URL = "http://localhost:3001/brands"; // JSON server endpoint

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMaterial, setFilterMaterial] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // 1️⃣ Load brands from JSON server
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 2️⃣ Add or edit a brand
  const handleAddBrand = async (brandData: Partial<Brand>) => {
    if (editingBrand) {
      // Update existing brand
      const updatedBrand = { ...editingBrand, ...brandData };
      await fetch(`${API_URL}/${editingBrand.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBrand),
      });
      setBrands((prev) =>
        prev.map((b) => (b.id === editingBrand.id ? updatedBrand : b))
      );
    } else {
      // Add new brand
      const newBrand: Brand = {
        ...(brandData as Brand),
        id: Date.now().toString(),
        user_id: user?.id || "guest",
      };
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrand),
      });
      setBrands((prev) => [newBrand, ...prev]);
    }
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  // 3️⃣ Delete brand
  const handleDeleteBrand = async (brandId: string) => {
    await fetch(`${API_URL}/${brandId}`, { method: "DELETE" });
    setBrands((prev) => prev.filter((b) => b.id !== brandId));
    setFavorites((prev) => prev.filter((id) => id !== brandId));
    setDeleteConfirm(null);
  };

  // 4️⃣ Toggle favorite (local only)
  const handleToggleFavorite = (brandId: string) => {
    if (favorites.includes(brandId)) {
      setFavorites((prev) => prev.filter((id) => id !== brandId));
    } else {
      setFavorites((prev) => [...prev, brandId]);
    }
  };

  const favoriteBrands = brands.filter((b) => favorites.includes(b.id));
  const categories = [...new Set(brands.map((b) => b.category))];

  // 5️⃣ Filter & sort brands
  const filteredBrands = brands
    .filter(
      (b) =>
        (!searchTerm ||
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterCategory || b.category === filterCategory) &&
        (!filterMaterial ||
          b.material.toLowerCase().includes(filterMaterial.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "score")
        return b.sustainability_score - a.sustainability_score;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className={darkMode ? "dark bg-gray-900" : "bg-white"}>
      {/* Dark mode & logout buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={signOut}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg"
        >
          <LogOut className="w-5 h-5 text-gray-700 dark:text-white" />
        </motion.button>
      </div>

      {/* Hero section */}
      <GlobeHero />

      {/* Brands listing */}
      <div className="py-16 px-4 bg-gradient-to-b from-[#f2ebd9] to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header, search, filter */}
          <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8">
            {/* Search & Add */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-[#2e4e2c] outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsModalOpen(true);
                  setEditingBrand(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#2e4e2c] to-[#3d6a38] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" /> Add Brand
              </motion.button>
            </div>
          </div>

          {/* Brand Cards */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#2e4e2c] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No brands found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  isFavorite={favorites.includes(brand.id)}
                  onToggleFavorite={() => handleToggleFavorite(brand.id)}
                  onEdit={() => {
                    setEditingBrand(brand);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => setDeleteConfirm(brand.id)}
                  canEdit={brand.user_id === user?.id || true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {brands.length > 0 && <DataInsights brands={brands} />}
      <LearnSection />
      <FavoritesSection
        favorites={favoriteBrands}
        onRemoveFavorite={handleToggleFavorite}
      />

      <BrandModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBrand(null);
        }}
        onSubmit={handleAddBrand}
        brand={editingBrand}
      />

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this brand? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBrand(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
