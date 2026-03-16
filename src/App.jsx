// Antigravity Restaurant Reservation Platform - Vercel Deploy Trigger
import React, { useState, useEffect } from 'react'
import Scene from './components/Scene'
import Sidebar from './components/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

// Mock Initial Data
const INITIAL_TABLES = [
  { id: '1', table_number: 1, status: 'available', position: [-4, 0, -4] },
  { id: '2', table_number: 2, status: 'booked', position: [0, 0, -4] },
  { id: '3', table_number: 3, status: 'available', position: [4, 0, -4] },
  { id: '4', table_number: 4, status: 'occupied', position: [-4, 0, 0] },
  { id: '5', table_number: 5, status: 'available', position: [0, 0, 0] },
  { id: '6', table_number: 6, status: 'booked', position: [4, 0, 0] },
  { id: '7', table_number: 7, status: 'available', position: [-4, 0, 4] },
  { id: '8', table_number: 8, status: 'available', position: [0, 0, 4] },
  { id: '9', table_number: 9, status: 'occupied', position: [4, 0, 4] },
]

function App() {
  const [tables, setTables] = useState(INITIAL_TABLES)
  const [selectedTableId, setSelectedTableId] = useState(null)
  const [showNotification, setShowNotification] = useState(false)

  const selectedTable = tables.find(t => t.id === selectedTableId)

  const handleTableClick = (tableNumber) => {
    const table = tables.find(t => t.table_number === tableNumber)
    if (table && table.status === 'available') {
      setSelectedTableId(table.id)
    }
  }

  const handleConfirmReservation = (id) => {
    setTables(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'booked' } : t
    ))
    setSelectedTableId(null)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="relative w-screen h-screen bg-brand-dark overflow-hidden">
      {/* 3D Scene */}
      <Scene tables={tables} onTableClick={handleTableClick} />

      {/* Overlay UI */}
      <Sidebar 
        selectedTable={selectedTable} 
        onConfirm={handleConfirmReservation}
      />

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 20, x: '-50%', opacity: 1 }}
            exit={{ y: -100, x: '-50%', opacity: 0 }}
            className="fixed top-10 left-1/2 p-4 px-8 glass rounded-2xl border border-brand-primary/20 z-50 text-brand-primary font-medium tracking-wide flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            Reservation Confirmed!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Badge */}
      <div className="fixed top-8 left-8 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/10 group cursor-pointer hover:border-brand-primary/50 transition-all">
            <div className="w-6 h-6 border-2 border-brand-primary rounded-sm rotate-45 group-hover:rotate-90 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter">ANTIGRAVITY</span>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] -mt-1 font-medium">Restaurant Group</span>
          </div>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="fixed bottom-8 left-8 z-10 glass px-6 py-3 rounded-full text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-4 border border-white/5">
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
           Orbit View
        </div>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
           Click Green Tables
        </div>
      </div>
    </div>
  )
}

export default App
