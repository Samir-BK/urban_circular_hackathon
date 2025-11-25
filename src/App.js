import React, { useState, useMemo, useEffect } from "react";
import {
  Leaf,
  Activity,
  ArrowRight,
  Languages,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  TreeDeciduous,
  Sun,
  Wind,
  BarChart3,
  Calendar,
  Target,
  Zap,
  Users,
  Info,
  MapPin,
  Gift,
  Coffee,
  Ticket,
  Award,
  Building2,
  GraduationCap,
  Baby,
  X,
  Euro,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";

// --- Translations ---
const content = {
  en: {
    nav: { title: "City Pulse Helsinki", team: "Team Mytho" },
    hero: {
      title: "Making Energy Data Speak Human",
      subtitle:
        "We bridge the gap between complex city data and citizen action through clear, gamified insights.",
      cta: "Launch Prototype",
    },
    problem: {
      title: "The Problem",
      desc: "Citizens want to help, but current data is unreadable.",
      cards: [
        {
          title: "Invisible Units",
          text: "kWh & Megajoules mean nothing to average people.",
        },
        { title: "Boring Data", text: "Spreadsheets don't inspire action." },
        {
          title: "No Connection",
          text: "People don't see how THEY impact the city.",
        },
      ],
    },
    solution: {
      title: "Our Solution: City Pulse",
      desc: "A real-time, gamified dashboard that translates data into impact.",
      toggleOld: "Policymaker View (Old)",
      toggleNew: "Citizen View (Live)",
      toggleFuture: "2030 Vision (Sim)",
      myImpact: "My Daily Impact",
      commScore: "Neighborhood Score",
    },
    future: {
      title: "Helsinki 2030 Roadmap",
      subtitle: "Projected Carbon Emissions based on Citizen Engagement",
      controls: "Policy Levers",
      adoption: "Community Adoption",
      investment: "Smart Grid Investment",
      bau: "Business as Usual",
      projected: "With City Pulse",
      target: "2030 Goal",
      insight:
        "Insight: Increasing citizen engagement by 20% accelerates our 2030 targets by 2 years.",
    },
    impact: {
      title: "Projected Impact",
      engagement: "Higher Engagement",
      reduction: "Energy Reduction",
      adoption: "Green Adoption",
    },
    team: {
      title: "Team Mytho",
      roles: ["Pitcher", "Data Expert", "Designer", "Project Manager"],
    },
  },
  fi: {
    nav: { title: "Kaupungin Syke", team: "Tiimi Mytho" },
    hero: {
      title: "Tehdään Energiadatasta Ymmärrettävää",
      subtitle:
        "Yhdistämme monimutkaisen kaupunkidatan ja asukkaiden arjen selkeillä, pelillistetyillä näkymillä.",
      cta: "Avaa Prototyyppi",
    },
    problem: {
      title: "Ongelma",
      desc: "Asukkaat haluavat auttaa, mutta nykyinen data on vaikeaselkoista.",
      cards: [
        {
          title: "Näkymättömät Yksiköt",
          text: "kWh ja Megajoulet eivät kerro mitään tavalliselle ihmiselle.",
        },
        { title: "Tylsä Data", text: "Taulukot eivät innosta toimintaan." },
        {
          title: "Ei Yhteyttä",
          text: "Ihmiset eivät näe oman toimintansa vaikutusta.",
        },
      ],
    },
    solution: {
      title: "Ratkaisumme: Kaupungin Syke",
      desc: "Reaaliaikainen, pelillistetty näkymä, joka muuttaa datan vaikutukseksi.",
      toggleOld: "Virkamiesnäkymä (Vanha)",
      toggleNew: "Asukasläkymä (Live)",
      toggleFuture: "2030 Visio (Sim)",
      myImpact: "Oma Vaikutukseni",
      commScore: "Naapuruston Pisteet",
    },
    future: {
      title: "Helsinki 2030 Tiekartta",
      subtitle: "Arvioidut hiilipäästöt asukkaiden osallistumisen perusteella",
      controls: "Ohjauskeinot",
      adoption: "Yhteisön Osallistuminen",
      investment: "Älyverkkosijoitukset",
      bau: "Nykykehitys",
      projected: "Kaupungin Sykkeen Kanssa",
      target: "2030 Tavoite",
      insight:
        "Oivallus: Asukkaiden osallistumisen lisääminen 20%:lla nopeuttaa 2030 tavoitteita kahdella vuodella.",
    },
    impact: {
      title: "Arvioitu Vaikutus",
      engagement: "Korkeampi Sitoutuminen",
      reduction: "Energian Vähennys",
      adoption: "Vihreä Siirtymä",
    },
    team: {
      title: "Tiimi Mytho",
      roles: [
        "Esittelijä",
        "Data-asiantuntija",
        "Suunnittelija",
        "Projektipäällikkö",
      ],
    },
  },
};

// --- Mock Data Generators ---
const generateLiveData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    name: `${i}:00`,
    value: Math.floor(Math.random() * 1000) + 2000,
    renewable: Math.floor(Math.random() * 800) + 1200,
    fossil: Math.floor(Math.random() * 600) + 400,
  }));
};

