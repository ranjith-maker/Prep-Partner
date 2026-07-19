




export default function Shimmer() {

  const cards = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">

      {cards.map((_, index) => (

        <div
          key={index}
          className="
            relative 
            overflow-hidden 
            rounded-xl 
            border 
            border-gray-200 
            bg-gray-100 
            p-2 
            shadow-sm
          "
        >

          {/* Moving shimmer effect */}
          <div
            className="
              absolute 
              inset-0 
              -translate-x-full
              animate-[shimmer_1.5s_infinite]
              bg-linear-to-r 
              from-transparent 
              via-white/60 
              to-transparent
            "
          />


          {/* Content */}
          <div className="relative z-10">


            {/* Header */}
            <div className="rounded-lg bg-gray-200 p-4">

              <div className="flex items-start gap-4">


                {/* Avatar */}
                <div className="h-12 w-12 rounded-md bg-gray-300" />


                <div className="flex-1 space-y-2">

                  {/* Role */}
                  <div className="h-5 w-32 rounded bg-gray-300" />


                  {/* Topics */}
                  <div className="h-4 w-48 rounded bg-gray-300" />


                </div>

              </div>

            </div>



            {/* Footer */}
            <div className="px-3 pb-3">


              {/* Pills */}
              <div className="mt-4 flex flex-wrap gap-3">

                <div className="h-6 w-24 rounded-full bg-gray-300" />

                <div className="h-6 w-20 rounded-full bg-gray-300" />

                <div className="h-6 w-32 rounded-full bg-gray-300" />

              </div>



              {/* Description */}
              <div className="mt-4 space-y-2">

                <div className="h-3 w-full rounded bg-gray-300" />

                <div className="h-3 w-3/4 rounded bg-gray-300" />

              </div>


            </div>


          </div>

        </div>

      ))}

    </div>
  );
}