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
            <div className="flex justify-center items-center text-center relative mb-10">
              <div className="grow w-full h-px bg-[#ff5722]"></div>
              <span className="text-primary px-4 py-2 border border-orange-500 text-lg tracking-[0.2em] w-full rounded-2xl">
                Lo que te ofrecemos
              </span>
              <div className="w-full h-px bg-[#ff5722]"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter mb-10">
              Aquí todos <br />
              <span className="text-[#d4ff00]">somos bienvenidos</span>
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                No importa si nunca has pisado un gimnasio o si eres un atleta experimentado. En{" "}
                <span className="text-white">Fit Control</span>, creemos que cada persona tiene su propia historia y sus
                propios objetivos.
              </p>
              <p>
                Nuestros instructores trabajan contigo para crear un plan que se ajuste a tu vida, no al revés. Aquí no
                hay presión, no hay juicios, solo apoyo real y resultados comprobados.
              </p>
              <p>
                La energía de nuestras clases, el diseño de nuestro espacio y la pasión de nuestro equipo están pensados
                para que te sientas motivado desde el primer día.
              </p>
            </div>
          </div>

          <div className="relative group borderHighlighted rounded-2xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="src/assets/misionBackground.jpg"
                alt="Atleta entrenando"
                className=" w-full h-auto max-h-[450px] object-cover grayscale-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-[90%] mx-auto bg-black text-white py-16 md:py-10 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group borderHighlighted rounded-2xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="src/assets/teachers.png"
                alt="Atleta entrenando"
                className=" w-full h-auto max-h-[450px] object-cover grayscale-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center items-center text-center relative mb-10">
              <div className="grow w-full h-px bg-[#ff5722]"></div>
              <span className="text-primary px-4 py-2 border border-[#ff5722] text-lg tracking-[0.2em] w-full rounded-2xl">
                Tu equipo de apoyo
              </span>
              <div className="w-full h-px bg-[#ff5722]"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter mb-10">
              Instructores <br />
              <span className="text-[#d4ff00]">que inspiran</span>
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                Tu equipo de apoyo está formado por instructores que no solo dominan su campo, sino que también sienten
                una verdadera pasión por enseñar y acompañarte en cada paso de tu aprendizaje. Son profesionales con
                experiencia real, que han enfrentado los mismos retos que tú y saben cómo guiarte para superarlos de
                forma práctica y efectiva.
              </p>
              <p>
                Estos instructores se caracterizan por su cercanía y compromiso: no están ahí solo para impartir
                contenido, sino para asegurarse de que realmente comprendas cada concepto. Adaptan sus explicaciones a
                tu ritmo, utilizan ejemplos claros y te proporcionan herramientas que puedes aplicar desde el primer
                momento. Su objetivo no es que memorices, sino que desarrolles habilidades sólidas y confianza en ti
                mismo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
export default Homepage;
