import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, CheckCircle2, XCircle, Clock, ChevronRight } from 'lucide-react'

const Sidebar = ({ selectedTable, onConfirm }) => {
  return (
    <motion.div 
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-6 top-6 bottom-6 w-80 glass rounded-3xl z-10 flex flex-col overflow-hidden"
    >
      <div className="p-8 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-white/90">
          ANTIGRAVITY
          <span className="block text-xs font-medium text-brand-primary tracking-[0.2em] mt-1 italic">
            RESERVATIONS
          </span>
        </h2>

        {/* Legend */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="w-3 h-3 rounded-full bg-brand-primary glow-green" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="w-3 h-3 rounded-full bg-brand-booked glow-yellow" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="w-3 h-3 rounded-full bg-brand-occupied glow-red" />
            <span>Occupied</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedTable ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest">Selected Table</label>
                <div className="text-4xl font-light">Table {selectedTable.table_number}</div>
              </div>

              <div className="glass bg-white/5 rounded-2xl p-4 space-y-4 border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Capacity</span>
                  <span className="text-sm font-medium">4 People</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">View</span>
                  <span className="text-sm font-medium italic">Space Horizon</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Service</span>
                  <span className="text-sm font-medium">Floating Butler</span>
                </div>
              </div>

              <button
                onClick={() => onConfirm(selectedTable.id)}
                className="w-full py-4 bg-brand-primary text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(0,255,136,0.3)]"
              >
                Confirm Reservation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                <Info className="w-8 h-8" />
              </div>
              <p className="text-sm text-white/40 leading-relaxed px-4">
                Select an available table from the floor plan to start your reservation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-widest text-center italic">
        Powered by Antigravity Studio
      </div>
    </motion.div>
  )
}

export default Sidebar
