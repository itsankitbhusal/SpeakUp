const Loading = () => (
  <>
    <div className=" w-full my-4 px-4 py-2">
      <div role="status" className="max-w-full rounded-sm outline-1 animate-pulse">
        <div className=" grid gap-1 my-4">
          <div className=" flex justify-between my-1">
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 w-4/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 w-1/12"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
          <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-10/12"></div>
          <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
        </div>

        <div className="flex justify-between gap-1 w-12/12">
          <div className="w-1/12 grid gap-2">
            <div className="h-20 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-10/12"></div>
            <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-10/12"></div>

          </div>
          <div className=" w-10/12 grid gap-2">
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-10/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
            <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
            <div className=" flex justify-between my-1">
              <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 w-6/12"></div>
              <div className="h-2 bg-gray-200 rounded-sm dark:bg-gray-400 w-3/12"></div>
            </div>
            <div className="h-8 mt-4 bg-gray-200 rounded-sm dark:bg-gray-400 max-w-12/12"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>

  </>
);

export default Loading;