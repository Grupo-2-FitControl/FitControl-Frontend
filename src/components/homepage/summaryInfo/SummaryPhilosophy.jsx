function SummaryPhilosophy({title,description,borderColor, textColorTitle}){
    return(
        <article className={`flex flex-col justify-center items-center p-6 border-1 rounded-2xl transform transition duration-300 hover:scale-105 ${borderColor} text-primary gap-6`}>
            <h3 className={`font-bold text-4xl ${textColorTitle} lg:text-6xl`}>{title}</h3>
            <p className="text-gray-300 uppercase text-center">
                {description}
            </p>

        </article>
    )
}
export default SummaryPhilosophy;