import Layout from "../../components/Layout";


function Categories() {
  return (
    <Layout>
      <div className="relative">
        <div className="bg-slate-700 h-32 md:h-52">
          <div className="lg:container"></div>
        </div>
        <div className="bg-primary h-screen">
          <div className="lg:container"></div>
        </div>
        <div className="absolute top-16 lg:left-[185px]">
          <div className="lg:container px-4">
            <div className="absolute z-50">
              <div className="bg-red-400 h-1 w-11"></div>
              <p className="text-white lg:text-xl font-semibold">Movies</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