const futureDataBase = [
  { year: 2025, bau: 100, target: 100 },
  { year: 2026, bau: 98, target: 90 },
  { year: 2027, bau: 95, target: 80 },
  { year: 2028, bau: 93, target: 70 },
  { year: 2029, bau: 90, target: 60 },
  { year: 2030, bau: 88, target: 50 },
];

// --- Persona Configurations ---
const personas = {
  student: {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    multiplier: 1,
    basePoints: 1250,
    rewards: [
      { id: 1, name: "Free Coffee @ Roberts", cost: 1300, icon: Coffee },
      { id: 2, name: "24h HSL Ticket", cost: 1500, icon: Ticket },
      { id: 3, name: "Uni Lunch Discount", cost: 1800, icon: Gift },
    ],
  },
  family: {
    id: "family",
    label: "Family of 4",
    icon: Baby,
    multiplier: 2.5,
    basePoints: 2400,
    rewards: [
      { id: 1, name: "Grocery Discount -5%", cost: 2500, icon: Gift },
      { id: 2, name: "Family Pool Pass", cost: 2800, icon: Ticket },
      { id: 3, name: "Free Parking Weekend", cost: 3200, icon: MapPin },
    ],
  },
  business: {
    id: "business",
    label: "Local Cafe Owner",
    icon: Building2,
    multiplier: 10,
    basePoints: 5000,
    rewards: [
      { id: 1, name: "Green Business Badge", cost: 5500, icon: Award },
      { id: 2, name: "Tax Credit (100€)", cost: 6000, icon: Euro },
      { id: 3, name: "Featured on City Map", cost: 7000, icon: MapPin },
    ],
  },
};

// --- Sub-Components ---

// 1. Heatmap Component
const HelsinkiHeatmap = ({ score }) => {
  // Simple heuristic: Score > 1300 is green, else red/orange
  const getColor = (threshold) => {
    if (score >= threshold) return "#10B981"; // Emerald-500
    if (score >= threshold - 100) return "#F59E0B"; // Amber-500
    return "#EF4444"; // Red-500
  };

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-lg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Abstract Map of Helsinki Districts */}
      <path
        d="M150,50 L250,50 L280,100 L220,150 L120,100 Z"
        fill={getColor(1300)}
        stroke="white"
        strokeWidth="2"
        className="transition-colors duration-700"
      />
      <text x="180" y="90" fontSize="10" fill="white" fontWeight="bold">
        Pasila
      </text>

      <path
        d="M120,100 L220,150 L200,250 L80,200 L100,120 Z"
        fill={getColor(1400)}
        stroke="white"
        strokeWidth="2"
        className="transition-colors duration-700"
      />
      <text x="140" y="180" fontSize="10" fill="white" fontWeight="bold">
        Kamppi
      </text>

      <path
        d="M220,150 L280,100 L350,120 L320,220 L200,250 Z"
        fill={getColor(1250)}
        stroke="white"
        strokeWidth="2"
        className="transition-colors duration-700"
      />
      <text x="260" y="160" fontSize="10" fill="white" fontWeight="bold">
        Kallio
      </text>

      <path
        d="M80,200 L200,250 L180,290 L50,250 Z"
        fill={getColor(1500)}
        stroke="white"
        strokeWidth="2"
        className="transition-colors duration-700"
      />
      <text x="100" y="240" fontSize="10" fill="white" fontWeight="bold">
        Jätkäsaari
      </text>
    </svg>
  );
};

