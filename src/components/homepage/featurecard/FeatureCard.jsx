const FeatureCard = ({ icon, title, description }) => {
  return (
    <article className="flex flex-col items-center p-3 bg-black border border-zinc-800 text-center transition-transform hover:scale-105 hover:border-[#ff5722]">
      <div className="w-16 h-16 mb-6 flex items-center justify-center" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-white text-xl font-bold uppercase tracking-wider mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </article>
  );
};
export default FeatureCard;