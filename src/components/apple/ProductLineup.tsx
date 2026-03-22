// src/components/apple/ProductLineup.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Product } from "@lib/apple-data";
import { formatPrice } from "@lib/apple-data";

interface ProductLineupProps {
  segmentName: string;
  products: Product[];
  accentColor: string;
}

export default function ProductLineup({ segmentName, products, accentColor }: ProductLineupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-[#B8A99A] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#F5F0EB] hover:bg-[#EDE6DD] transition-colors cursor-pointer"
        aria-expanded={isExpanded}
        aria-controls={`lineup-${segmentName}`}
      >
        <span className="text-sm font-semibold text-[#1D1D1F]">
          View {segmentName} Lineup ({products.length} products)
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-[#86868B]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`lineup-${segmentName}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white">
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-[#F5F0EB] transition-colors"
                >
                  <div className="w-20 h-20 mb-2 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-medium text-[#1D1D1F] leading-tight">
                    {product.name}
                  </span>
                  <span className="text-xs text-[#86868B] mt-1">
                    {formatPrice(product.startingPrice)}
                  </span>
                </motion.div>
              ))}
            </div>
            <div
              className="h-0.5 w-full"
              style={{ backgroundColor: accentColor }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
