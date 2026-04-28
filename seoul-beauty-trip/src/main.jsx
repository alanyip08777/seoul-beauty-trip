import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, MapPin, ShoppingBag, Sparkles, Heart, Camera, Pill, Plus, Trash2, Plane, Store, Search, Lock, Globe2, Coffee, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import './style.css';

const LS_KEY = 'seoulBeautyTrip2026_v1';

const initialData = {
  trip: {
    title: '2026 首爾 5天4夜｜變美 × 購物 × 出片',
    date: '2026/10/29 - 2026/11/02',
    location: '韓國首爾',
    hotelArea: '弘大入口站 Hongik Univ. Station 周邊',
    flight: '大韓航空 KE2022 去程 / KE2027 回程｜桃園 TPE ⇄ 仁川 ICN',
    coverImage: 'https://images.unsplash.com/photo-1538485399081-7c8ed4b61d0b?q=80&w=1800&auto=format&fit=crop'
  },
  days: [
    { id: 'day1', day: 'Day 1', date: '10/29 四', theme: '落地後直接進入首爾夜拍模式', image: 'https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?q=80&w=1200&auto=format&fit=crop', items: [
      { time: '15:50', title: '抵達仁川機場', tag: '交通', note: '搭 AREX 或 Kakao Taxi 前往弘大住宿區，第一天不要排太硬。' },
      { time: '18:30', title: '弘大飯店 Check-in', tag: '住宿', note: '放行李、簡單整理造型。' },
      { time: '20:00', title: '聖水洞 Dior 旗艦店夜拍', tag: '拍照', note: '精品感、工業風、夜間燈光都很適合拍女神大片。' },
      { time: '21:30', title: '馬鈴薯排骨湯晚餐', tag: '美食', note: '選聖水洞或弘大附近小店，避免排隊名店消耗體力。' }
    ]},
    { id: 'day2', day: 'Day 2', date: '10/30 五', theme: '漢南洞設計師品牌 × 南山銀杏紅葉', image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1200&auto=format&fit=crop', items: [
      { time: '10:30', title: '漢南洞設計師品牌巡禮', tag: '購物', note: 'Ader Error、Nonfiction、Tamburins、小眾選物店。' },
      { time: '13:00', title: '漢南洞午餐與咖啡', tag: '咖啡', note: '選低步行距離、空間設計感強的咖啡廳。' },
      { time: '15:30', title: '南山公園銀杏紅葉散步', tag: '拍照', note: '重點不是登塔，是黃金光線與銀杏步道。' },
      { time: '19:00', title: '韓式高級燒肉', tag: '美食', note: '安排為全程最有儀式感的一餐。' }
    ]},
    { id: 'day3', day: 'Day 3', date: '10/31 六', theme: 'The Hyundai Seoul 室內掃貨日', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop', items: [
      { time: '11:00', title: '汝矣島 The Hyundai Seoul', tag: '百貨', note: '避開週末街頭人潮，集中掃精品、香水、美妝、服飾。' },
      { time: '14:00', title: '美妝香水補貨', tag: '美妝藥妝', note: 'Jung Saem Mool、Espoir、Tamburins、Nonfiction。' },
      { time: '17:30', title: '漢江公園野餐感拍照', tag: '拍照', note: '外送炸雞，傍晚光線自然舒服。' }
    ]},
    { id: 'day4', day: 'Day 4', date: '11/01 日', theme: '醫美重點日 × 延南洞低刺激恢復行程', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop', items: [
      { time: '10:30', title: '醫美診所預約', tag: '醫美', note: 'Nancy：音波提拉、小腿肉毒、微笑唇肉毒。宗德：皮膚看診與專業微調建議。' },
      { time: '14:30', title: '延南洞咖啡廳', tag: '咖啡', note: '醫美後避免爆走，走輕鬆留白感路線。' },
      { time: '18:00', title: '明洞 Olive Young 旗艦店', tag: '美妝藥妝', note: '面膜、保養、Elena 女性私密益生菌、D-甘露糖。' },
      { time: '20:00', title: '三麗鷗 / Pochacco 補貨', tag: '三麗鷗', note: '明洞地下街、Daiso、AK Plaza、快閃店資訊優先確認。帕洽狗一定要排進去。' }
    ]},
    { id: 'day5', day: 'Day 5', date: '11/02 一', theme: '最後採買 × 機場返台', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop', items: [
      { time: '10:00', title: '樂天超市零食伴手禮', tag: '伴手禮', note: '泡麵、零食、伴手禮一次解決。' },
      { time: '13:30', title: '出發仁川機場', tag: '交通', note: '預留退稅、托運、機場購物時間。' },
      { time: '16:20', title: 'KE2027 起飛返台', tag: '航班', note: '結束首爾變美與購物行程。' }
    ]}
  ],
  wishlist: [
    { id: 'w1', person: 'Nancy', category: '服飾', name: 'Mardi Mercredi', place: '百貨 / 漢南 / 快閃', priority: '高' },
    { id: 'w2', person: 'Nancy', category: '服飾', name: 'Matin Kim', place: 'The Hyundai Seoul / 漢南', priority: '高' },
    { id: 'w3', person: 'Nancy', category: '服飾', name: 'Rockfish Weatherwear', place: '百貨 / 旗艦店', priority: '中' },
    { id: 'w4', person: 'Nancy', category: '美妝藥妝', name: 'Jung Saem Mool 氣墊', place: '百貨 / Olive Young', priority: '高' },
    { id: 'w5', person: 'Nancy', category: '美妝藥妝', name: 'Espoir', place: 'Olive Young / 百貨', priority: '中' },
    { id: 'w6', person: 'Nancy', category: '健康', name: 'Elena 女性私密益生菌', place: 'Olive Young / 藥妝', priority: '高' },
    { id: 'w7', person: 'Nancy', category: '健康', name: 'D-甘露糖', place: '藥妝 / 保健品區', priority: '高' },
    { id: 'w8', person: 'Nancy', category: '三麗鷗', name: 'Pochacco 帕洽狗周邊', place: 'AK Plaza / Daiso / 明洞地下街 / 快閃店', priority: '最高' },
    { id: 'w9', person: '宗德', category: '服飾', name: 'Musinsa Standard', place: '弘大 / 明洞 / 百貨', priority: '高' },
    { id: 'w10', person: '宗德', category: '服飾', name: 'Ader Error', place: '漢南 / 聖水', priority: '高' },
    { id: 'w11', person: '宗德', category: '香水', name: 'Nonfiction', place: '漢南 / 百貨', priority: '高' },
    { id: 'w12', person: '宗德', category: '香水', name: 'Tamburins', place: '漢南 / 百貨', priority: '高' },
    { id: 'w13', person: '宗德', category: '香水', name: 'Granhand', place: '手工香水店', priority: '中' },
    { id: 'w14', person: '宗德', category: '保養', name: 'Aesop / Laneige 男士系列', place: '百貨 / Olive Young', priority: '中' },
    { id: 'w15', person: '宗德', category: '健康', name: 'Orthomol 維他命', place: '藥妝 / 保健品區', priority: '中' }
  ]
};

