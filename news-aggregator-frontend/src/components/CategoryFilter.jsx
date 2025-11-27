const CATS = [
  {id:'all', label:'All News'},
  {id:'technology', label:'Technology'},
  {id:'business', label:'Business'},
  {id:'entertainment', label:'Entertainment'},
  {id:'science', label:'Science'},
  {id:'health', label:'Health'},
  {id:'sports', label:'Sports'},
  {id:'world', label:'World'}
];

export default function CategoryFilter({ category, setCategory }){
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {CATS.map(c=>(
        <button
          key={c.id}
          onClick={()=> setCategory(c.id)}
          className={`pill px-4 py-2 rounded-full text-sm font-medium ${
            category===c.id ? 'bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-black shadow-lg' : 'bg-white/6 text-gray-300 backdrop-blur-sm'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
