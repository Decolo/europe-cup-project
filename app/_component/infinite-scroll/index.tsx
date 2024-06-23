"use client";

import { motion } from "framer-motion";

const InfiniteScroll = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        style={{ display: "inline-block" }}
        animate={{ x: [0, 100, 0] }} // 从0到100再回到0
        transition={{
          repeat: Infinity, 
          duration: 5, 
          ease: "linear", 
        }}
      >
        <div style={{ display: "inline-block", padding: "0 50px" }}>
          {/* 你的内容 */}
          <h1>无限滚动内容</h1>
        </div>
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
