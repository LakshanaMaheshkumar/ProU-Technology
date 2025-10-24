import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Award } from "lucide-react";

// ✅ Define Brand interface (no Supabase)
export interface Brand {
  id: string;
  name: string;
  country: string;
  category: string;
  price_range: string;
  material: string;
  sustainability_score: number;
  rating: number;
  ethical_practices: string;
  description?: string;
  created_at?: string;
}

interface DataInsightsProps {
  brands: Brand[];
}

export function DataInsights({ brands }: DataInsightsProps) {
  // 🟢 Pie chart: Brand count by category
  const categoryData = brands.reduce((acc, brand) => {
    const existing = acc.find((item) => item.name === brand.category);
    if (existing) existing.value++;
    else acc.push({ name: brand.category, value: 1 });
    return acc;
  }, [] as { name: string; value: number }[]);

  // 🟢 Bar chart: Average sustainability score per country
  const countryScores = brands.reduce((acc, brand) => {
    if (!acc[brand.country]) acc[brand.country] = { total: 0, count: 0 };
    acc[brand.country].total += brand.sustainability_score;
    acc[brand.country].count++;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const avgScoreByCountry = Object.entries(countryScores).map(
    ([country, data]) => ({
      country,
      avgScore: Math.round(data.total / data.count),
    })
  );

  // 🟢 Line chart: Last 6 added brands by sustainability score
  const trendData = brands.slice(-6).map((brand, index) => ({
    month: `Brand ${index + 1}`,
    score: brand.sustainability_score,
  }));

  // 🟢 Top 5 eco-friendly brands
  const topBrands = [...brands]
    .sort((a, b) => b.sustainability_score - a.sustainability_score)
    .slice(0, 5);

  const COLORS = ["#2e4e2c", "#3d6a38", "#4d8544", "#5ca150", "#b5d6b2"];

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
            Data Insights
          </h2>
          <p className="text-gray-600">
            Explore sustainability trends and statistics
          </p>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 🥧 Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Brands by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* 📊 Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Avg Score by Country
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgScoreByCountry}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#2e4e2c" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Trend + Top Brands */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 📈 Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#2e4e2c]" />
              Sustainability Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2e4e2c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* 🏆 Top 5 Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#b5d6b2] to-[#2e4e2c] rounded-2xl shadow-lg p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Top 5 Eco-Friendly Brands
            </h3>
            <div className="space-y-3">
              {topBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{brand.name}</p>
                        <p className="text-sm text-white/80">{brand.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {brand.sustainability_score}
                      </p>
                      <p className="text-xs text-white/80">score</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
