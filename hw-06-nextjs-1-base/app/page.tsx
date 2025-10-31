import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#23BBBC]/10 to-[#23BBBC]/5 flex flex-col">
      <Header />
      
      {/* Основной контент - центрирован */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-4 border border-[#23BBBC]/20">
            <p className="text-gray-600 text-lg font-medium">
              Здесь мог быть по жучьему... что?
            </p>
            <div className="mt-4 text-sm text-[#23BBBC]">
              Этот блок идеально выровнен по центру.
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}