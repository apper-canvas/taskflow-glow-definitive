import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const ProgressIndicator = ({ 
  completed = 0, 
  total = 0, 
  className,
  showDetails = true 
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return (
    <div className={cn("space-y-2", className)}>
      {showDetails && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            Progress
          </span>
          <span className="text-gray-500">
            {completed} of {total} completed
          </span>
        </div>
      )}
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        {percentage > 0 && (
          <motion.div
            className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg"
            style={{ left: `${Math.min(percentage, 90)}%` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProgressIndicator