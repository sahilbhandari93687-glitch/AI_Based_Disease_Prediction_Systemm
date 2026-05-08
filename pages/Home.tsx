import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, HeartPulse } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%)] from-blue-50/50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,transparent)] -z-10" />
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8 animate-fade-in">
            <ShieldCheck size={16} />
            <span>AI-Powered Medical Insights</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight animate-fade-in [animation-delay:200ms]">
            {t('hero_title')} <br />
            <span className="text-gradient">{t('hero_subtitle')}</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
            {t('hero_desc')}
          </p>
          <div className="flex flex-wrap gap-5 justify-center animate-fade-in [animation-delay:600ms]">
            <Link to="/checker" className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.5)] hover:-translate-y-1 active:scale-95">
              {t('start_checker')}
            </Link>
            <Link to="/register" className="glass text-slate-700 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-white transition-all hover:-translate-y-1 active:scale-95">
              {t('join_now')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-100/20 blur-[120px] -z-10 rounded-full" />
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{t('why_choose')}</h2>
          <div className="h-1.5 w-20 bg-blue-600 rounded-full mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><ShieldCheck size={32} /></div>}
            title={t('acc_pred')}
            description="Our advanced ML models provide high-precision screening based on peer-reviewed medical datasets."
          />
          <FeatureCard 
            icon={<div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><Zap size={32} /></div>}
            title={t('inst_res')}
            description="Get your health assessment in seconds. Instant analysis designed for modern healthcare needs."
          />
          <FeatureCard 
            icon={<div className="p-4 bg-rose-50 rounded-2xl text-rose-600"><HeartPulse size={32} /></div>}
            title={t('prev_care')}
            description="Personalized diet and lifestyle roadmaps to help you manage and mitigate potential health risks."
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-950 text-white py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] -z-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6">{t('how_it_works')}</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Three simple steps to professional-grade health insights.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent hidden md:block -translate-y-1/2" />
            <Step number="01" title={t('step1_title')} description="Pick from over 80+ symptoms you are currently experiencing." />
            <Step number="02" title={t('step2_title')} description="Our engine processes symptoms using trained medical datasets." />
            <Step number="03" title={t('step3_title')} description="Receive predicted disease, risk level, and recommended actions." />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="glass p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-all duration-500 group hover:-translate-y-2">
    <div className="mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-3 inline-block">{icon}</div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
  </div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center relative z-10 group">
    <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/30 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-2xl font-black text-blue-500 mb-8 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-xl">
      {number}
    </div>
    <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
  </div>
);

export default Home;
