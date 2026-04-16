function ActivityCardPro({
  title,
  description,
  trainer,
  date,
  spots,
  maxSpots,
  price,
  image,
}) {
  return (
    <article className="bg-mist-600 text-white overflow-hidden border-primary shadow-lg">
      <div className="relative h-50">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute top-2 right-2 background-secondary text-white px-3 py-1 text-sm font-bold rounded">
          €{price}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-primary text-lg font-bold uppercase">{title}</h3>

        <p className="text-sm text-gray-300">{description}</p>

        <div className="text-sm flex flex-col gap-1">
          <span className="font-bold">👤 {trainer}</span>
          <span>📅 {date}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Plazas</span>
          <span>
            {spots}/{maxSpots}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-700 rounded">
          <div
            className="h-full background-primary rounded"
            style={{ width: `${(spots / maxSpots) * 100}%` }}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <button className="flex-1 background-primary text-black font-bold py-2 rounded hover:opacity-90">
            INSCRIBIRSE
          </button>
        </div>
      </div>
    </article>
  );
}

export default ActivityCardPro;
