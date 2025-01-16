export default function Header({handleClick}: {handleClick: (type: 'All' | 'Liked') => void}) {
  return (
    <header>
      <button onClick={() => handleClick('All')}>Все котики</button>
      <button onClick={() => handleClick('Liked')}>Любимые котики</button>
    </header>
  )
}
