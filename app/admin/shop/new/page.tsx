"use client"

import { motion } from "framer-motion"
import ProductForm from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <p className="text-gray-500">Add a new digital product to your shop</p>
      </motion.div>
      <ProductForm />
    </div>
  )
}
