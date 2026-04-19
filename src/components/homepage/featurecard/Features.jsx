import FeatureCard from "./FeatureCard";

export default function Features() {
  const features = [
    {
      title: "Entrena a tu ritmo",
      description: "Clases para todos los niveles, desde principiantes hasta atletas avanzados",
      icon: <img src="src/assets/bullet.png" alt="" className="w-full h-full" /> // O el código SVG directo
    },
    {
      title: "Horarios flexibles",
      description: "Clases desde las 7 AM hasta las 10 PM, encuentra tu momento perfecto",
      icon: <img src="src/assets/time.png" alt="" className="w-full h-full" /> // O el código SVG directo
    },
    {
      title: "Plan personalizado",
      description: "Recibe asesoramiento individual adaptado a tus objetivo",
      icon: <img src="src/assets/notebook.png" alt="" className="w-full h-full" /> // O el código SVG directo
    },
    {
      title: "Sin compromisos",
      description: "Reserva clase por clase o hazte miembro, tú decides",
      icon: <img src="src/assets/stars.png" alt="" className="w-full h-full" /> // O el código SVG directo
    }
  ];

  return (
    <section className="bg-[#111111] py-20 px-6  border-3 border-[#d4ff00]">
      <div className="max-w-4xl mx-auto  ">
        
        <header className="flex flex-col items-center text-center mb-16">
          <span className="bg-[#FF5722] text-white text-xs font-bold px-4 py-2 uppercase tracking-tighter mb-6">
            ¿Por qué Fit Control?
          </span>
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase mb-6 max-w-4xl tracking-tighter">
            Todo lo que necesitas para triunfar
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            Hemos creado el ambiente perfecto para que alcances tus metas fitness
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <FeatureCard 
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}