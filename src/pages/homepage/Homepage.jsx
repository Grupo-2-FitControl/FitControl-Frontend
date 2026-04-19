import Banner from "../../components/homepage/Banner";
import SummaryPhilosophy from "../../components/homepage/summaryInfo/SummaryPhilosophy";
import Features from "../../components/homepage/featurecard/Features";
function Homepage() {
  return (
    <article className="flex flex-col background">
      <Banner />
      <section className="w-full lg:w-[90%] mx-auto p-6 ">
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
      <section className="w-full lg:w-[90%] mx-auto p-6">
        <Features/>
      </section>
    </article>
  );
}
export default Homepage;
