function SummaryCard({
  numberActivitiesSummary,
  descriptionActivitySummary,
  cardColor,
}) {
  return (
    <article
      className={`border-2 ${cardColor === "green" ? "text-primary" : "text-secondary"} p-4 flex flex-col items-center gap-6`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d4ff00"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-puzzle"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
      </svg>
      <p className="text-white text-5xl">{numberActivitiesSummary}</p>
      <p className="text-xl">{descriptionActivitySummary}</p>
    </article>
  );
}
export default SummaryCard;
