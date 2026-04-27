import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BarChart3, CheckCircle2, ChevronRight, Play, ShieldCheck, Star, Users, Zap, MapPin, X } from 'lucide-react';

function Animated3DText({ text, className = '', delayOffset = 0 }: { text: string, className?: string, delayOffset?: number }) {
  const colorClassMatch = className.match(/text-3d-(white|gold)/);
  const colorType = colorClassMatch ? colorClassMatch[1] : 'white';
  const containerClassName = className.replace(/text-3d-(white|gold)/, '');

  const words = text.split(' ');

  const renderLetters = (isShadow: boolean) => {
    return words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split('').map((char, cIdx) => {
          const i = wIdx * 10 + cIdx;
          const yOffset = (i % 2 === 0 ? 1 : -1) * (i % 3 + 1.5);
          const rotXOffset = (i % 3 === 0 ? 1 : -1) * (i % 4 + 3);
          const rotYOffset = (i % 2 === 0 ? -1 : 1) * (i % 5 + 2);
          const rotZOffset = (i % 4 === 0 ? 1 : -1) * (i % 2 + 1);
          
          return (
            <motion.span
              key={cIdx}
              animate={{
                y: [0, yOffset, 0],
                rotateX: [0, rotXOffset, 0],
                rotateY: [0, rotYOffset, 0],
                rotateZ: [0, rotZOffset, 0],
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: delayOffset + i * 0.08,
              }}
              className={`inline-block transform-style-3d p-1 -m-1 ${isShadow ? `text-3d-${colorType}-shadow` : `text-3d-${colorType}-gradient`}`}
              aria-hidden={isShadow ? "true" : undefined}
            >
              {char}
            </motion.span>
          );
        })}
        {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  };

  return (
    <span className={`${containerClassName} relative inline-flex justify-center`}>
      <span className="absolute inset-0 flex justify-center pointer-events-none z-0">
        {renderLetters(true)}
      </span>
      <span className="relative flex justify-center z-10 w-full h-full">
        {renderLetters(false)}
      </span>
    </span>
  );
}

function DecorativeGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px]" />
    </div>
  );
}

function RegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [instagram, setInstagram] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Gostaria de me cadastrar como promoter do Baile do Magnata.\n\nNome: ${name}\nIdade: ${age}\nInstagram: ${instagram}`;
    window.open(`https://wa.me/5577981181047?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-bg border border-amber-500/30 w-full max-w-md rounded-3xl p-8 relative pointer-events-auto gold-glow overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -ml-[150px] w-[300px] h-[300px] rounded-full bg-amber-600/10 blur-[80px] pointer-events-none" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-8 relative z-10">
                <h3 className="font-display font-black text-3xl uppercase tracking-wider text-transparent bg-clip-text text-gradient-gold mb-2">
                  Cadastro Oficial
                </h3>
                <p className="text-gray-400 text-sm font-medium">
                  Preencha seus dados para análise da equipe.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Idade</label>
                  <input 
                    required
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="18"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
                    placeholder="Sua idade"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Instagram (@)</label>
                  <input 
                    required
                    type="text" 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
                    placeholder="@seuinstagram"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full mt-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 font-display premium-gradient shadow-[0_0_30px_rgba(212,175,55,0.3)] text-black hover:brightness-110 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Enviar para a Coordenação
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center">
        <span className="text-xl md:text-2xl font-black text-white font-display leading-none">{timeLeft.h.toString().padStart(2, '0')}</span>
        <span className="text-[8px] uppercase tracking-widest text-amber-500 font-bold mt-1">Horas</span>
      </div>
      <span className="text-xl md:text-2xl font-black text-amber-500/50 mb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xl md:text-2xl font-black text-white font-display leading-none">{timeLeft.m.toString().padStart(2, '0')}</span>
        <span className="text-[8px] uppercase tracking-widest text-amber-500 font-bold mt-1">Minutos</span>
      </div>
      <span className="text-xl md:text-2xl font-black text-amber-500/50 mb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xl md:text-2xl font-black text-white font-display leading-none">{timeLeft.s.toString().padStart(2, '0')}</span>
        <span className="text-[8px] uppercase tracking-widest text-amber-500 font-bold mt-1">Segundos</span>
      </div>
    </div>
  );
}

