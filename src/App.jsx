
import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, ArrowLeftRight, ScanSearch, ChartNoAxesCombined,
  GraduationCap, ShieldCheck, Settings, Bell, Search, Plus,
  TrendingUp, Wallet, Activity, Menu, X, RefreshCw,
  CircleDollarSign, Clock, CheckCircle2, AlertTriangle,
  ArrowUpRight, RotateCcw, Globe, Sun, Moon, LogOut,
  Calculator, UserRound, SlidersHorizontal, ChevronDown
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import "./App.css";

const initialOffers = [
  {id:1,name:"CryptoMaster",method:"Bank Transfer",side:"sell",price:12520,min:50,max:5000,rating:99.8,orders:1240},
  {id:2,name:"USDT_Trader",method:"Payme",side:"sell",price:12540,min:100,max:8000,rating:99.5,orders:892},
  {id:3,name:"DigitalPro",method:"Click",side:"sell",price:12560,min:50,max:3000,rating:98.9,orders:620},
  {id:4,name:"FastExchange",method:"Bank Transfer",side:"buy",price:12680,min:100,max:4000,rating:99.9,orders:2100},
  {id:5,name:"GoldenTrader",method:"Payme",side:"buy",price:12650,min:100,max:6000,rating:99.4,orders:750},
  {id:6,name:"UzbekCrypto",method:"Click",side:"buy",price:12620,min:50,max:2500,rating:98.7,orders:410},
  {id:7,name:"PremiumExchange",method:"Bank Transfer",side:"sell",price:12515,min:200,max:10000,rating:99.7,orders:1800},
  {id:8,name:"QuickPay",method:"Click",side:"buy",price:12690,min:100,max:7000,rating:99.6,orders:950}
];

const initialChart = [
  {time:"09:00",price:12500},
  {time:"10:00",price:12520},
  {time:"11:00",price:12490},
  {time:"12:00",price:12560},
  {time:"13:00",price:12530},
  {time:"14:00",price:12600},
  {time:"15:00",price:12570},
  {time:"16:00",price:12620},
  {time:"17:00",price:12600},
  {time:"18:00",price:12680}
];

const initialAccount = {
  uzs:10000000,
  usdt:500,
  averageCost:12400,
  realized:0,
  trades:[],
  notifications:[]
};

