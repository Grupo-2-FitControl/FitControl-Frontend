import Banner from "../../components/homepage/Banner";
import SummaryPhilosophy from "../../components/homepage/summaryInfo/SummaryPhilosophy";
import Features from "../../components/homepage/featurecard/Features";
function Homepage() {
  return (
    <article className="flex flex-col background">
      <Banner />
      <section className="w-[90%] mx-auto py-10 ">
        <div className=" grid grid-cols-1 mx-auto  gap-4 md:grid-cols-2  lg:grid-cols-4">
          <SummaryPhilosophy
            title={"8+"}
            description={"Años transformando vidas"}
            borderColor={"border-[#d4ff00]"}
            textColorTitle={"text-[#d4ff00]"}
          />
          <SummaryPhilosophy
            title={"6+"}
            description={"Clases semanales"}
            borderColor={"border-[#ff5722]"}
            textColorTitle={"text-[#ff5722]"}
          />
          <SummaryPhilosophy
            title={"200+"}
            description={"Miembros felices"}
            borderColor={"border-[#d4ff00]"}
            textColorTitle={"text-[#d4ff00]"}
          />
          <SummaryPhilosophy
            title={"3"}
            description={"Instructores Expertos"}
            borderColor={"border-[#ff5722]"}
            textColorTitle={"text-[#ff5722]"}
          />
        </div>
      </section>
      <section className="w-full">
        <Features />
      </section>
      <section className="w-[90%] mx-auto bg-black text-white py-16 md:py-10 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <span className="bg-[#FF5722] text-white text-xs font-bold px-3 py-1.5 uppercase w-fit mb-8">
              Nuestra Promesa
            </span>

            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter mb-10">
              Aquí todos <br />
              <span className="text-[#d4ff00]">somos bienvenidos</span>
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                No importa si nunca has pisado un gimnasio o si eres un atleta
                experimentado. En{" "}
                <span className="text-white">Fit Control</span>, creemos que
                cada persona tiene su propia historia y sus propios objetivos.
              </p>
              <p>
                Nuestros instructores trabajan contigo para crear un plan que se
                ajuste a tu vida, no al revés. Aquí no hay presión, no hay
                juicios, solo apoyo real y resultados comprobados.
              </p>
              <p>
                La energía de nuestras clases, el diseño de nuestro espacio y la
                pasión de nuestro equipo están pensados para que te sientas
                motivado desde el primer día.
              </p>
            </div>
          </div>

          <div className="relative group">

            <div className="relative overflow-hidden border-6 border-[#d4ff00]">
              <img
                src="src/assets/misionBackground.jpg"
                alt="Atleta entrenando"
                className="w-full h-auto max-h-[450px] object-cover grayscale-100 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
export default Homepage;