function FloatingCTA({ onClick }: { onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-8 right-8 z-[60] block md:hidden lg:block"
    >
      <button 
        onClick={onClick}
        className="premium-gradient p-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center group active:scale-95 transition-transform"
      >
        <div className="hidden group-hover:block absolute right-full mr-4 bg-black/80 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded-xl whitespace-nowrap text-xs font-bold text-amber-500 uppercase tracking-widest">
          Quero ser Promoter
        </div>
        <Star className="w-6 h-6 text-black fill-black" />
      </button>
    </motion.div>
  );
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-amber-500/30 selection:text-white relative font-sans overflow-x-hidden">
      <DecorativeGlow />
      
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FloatingCTA onClick={() => setIsModalOpen(true)} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-black text-xl tracking-widest flex items-center gap-3 uppercase group cursor-pointer">
            <div className="w-10 h-10 rounded-lg premium-gradient flex items-center justify-center font-extrabold text-black text-sm shadow-xl shadow-amber-500/20 group-hover:scale-110 transition-transform">
              AP
            </div>
            <span className="hidden sm:inline">Acelera Produções</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <a href="#beneficios" className="hidden lg:block text-xs font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-[0.2em]">Benefícios</a>
            <a href="#cadastro" className="hidden lg:block text-xs font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-[0.2em]">Cadastro</a>
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 rounded-lg border border-amber-500/50 text-[10px] md:text-sm font-bold text-amber-500 hover:bg-amber-500/10 transition-all uppercase tracking-widest font-display cursor-pointer">
              Recrutamento 2024
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 relative z-10">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto flex flex-col items-center text-center mt-8 md:mt-16 mb-32 relative">
          
          {/* Animated Background Images */}
          <motion.img 
            initial={{ opacity: 0, x: -50, y: 0 }}
            animate={{ opacity: 0.3, x: 0, y: [-15, 15, -15] }}
            transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1 }, x: { duration: 1 } }}
            src="https://i.imgur.com/Tu6pgiV.png" 
            alt="MC Paiva Hero Left"
            className="absolute -left-20 -top-10 w-64 md:-left-10 md:top-0 lg:w-80 object-contain mix-blend-lighten z-0 pointer-events-none filter contrast-125 saturate-150 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)' }}
          />
          <motion.img 
            initial={{ opacity: 0, x: 50, y: 0 }}
            animate={{ opacity: 0.3, x: 0, y: [15, -15, 15] }}
            transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 1 }, x: { duration: 1 } }}
            src="https://i.imgur.com/95mpUfR.png" 
            alt="MC Paiva Hero Right"
            className="absolute -right-20 top-20 w-64 md:-right-10 md:top-20 lg:w-80 object-contain mix-blend-lighten z-0 pointer-events-none filter contrast-125 saturate-150 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-[0.4em] mb-4">Encerramento em:</div>
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-10"
          >
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>Recrutamento Exclusivo • Feira de Santana</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="mb-8 z-20 w-full"
          >
            <motion.h1
              animate={{ rotateX: [8, -6, 8], rotateY: [-4, 6, -4], y: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="font-display font-black uppercase flex flex-col items-center transform-style-3d cursor-default drop-shadow-2xl"
            >
              <Animated3DText 
                text="SEJA UMA" 
                className="text-3d-white text-6xl md:text-8xl lg:text-[110px] tracking-[-0.03em] leading-[0.85] z-10 relative mb-1 md:-mb-2" 
              />
              <Animated3DText 
                text="PROMOTER" 
                className="text-3d-gold text-7xl md:text-[80px] lg:text-[120px] tracking-tight leading-[0.85] relative z-20" 
                delayOffset={0.5} 
              />
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
          >
            Faça parte da elite de divulgação do <strong className="text-amber-400 font-display uppercase tracking-wide">Baile do Magnata</strong>. <br className="hidden md:block" /> 
            Ganhe visibilidade, acesso premium e benefícios exclusivos no maior evento do ano.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto group relative flex items-center justify-center gap-3 premium-gradient text-black px-10 py-5 rounded-xl font-bold md:text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95 transition-transform uppercase tracking-widest font-display">
              Fazer meu Cadastro
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-widest mt-4 sm:mt-0">
               <MapPin className="w-5 h-5 text-amber-500" />
               Espaço Fraga Lounge Eventos
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              icon={<Users />}
              value="150+" 
              label="Vagas exclusivas para promotoras de elite."
            />
            <StatsCard 
              icon={<Zap />}
              value="VIP" 
              label="Acesso grátis ao Lounge e Lounge Business."
            />
            <StatsCard 
              icon={<BarChart3 />}
              value="$$$" 
              label="Bonificações e prêmios por desempenho."
            />
          </div>
        </section>

        {/* Requirements Section */}
        <section className="max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="font-display text-4xl font-black text-white uppercase leading-tight mb-6">
                QUEM PODE SER UMA <span className="text-amber-500">PROMOTER?</span>
              </h2>
              <p className="text-gray-400 font-medium">
                Buscamos perfis que tenham influência e saibam criar conexão com o público de <strong className="text-white">Feira de Santana</strong> e região.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Idade Mínima", desc: "Ser maior de 18 anos.", icon: <Star className="w-5 h-5" /> },
                { title: "Perfil Ativo", desc: "Perfil no Instagram aberto e com bom engajamento.", icon: <Users className="w-5 h-5" /> },
                { title: "Presença Digital", desc: "Postagem frequente de Stories e Reels.", icon: <Zap className="w-5 h-5" /> },
                { title: "Networking", desc: "Capacidade de atrair público qualificado para o evento.", icon: <ShieldCheck className="w-5 h-5" /> }
              ].map((req, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                    {req.icon}
                  </div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-2">{req.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{req.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Grid (Visual Anchor) */}
        <section id="beneficios" className="max-w-6xl mx-auto mb-32 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                style={{ perspective: 1200 }}
                className="mb-8 z-20 w-full"
              >
                <motion.h2
                  animate={{ rotateX: [5, -5, 5], rotateY: [-2, 4, -2], y: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase flex flex-col transform-style-3d cursor-default drop-shadow-2xl leading-[0.9]"
                >
                  <Animated3DText 
                    className="text-3d-white relative z-10 block mb-2 md:mb-1"
                    text="PODER &"
                  />
                  <Animated3DText 
                    className="text-3d-gold relative z-20 block"
                    text="INFLUÊNCIA."
                  />
                </motion.h2>
              </motion.div>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Ser uma <strong>Promoter Magnata</strong> não é apenas sobre divulgar um evento, é sobre se posicionar ao lado dos maiores. No <strong>Espaço Fraga Lounge Eventos</strong>, você terá o tratamento que merece.
              </p>
              <ul className="space-y-6">
                {[
                  "Sorteio de carrinho de R$500 na Shein a cada post.",
                  "Acesso à Área Backstage.",
                  "Networking com empresários da cidade.",
                  "Convites para levar amigos.",
                  "Foto garantida com MC Paiva.",
                  "Vários outros benefícios ao decorrer da divulgação."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-gray-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border-2 border-amber-500/30 group gold-glow shadow-2xl flex items-end justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent z-10 pointer-events-none" />
              <motion.img 
                animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                src="https://i.imgur.com/IXvkbLG.png" 
                alt="MC Paiva"
                className="w-[120%] h-auto md:h-full object-cover md:object-contain object-bottom opacity-90 mix-blend-screen filter contrast-[1.1] saturate-[1.2]"
                style={{ maskImage: 'linear-gradient(to top, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)' }}
              />
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Atração Nacional
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 backdrop-blur-md mb-6 border border-amber-500/50 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <Play className="w-6 h-6 text-amber-400 ml-1" />
             </div>
                <h3 className="font-display text-5xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">MC Paiva</h3>
                <p className="text-amber-500 font-bold uppercase tracking-widest text-sm drop-shadow-md">+ Line-Up Exclusivo</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing/Plans Section */}
        <section id="cadastro" className="max-w-6xl mx-auto mb-32 pt-20">
          <div className="text-center mb-16 flex flex-col items-center">
            <motion.div
              style={{ perspective: 1200 }}
              className="mb-8 z-20"
            >
              <motion.h2
                animate={{ rotateX: [6, -4, 6], rotateY: [-3, 3, -3], y: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="font-display text-4xl md:text-5xl lg:text-7xl font-black uppercase transform-style-3d cursor-default drop-shadow-2xl flex flex-wrap justify-center gap-x-4 lg:gap-x-6"
              >
                <Animated3DText className="text-3d-white" text="NOSSOS" />
                <Animated3DText className="text-3d-gold" text="BENEFÍCIOS" delayOffset={0.5} />
              </motion.h2>
            </motion.div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">Escolha seu nível de engajamento e garanta sua vaga na equipe oficial.</p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <PricingCard 
                name="Promoter Magnata"
                price="Acesso VIP"
                subtitle="Destaque Máximo & Status"
                recommended={true}
                features={[
                  "Sorteio R$500 na Shein a cada post",
                  "Área Backstage & Lounge VIP",
                  "Foto Exclusiva com MC Paiva",
                  "Networking com Empresários",
                  "Convites VIPs p/ seus Amigos",
                  "Diversos outros benefícios",
                  "Comissão Agressiva por Venda"
                ]}
                delay={0}
                onSelect={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 rounded-3xl glass border-amber-500/30 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-1/2 -ml-[250px] w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />
            
            <ShieldCheck className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <motion.div
              style={{ perspective: 1200 }}
              className="mb-8 z-20 flex justify-center"
            >
              <motion.h2
                animate={{ rotateX: [4, -4, 4], rotateY: [-2, 2, -2], y: [-2, 2, -2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="font-display text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter text-white uppercase transform-style-3d cursor-default drop-shadow-2xl"
              >
                <Animated3DText className="text-3d-white" text="SEJA UMA MAGNATA" />
              </motion.h2>
            </motion.div>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Feira de Santana vai parar. Garanta sua vaga no time oficial do <strong className="text-amber-400">Baile do Magnata</strong> e viva essa experiência exclusiva.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-3 premium-gradient text-black px-10 py-5 rounded-xl font-black text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95 transition-transform w-full sm:w-auto mx-auto group uppercase tracking-widest font-display cursor-pointer">
              Falar com a Coordenação
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 relative z-10 text-center text-zinc-500 text-sm">
        <p className="font-bold uppercase tracking-widest text-xs mb-2">Coordenação de Promoters - Acelera Produções</p>
        <p>&copy; {new Date().getFullYear()} Baile do Magnata. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function StatsCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass p-8 rounded-3xl flex flex-col items-start gap-4 hover:bg-white/[0.05] transition-colors border-white/10"
    >
      <div className="text-4xl font-black text-amber-500 flex items-center gap-4 font-display">
        <span className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-white">
          {icon}
        </span>
        {value}
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-widest font-bold leading-relaxed">{label}</div>
    </motion.div>
  );
}

function PricingCard({ name, price, subtitle, features, recommended, delay, onSelect }: { name: string, price: string, subtitle: string, features: string[], recommended?: boolean, delay: number, onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-8 md:p-10 rounded-3xl flex flex-col glass ${
        recommended 
        ? 'border-amber-500/50 majestic-glow z-10 scale-100 lg:scale-105 bg-black/60' 
        : 'border-white/10 opacity-90 scale-100 lg:scale-95 bg-black/40'
      }`}
    >
      {recommended && (
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="shimmer-overlay" />
        </div>
      )}
      {recommended && (
        <div className="absolute -top-4 w-full left-0 flex justify-center z-20">
          <div className="premium-gradient px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg text-black font-display">
            Vaga Limitada
          </div>
        </div>
      )}
      
      <div className="mb-8 mt-2">
        <div className="flex justify-between items-center mb-2">
           <h3 className={`font-display font-black uppercase tracking-wider ${recommended ? 'text-4xl text-transparent bg-clip-text text-gradient-gold drop-shadow-md' : 'text-3xl text-white'}`}>{name}</h3>
        </div>
        <p className="text-[10px] text-amber-500/80 uppercase tracking-[0.2em] font-bold mb-4">{subtitle}</p>
        <div className={`text-sm ${recommended ? 'text-white' : 'text-gray-500'} font-bold`}>{price}</div>
      </div>
      
      <div className="flex-1">
        <ul className="space-y-4 mb-10">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-3 text-gray-300 items-start">
              <Star className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${recommended ? 'fill-amber-500 text-amber-500' : 'fill-white/20 text-transparent'}`} />
              <span className="text-xs text-gray-300 font-medium leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onSelect} className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 font-display cursor-pointer ${
        recommended
        ? 'premium-gradient shadow-[0_0_30px_rgba(212,175,55,0.3)] text-black hover:brightness-110'
        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
      }`}>
        {recommended ? 'Preencher Formulário' : 'Analisar Perfil'}
      </button>
    </motion.div>
  );
}