// 2. Toast Notification Component
const Toast = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="absolute bottom-4 right-4 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce z-50">
      <div className="bg-yellow-500 p-2 rounded-full text-slate-900">
        <Award size={20} />
      </div>
      <div>
        <p className="font-bold text-sm">Achievement Unlocked!</p>
        <p className="text-xs text-slate-300">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-slate-400 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
};

// 3. Stat Cards
const Card = ({ icon: Icon, title, text, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full group">
    <div
      className={`p-4 rounded-full ${color} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform`}
    >
      <Icon className={`w-8 h-8 ${color.replace("bg-", "text-")}`} />
    </div>
    <h3 className="font-bold text-slate-800 mb-2 text-lg">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
  </div>
);

const StatCard = ({ label, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-5 hover:border-emerald-200 transition-colors">
    <div
      className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-emerald-100`}
    >
      <Icon size={28} />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="text-3xl font-black text-slate-800">{value}</p>
      <p className="text-sm text-slate-500 font-medium">{subtext}</p>
    </div>
  </div>
);

// --- VIEWS ---

const OldWayView = () => {
  // ... same as before
  const data = [
    {
      id: 1,
      metric: "Total Consumption",
      value: "4,521,002 kWh",
      change: "+2.4%",
    },
    { id: 2, metric: "Grid Load Factor", value: "0.87 φ", change: "-0.1%" },
    {
      id: 3,
      metric: "Carbon Intensity",
      value: "142 gCO2/kWh",
      change: "+1.2%",
    },
    { id: 4, metric: "Base Load", value: "210 MW", change: "0.0%" },
  ];

  return (
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">
          Legacy Reporting System
        </h3>
        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded font-mono font-bold">
          CONFUSING
        </span>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-6 shadow-sm">
        <table className="w-full text-sm text-left text-slate-600 font-mono">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Metric ID</th>
              <th className="px-6 py-4">Technical Value</th>
              <th className="px-6 py-4">Delta</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-0 border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.metric}
                </td>
                <td className="px-6 py-4">{row.value}</td>
                <td
                  className={`px-6 py-4 ${
                    row.change.includes("+") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {row.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex-grow bg-white p-4 rounded-lg border border-slate-200 relative">
        <p className="absolute top-2 left-4 text-xs font-mono text-slate-400">
          FIG 1.2: AGGREGATE LOAD VARIANCE
        </p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: "A", uv: 4000, pv: 2400 },
              { name: "B", uv: 3000, pv: 1398 },
              { name: "C", uv: 2000, pv: 9800 },
              { name: "D", uv: 2780, pv: 3908 },
            ]}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "#f1f5f9" }} />
            <Bar dataKey="pv" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="uv" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const NewWayView = ({ t }) => {
  const [temp, setTemp] = useState(21);
  const [activePersona, setActivePersona] = useState("student");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [liveData] = useState(generateLiveData());

  const persona = personas[activePersona];

  // Derived calculations based on Persona Multipliers
  const trees = Math.round((12 + (21 - temp) * 3.5) * persona.multiplier);
  const points = Math.round(persona.basePoints + (21 - temp) * 150);
  const savings = (persona.multiplier * (42.5 + (21 - temp) * 5.2)).toFixed(2);

  // Trigger gamification toast
  useEffect(() => {
    if (temp < 20) {
      setToast({
        visible: true,
        message: "❄ Polar Bear Hero: You saved 10% Energy!",
      });
      setTimeout(() => setToast({ visible: false, message: "" }), 4000);
    }
  }, [temp]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-emerald-100 h-full flex flex-col relative overflow-hidden">
      {/* Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={() => setToast({ ...toast, visible: false })}
      />

      {/* Header with Persona Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Activity className="text-emerald-600 animate-pulse" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 leading-none">
              {t.solution.commScore}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              REAL-TIME DASHBOARD
            </p>
          </div>
        </div>

        {/* Persona Toggles */}
        <div className="bg-slate-100 p-1 rounded-xl flex space-x-1">
          {Object.values(personas).map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePersona(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all ${
                activePersona === p.id
                  ? "bg-white shadow-sm text-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <p.icon size={14} />
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 text-center shadow-sm">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
            Score
          </p>
          <p className="text-3xl font-black text-emerald-700">{points}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 text-center shadow-sm">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            Saved
          </p>
          <p className="text-3xl font-black text-blue-700">€{savings}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-100 text-center shadow-sm">
          <p className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
            Trees Eq.
          </p>
          <div className="flex items-center justify-center space-x-1">
            <TreeDeciduous size={24} className="text-amber-500" />
            <p className="text-3xl font-black text-amber-700">{trees}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 text-center shadow-sm flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <HelsinkiHeatmap score={points} />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">
              Helsinki Map
            </p>
            <p className="text-xs font-bold text-slate-500">Live Heatmap</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col md:flex-row gap-8 flex-grow">
        {/* Left Col: Controls & Rewards */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {/* Control Panel */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-700 mb-6 flex items-center">
              <Zap size={18} className="mr-2 text-slate-400" />
              {t.solution.myImpact}
            </h4>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-slate-700">
                  Thermostat
                </label>
                <span className="text-2xl font-bold text-emerald-600 bg-white px-3 py-1 rounded shadow-sm border border-emerald-100">
                  {temp}°C
                </span>
              </div>
              <input
                type="range"
                min="16"
                max="26"
                value={temp}
                onChange={(e) => setTemp(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
              />
              <p className="text-xs text-slate-500 mt-3 flex items-center">
                <Info size={12} className="mr-1" /> Lowering by 1°C saves ~5%
                energy.
              </p>
            </div>
          </div>

          {/* Rewards Marketplace */}
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex-grow">
            <h4 className="font-bold text-indigo-900 mb-4 flex items-center">
              <Gift size={18} className="mr-2 text-indigo-600" />
              Rewards Marketplace
            </h4>
            <div className="space-y-3">
              {persona.rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    points >= reward.cost
                      ? "bg-white border-indigo-200 shadow-sm"
                      : "bg-indigo-100/50 border-transparent opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        points >= reward.cost
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      <reward.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        {reward.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {reward.cost} pts
                      </p>
                    </div>
                  </div>
                  {points >= reward.cost ? (
                    <button className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-md font-bold">
                      Claim
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold">
                      Locked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Visualization */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Heatmap Area */}
          <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex-grow min-h-[250px] shadow-lg">
            <div className="absolute top-4 left-4 z-10">
              <h4 className="text-white font-bold flex items-center">
                <MapPin className="mr-2 text-emerald-400" size={16} /> District
                Engagement Heatmap
              </h4>
              <p className="text-slate-400 text-xs">
                Real-time participation by neighborhood
              </p>
            </div>
            <div className="w-full h-full flex items-center justify-center p-4">
              <HelsinkiHeatmap score={points} />
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-48 relative">
            <h4 className="absolute top-0 left-0 text-xs font-bold text-slate-400 uppercase tracking-wider z-10">
              Energy Mix Today
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={liveData}
                margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="renewable"
                  stackId="1"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#colorRen)"
                  name="Renewable"
                />
                <Area
                  type="monotone"
                  dataKey="fossil"
                  stackId="1"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="url(#colorFos)"
                  name="Grid/Fossil"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const FutureView = ({ t }) => {
  // ... same as before
  const [adoption, setAdoption] = useState(50);

  // useMemo prevents recalculation jitter and ensures data exists on render
  const data = useMemo(() => {
    return futureDataBase.map((item) => {
      const yearIndex = item.year - 2025;
      // Formula: Higher adoption = steeper curve downwards
      // Base improvement + User selected adoption impact
      const adoptionImpact = (adoption / 100) * (yearIndex * 12);
      const naturalProgress = yearIndex * 2;

      let projected = item.bau - (naturalProgress + adoptionImpact);
      // Clamp to minimal 20%
      projected = Math.max(20, projected);

      return {
        ...item,
        projected: Math.round(projected),
      };
    });
  }, [adoption]);

  const onTrack = data[data.length - 1].projected <= 50;

  return (
    <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700 h-full flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
            <Calendar className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{t.future.title}</h3>
            <p className="text-xs text-indigo-300 font-mono uppercase tracking-widest">
              SIMULATION MODE
            </p>
          </div>
        </div>
        <div
          className={`px-4 py-1.5 rounded-full border ${
            onTrack
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
              : "bg-amber-500/20 border-amber-500/50 text-amber-400"
          } text-xs font-bold uppercase tracking-wider`}
        >
          {onTrack ? "On Track for 2030" : "Action Needed"}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-grow relative z-10">
        {/* Controls */}
        <div className="w-full lg:w-1/3 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm flex flex-col justify-center">
          <h4 className="font-bold text-slate-200 mb-8 flex items-center">
            <Target size={18} className="mr-2 text-indigo-400" />
            {t.future.controls}
          </h4>

          <div className="mb-10">
            <div className="flex justify-between text-sm text-slate-300 mb-4 font-medium">
              <span>{t.future.adoption}</span>
              <span className="text-indigo-400 font-bold font-mono">
                {adoption}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={adoption}
              onChange={(e) => setAdoption(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase">
              <span>Current</span>
              <span>Target</span>
            </div>
          </div>

          <div className="p-4 bg-indigo-900/30 border border-indigo-500/30 rounded-xl">
            <div className="flex items-start">
              <Info
                size={16}
                className="text-indigo-400 mt-0.5 mr-3 flex-shrink-0"
              />
              <p className="text-sm text-indigo-200 leading-relaxed">
                <span className="font-bold text-white">Analysis:</span>{" "}
                Increasing citizen engagement by{" "}
                <span className="text-white font-bold">20%</span> accelerates
                carbon neutrality by approximately{" "}
                <span className="text-white font-bold">2 years</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Chart Container - Fixed Height for Safety */}
        <div className="w-full lg:w-2/3 bg-slate-800/30 rounded-2xl border border-slate-700 p-6 relative min-h-[350px]">
          {/* Legend */}
          <div className="flex justify-end space-x-6 mb-4 text-xs font-bold text-slate-400">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-slate-600 mr-2"></div>
              {t.future.bau}
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              {t.future.projected}
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  stroke="#94a3b8"
                  fontSize={12}
                  domain={[0, 110]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "12px",
                    border: "1px solid #475569",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#94a3b8" }}
                />

                {/* Business As Usual Line */}
                <Line
                  type="monotone"
                  dataKey="bau"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />

                {/* Goal Line */}
                <ReferenceLine
                  y={50}
                  label={{
                    position: "right",
                    value: "2030 Goal",
                    fill: "#6366f1",
                    fontSize: 10,
                  }}
                  stroke="#6366f1"
                  strokeDasharray="3 3"
                  opacity={0.5}
                />

                {/* Projected Line */}
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#10b981"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#10b981",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6, fill: "#fff", stroke: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-4 font-mono uppercase tracking-widest">
            Emission levels relative to 2025 baseline (100%)
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [lang, setLang] = useState("en");
  const [viewMode, setViewMode] = useState("new"); // 'old', 'new', 'future'
  const t = content[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-200">
              <Leaf className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              {t.nav.title}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hidden md:block text-sm font-bold text-slate-400 tracking-wider uppercase">
              {t.nav.team}
            </span>
            <button
              onClick={() => setLang(lang === "en" ? "fi" : "en")}
              className="flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors bg-slate-100 px-3 py-1.5 rounded-full"
            >
              <Languages size={16} />
              <span>{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-slate-900 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-500 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-full bg-blue-600 blur-[150px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
            {t.hero.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i === 1 || i === 2
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300 font-light leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("prototype")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center"
            >
              {t.hero.cta}{" "}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>
      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {t.problem.title}
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t.problem.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              icon={AlertTriangle}
              title={t.problem.cards[0].title}
              text={t.problem.cards[0].text}
              color="bg-red-500"
            />
            <Card
              icon={BarChart3}
              title={t.problem.cards[1].title}
              text={t.problem.cards[1].text}
              color="bg-orange-500"
            />
            <Card
              icon={Users}
              title={t.problem.cards[2].title}
              text={t.problem.cards[2].text}
              color="bg-slate-500"
            />
          </div>
        </div>
      </section>
      {/* Solution Prototype Section */}
      <section
        id="prototype"
        className="py-24 bg-slate-50 border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                {t.solution.title}
              </h2>
              <p className="text-slate-600 text-lg">{t.solution.desc}</p>
            </div>

            {/* View Toggle */}
            <div className="mt-8 md:mt-0 bg-white p-1.5 rounded-xl border border-slate-200 inline-flex shadow-sm">
              <button
                onClick={() => setViewMode("old")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  viewMode === "old"
                    ? "bg-slate-200 text-slate-800"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t.solution.toggleOld}
              </button>
              <button
                onClick={() => setViewMode("new")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center space-x-2 ${
                  viewMode === "new"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <span>{t.solution.toggleNew}</span>
              </button>
              <button
                onClick={() => setViewMode("future")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center space-x-2 ${
                  viewMode === "future"
                    ? "bg-slate-800 text-white shadow-lg shadow-slate-300"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <span>{t.solution.toggleFuture}</span>
              </button>
            </div>
          </div>

          {/* The Dashboard Render */}
          <div className="h-[750px] md:h-[650px] w-full transition-all duration-500 transform">
            {viewMode === "old" && <OldWayView />}
            {viewMode === "new" && <NewWayView lang={lang} t={t} />}
            {viewMode === "future" && <FutureView t={t} />}
          </div>
        </div>
      </section>
      {/* Impact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-16">
            {t.impact.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              label={t.impact.engagement}
              value="+340%"
              subtext="vs. PDF reports"
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              label={t.impact.reduction}
              value="-15%"
              subtext="Peak hour demand"
              icon={TrendingUp}
              color="bg-emerald-500"
            />
            <StatCard
              label={t.impact.adoption}
              value="8/10"
              subtext="Pilot users prefer this"
              icon={CheckCircle}
              color="bg-purple-500"
            />
          </div>
        </div>
      </section>
      {/* Footer / Team */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-white text-xl font-bold mb-2">
              {t.team.title}
            </h3>
            <p className="text-sm text-slate-500">
              U!REKA Urban Circular Hack Helsinki 2025
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-wider">
            {t.team.roles.map((role, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 hover:border-emerald-500 transition-colors cursor-default text-slate-300"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </footer>
         
    </div>
  );
}
