export default function Header({handleClick, type}: {handleClick: (type: 'All' | 'Liked') => void, type: 'All' | 'Liked'}) {

  return (
    <header className="w-full h-[64px] bg-[#2196F3] text-white text-[18px] mb-[48px]">
      <button onClick={() => handleClick('All')} className={`h-full w-[120px] ml-[64px] ${type === 'All' ? 'bg-[#1E88E5]': 'opacity-0.5'}`}>Все котики</button>
      <button onClick={() => handleClick('Liked')} className={`h-full w-[173px] ${type === 'Liked' ? 'bg-[#1E88E5]': 'opacity-0.5'}`}>Любимые котики</button>
    </header>
  )
}
