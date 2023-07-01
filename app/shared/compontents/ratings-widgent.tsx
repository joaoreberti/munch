export default function RatingsWidget({
  restaurantAvgRating,
}: {
  restaurantAvgRating: number;
}) {
  return (
    <>
      {restaurantAvgRating > 4 ? (
        <div>
          Rating:
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            green {restaurantAvgRating}
          </span>
        </div>
      ) : restaurantAvgRating > 3 ? (
        <div>
          Rating:{" "}
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
            {restaurantAvgRating}
          </span>
        </div>
      ) : (
        <div>
          Rating:{" "}
          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            {restaurantAvgRating}
          </span>
        </div>
      )}
    </>
  );
}
