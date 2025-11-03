"use client"

import { useState, useEffect } from 'react'
import { Plus, Clock, Star, Droplets, Sun, Moon, CheckCircle, Calendar, Settings, User } from 'lucide-react'

interface Product {
  id: string
  name: string
  type: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'treatment'
  period: 'morning' | 'evening' | 'both'
  completed?: boolean
}

interface Routine {
  morning: Product[]
  evening: Product[]
}

export default function PelePlenaApp() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState<'home' | 'routine' | 'products' | 'profile'>('home')
  const [routine, setRoutine] = useState<Routine>({
    morning: [
      { id: '1', name: 'Limpeza Facial Suave', type: 'cleanser', period: 'morning' },
      { id: '2', name: 'Vitamina C Sérum', type: 'serum', period: 'morning' },
      { id: '3', name: 'Hidratante Facial', type: 'moisturizer', period: 'morning' },
      { id: '4', name: 'Protetor Solar FPS 60', type: 'sunscreen', period: 'morning' }
    ],
    evening: [
      { id: '5', name: 'Demaquilante', type: 'cleanser', period: 'evening' },
      { id: '6', name: 'Limpeza Profunda', type: 'cleanser', period: 'evening' },
      { id: '7', name: 'Tônico Facial', type: 'toner', period: 'evening' },
      { id: '8', name: 'Retinol Sérum', type: 'serum', period: 'evening' },
      { id: '9', name: 'Hidratante Noturno', type: 'moisturizer', period: 'evening' }
    ]
  })

  const [completedToday, setCompletedToday] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleProductCompletion = (productId: string) => {
    setCompletedToday(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getCurrentPeriod = () => {
    const hour = currentTime.getHours()
    return hour < 12 ? 'morning' : 'evening'
  }

  const getProductIcon = (type: Product['type']) => {
    switch (type) {
      case 'cleanser': return <Droplets className="w-5 h-5 text-blue-500" />
      case 'toner': return <Droplets className="w-5 h-5 text-cyan-500" />
      case 'serum': return <Star className="w-5 h-5 text-yellow-500" />
      case 'moisturizer': return <Droplets className="w-5 h-5 text-green-500" />
      case 'sunscreen': return <Sun className="w-5 h-5 text-orange-500" />
      case 'treatment': return <Star className="w-5 h-5 text-purple-500" />
      default: return <Droplets className="w-5 h-5 text-gray-500" />
    }
  }

  const currentPeriod = getCurrentPeriod()
  const currentRoutine = routine[currentPeriod]
  const completedCount = currentRoutine.filter(product => completedToday.includes(product.id)).length
  const progressPercentage = (completedCount / currentRoutine.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-6 rounded-b-3xl shadow-2xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Pele Plena</h1>
              <p className="text-purple-100 text-sm">Sua pele merece o melhor</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-100">
                {currentTime.toLocaleDateString('pt-BR')}
              </div>
              <div className="text-lg font-semibold">
                {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-purple-100">
            <span>Rotina {currentPeriod === 'morning' ? 'Matinal' : 'Noturna'}</span>
            <span>{completedCount}/{currentRoutine.length} completos</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Current Period Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                {currentPeriod === 'morning' ? (
                  <Sun className="w-6 h-6 text-orange-500" />
                ) : (
                  <Moon className="w-6 h-6 text-indigo-500" />
                )}
                <h2 className="text-xl font-semibold text-gray-800">
                  Rotina {currentPeriod === 'morning' ? 'Matinal' : 'Noturna'}
                </h2>
              </div>
              
              <div className="space-y-3">
                {currentRoutine.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      completedToday.includes(product.id)
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                        : 'bg-gray-50 hover:bg-purple-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        {getProductIcon(product.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{product.name}</div>
                        <div className="text-sm text-gray-500">Passo {index + 1}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleProductCompletion(product.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        completedToday.includes(product.id)
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400 hover:bg-purple-200 hover:text-purple-600'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold">{completedCount}</div>
                <div className="text-purple-100 text-sm">Produtos usados hoje</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold">7</div>
                <div className="text-indigo-100 text-sm">Dias de sequência</div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-800">Dica do Dia</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Lembre-se de aplicar o protetor solar mesmo em dias nublados. Os raios UV podem atravessar as nuvens!
              </p>
            </div>
          </div>
        )}

        {activeTab === 'routine' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Suas Rotinas</h2>
            
            {/* Morning Routine */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Rotina Matinal</h3>
              </div>
              <div className="space-y-2">
                {routine.morning.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-orange-50">
                    <span className="text-sm font-medium text-orange-600 bg-orange-200 w-6 h-6 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    {getProductIcon(product.type)}
                    <span className="text-gray-700">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Routine */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xl font-semibold text-gray-800">Rotina Noturna</h3>
              </div>
              <div className="space-y-2">
                {routine.evening.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50">
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-200 w-6 h-6 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    {getProductIcon(product.type)}
                    <span className="text-gray-700">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Meus Produtos</h2>
              <button className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[...routine.morning, ...routine.evening].map((product) => (
                <div key={product.id} className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="bg-purple-50 p-3 rounded-full">
                      {getProductIcon(product.type)}
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Meu Perfil</h2>
              <p className="text-gray-600">Personalize sua experiência</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                <h3 className="font-semibold text-gray-800 mb-2">Tipo de Pele</h3>
                <p className="text-gray-600">Mista</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                <h3 className="font-semibold text-gray-800 mb-2">Principais Preocupações</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Acne</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Oleosidade</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Poros</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                <h3 className="font-semibold text-gray-800 mb-2">Estatísticas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dias consecutivos</span>
                    <span className="font-semibold text-purple-600">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Produtos favoritos</span>
                    <span className="font-semibold text-purple-600">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rotinas completas</span>
                    <span className="font-semibold text-purple-600">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 px-4 py-2 shadow-2xl">
        <div className="max-w-md mx-auto flex justify-around">
          {[
            { id: 'home', icon: Clock, label: 'Início' },
            { id: 'routine', icon: Calendar, label: 'Rotinas' },
            { id: 'products', icon: Droplets, label: 'Produtos' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Padding */}
      <div className="h-20"></div>
    </div>
  )
}