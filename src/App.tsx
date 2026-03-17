import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Zap, 
  Lock, 
  Type, 
  Hash, 
  Briefcase, 
  RefreshCw, 
  Instagram, 
  Lightbulb,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight,
  Loader2,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type ToolId = 'password' | 'counter' | 'hashtag' | 'business-name' | 'text-converter' | 'insta-bio';

interface Tool {
  id: ToolId;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

// --- Components ---

const Hero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 left-1/3 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold tracking-wide uppercase"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Produtividade sem limites</span>
            </motion.div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Ferramentas <br />
              <motion.span 
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto]"
              >
                Essenciais
              </motion.span> <br />
              Para Você.
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              A ToolFast reúne as utilidades digitais mais rápidas e seguras da web. 
              Sem cadastros, sem anúncios invasivos, apenas eficiência pura.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExplore}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[40px] blur-3xl"></div>
            <motion.div 
              whileHover={{ y: -10, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-slate-900 rounded-[40px] p-8 shadow-2xl border border-slate-800"
            >
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-slate-800 rounded-full"></div>
                <div className="h-4 w-1/2 bg-slate-800 rounded-full"></div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="h-24 bg-blue-600/20 rounded-2xl border border-blue-500/30 flex items-center justify-center"
                  >
                    <Lock className="w-8 h-8 text-blue-500" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="h-24 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center"
                  >
                    <Type className="w-8 h-8 text-slate-600" />
                  </motion.div>
                </div>
                <div className="h-32 bg-slate-800 rounded-2xl border border-slate-700 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-3 w-20 bg-slate-700 rounded-full"></div>
                    <div className="h-6 w-12 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-700 rounded-full"></div>
                    <div className="h-2 w-full bg-slate-700 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-slate-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
            >
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-bold text-slate-800">100% Seguro</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
            >
              <div className="bg-blue-100 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-bold text-slate-800">Instantâneo</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ToolExplanations = ({ tools }: { tools: Tool[] }) => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-20 -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Como nossas ferramentas ajudam você?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Entenda o poder de cada funcionalidade e como elas podem otimizar seu fluxo de trabalho diário.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {tools.map((tool, idx) => (
            <motion.div 
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 10 }}
              className="flex gap-6 group"
            >
              <div className="flex-shrink-0">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                >
                  {React.cloneElement(tool.icon as React.ReactElement, { className: "w-8 h-8" })}
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {tool.id === 'password' && "Crie senhas militares com entropia customizável. Escolha o tamanho, use símbolos complexos e garanta que suas contas estejam protegidas contra ataques de força bruta."}
                  {tool.id === 'counter' && "Analise seus textos com precisão cirúrgica. Ideal para redatores SEO, estudantes e profissionais que precisam respeitar limites rígidos de caracteres e palavras."}
                  {tool.id === 'hashtag' && "Aumente o alcance orgânico das suas postagens. Nosso algoritmo sugere as tags mais relevantes para o seu nicho, garantindo que seu conteúdo chegue ao público certo."}
                  {tool.id === 'business-name' && "Dê vida à sua marca com nomes memoráveis. Geramos combinações criativas baseadas em palavras-chave estratégicas para o seu novo empreendimento."}
                  {tool.id === 'text-converter' && "Formate grandes blocos de texto instantaneamente. Converta para maiúsculas, minúsculas ou capitalize títulos sem precisar digitar tudo novamente."}
                  {tool.id === 'insta-bio' && "Destaque-se na multidão com uma biografia que converte. Criamos estruturas prontas para o Instagram que transmitem autoridade e personalidade."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Header = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'tools', label: 'Ferramentas' },
    { id: 'about', label: 'Sobre' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 italic">TOOL<span className="text-blue-600">FAST</span></span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === item.id ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        copied ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  );
};

// --- Tool Components ---

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');

  const generate = () => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let allowedChars = '';
    if (options.uppercase) allowedChars += charSets.uppercase;
    if (options.lowercase) allowedChars += charSets.lowercase;
    if (options.numbers) allowedChars += charSets.numbers;
    if (options.symbols) allowedChars += charSets.symbols;

    if (!allowedChars) return setPassword('');

    let result = '';
    for (let i = 0; i < length; i++) {
      result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    setPassword(result);
  };

  useEffect(generate, [length, options]);

  return (
    <div className="space-y-10">
      <motion.div 
        layoutId="password-display"
        className="bg-slate-900 p-8 rounded-[32px] relative group overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600"></div>
        <div className="text-white font-mono text-2xl md:text-3xl break-all pr-12 min-h-[2rem] tracking-wider text-center py-4">
          {password || 'Selecione opções...'}
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <motion.button 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            onClick={generate} 
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <RefreshCw className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <label className="text-lg font-bold text-slate-900">Tamanho da Senha</label>
            <span className="text-3xl font-black text-blue-600">{length}</span>
          </div>
          <input 
            type="range" min="4" max="50" value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Curta</span>
            <span>Média</span>
            <span>Longa</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, val]) => (
            <label 
              key={key} 
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                val ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <span className={`font-bold capitalize ${val ? 'text-blue-700' : 'text-slate-500'}`}>
                {key === 'uppercase' ? 'ABC' : key === 'lowercase' ? 'abc' : key === 'numbers' ? '123' : '#$&'}
              </span>
              <div className="relative">
                <input 
                  type="checkbox" checked={val} 
                  onChange={() => setOptions(prev => ({ ...prev, [key]: !val }))}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${val ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  <motion.div 
                    animate={{ x: val ? 18 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <CopyButton text={password} />
        </motion.div>
      </div>
    </div>
  );
};

const WordCounter = () => {
  const [text, setText] = useState('');
  
  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    paragraphs: text.trim() ? text.split(/\n+/).length : 0
  };

  return (
    <div className="space-y-8">
      <div className="relative group">
        <textarea
          className="w-full p-6 bg-white border-2 border-slate-100 rounded-[32px] focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none min-h-[300px] resize-none transition-all text-lg leading-relaxed text-slate-700 shadow-sm"
          placeholder="Comece a digitar ou cole seu texto aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button 
            onClick={() => setText('')}
            className="p-3 bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            title="Limpar texto"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <CopyButton text={text} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Palavras', value: stats.words, icon: <Type className="w-5 h-5" /> },
          { label: 'Caracteres', value: stats.chars, icon: <Hash className="w-5 h-5" /> },
          { label: 'Parágrafos', value: stats.paragraphs, icon: <Menu className="w-5 h-5" /> },
        ].map(stat => (
          <motion.div 
            key={stat.label} 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl text-center border-2 border-slate-50 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-3 text-blue-600 opacity-50">{stat.icon}</div>
            <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HashtagGenerator = () => {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setTimeout(() => {
      const common = ['love', 'instagood', 'photooftheday', 'fashion', 'beautiful', 'happy', 'cute', 'tbt', 'like4like', 'followme', 'picoftheday', 'art', 'selfie', 'summer', 'instadaily'];
      const generated = topic.split(' ').map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(Boolean);
      const result = [...new Set([...generated, ...common.slice(0, 15)])].map(h => `#${h}`);
      setHashtags(result);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <input 
          className="w-full pl-6 pr-32 py-5 bg-white border-2 border-slate-100 rounded-[24px] focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg shadow-sm" 
          placeholder="Ex: Marketing Digital, Viagem, Comida..." 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button 
          onClick={generate} 
          disabled={isGenerating}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 rounded-[18px] font-bold transition-all flex items-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Gerar'}
        </button>
      </div>

      <AnimatePresence>
        {hashtags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-3 p-8 bg-white rounded-[32px] border-2 border-slate-50 shadow-sm">
              {hashtags.map((h, i) => (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  key={i} 
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-all cursor-default"
                >
                  {h}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center">
              <CopyButton text={hashtags.join(' ')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BusinessNameGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    if (!keyword) return;
    setIsGenerating(true);
    setTimeout(() => {
      const suffixes = ['Hub', 'Fast', 'Solutions', 'Tech', 'Prime', 'Flow', 'Connect', 'Smart', 'Global', 'Digital', 'Pro', 'Elite', 'Studio', 'Labs', 'Nexus'];
      const prefixes = ['The', 'My', 'Neo', 'Omni', 'Ultra', 'Core', 'Nova', 'Swift', 'Peak', 'Zenith'];
      
      const results = [
        ...suffixes.map(s => `${keyword}${s}`),
        ...prefixes.map(p => `${p}${keyword}`),
        `${keyword} & Co`,
        `${keyword} Lab`,
        `${keyword}ly`,
        `i${keyword}`
      ].sort(() => Math.random() - 0.5).slice(0, 12);
      
      setNames(results);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-10">
      <div className="relative">
        <input 
          className="w-full pl-6 pr-32 py-5 bg-white border-2 border-slate-100 rounded-[24px] focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg shadow-sm" 
          placeholder="Digite uma palavra-chave (ex: Café, Tech, Moda)..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button 
          onClick={generate} 
          disabled={isGenerating}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 rounded-[18px] font-bold transition-all flex items-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Gerar'}
        </button>
      </div>

      <AnimatePresence>
        {names.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {names.map((name, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white border-2 border-slate-50 rounded-[24px] flex justify-between items-center group hover:border-blue-100 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(name);
                }}
              >
                <span className="text-xl font-bold text-slate-800">{name}</span>
                <div className="p-2 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl transition-all">
                  <Copy className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TextConverter = () => {
  const [text, setText] = useState('');

  const convert = (type: 'upper' | 'lower' | 'title') => {
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    }
  };

  return (
    <div className="space-y-8">
      <textarea
        className="w-full p-6 bg-white border-2 border-slate-100 rounded-[32px] focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none min-h-[250px] resize-none transition-all text-lg leading-relaxed text-slate-700 shadow-sm"
        placeholder="Digite ou cole seu texto aqui para converter..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
          <button 
            onClick={() => convert('upper')} 
            className="px-6 py-3 bg-white hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black tracking-widest transition-all shadow-sm"
          >
            MAIÚSCULO
          </button>
          <button 
            onClick={() => convert('lower')} 
            className="px-6 py-3 bg-white hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black tracking-widest transition-all shadow-sm"
          >
            minúsculo
          </button>
          <button 
            onClick={() => convert('title')} 
            className="px-6 py-3 bg-white hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black tracking-widest transition-all shadow-sm"
          >
            Título
          </button>
        </div>
        <div className="ml-auto flex gap-2">
          <button 
            onClick={() => setText('')}
            className="p-4 bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <CopyButton text={text} />
        </div>
      </div>
    </div>
  );
};

const InstaBioGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [bios, setBios] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    if (!keywords) return;
    setIsGenerating(true);
    setTimeout(() => {
      const templates = [
        `✨ ${keywords}\n📍 Baseado em Ideias\n🚀 Transformando o comum em extraordinário\n👇 Veja mais abaixo`,
        `Digital Creator 📸\n${keywords} Enthusiast\n"Work hard, stay humble." ✨\n✉️ DM para parcerias`,
        `🎯 Focado em ${keywords}\n💡 Criatividade & Inovação Diária\n🌟 Vivendo um dia de cada vez\n🔗 Link no perfil`,
        `Vibes ✨ | ${keywords}\nJust living life one day at a time.\n☕️ Coffee & Dreams\n👇 Confira meu site`,
      ];
      setBios(templates);
      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="space-y-10">
      <div className="relative">
        <input 
          className="w-full pl-6 pr-32 py-5 bg-white border-2 border-slate-100 rounded-[24px] focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg shadow-sm" 
          placeholder="Ex: Fotografia, Fitness, Viagens..." 
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button 
          onClick={generate} 
          disabled={isGenerating}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 rounded-[18px] font-bold transition-all flex items-center gap-2"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Gerar'}
        </button>
      </div>

      <AnimatePresence>
        {bios.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bios.map((bio, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-[32px] border-2 border-slate-50 shadow-sm hover:shadow-md transition-all space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-[2px]">
                    <div className="w-full h-full bg-white rounded-full p-0.5">
                      <div className="w-full h-full bg-slate-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                    <div className="h-2 w-12 bg-slate-50 rounded-full"></div>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-slate-700 text-lg leading-relaxed">{bio}</pre>
                <div className="flex justify-end pt-4 border-t border-slate-50">
                  <CopyButton text={bio} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactForm = () => {
  const phoneNumber = "5554991268533"; // Formatado com DDI 55
  const message = encodeURIComponent("Olá! Vim através do site ToolFast e gostaria de mais informações.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest inline-block">Contato</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Vamos conversar <br />
              <span className="text-blue-600">sem burocracia.</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed max-w-md">
              Simplificamos nosso contato. Nada de formulários longos, apenas uma conversa direta e humana via WhatsApp.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <MessageCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">WhatsApp</div>
                <div className="text-lg font-bold text-slate-900">(54) 99126-8533</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Resposta</div>
                <div className="text-lg font-bold text-slate-900">Geralmente em minutos</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative bg-white p-10 md:p-16 rounded-[48px] shadow-2xl shadow-blue-900/5 border border-slate-100 text-center space-y-10">
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white rounded-[32px] flex items-center justify-center mx-auto shadow-xl shadow-emerald-100 rotate-3">
              <MessageCircle className="w-12 h-12" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900">Atendimento Direto</h3>
              <p className="text-slate-500">
                Clique no botão abaixo para abrir seu WhatsApp e falar conosco agora mesmo.
              </p>
            </div>

            <motion.a 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 rounded-[24px] font-black text-xl transition-all shadow-xl shadow-emerald-200 w-full"
            >
              <MessageCircle className="w-6 h-6" />
              Iniciar Conversa
            </motion.a>

            <p className="text-slate-400 text-sm font-medium">Disponível de Segunda a Sexta, das 9h às 18h.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const tools: Tool[] = [
    { id: 'password', title: 'Gerador de Senha', description: 'Crie senhas seguras e aleatórias instantaneamente.', icon: <Lock />, category: 'Segurança' },
    { id: 'counter', title: 'Contador de Palavras', description: 'Conte palavras, caracteres e parágrafos do seu texto.', icon: <Type />, category: 'Texto' },
    { id: 'hashtag', title: 'Gerador de Hashtags', description: 'Encontre as melhores hashtags para suas redes sociais.', icon: <Hash />, category: 'Social' },
    { id: 'business-name', title: 'Nomes de Empresas', description: 'Sugestões criativas para o nome do seu novo negócio.', icon: <Briefcase />, category: 'Negócios' },
    { id: 'text-converter', title: 'Conversor de Texto', description: 'Mude para maiúsculo, minúsculo ou capitalizado.', icon: <RefreshCw />, category: 'Texto' },
    { id: 'insta-bio', title: 'Bio para Instagram', description: 'Crie bios profissionais e criativas para seu perfil.', icon: <Instagram />, category: 'Social' },
  ];

  const filteredTools = tools.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTool = () => {
    if (!selectedTool) return null;
    switch (selectedTool.id) {
      case 'password': return <PasswordGenerator />;
      case 'counter': return <WordCounter />;
      case 'hashtag': return <HashtagGenerator />;
      case 'business-name': return <BusinessNameGenerator />;
      case 'text-converter': return <TextConverter />;
      case 'insta-bio': return <InstaBioGenerator />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSelectedTool(null); }} />

      <main className="flex-grow">
        {activeTab === 'home' && !selectedTool && (
          <>
            <Hero onExplore={() => setActiveTab('tools')} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ferramentas Populares</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('tools')}
                  className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Ver todas as ferramentas <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.slice(0, 3).map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedTool(tool)}
                    className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-slate-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {React.cloneElement(tool.icon as React.ReactElement, { className: "w-7 h-7" })}
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{tool.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{tool.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8">{tool.description}</p>
                    <div className="flex items-center text-blue-600 font-bold text-sm group-hover:gap-2 transition-all">
                      Acessar Agora <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <ToolExplanations tools={tools} />
          </>
        )}

        {activeTab === 'tools' && !selectedTool && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="mb-12">
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Nossas Ferramentas</h2>
              <p className="text-xl text-slate-600">Explore nossa coleção completa de ferramentas digitais gratuitas e rápidas.</p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl relative mb-16"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="w-full pl-12 pr-4 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedTool(tool)}
                  className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-slate-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {React.cloneElement(tool.icon as React.ReactElement, { className: "w-7 h-7" })}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{tool.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{tool.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">{tool.description}</p>
                  <div className="flex items-center text-blue-600 font-bold text-sm group-hover:gap-2 transition-all">
                    Abrir Ferramenta <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTool && (
          <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedTool(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-10 transition-all font-bold group"
            >
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </div>
              Voltar para ferramentas
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[48px] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden"
            >
              <div className="relative p-8 md:p-16 border-b border-slate-50 bg-slate-50/30">
                {/* Decorative background for tool header */}
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                  <motion.div 
                    layoutId={`icon-${selectedTool.id}`}
                    className="p-6 bg-blue-600 text-white rounded-[32px] shadow-xl shadow-blue-200"
                  >
                    {React.cloneElement(selectedTool.icon as React.ReactElement, { className: "w-10 h-10" })}
                  </motion.div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedTool.category}</span>
                      <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                      <span className="text-slate-400 text-xs font-bold">Ferramenta Gratuita</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{selectedTool.title}</h2>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">{selectedTool.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-16 bg-white">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {renderTool()}
                </motion.div>
              </div>
            </motion.div>

            {/* Tool Footer Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Privacidade Total</div>
                  <div className="text-xs text-slate-500">Dados processados localmente</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Velocidade Máxima</div>
                  <div className="text-xs text-slate-500">Resultados instantâneos</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">100% Gratuito</div>
                  <div className="text-xs text-slate-500">Sem taxas ou cadastros</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest inline-block">Nossa História</span>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                    Simplicidade <br />
                    <span className="text-blue-600">como prioridade.</span>
                  </h2>
                </div>
                <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                  Nascemos com a missão de simplificar o dia a dia de profissionais, estudantes e criadores de conteúdo. 
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Acreditamos que a tecnologia deve ser uma ponte, não um obstáculo. Por isso, criamos a ToolFast: um ecossistema de ferramentas rápidas, seguras e totalmente gratuitas para que você possa focar no que realmente importa.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-slate-100 rounded-[64px] overflow-hidden relative group">
                  <img 
                    src="https://picsum.photos/seed/minimalist/800/800" 
                    alt="Minimalist Workspace" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all"></div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-2xl border border-slate-50 hidden md:block">
                  <div className="text-4xl font-black text-blue-600">100%</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Foco no Usuário</div>
                </div>
              </motion.div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Gratuito', desc: 'Acesso ilimitado a todas as ferramentas sem custos ou assinaturas escondidas.', icon: <Check className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
                { title: 'Seguro', desc: 'Seus dados são processados localmente e nunca são armazenados em nossos servidores.', icon: <Lock className="w-6 h-6" />, color: 'bg-emerald-50 text-emerald-600' },
                { title: 'Rápido', desc: 'Desenvolvido com foco em performance para entregar resultados instantâneos.', icon: <Zap className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600' },
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className={`p-4 rounded-2xl w-fit mb-8 transition-all group-hover:scale-110 ${value.color}`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats / CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[64px] p-12 md:p-24 text-center space-y-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)]"></div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Pronto para ser mais produtivo?</h2>
                <div className="pt-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('tools')}
                    className="px-12 py-6 bg-white text-slate-900 rounded-[24px] font-black text-xl shadow-xl hover:bg-blue-50 transition-all"
                  >
                    Explorar Ferramentas
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'contact' && (
          <ContactForm />
        )}

        {activeTab === 'terms' && (
          <div className="max-w-4xl mx-auto px-4 py-20 prose prose-slate">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Termos de Uso</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">1. Aceitação dos Termos</h3>
                <p>Ao acessar e usar o ToolFast, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossas ferramentas.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">2. Uso das Ferramentas</h3>
                <p>Nossas ferramentas são fornecidas "como estão" para fins informativos e de produtividade. O uso comercial é permitido, mas não garantimos a precisão absoluta de geradores (como nomes de empresas ou ideias de negócio) que utilizam algoritmos ou inteligência artificial.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">3. Responsabilidade</h3>
                <p>O ToolFast não se responsabiliza por quaisquer danos resultantes do uso ou da incapacidade de usar as ferramentas, incluindo, mas não se limitando a, perda de dados ou interrupção de negócios.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">4. Modificações</h3>
                <p>Reservamo-nos o direito de modificar ou descontinuar qualquer ferramenta ou parte do serviço a qualquer momento, sem aviso prévio.</p>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="max-w-4xl mx-auto px-4 py-20 prose prose-slate">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Política de Privacidade</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">1. Coleta de Dados</h3>
                <p>O ToolFast valoriza sua privacidade. Não coletamos dados pessoais sensíveis sem o seu consentimento. As informações digitadas em nossas ferramentas (como textos para contar palavras ou senhas geradas) são processadas localmente ou via API de forma efêmera e não são armazenadas em nossos servidores permanentemente.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">2. Uso de Cookies</h3>
                <p>Podemos utilizar cookies básicos para melhorar sua experiência de navegação e entender como nosso site é utilizado através de ferramentas de análise anônimas.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">3. Segurança</h3>
                <p>Implementamos medidas de segurança padrão da indústria para proteger as informações processadas no site. No entanto, lembre-se que nenhum método de transmissão pela internet é 100% seguro.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">4. Links Externos</h3>
                <p>Nosso site pode conter links para sites externos. Não temos controle sobre o conteúdo e as práticas de privacidade desses sites e não podemos aceitar responsabilidade por suas respectivas políticas.</p>
              </section>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-blue-600 fill-current" />
            <span className="font-bold text-slate-900">ToolFast</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ToolFast. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <button onClick={() => { setActiveTab('terms'); setSelectedTool(null); window.scrollTo(0,0); }} className="hover:text-blue-600">Termos de Uso</button>
            <button onClick={() => { setActiveTab('privacy'); setSelectedTool(null); window.scrollTo(0,0); }} className="hover:text-blue-600">Privacidade</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