const translations = {
  en:{
    dashboard:"Dashboard",market:"P2P Market",scanner:"Arbitrage Scanner",
    analytics:"Analytics",training:"Training Center",risk:"Risk Manager",
    settings:"Settings",welcome:"Welcome back",subtitle:"Your trading overview and market activity.",
    portfolio:"Portfolio Value",profit:"Total P&L",holdings:"USDT Holdings",
    transactions:"Completed Trades",marketPrice:"USDT / UZS Market",
    refresh:"Refresh market",overview:"Arbitrage Overview",bestBuy:"Best buy price",
    bestSell:"Best sell price",spread:"Gross spread",openScanner:"Open Scanner",
    recent:"Recent Transactions",viewAll:"View all",search:"Search trader or payment...",
    all:"All offers",buy:"Buy USDT",sell:"Sell USDT",trader:"TRADER",
    payment:"PAYMENT",price:"PRICE",limits:"LIMITS",action:"ACTION",
    scan:"Scan market",opportunity:"Market opportunity scanner",
    lowest:"Lowest ask",highest:"Highest bid",gross:"Gross difference",
    fees:"Estimated fees",calculator:"Profit Calculator",amount:"Amount (USDT)",
    fee:"Fee (%)",net:"Estimated net profit",academy:"Trading Academy",
    lesson:"LESSON",check:"Check answer",next:"Next lesson",previous:"Previous",
    riskTitle:"Risk Manager",settingsTitle:"Settings",language:"Language",
    theme:"Appearance",dark:"Dark",light:"Light",profile:"Demo profile",
    reset:"Reset demo account",logout:"Log out",register:"Create your account",
    nickname:"Your nickname",start:"Enter simulator",demo:"DEMO ACCOUNT",
    noTrades:"No transactions yet.",history:"Full trade history",
    date:"DATE",type:"TYPE",quantity:"AMOUNT",total:"TOTAL",pnl:"P&L",
    account:"Account overview",balance:"Available balance",save:"Save settings",
    welcomeTitle:"Your own trading simulator",create:"Create demo profile",
    noReal:"Practice with virtual funds. No real crypto or money transfers.",
    online:"SIMULATION ACTIVE",cancel:"Cancel",confirm:"Confirm virtual trade",
    orderValue:"Order value",available:"Available",marketOffers:"Market offers",
    calculatorDesc:"Calculate hypothetical results after fees.",
    buyRate:"Purchase price",sellRate:"Selling price",capital:"Virtual capital",
    calculate:"Calculate",resetCalc:"Reset calculator",success:"Virtual trade completed",
    insufficient:"Insufficient virtual balance",invalid:"Enter a valid amount",
    notification:"Notifications",noNotifications:"No notifications",
    explanation:"Explanation",chooseAnswer:"Choose an answer",
    grossProfit:"Gross profit",netProfit:"Net profit",marketRisk:"Market risk",
    execution:"Execution risk",counterparty:"Counterparty risk",
    riskDescription:"A positive spread does not guarantee a profitable trade.",
    trainingDescription:"Learn market concepts using fictional scenarios.",
    settingsDescription:"Customize your learning environment.",
    profileDescription:"This profile is saved only in this browser.",
    resetConfirm:"Reset all virtual funds and trade history?",
    guest:"Demo Trader",orders:"orders",rating:"rating"
  },
  ru:{
    dashboard:"Главная",market:"P2P Маркет",scanner:"Арбитражный сканер",
    analytics:"Аналитика",training:"Обучение",risk:"Управление рисками",
    settings:"Настройки",welcome:"С возвращением",subtitle:"Обзор портфеля и рыночной активности.",
    portfolio:"Стоимость портфеля",profit:"Общая прибыль",holdings:"Баланс USDT",
    transactions:"Количество сделок",marketPrice:"Рынок USDT / UZS",
    refresh:"Обновить рынок",overview:"Обзор арбитража",bestBuy:"Лучшая цена покупки",
    bestSell:"Лучшая цена продажи",spread:"Разница курсов",openScanner:"Открыть сканер",
    recent:"Последние сделки",viewAll:"Все сделки",search:"Поиск трейдера или оплаты...",
    all:"Все объявления",buy:"Купить USDT",sell:"Продать USDT",trader:"ТРЕЙДЕР",
    payment:"ОПЛАТА",price:"ЦЕНА",limits:"ЛИМИТЫ",action:"ДЕЙСТВИЕ",
    scan:"Сканировать",opportunity:"Сканер рыночных возможностей",
    lowest:"Минимальная цена покупки",highest:"Максимальная цена продажи",
    gross:"Валовая разница",fees:"Расчётная комиссия",
    calculator:"Калькулятор прибыли",amount:"Количество (USDT)",
    fee:"Комиссия (%)",net:"Ожидаемая чистая прибыль",
    academy:"Академия трейдинга",lesson:"УРОК",check:"Проверить ответ",
    next:"Следующий урок",previous:"Назад",riskTitle:"Управление рисками",
    settingsTitle:"Настройки",language:"Язык",theme:"Оформление",
    dark:"Тёмная",light:"Светлая",profile:"Демо-профиль",
    reset:"Сбросить демо-счёт",logout:"Выйти",register:"Создать профиль",
    nickname:"Твой никнейм",start:"Войти в симулятор",demo:"ДЕМО-СЧЁТ",
    noTrades:"Пока нет сделок.",history:"История всех сделок",
    date:"ДАТА",type:"ТИП",quantity:"КОЛИЧЕСТВО",total:"СУММА",pnl:"ПРИБЫЛЬ",
    account:"Обзор счёта",balance:"Доступный баланс",save:"Сохранить настройки",
    welcomeTitle:"Твой собственный торговый симулятор",
    create:"Создать демо-профиль",
    noReal:"Тренируйся на виртуальных средствах. Реальных переводов нет.",
    online:"СИМУЛЯЦИЯ АКТИВНА",cancel:"Отмена",
    confirm:"Подтвердить виртуальную сделку",orderValue:"Сумма ордера",
    available:"Доступно",marketOffers:"Рыночные объявления",
    calculatorDesc:"Рассчитай возможный результат с учётом комиссий.",
    buyRate:"Цена покупки",sellRate:"Цена продажи",capital:"Виртуальный капитал",
    calculate:"Рассчитать",resetCalc:"Сбросить калькулятор",
    success:"Виртуальная сделка выполнена",
    insufficient:"Недостаточно виртуальных средств",invalid:"Укажи правильное количество",
    notification:"Уведомления",noNotifications:"Уведомлений нет",
    explanation:"Объяснение",chooseAnswer:"Выбери ответ",
    grossProfit:"Валовая прибыль",netProfit:"Чистая прибыль",
    marketRisk:"Рыночный риск",execution:"Риск исполнения",
    counterparty:"Риск контрагента",
    riskDescription:"Положительная разница курсов не гарантирует прибыль.",
    trainingDescription:"Изучай рынок на вымышленных ситуациях.",
    settingsDescription:"Настрой свою учебную среду.",
    profileDescription:"Профиль сохраняется только в этом браузере.",
    resetConfirm:"Сбросить все виртуальные средства и историю сделок?",
    guest:"Демо-трейдер",orders:"сделок",rating:"рейтинг"
  }
};

