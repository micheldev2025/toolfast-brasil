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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ToolFast <span className="text-blue-600">Brasil</span></span>
          </div>

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
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-2xl relative group">
        <div className="text-white font-mono text-xl break-all pr-12 min-h-[1.75rem]">
          {password || 'Selecione opções...'}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button onClick={generate} className="p-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Tamanho: {length}</label>
          <input 
            type="range" min="4" max="50" value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(options).map(([key, val]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" checked={val} 
                onChange={() => setOptions(prev => ({ ...prev, [key]: !val }))}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-slate-300"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 capitalize">
                {key === 'uppercase' ? 'Maiúsculas' : key === 'lowercase' ? 'Minúsculas' : key === 'numbers' ? 'Números' : 'Símbolos'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <CopyButton text={password} />
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
    <div className="space-y-6">
      <textarea
        className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none min-h-[200px] resize-none"
        placeholder="Cole ou digite seu texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Palavras', value: stats.words },
          { label: 'Caracteres', value: stats.chars },
          { label: 'Parágrafos', value: stats.paragraphs },
        ].map(stat => (
          <div key={stat.label} className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HashtagGenerator = () => {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    if (!topic) return;
    const common = ['brasil', 'love', 'instagood', 'photooftheday', 'fashion', 'beautiful', 'happy', 'cute', 'tbt', 'like4like'];
    const generated = topic.split(' ').map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(Boolean);
    const result = [...new Set([...generated, ...common.slice(0, 15)])].map(h => `#${h}`);
    setHashtags(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
          placeholder="Ex: Marketing Digital, Viagem, Comida..." 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap">Gerar</button>
      </div>
      {hashtags.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
            {hashtags.map((h, i) => (
              <span key={i} className="text-blue-600 font-medium">{h}</span>
            ))}
          </div>
          <div className="flex justify-end">
            <CopyButton text={hashtags.join(' ')} />
          </div>
        </div>
      )}
    </div>
  );
};

const BusinessNameGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    if (!keyword) return;
    const suffixes = ['Hub', 'Fast', 'Solutions', 'Tech', 'Prime', 'Flow', 'Connect', 'Smart', 'Global', 'Digital', 'Pro', 'Elite'];
    const prefixes = ['The', 'My', 'Neo', 'Omni', 'Ultra', 'Core', 'Nova', 'Swift'];
    
    const results = [
      ...suffixes.map(s => `${keyword}${s}`),
      ...prefixes.map(p => `${p}${keyword}`),
      `${keyword} & Co`,
      `${keyword} Lab`
    ].sort(() => Math.random() - 0.5).slice(0, 12);
    
    setNames(results);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
          placeholder="Digite uma palavra-chave..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">Gerar</button>
      </div>
      {names.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {names.map((name, i) => (
            <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center group">
              <span className="font-medium text-slate-700">{name}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(name)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
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
    <div className="space-y-6">
      <textarea
        className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none min-h-[150px]"
        placeholder="Digite seu texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => convert('upper')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">MAIÚSCULO</button>
        <button onClick={() => convert('lower')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">minúsculo</button>
        <button onClick={() => convert('title')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">Primeira Letra Maiúscula</button>
        <div className="ml-auto">
          <CopyButton text={text} />
        </div>
      </div>
    </div>
  );
};

const InstaBioGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [bios, setBios] = useState<string[]>([]);

  const generate = () => {
    if (!keywords) return;
    const templates = [
      `✨ ${keywords} | Apaixonado por vida\n📍 Brasil\n🚀 Transformando ideias em realidade`,
      `Digital Creator 📸\n${keywords} Enthusiast\nWork hard, stay humble. ✨`,
      `🎯 Focado em ${keywords}\n💡 Criatividade & Inovação\n📩 DM para parcerias`,
      `Vibes ✨ | ${keywords}\nJust living life one day at a time.\n👇 Confira meu site`,
    ];
    setBios(templates);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
          placeholder="Ex: Fotografia, Fitness, Viagens..." 
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">Gerar</button>
      </div>
      {bios.length > 0 && (
        <div className="space-y-4">
          {bios.map((bio, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <pre className="whitespace-pre-wrap font-sans text-slate-700">{bio}</pre>
              <div className="flex justify-end">
                <CopyButton text={bio} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ContactForm = () => {
  const phoneNumber = "5554991268533"; // Formatado com DDI 55
  const message = encodeURIComponent("Olá! Vim através do site ToolFast Brasil e gostaria de mais informações.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center space-y-8"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <MessageCircle className="w-12 h-12" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Fale Conosco via WhatsApp</h2>
          <p className="text-slate-600">
            Removemos o formulário de e-mail para agilizar seu atendimento. 
            Clique no botão abaixo para iniciar uma conversa direta conosco.
          </p>
        </div>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-emerald-200 hover:scale-105 active:scale-95 w-full"
        >
          <MessageCircle className="w-6 h-6" />
          Chamar no WhatsApp
        </a>

        <div className="pt-6 border-t border-slate-50">
          <p className="text-slate-400 text-sm">Atendimento rápido e personalizado.</p>
          <p className="text-slate-900 font-medium mt-1">(54) 99126-8533</p>
        </div>
      </motion.div>
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
        {(activeTab === 'home' || activeTab === 'tools') && !selectedTool && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            {activeTab === 'home' ? (
              <div className="text-center space-y-6 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Simples. Rápido. Gratuito.</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight"
                >
                  ToolFast <span className="text-blue-600">Brasil</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-slate-600 max-w-2xl mx-auto"
                >
                  Aumente sua produtividade com nossas ferramentas online gratuitas. 
                  Tudo o que você precisa em um só lugar.
                </motion.p>
              </div>
            ) : (
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Nossas Ferramentas</h2>
                <p className="text-slate-600">Explore nossa coleção completa de ferramentas digitais gratuitas e rápidas.</p>
              </div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto relative mb-16"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-lg"
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
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {React.cloneElement(tool.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{tool.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{tool.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Abrir Ferramenta <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTool && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <button 
              onClick={() => setSelectedTool(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Voltar para ferramentas
            </button>
            
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 md:p-12 border-b border-slate-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    {React.cloneElement(selectedTool.icon as React.ReactElement, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">{selectedTool.title}</h2>
                    <p className="text-slate-500">{selectedTool.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                {renderTool()}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
            <h2 className="text-4xl font-bold text-slate-900">Sobre a ToolFast Brasil</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nascemos com a missão de simplificar o dia a dia de profissionais, estudantes e criadores de conteúdo. 
              Oferecemos ferramentas rápidas, seguras e totalmente gratuitas para que você possa focar no que realmente importa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Gratuito</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Seguro</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Privacidade</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Rápido</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Performance</div>
              </div>
            </div>
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
                <p>Ao acessar e usar o ToolFast Brasil, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossas ferramentas.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">2. Uso das Ferramentas</h3>
                <p>Nossas ferramentas são fornecidas "como estão" para fins informativos e de produtividade. O uso comercial é permitido, mas não garantimos a precisão absoluta de geradores (como nomes de empresas ou ideias de negócio) que utilizam algoritmos ou inteligência artificial.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2">3. Responsabilidade</h3>
                <p>O ToolFast Brasil não se responsabiliza por quaisquer danos resultantes do uso ou da incapacidade de usar as ferramentas, incluindo, mas não se limitando a, perda de dados ou interrupção de negócios.</p>
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
                <p>O ToolFast Brasil valoriza sua privacidade. Não coletamos dados pessoais sensíveis sem o seu consentimento. As informações digitadas em nossas ferramentas (como textos para contar palavras ou senhas geradas) são processadas localmente ou via API de forma efêmera e não são armazenadas em nossos servidores permanentemente.</p>
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
            <span className="font-bold text-slate-900">ToolFast Brasil</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ToolFast Brasil. Todos os direitos reservados.
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
