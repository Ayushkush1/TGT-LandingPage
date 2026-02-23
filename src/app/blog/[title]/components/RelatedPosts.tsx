"use client";
import React from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/sections/BlogSection";

export default function RelatedPosts({ blogs }: { blogs: any[] }) {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {blogs.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <BlogCard {...b} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