const tagIcon = { 拍照: Camera, 購物: ShoppingBag, 百貨: Store, 醫美: Sparkles, 美妝藥妝: Pill, 三麗鷗: Heart, 交通: Plane, 咖啡: Coffee, 美食: Utensils };
const imageSuggestions = {
  三麗鷗: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop',
  美妝藥妝: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
  醫美: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
  香水: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1200&auto=format&fit=crop',
  購物: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1200&auto=format&fit=crop',
  拍照: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=1200&auto=format&fit=crop'
};

function loadData() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || initialData; } catch { return initialData; } }
function saveData(data) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }
function Badge({ children, type = 'solid' }) { return <span className={`badge ${type}`}>{children}</span>; }
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function id() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function App() {
  const [data, setData] = useState(loadData);
  const [tab, setTab] = useState('front');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('全部');
  const [newItem, setNewItem] = useState({ dayId: 'day1', time: '', title: '', tag: '購物', note: '' });
  const [newWish, setNewWish] = useState({ person: 'Nancy', category: '三麗鷗', name: '', place: '', priority: '高' });

  useEffect(() => saveData(data), [data]);
  const allTags = useMemo(() => ['全部', ...Array.from(new Set(data.days.flatMap(d => d.items.map(i => i.tag))))], [data]);
  const filteredDays = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.days.map(day => ({ ...day, items: day.items.filter(item => {
      const hitTag = activeTag === '全部' || item.tag === activeTag;
      const hitQuery = !q || `${day.theme} ${item.title} ${item.note} ${item.tag}`.toLowerCase().includes(q);
      return hitTag && hitQuery;
    })}));
  }, [data.days, query, activeTag]);

  const addScheduleItem = () => {
    if (!newItem.title.trim()) return;
    setData(prev => ({ ...prev, days: prev.days.map(day => day.id === newItem.dayId ? { ...day, items: [...day.items, { time: newItem.time || '待定', title: newItem.title, tag: newItem.tag, note: newItem.note }] } : day) }));
    setNewItem({ ...newItem, time: '', title: '', note: '' });
  };
  const removeScheduleItem = (dayId, index) => setData(prev => ({ ...prev, days: prev.days.map(day => day.id === dayId ? { ...day, items: day.items.filter((_, i) => i !== index) } : day) }));
  const addWishlistItem = () => {
    if (!newWish.name.trim()) return;
    setData(prev => ({ ...prev, wishlist: [...prev.wishlist, { id: id(), ...newWish }] }));
    setNewWish({ ...newWish, name: '', place: '' });
  };
  const removeWish = wishId => setData(prev => ({ ...prev, wishlist: prev.wishlist.filter(w => w.id !== wishId) }));
  const priorityRank = { 最高: 0, 高: 1, 中: 2, 低: 3 };
  const sortedWishlist = [...data.wishlist].sort((a, b) => (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9));

  return <div className="app">
    <section className="hero">
      <img src={data.trip.coverImage} alt="Seoul cover" />
      <div className="heroOverlay" />
      <motion.div className="heroContent" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.45}}>
        <span className="heroBadge">Seoul Beauty Trip 2026</span>
        <h1>{data.trip.title}</h1>
        <div className="heroGrid">
          <p><CalendarDays size={18}/>{data.trip.date}</p><p><MapPin size={18}/>{data.trip.location}</p>
          <p><Plane size={18}/>{data.trip.flight}</p><p><Store size={18}/>住宿：{data.trip.hotelArea}</p>
        </div>
      </motion.div>
    </section>

    <main className="wrap">
      <div className="tabs"><button className={tab==='front'?'active':''} onClick={()=>setTab('front')}><Globe2 size={16}/>前台行程</button><button className={tab==='admin'?'active':''} onClick={()=>setTab('admin')}><Lock size={16}/>後台管理</button></div>
      {tab === 'front' ? <>
        <div className="filters"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜尋：三麗鷗、Pochacco、美妝藥妝、醫美、漢南洞..." /></div><select value={activeTag} onChange={e=>setActiveTag(e.target.value)}>{allTags.map(t => <option key={t}>{t}</option>)}</select></div>
        <div className="layout">
          <div className="days">{filteredDays.map(day => <article className="dayCard" key={day.id}><img className="dayImg" src={day.image} alt={day.theme}/><div className="dayBody"><div className="row"><Badge>{day.day}</Badge><span className="date">{day.date}</span></div><h2>{day.theme}</h2><div className="items">{day.items.length ? day.items.map((item, idx) => { const Icon = tagIcon[item.tag] || Sparkles; return <div className="item" key={idx}><div className="icon"><Icon size={20}/></div><div><div className="row"><b>{item.time}</b><Badge type="soft">{item.tag}</Badge></div><h3>{item.title}</h3><p>{item.note}</p></div></div> }) : <p className="empty">沒有符合篩選的項目。</p>}</div></div></article>)}</div>
          <aside><div className="sideCard"><h2><Heart size={20}/>必記重點</h2><p><b>三麗鷗 / Pochacco：</b>AK Plaza、Daiso、明洞地下街、弘大選物店與百貨快閃都要查。</p><p><b>美妝藥妝：</b>Olive Young 明洞旗艦店排 Day 4，Jung Saem Mool、Espoir、面膜、Elena、D-甘露糖列高優先。</p><p><b>健康體力：</b>避免長距離爆走，移動以 Kakao Taxi 為主。</p></div><div className="sideCard"><h2><ShoppingBag size={20}/>購物清單</h2>{sortedWishlist.map(w => <div className="wish" key={w.id}><div className="row wrapRow"><Badge>{w.person}</Badge><Badge type="soft">{w.category}</Badge><Badge type="line">{w.priority}</Badge></div><b>{w.name}</b><span>{w.place}</span></div>)}</div></aside>
        </div>
      </> : <div className="adminGrid">
        <section className="panel"><h2>新增行程項目</h2><Field label="選擇天數"><select value={newItem.dayId} onChange={e=>setNewItem({...newItem, dayId:e.target.value})}>{data.days.map(d=><option key={d.id} value={d.id}>{d.day}｜{d.date}</option>)}</select></Field><Field label="時間"><input value={newItem.time} onChange={e=>setNewItem({...newItem, time:e.target.value})} placeholder="例如 15:30" /></Field><Field label="標題"><input value={newItem.title} onChange={e=>setNewItem({...newItem, title:e.target.value})} placeholder="例如 三麗鷗快閃店補貨" /></Field><Field label="分類"><input value={newItem.tag} onChange={e=>setNewItem({...newItem, tag:e.target.value})} placeholder="三麗鷗 / 美妝藥妝 / 醫美" /></Field><div className="hint"><img src={imageSuggestions[newItem.tag] || imageSuggestions['購物']} /><span>自動圖片提示：目前依分類顯示示意圖，之後可串 Unsplash / Google Places API。</span></div><Field label="備註"><textarea value={newItem.note} onChange={e=>setNewItem({...newItem, note:e.target.value})} placeholder="補充動線、購物重點、拍照提醒..." /></Field><button className="primary" onClick={addScheduleItem}><Plus size={16}/>加入行程</button></section>
        <section className="panel"><h2>新增購物清單</h2><div className="two"><Field label="人物"><input value={newWish.person} onChange={e=>setNewWish({...newWish, person:e.target.value})} /></Field><Field label="分類"><input value={newWish.category} onChange={e=>setNewWish({...newWish, category:e.target.value})} /></Field></div><Field label="品項"><input value={newWish.name} onChange={e=>setNewWish({...newWish, name:e.target.value})} placeholder="例如 Pochacco 帕洽狗娃娃" /></Field><Field label="地點"><input value={newWish.place} onChange={e=>setNewWish({...newWish, place:e.target.value})} placeholder="例如 AK Plaza / Daiso / Olive Young" /></Field><Field label="優先級"><select value={newWish.priority} onChange={e=>setNewWish({...newWish, priority:e.target.value})}>{['最高','高','中','低'].map(p=><option key={p}>{p}</option>)}</select></Field><button className="primary" onClick={addWishlistItem}><Plus size={16}/>加入清單</button></section>
        <section className="panel full"><h2>目前資料管理</h2><div className="manageGrid"><div>{data.days.map(day=><div className="manageBlock" key={day.id}><h3>{day.day}｜{day.date}</h3>{day.items.map((item,index)=><div className="manageItem" key={index}><span>{item.time}｜{item.title}｜{item.tag}</span><button onClick={()=>removeScheduleItem(day.id,index)}><Trash2 size={16}/></button></div>)}</div>)}</div><div>{data.wishlist.map(w=><div className="manageItem wishManage" key={w.id}><span><b>{w.category}</b>｜{w.name}｜{w.place}</span><button onClick={()=>removeWish(w.id)}><Trash2 size={16}/></button></div>)}</div></div></section>
      </div>}
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
