import { motion } from "framer-motion"

const Loading = ({ message = "Loading tasks..." }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-5 h-5 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-gray-600">{message}</span>
      </div>

      {/* Task Card Skeletons */}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl p-4 border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start gap-4">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-gray-200 rounded border-2 border-gray-300 mt-1 animate-pulse" />
            
            <div className="flex-1 space-y-3">
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              
              {/* Description skeleton */}
              <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
              
              {/* Meta info skeleton */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-5 bg-gray-100 rounded-full animate-pulse w-20" />
                <div className="h-5 bg-gray-100 rounded-full animate-pulse w-16" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading