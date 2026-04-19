function SummaryPhilosophy({title,description,borderColor, textColor}){
    return(
        <article className={`p-2 border-3 ${borderColor} text-primary`}>
            <data className={`text-secondary font-bold text-4xl ${textColor}`} value="8">{title}</data>
            <p className="text-gray-300">
                {description}
            </p>

        </article>
    )
}
export default SummaryPhilosophy;