const questions = [
  {
    q:"You buy 100 USDT at 12,500 and sell at 12,700. What is gross profit?",
    ru:"Ты покупаешь 100 USDT по 12 500 и продаёшь по 12 700. Какова валовая прибыль?",
    a:["10 000 UZS","20 000 UZS","30 000 UZS"],
    correct:1,
    explanation:"100 × (12 700 − 12 500) = 20 000 UZS."
  },
  {
    q:"Gross profit is 20,000 UZS and total fees are 3,000 UZS. Net profit?",
    ru:"Валовая прибыль — 20 000 сум, комиссии — 3 000 сум. Чистая прибыль?",
    a:["17 000 UZS","23 000 UZS","20 000 UZS"],
    correct:0,
    explanation:"20 000 − 3 000 = 17 000 UZS."
  },
  {
    q:"The purchase price is higher than the selling price. Is this profitable?",
    ru:"Цена покупки выше цены продажи. Это прибыльная сделка?",
    a:["Yes","No","Always"],
    correct:1,
    explanation:"Buying high and selling low creates a loss before fees."
  },
  {
    q:"Why is liquidity important?",
    ru:"Почему важна ликвидность?",
    a:["It guarantees profit","It affects the ability to execute orders","It removes all fees"],
    correct:1,
    explanation:"Liquidity affects whether an order can be filled at the displayed price."
  }
];

