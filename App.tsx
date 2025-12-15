import React, { useState, useMemo } from 'react';
import { COST_DRIVERS, MODE_CONSTANTS_USER, RATING_LABELS } from './constants';
import { ProjectMode, Rating } from './types';
import { calculateCosts, calculateEAF, formatCurrency, formatNumber } from './utils';

// --- Components ---

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-16 shadow-2xl border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-24 h-24 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-500/30 transform rotate-3 hover:rotate-6 transition-transform duration-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
            COCOMO Intermedio
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl leading-relaxed">
            Herramienta interactiva para la estimación de costes de software. 
            Calcula el esfuerzo, tiempo y personal basándose en las líneas de código y 15 conductores de coste específicos del modelo constructivo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl text-left">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Estimación Precisa</h3>
              <p className="text-sm text-blue-200">Calcula KLOC, Esfuerzo (PM) y Tiempo (TDEV) según el modo del proyecto.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 text-emerald-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Proyección de Costes</h3>
              <p className="text-sm text-blue-200">Análisis financiero detallado con ajustes automáticos por inflación salarial.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Planificación Flexible</h3>
              <p className="text-sm text-blue-200">Simula escenarios hipotéticos ajustando personal fijo o fechas límite.</p>
            </div>
          </div>

          <button
            onClick={onStart}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-900/40 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 active:translate-y-0"
          >
            <span className="flex items-center gap-3 text-xl">
              Iniciar Calculadora
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>

          <div className="mt-12 flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold opacity-60">
            <span>Ingeniería de Software</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>COCOMO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, unit, color, description }: { label: string, value: string, unit: string, color: string, description: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-950 border-blue-300',
    indigo: 'bg-indigo-50 text-indigo-950 border-indigo-300',
    emerald: 'bg-emerald-50 text-emerald-950 border-emerald-300',
    purple: 'bg-purple-50 text-purple-950 border-purple-300',
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${colorClasses[color]}`}>
      <p className="text-xs font-black opacity-80 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black my-1">{value}</p>
      <p className="text-xs font-bold opacity-80">{unit}</p>
    </div>
  );
}

// --- New Info Page Component ---

function InfoPage({ onBack }: { onBack: () => void }) {
  const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-100 animate-in fade-in duration-500">
      <header className="bg-slate-900 text-white p-6 shadow-lg sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Información y Créditos</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
        
        {/* Description Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-300">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Descripción de la Aplicación
          </h2>
          <p className="text-slate-900 leading-relaxed text-lg font-medium">
            Esta aplicación es una herramienta web diseñada para facilitar la estimación de costes, esfuerzo y tiempo en proyectos de desarrollo de software. Utiliza el modelo <strong>COCOMO Intermedio</strong>, el cual refina las estimaciones del modelo básico introduciendo 15 "Conductores de Coste" (Cost Drivers) que evalúan atributos del producto, del hardware, del personal y del proyecto.
          </p>
        </section>

        {/* Example Calculation Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-300">
          <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
            Ejemplo de Cálculo e Interpretación
          </h2>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-300 mb-6">
            <h3 className="font-bold text-black mb-2 border-b border-slate-300 pb-2">Escenario: Proyecto Orgánico Pequeño</h3>
            <ul className="text-sm text-black font-semibold space-y-1 mb-4">
              <li>• Tamaño del software: <strong>10 KLOC</strong> (10,000 líneas)</li>
              <li>• Modo: <strong>Orgánico</strong> (a=2.4, b=1.05, c=2.5, d=0.38)</li>
              <li>• Conductores de Coste: Todos Nominales (EAF = 1.0)</li>
            </ul>

            <div className="space-y-4">
              <div>
                <p className="font-bold text-blue-900">1. Cálculo del Esfuerzo (E):</p>
                <p className="font-mono text-black font-bold bg-white p-2 rounded border border-slate-400 mt-1 shadow-sm">
                  E = a × (KLOC)ᵇ × EAF <br/>
                  E = 2.4 × (10)¹.⁰⁵ × 1.0 ≈ <strong>26.9 Personas-Mes</strong>
                </p>
              </div>
              
              <div>
                <p className="font-bold text-indigo-900">2. Cálculo del Tiempo (TDEV):</p>
                <p className="font-mono text-black font-bold bg-white p-2 rounded border border-slate-400 mt-1 shadow-sm">
                  TDEV = c × (E)ᵈ <br/>
                  TDEV = 2.5 × (26.9)⁰.³⁸ ≈ <strong>8.7 Meses</strong>
                </p>
              </div>

              <div>
                <p className="font-bold text-emerald-900">3. Cálculo del Personal Promedio (P):</p>
                <p className="font-mono text-black font-bold bg-white p-2 rounded border border-slate-400 mt-1 shadow-sm">
                  P = E / TDEV <br/>
                  P = 26.9 / 8.7 ≈ <strong>3.1 Personas</strong>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black mb-2">Interpretación:</h3>
            <p className="text-slate-900 font-medium leading-relaxed">
              Para este proyecto de 10,000 líneas de código en modo orgánico, se estima que se requerirá un esfuerzo total equivalente al trabajo de <strong>26.9 personas trabajando durante un mes</strong>. Sin embargo, debido a que el trabajo no se puede paralelizar infinitamente, el tiempo óptimo de desarrollo es de aproximadamente <strong>8.7 meses</strong>, lo que sugiere un equipo promedio de <strong>3 personas</strong> a tiempo completo.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gradient-to-r from-blue-900 to-slate-900 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-xl font-bold mb-6 text-blue-200 uppercase tracking-widest border-b border-blue-800 pb-2">Créditos</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-blue-400 uppercase font-bold mb-1">Integrantes</p>
              <p className="text-2xl font-bold">Nicolas Martínez Arias</p>
            </div>
            
            <div className="flex flex-col justify-end">
               <p className="text-xs text-blue-400 uppercase font-bold mb-1">Fecha de Realización</p>
               <p className="text-xl capitalize">{currentMonth} {currentYear}</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}


function Calculator({ onBack, onInfo }: { onBack: () => void, onInfo: () => void }) {
  const [kloc, setKloc] = useState<number>(10); // Default 10 KLOC
  const [mode, setMode] = useState<ProjectMode>(ProjectMode.ORGANIC);
  const [salary, setSalary] = useState<number>(3000000); // Default salary adjusted for COP roughly
  const [driverSelections, setDriverSelections] = useState<Record<string, Rating>>({});
  
  // Flexible Planning State
  const [fixedStaff, setFixedStaff] = useState<string>('');
  const [fixedTime, setFixedTime] = useState<string>('');

  const handleDriverChange = (driverId: string, rating: Rating) => {
    setDriverSelections((prev) => ({
      ...prev,
      [driverId]: rating,
    }));
  };

  const eaf = useMemo(() => calculateEAF(driverSelections), [driverSelections]);
  
  const results = useMemo(() => {
    return calculateCosts(kloc, mode, eaf, salary);
  }, [kloc, mode, eaf, salary]);

  // Planning Calculations
  const planningResults = useMemo(() => {
    let staffResult = null;
    let timeResult = null;

    if (fixedStaff && !isNaN(parseFloat(fixedStaff))) {
      const s = parseFloat(fixedStaff);
      if (s > 0) timeResult = results.effort / s;
    }

    if (fixedTime && !isNaN(parseFloat(fixedTime))) {
      const t = parseFloat(fixedTime);
      if (t > 0) staffResult = results.effort / t;
    }

    return { estimatedTimeForFixedStaff: timeResult, estimatedStaffForFixedTime: staffResult };
  }, [results.effort, fixedStaff, fixedTime]);

  return (
    <div className="min-h-screen bg-slate-100 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6 shadow-lg sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Calculadora COCOMO</h1>
            <p className="text-blue-200 text-sm md:text-base">
              Estimación de costes de desarrollo de software - Modelo Intermedio
            </p>
          </div>
          <div className="flex gap-3 self-start md:self-center">
             <button 
              onClick={onInfo}
              className="bg-blue-800/50 hover:bg-blue-700 text-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-700 shadow-sm"
            >
              Acerca de
            </button>
            <button 
              onClick={onBack}
              className="bg-blue-800 hover:bg-blue-700 text-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-blue-700 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Volver al Inicio
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Basic Parameters */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-300">
            <h2 className="text-xl font-bold text-black mb-4 border-b border-slate-200 pb-2">1. Parámetros del Proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-slate-900 mb-1">
                  Líneas de Código (KLOC)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={kloc}
                  onChange={(e) => setKloc(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border-2 border-slate-500 rounded-lg text-black font-bold focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white shadow-sm"
                />
                <p className="text-xs text-slate-700 font-bold mt-1">1 KLOC = 1000 Líneas de código</p>
              </div>
              
              <div>
                <label className="block text-sm font-black text-slate-900 mb-1">
                  Modo del Proyecto
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as ProjectMode)}
                  className="w-full px-4 py-2 border-2 border-slate-500 rounded-lg text-black font-bold focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow-sm"
                >
                  {Object.values(ProjectMode).map((m) => (
                    <option key={m} value={m}>
                      {MODE_CONSTANTS_USER[m].label}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-slate-700 font-bold mt-1 flex gap-2">
                  <span>a={MODE_CONSTANTS_USER[mode].a}</span>
                  <span>b={MODE_CONSTANTS_USER[mode].b}</span>
                  <span>c={MODE_CONSTANTS_USER[mode].c}</span>
                  <span>d={MODE_CONSTANTS_USER[mode].d}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Drivers */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-300">
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
              <h2 className="text-xl font-bold text-black">2. Conductores de Coste (Cost Drivers)</h2>
              <div className="text-sm font-black bg-blue-100 text-blue-900 px-3 py-1 rounded-full border border-blue-300">
                EAF Actual: {eaf.toFixed(2)}
              </div>
            </div>
            
            <div className="space-y-6">
              {COST_DRIVERS.map((category) => (
                <div key={category.category}>
                  <h3 className="text-sm font-black text-slate-600 uppercase tracking-wider mb-3">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.drivers.map((driver) => (
                      <div key={driver.id} className="relative group">
                        <label className="block text-xs font-bold text-slate-900 mb-1 truncate" title={driver.name}>
                          {driver.id} - {driver.name.split('(')[0]}
                        </label>
                        <select
                          value={driverSelections[driver.id] || Rating.NOMINAL}
                          onChange={(e) => handleDriverChange(driver.id, e.target.value as Rating)}
                          className={`w-full text-sm px-3 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none transition-colors font-bold shadow-sm
                            ${(driverSelections[driver.id] && driverSelections[driver.id] !== Rating.NOMINAL) 
                              ? 'border-blue-600 bg-blue-50 text-blue-900' 
                              : 'border-slate-400 text-black bg-white'}`}
                        >
                          {Object.entries(driver.ratings).map(([rating, value]) => (
                            <option key={rating} value={rating}>
                              {RATING_LABELS[rating as Rating]} ({value})
                            </option>
                          ))}
                        </select>
                        {/* Tooltip */}
                        <div className="absolute z-10 hidden group-hover:block w-48 bg-black text-white text-xs p-2 rounded shadow-lg -top-10 left-0 border border-slate-700">
                          {driver.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Configuration */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-300">
            <h2 className="text-xl font-bold text-black mb-4 border-b border-slate-200 pb-2">3. Configuración Económica</h2>
            <div>
              <label className="block text-sm font-black text-slate-900 mb-1">
                Salario Mensual Promedio (COP)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-900 font-bold">$</span>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 border-2 border-slate-500 rounded-lg text-black font-bold focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow-sm"
                />
              </div>
              <p className="text-xs text-orange-900 font-semibold mt-2 bg-orange-100 p-2 rounded border border-orange-200">
                <span className="font-bold">Nota:</span> El cálculo del coste incluye un incremento anual del 5% en los salarios para proyectos de larga duración.
              </p>
            </div>
          </section>

        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Results Dashboard - REMOVED STICKY */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Resultados de Estimación</h2>
              <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-200 font-medium">Auto-calculado</span>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4">
              <ResultCard 
                label="Esfuerzo" 
                value={formatNumber(results.effort)} 
                unit="Personas-Mes" 
                color="blue" 
                description="Trabajo total requerido"
              />
              <ResultCard 
                label="Duración" 
                value={formatNumber(results.time)} 
                unit="Meses" 
                color="indigo" 
                description="Tiempo de desarrollo"
              />
              <ResultCard 
                label="Personal Promedio" 
                value={formatNumber(results.staff)} 
                unit="Personas" 
                color="emerald" 
                description="Tamaño equipo sugerido"
              />
              <ResultCard 
                label="Productividad" 
                value={formatNumber(results.productivity)} 
                unit="LOC/P-M" 
                color="purple" 
                description="Líneas por persona/mes"
              />
              
              <div className="col-span-2 mt-4 p-4 bg-slate-100 rounded-xl border border-slate-300">
                <p className="text-sm text-slate-700 font-bold uppercase tracking-wide mb-1">Coste Total Estimado</p>
                <p className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  {formatCurrency(results.totalCost)}
                </p>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  Basado en salario inicial de {formatCurrency(salary)}/mes
                </p>
              </div>
            </div>
          </div>

          {/* Flexible Planning Tools */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-300">
            <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Planificación Flexible
            </h2>
            <p className="text-sm text-slate-800 font-semibold mb-4">
              Ajusta las variables para ver cómo impactan en el proyecto.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <label className="block text-sm font-black text-indigo-950 mb-2">
                  ¿Si fijo el equipo a X personas?
                </label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Nº Personas"
                    value={fixedStaff}
                    onChange={(e) => setFixedStaff(e.target.value)}
                    className="w-1/2 px-3 py-2 text-sm border-2 border-indigo-300 bg-white text-black font-bold rounded focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-500"
                  />
                  <div className="w-1/2 flex items-center px-3 bg-white rounded border-2 border-indigo-300 text-indigo-900 font-bold shadow-sm">
                    {planningResults.estimatedTimeForFixedStaff 
                      ? `${formatNumber(planningResults.estimatedTimeForFixedStaff)} Meses` 
                      : '-'}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <label className="block text-sm font-black text-emerald-950 mb-2">
                  ¿Si fijo el tiempo a X meses?
                </label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Nº Meses"
                    value={fixedTime}
                    onChange={(e) => setFixedTime(e.target.value)}
                    className="w-1/2 px-3 py-2 text-sm border-2 border-emerald-300 bg-white text-black font-bold rounded focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-slate-500"
                  />
                  <div className="w-1/2 flex items-center px-3 bg-white rounded border-2 border-emerald-300 text-emerald-900 font-bold shadow-sm">
                    {planningResults.estimatedStaffForFixedTime 
                      ? `${formatNumber(planningResults.estimatedStaffForFixedTime)} Personas` 
                      : '-'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational / About Section */}
          <section className="bg-slate-50 p-6 rounded-xl border border-slate-300">
            <h3 className="text-sm font-black text-slate-600 uppercase tracking-wider mb-2">Sobre este modelo</h3>
            <div className="text-sm text-slate-800 font-medium space-y-2">
              <p>
                <strong>COCOMO (Constructive Cost Model) Intermedio</strong> es un modelo algorítmico que estima el esfuerzo basándose en el tamaño del código (KLOC) y ajustándolo mediante 15 conductores de coste (EAF).
              </p>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>Orgánico:</strong> Equipos pequeños, problemas conocidos.</li>
                <li><strong>Semi-libre:</strong> Mezcla de experiencia, requisitos mixtos.</li>
                <li><strong>Empotrado:</strong> Restricciones hardware/software fuertes.</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-300 text-xs text-slate-500">
                <button onClick={onInfo} className="text-blue-800 font-bold hover:underline">Ver información completa y créditos</button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

type ViewState = 'LANDING' | 'CALCULATOR' | 'INFO';

function App() {
  const [view, setView] = useState<ViewState>('LANDING');

  switch (view) {
    case 'CALCULATOR':
      return <Calculator onBack={() => setView('LANDING')} onInfo={() => setView('INFO')} />;
    case 'INFO':
      return <InfoPage onBack={() => setView('CALCULATOR')} />;
    case 'LANDING':
    default:
      return <LandingPage onStart={() => setView('CALCULATOR')} />;
  }
}

export default App;