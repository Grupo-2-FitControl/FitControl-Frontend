import FeatureCard from "./FeatureCard";

export default function Features() {
  const features = [
    {
      title: "Entrena a tu ritmo",
      description: "Clases para todos los niveles, desde principiantes hasta atletas avanzados",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4ff00"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-target"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        </svg>
      ),
    },
    {
      title: "Horarios flexibles",
      description: "Clases desde las 7 AM hasta las 10 PM, encuentra tu momento perfecto",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4ff00"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-alarm"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 13a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M12 10l0 3l2 0" />
          <path d="M7 4l-2.75 2" />
          <path d="M17 4l2.75 2" />
        </svg>
      ),
    },
    {
      title: "Plan personalizado",
      description: "Recibe asesoramiento individual adaptado a tus objetivo",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4ff00"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-notebook"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
          <path d="M13 8l2 0" />
          <path d="M13 12l2 0" />
        </svg>
      ),
    },
    {
      title: "Sin compromisos",
      description: "Reserva clase por clase o hazte miembro, tú decides",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4ff00"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-star"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#111111] py-20 border border-[#d4ff00] rounded-2xl w-[90%] mx-auto px-6 text-center lg:text-left">
      <div className="max-w-4xl mx-auto  ">
        <header className="mb-16">
          <div className="flex justify-center items-center text-center relative">
            <div className="grow w-full h-px bg-[#ff5722]"></div>
            <span className="text-primary px-4 py-2 border border-[#ff5722] text-lg tracking-[0.2em] w-full rounded-2xl">
              ¿Por qué Fit Control?
            </span>
            <div className="w-full h-px bg-[#ff5722]"></div>
          </div>
          <h2 className="text-white text-2xl md:text-6xl font-black uppercase my-6 max-w-4xl tracking-tighter">
            Todo lo que necesitas para triunfar
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            Hemos creado el ambiente perfecto para que alcances tus metas fitness
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <FeatureCard key={index} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