const money = n => new Intl.NumberFormat("ru-RU",{maximumFractionDigits:0}).format(n || 0);
const load = (key,fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export default function App() {
  const [profile,setProfile] = useState(() => load("p2p-profile",null));
  const [nickname,setNickname] = useState("");
  const [lang,setLang] = useState(() => load("p2p-language","ru"));
  const [theme,setTheme] = useState(() => load("p2p-theme","dark"));
  const [account,setAccount] = useState(() => load("p2p-account",initialAccount));
  const [offers,setOffers] = useState(initialOffers);
  const [chart,setChart] = useState(initialChart);
  const [page,setPage] = useState("dashboard");
  const [mobile,setMobile] = useState(false);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("all");
  const [sort,setSort] = useState("price");
  const [selected,setSelected] = useState(null);
  const [amount,setAmount] = useState("100");
  const [fee,setFee] = useState(0.1);
  const [calcBuy,setCalcBuy] = useState("12520");
  const [calcSell,setCalcSell] = useState("12680");
  const [calcAmount,setCalcAmount] = useState("100");
  const [answer,setAnswer] = useState(null);
  const [checked,setChecked] = useState(false);
  const [question,setQuestion] = useState(0);
  const [notificationsOpen,setNotificationsOpen] = useState(false);
  const [toast,setToast] = useState("");

  const t = translations[lang];
  const notifyToast = message => {
    setToast(message);
    setTimeout(()=>setToast(""),2500);
  };

  useEffect(()=>localStorage.setItem("p2p-profile",JSON.stringify(profile)),[profile]);
  useEffect(()=>localStorage.setItem("p2p-account",JSON.stringify(account)),[account]);
  useEffect(()=>localStorage.setItem("p2p-language",JSON.stringify(lang)),[lang]);
  useEffect(()=>localStorage.setItem("p2p-theme",JSON.stringify(theme)),[theme]);

  const asks = offers.filter(o=>o.side==="sell");
  const bids = offers.filter(o=>o.side==="buy");
  const bestBuy = Math.min(...asks.map(o=>o.price));
  const bestSell = Math.max(...bids.map(o=>o.price));
  const spread = bestSell-bestBuy;
  const spreadPct = bestBuy ? spread/bestBuy*100 : 0;
  const portfolio = account.uzs+account.usdt*bestBuy;
  const unrealized = account.usdt*(bestBuy-account.averageCost);
  const totalProfit = account.realized+unrealized;

  const filteredOffers = useMemo(()=>{
    return offers.filter(o=>
      (filter==="all"||o.side===filter) &&
      (o.name+" "+o.method).toLowerCase().includes(search.toLowerCase())
    ).sort((a,b)=>sort==="price"
      ? (a.side===b.side ? (a.side==="sell"?a.price-b.price:b.price-a.price) : 0)
      : b.rating-a.rating
    );
  },[offers,filter,search,sort]);

  const addNotification = message => {
    setAccount(prev=>({
      ...prev,
      notifications:[{id:Date.now(),message,time:new Date().toLocaleTimeString()},...prev.notifications].slice(0,30)
    }));
  };

  const createProfile = e => {
    e.preventDefault();
    if(nickname.trim().length<2) {
      notifyToast("Enter at least 2 characters");
      return;
    }
    setProfile({name:nickname.trim(),created:new Date().toLocaleDateString()});
  };

  const logout = () => {
    setProfile(null);
    setPage("dashboard");
  };

  const scanMarket = () => {
    const updated = offers.map(o=>({
      ...o,price:Math.max(10000,o.price+Math.round((Math.random()-.5)*35))
    }));
    setOffers(updated);
    const next = updated.filter(o=>o.side==="sell").sort((a,b)=>a.price-b.price)[0].price;
    setChart(prev=>[
      ...prev.slice(-14),
      {time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),price:next}
    ]);
    notifyToast(lang==="ru"?"Рынок обновлён":"Market updated");
  };

  const trade = () => {
    if(!selected) return;
    const qty=Number(amount);
    const value=qty*selected.price;
    const cost=value*fee/100;

    if(!Number.isFinite(qty)||qty<=0||qty<selected.min||qty>selected.max) {
      notifyToast(t.invalid);
      return;
    }

    if(selected.side==="sell") {
      if(account.uzs<value+cost) {
        notifyToast(t.insufficient);
        return;
      }
      setAccount(prev=>{
        const newQty=prev.usdt+qty;
        const avg=(prev.usdt*prev.averageCost+value+cost)/newQty;
        return {
          ...prev,
          uzs:prev.uzs-value-cost,
          usdt:newQty,
          averageCost:avg,
          trades:[{
            id:Date.now(),type:"BUY",qty,price:selected.price,total:value,fee:cost,
            profit:null,date:new Date().toLocaleString()
          },...prev.trades]
        };
      });
    } else {
      if(account.usdt<qty) {
        notifyToast(t.insufficient);
        return;
      }
      setAccount(prev=>{
        const profit=(selected.price-prev.averageCost)*qty-cost;
        return {
          ...prev,
          uzs:prev.uzs+value-cost,
          usdt:prev.usdt-qty,
          realized:prev.realized+profit,
          trades:[{
            id:Date.now(),type:"SELL",qty,price:selected.price,total:value,fee:cost,
            profit,date:new Date().toLocaleString()
          },...prev.trades]
        };
      });
    }
    addNotification(`${selected.side==="sell"?"BUY":"SELL"} ${qty} USDT`);
    setSelected(null);
    notifyToast(t.success);
  };

  const reset = () => {
    if(!window.confirm(t.resetConfirm)) return;
    setAccount({...initialAccount});
    setOffers(initialOffers);
    setChart(initialChart);
    notifyToast("Demo account reset");
  };

  const nav = [
    ["dashboard",LayoutDashboard,t.dashboard],
    ["market",ArrowLeftRight,t.market],
    ["scanner",ScanSearch,t.scanner],
    ["calculator",Calculator,t.calculator],
    ["analytics",ChartNoAxesCombined,t.analytics],
    ["training",GraduationCap,t.training],
    ["risk",ShieldCheck,t.risk],
    ["settings",Settings,t.settings]
  ];

  const go = id => {setPage(id);setMobile(false);};

  const Stat = ({title,value,sub,icon:Icon}) => (
    <div className="stat-card">
      <div className="stat-head"><span>{title}</span><Icon size={19}/></div>
      <h2>{value}</h2>
      <small>{sub}</small>
    </div>
  );

  const PageTitle = ({title,desc}) => (
    <div className="page-title">
      <div><h1>{title}</h1><p>{desc}</p></div>
      <div className="live-chip"><span/> {t.online}</div>
    </div>
  );

  const TradeTable = ({items}) => (
    <div className="table-wrap">
      {items.length===0 ? <div className="empty">{t.noTrades}</div> :
      <table>
        <thead><tr>
          <th>{t.type}</th><th>{t.quantity}</th><th>{t.price}</th>
          <th>{t.total}</th><th>{t.date}</th><th>{t.pnl}</th>
        </tr></thead>
        <tbody>{items.map(x=><tr key={x.id}>
          <td><span className={`tag ${x.type.toLowerCase()}`}>{x.type}</span></td>
          <td>{x.qty} USDT</td><td>{money(x.price)}</td>
          <td>{money(x.total)} UZS</td><td>{x.date}</td>
          <td className={x.profit>=0?"positive":"negative"}>
            {x.profit===null?"—":money(x.profit)+" UZS"}
          </td>
        </tr>)}</tbody>
      </table>}
    </div>
  );

  if(!profile) return (
    <div className={`auth-page ${theme}`}>
      <div className="auth-top">
        <div className="brand"><div className="brand-icon"><Activity/></div><b>P2P<span>PRO</span></b></div>
        <div className="auth-controls">
          <button onClick={()=>setLang(lang==="ru"?"en":"ru")}><Globe size={16}/>{lang.toUpperCase()}</button>
          <button onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<Sun/>:<Moon/>}</button>
        </div>
      </div>
      <div className="auth-card">
        <div className="auth-mark"><Activity size={30}/></div>
        <div className="auth-kicker">P2P ARBITRAGE SIMULATOR</div>
        <h1>{t.welcomeTitle}</h1>
        <p>{t.noReal}</p>
        <form onSubmit={createProfile}>
          <label>{t.nickname}</label>
          <div className="auth-input"><UserRound size={17}/><input value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Trader_01" maxLength={24}/></div>
          <button className="primary-btn auth-submit" type="submit">{t.create}<ArrowUpRight size={17}/></button>
        </form>
        <div className="auth-note"><ShieldCheck size={16}/>{t.profileDescription}</div>
      </div>
      <div className="auth-footer">P2P PRO · EDUCATIONAL DEMO · v2.0</div>
    </div>
  );

  return (
    <div className={`app-shell ${theme}`}>
      <aside className={`sidebar ${mobile?"open":""}`}>
        <div className="brand">
          <div className="brand-icon"><Activity/></div>
          <div><b>P2P<span>PRO</span></b><small>ARBITRAGE TERMINAL</small></div>
          <button className="close-mobile" onClick={()=>setMobile(false)}><X/></button>
        </div>

        <div className="account-mini"><div className="status-dot"/>{t.demo}</div>
        <div className="nav-label">WORKSPACE</div>
        <nav>{nav.map(([id,Icon,label])=>
          <button key={id} className={`nav-item ${page===id?"active":""}`} onClick={()=>go(id)}>
            <Icon size={18}/><span>{label}</span>
          </button>
        )}</nav>

        <div className="sidebar-bottom">
          <div className="safety-card"><ShieldCheck size={20}/><b>Safe simulation</b><p>{t.noReal}</p></div>
          <div className="profile-row">
            <div className="profile-avatar">{profile.name[0].toUpperCase()}</div>
            <div><b>{profile.name}</b><small>Demo trader</small></div>
            <button title={t.logout} onClick={logout}><LogOut size={16}/></button>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={()=>setMobile(true)}><Menu/></button>
          <div className="crumb">P2P PRO <span>/</span> {nav.find(x=>x[0]===page)?.[2]}</div>
          <div className="top-actions">
            <button className="top-language" onClick={()=>setLang(lang==="ru"?"en":"ru")}><Globe size={15}/>{lang.toUpperCase()}</button>
            <button className="top-icon" onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
            <div className="notification-wrap">
              <button className="top-icon" onClick={()=>setNotificationsOpen(!notificationsOpen)}><Bell size={18}/>{account.notifications.length>0&&<i/>}</button>
              {notificationsOpen&&<div className="notification-menu"><b>{t.notification}</b>{account.notifications.length===0?<p>{t.noNotifications}</p>:account.notifications.map(n=><div className="notice" key={n.id}>{n.message}<small>{n.time}</small></div>)}</div>}
            </div>
            <div className="top-avatar">{profile.name[0].toUpperCase()}</div>
          </div>
        </header>

        <div className="content">
          {page==="dashboard"&&<>
            <PageTitle title={`${t.welcome}, ${profile.name}`} desc={t.subtitle}/>
            <div className="stats-grid">
              <Stat title={t.portfolio} value={`${money(portfolio)} UZS`} sub={t.account} icon={Wallet}/>
              <Stat title={t.profit} value={`${totalProfit>=0?"+":""}${money(totalProfit)} UZS`} sub="Realized + unrealized" icon={TrendingUp}/>
              <Stat title={t.holdings} value={`${account.usdt.toFixed(2)} USDT`} sub={t.balance} icon={CircleDollarSign}/>
              <Stat title={t.transactions} value={account.trades.length} sub="Virtual orders" icon={Activity}/>
            </div>

            <div className="dashboard-grid">
              <section className="panel">
                <div className="panel-heading"><div><h3>{t.marketPrice}</h3><p>Simulated market data</p></div><button className="subtle-btn" onClick={scanMarket}><RefreshCw size={15}/>{t.refresh}</button></div>
                <div className="chart-price">{money(bestBuy)} <small>UZS</small></div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={chart}>
                    <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5297db" stopOpacity={.3}/><stop offset="100%" stopColor="#5297db" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                    <XAxis dataKey="time" stroke="var(--muted)" tick={{fontSize:10}}/>
                    <YAxis stroke="var(--muted)" tick={{fontSize:10}} domain={["dataMin - 30","dataMax + 30"]}/>
                    <Tooltip contentStyle={{background:"var(--panel)",border:"1px solid var(--border)",borderRadius:9}}/>
                    <Area type="monotone" dataKey="price" stroke="#5297db" strokeWidth={2.5} fill="url(#area)"/>
                  </AreaChart>
                </ResponsiveContainer>
              </section>
              <section className="panel">
                <div className="panel-heading"><div><h3>{t.overview}</h3><p>Best simulated offers</p></div><ScanSearch size={19}/></div>
                <div className="metric-line"><span>{t.bestBuy}</span><b>{money(bestBuy)} UZS</b></div>
                <div className="metric-line"><span>{t.bestSell}</span><b>{money(bestSell)} UZS</b></div>
                <div className="spread-box"><span>{t.spread}</span><h2>{money(spread)} UZS</h2><small>{spreadPct.toFixed(3)}%</small></div>
                <button className="primary-btn full" onClick={()=>go("scanner")}>{t.openScanner}<ArrowUpRight size={16}/></button>
                <p className="muted-note">{t.riskDescription}</p>
              </section>
            </div>
            <section className="panel"><div className="panel-heading"><div><h3>{t.recent}</h3><p>{t.history}</p></div><button className="subtle-btn" onClick={()=>go("analytics")}>{t.viewAll}<ArrowUpRight size={15}/></button></div><TradeTable items={account.trades.slice(0,5)}/></section>
          </>}

          {page==="market"&&<>
            <PageTitle title={t.market} desc={t.marketOffers}/>
            <div className="stats-grid three">
              <Stat title={t.bestBuy} value={`${money(bestBuy)} UZS`} sub="Lowest ask" icon={ArrowLeftRight}/>
              <Stat title={t.bestSell} value={`${money(bestSell)} UZS`} sub="Highest bid" icon={TrendingUp}/>
              <Stat title="Active offers" value={offers.length} sub="Simulated listings" icon={Activity}/>
            </div>
            <section className="panel">
              <div className="toolbar">
                <div className="search-field"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/></div>
                <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">{t.all}</option><option value="sell">{t.buy}</option><option value="buy">{t.sell}</option></select>
                <select value={sort} onChange={e=>setSort(e.target.value)}><option value="price">Sort: price</option><option value="rating">Sort: rating</option></select>
                <button className="top-icon" onClick={scanMarket}><RefreshCw size={16}/></button>
              </div>
              <div className="table-wrap"><table><thead><tr><th>{t.trader}</th><th>{t.payment}</th><th>{t.price}</th><th>{t.limits}</th><th>{t.action}</th></tr></thead><tbody>
                {filteredOffers.map(o=><tr key={o.id}>
                  <td><b>{o.name}</b><small className="sub-cell">{o.orders} {t.orders} · {o.rating}%</small></td>
                  <td>{o.method}</td><td><b>{money(o.price)} UZS</b></td><td>{o.min}–{money(o.max)}</td>
                  <td><button className={o.side==="sell"?"buy-btn":"sell-btn"} onClick={()=>{setSelected(o);setAmount("100")}}>{o.side==="sell"?t.buy:t.sell}</button></td>
                </tr>)}
              </tbody></table></div>
            </section>
          </>}

          {page==="scanner"&&<>
            <PageTitle title={t.scanner} desc={t.opportunity}/>
            <section className="scanner-banner"><div><ScanSearch size={25}/></div><section><b>{t.opportunity}</b><p>Compares the best simulated ask and bid.</p></section><button className="primary-btn" onClick={scanMarket}><RefreshCw size={16}/>{t.scan}</button></section>
            <div className="stats-grid">
              <Stat title={t.lowest} value={`${money(bestBuy)} UZS`} sub="Ask" icon={ArrowLeftRight}/>
              <Stat title={t.highest} value={`${money(bestSell)} UZS`} sub="Bid" icon={TrendingUp}/>
              <Stat title={t.gross} value={`${money(spread)} UZS`} sub={`${spreadPct.toFixed(3)}%`} icon={Activity}/>
              <Stat title={t.fees} value={`${money((bestBuy+bestSell)*100*fee/100)} UZS`} sub="100 USDT example" icon={CircleDollarSign}/>
            </div>
            <section className="panel"><div className="panel-heading"><div><h3>{t.calculator}</h3><p>{t.calculatorDesc}</p></div><Calculator/></div>
              <div className="result-grid">
                <div><label>{t.amount}</label><input type="number" value={calcAmount} onChange={e=>setCalcAmount(e.target.value)}/></div>
                <div><label>{t.fee}</label><input type="number" value={fee} onChange={e=>setFee(Math.max(0,Math.min(10,Number(e.target.value))))}/></div>
                <div><label>{t.grossProfit}</label><h3>{money((bestSell-bestBuy)*Number(calcAmount))} UZS</h3></div>
                <div><label>{t.netProfit}</label><h3 className={(bestSell-bestBuy)>0?"positive":"negative"}>{money((bestSell-bestBuy)*Number(calcAmount)-((bestBuy+bestSell)*Number(calcAmount)*fee/100))} UZS</h3></div>
              </div>
            </section>
          </>}

          {page==="calculator"&&<>
            <PageTitle title={t.calculator} desc={t.calculatorDesc}/>
            <section className="panel calculator-panel">
              <div className="panel-heading"><div><h3>Arbitrage calculator</h3><p>Hypothetical calculations only</p></div><Calculator/></div>
              <div className="calculator-grid">
                <div><label>{t.buyRate} (UZS)</label><input type="number" value={calcBuy} onChange={e=>setCalcBuy(e.target.value)}/></div>
                <div><label>{t.sellRate} (UZS)</label><input type="number" value={calcSell} onChange={e=>setCalcSell(e.target.value)}/></div>
                <div><label>{t.amount}</label><input type="number" value={calcAmount} onChange={e=>setCalcAmount(e.target.value)}/></div>
                <div><label>{t.fee}</label><input type="number" value={fee} onChange={e=>setFee(Math.max(0,Math.min(10,Number(e.target.value))))}/></div>
              </div>
              <div className="calculator-result">
                <div><span>{t.grossProfit}</span><b>{money((Number(calcSell)-Number(calcBuy))*Number(calcAmount))} UZS</b></div>
                <div><span>{t.fees}</span><b>{money((Number(calcBuy)+Number(calcSell))*Number(calcAmount)*fee/100)} UZS</b></div>
                <div><span>{t.netProfit}</span><h2 className={(Number(calcSell)-Number(calcBuy))>0?"positive":"negative"}>{money((Number(calcSell)-Number(calcBuy))*Number(calcAmount)-((Number(calcBuy)+Number(calcSell))*Number(calcAmount)*fee/100))} UZS</h2></div>
              </div>
              <button className="secondary-btn" onClick={()=>{setCalcBuy("12520");setCalcSell("12680");setCalcAmount("100");setFee(.1)}}><RotateCcw size={15}/>{t.resetCalc}</button>
            </section>
          </>}

          {page==="analytics"&&<>
            <PageTitle title={t.analytics} desc="Portfolio and transaction performance."/>
            <div className="stats-grid">
              <Stat title="Realized P&L" value={`${money(account.realized)} UZS`} sub="Closed positions" icon={TrendingUp}/>
              <Stat title="Unrealized P&L" value={`${money(unrealized)} UZS`} sub="Open holdings" icon={Activity}/>
              <Stat title={t.portfolio} value={`${money(portfolio)} UZS`} sub="Current estimate" icon={Wallet}/>
              <Stat title={t.transactions} value={account.trades.length} sub="Virtual trades" icon={Clock}/>
            </div>
            <section className="panel"><div className="panel-heading"><div><h3>{t.marketPrice}</h3><p>Historical simulated prices</p></div></div><ResponsiveContainer width="100%" height={300}><AreaChart data={chart}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/><XAxis dataKey="time" stroke="var(--muted)"/><YAxis stroke="var(--muted)"/><Tooltip/><Area dataKey="price" stroke="#5297db" fill="#5297db" fillOpacity={.12}/></AreaChart></ResponsiveContainer></section>
            <section className="panel"><div className="panel-heading"><h3>{t.history}</h3></div><TradeTable items={account.trades}/></section>
          </>}

          {page==="training"&&<>
            <PageTitle title={t.training} desc={t.trainingDescription}/>
            <section className="training-header"><GraduationCap size={30}/><div><h2>{t.academy}</h2><p>Learn P2P market concepts step by step.</p></div><span>{question+1} / {questions.length}</span></section>
            <section className="panel lesson">
              <div className="progress-track"><div style={{width:`${(question+1)/questions.length*100}%`}}/></div>
              <small>{t.lesson} {question+1}</small>
              <h2>{lang==="ru"?questions[question].ru:questions[question].q}</h2>
              <p>{t.chooseAnswer}</p>
              {questions[question].a.map((a,i)=><button key={i} disabled={checked} className={`answer ${answer===i?"chosen":""} ${checked&&i===questions[question].correct?"correct":""}`} onClick={()=>setAnswer(i)}>{a}</button>)}
              {checked&&<div className="feedback"><b>{answer===questions[question].correct?"Correct!":"Try to understand the calculation."}</b><p>{questions[question].explanation}</p></div>}
              <div className="lesson-actions"><button className="secondary-btn" disabled={question===0} onClick={()=>{setQuestion(q=>q-1);setAnswer(null);setChecked(false)}}>{t.previous}</button><button className="primary-btn" disabled={answer===null} onClick={()=>{if(!checked)setChecked(true);else{setQuestion(q=>(q+1)%questions.length);setAnswer(null);setChecked(false)}}}>{checked?t.next:t.check}</button></div>
            </section>
          </>}

          {page==="risk"&&<>
            <PageTitle title={t.riskTitle} desc={t.riskDescription}/>
            <div className="risk-grid">
              <section className="panel"><ShieldCheck/><h3>{t.marketRisk}</h3><p>Market prices may move before an order is completed.</p></section>
              <section className="panel"><Clock/><h3>{t.execution}</h3><p>Displayed liquidity may not be available at execution.</p></section>
              <section className="panel"><UserRound/><h3>{t.counterparty}</h3><p>Counterparty identity and payment legitimacy matter in real financial environments.</p></section>
              <section className="panel"><AlertTriangle/><h3>Fees and liquidity</h3><p>Fees, order limits and liquidity can eliminate an apparent spread.</p></section>
            </div>
            <section className="panel"><h3>Safety checklist</h3>{["Calculate all fees","Check order limits","Understand liquidity","Avoid third-party payments","Never share account credentials","Do not treat simulated returns as guaranteed income"].map(x=><div className="check-line" key={x}><CheckCircle2 size={17}/>{x}</div>)}</section>
          </>}

          {page==="settings"&&<>
            <PageTitle title={t.settingsTitle} desc={t.settingsDescription}/>
            <section className="panel settings-panel">
              <div className="settings-section"><h3>{t.profile}</h3><p>{profile.name}</p><small>{t.profileDescription}</small></div>
              <div className="settings-section"><h3>{t.language}</h3><div className="setting-options"><button className={lang==="ru"?"selected":""} onClick={()=>setLang("ru")}>Русский</button><button className={lang==="en"?"selected":""} onClick={()=>setLang("en")}>English</button></div></div>
              <div className="settings-section"><h3>{t.theme}</h3><div className="setting-options"><button className={theme==="dark"?"selected":""} onClick={()=>setTheme("dark")}><Moon size={15}/>{t.dark}</button><button className={theme==="light"?"selected":""} onClick={()=>setTheme("light")}><Sun size={15}/>{t.light}</button></div></div>
              <div className="settings-section"><h3>{t.fee}</h3><input type="number" min="0" max="10" step=".05" value={fee} onChange={e=>setFee(Math.max(0,Math.min(10,Number(e.target.value))))}/></div>
              <div className="settings-section"><h3>{t.account}</h3><p>UZS: {money(account.uzs)} · USDT: {account.usdt.toFixed(2)}</p><button className="danger-btn" onClick={reset}><RotateCcw size={16}/>{t.reset}</button></div>
              <button className="secondary-btn" onClick={logout}><LogOut size={16}/>{t.logout}</button>
            </section>
          </>}
        </div>
      </main>

      {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="trade-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><div><h2>{selected.side==="sell"?t.buy:t.sell}</h2><p>{selected.name} · Demo order</p></div><button className="top-icon" onClick={()=>setSelected(null)}><X/></button></div>
        <div className="metric-line"><span>{t.price}</span><b>{money(selected.price)} UZS / USDT</b></div>
        <label>{t.amount}</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)}/>
        <div className="metric-line"><span>{t.orderValue}</span><b>{money(Number(amount)*selected.price)} UZS</b></div>
        <div className="metric-line"><span>{t.fee}</span><b>{money(Number(amount)*selected.price*fee/100)} UZS</b></div>
        <div className="metric-line"><span>{t.available}</span><b>{selected.side==="sell"?money(account.uzs)+" UZS":account.usdt.toFixed(2)+" USDT"}</b></div>
        <button className="primary-btn full" onClick={trade}>{t.confirm}</button>
        <p className="muted-note">{t.noReal}</p>
      </div></div>}
      {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </div>
  );
}
