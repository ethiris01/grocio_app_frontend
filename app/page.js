import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
// import BestSelling from "./_components/BestSellingList";
import ProductList from "./_components/ProductList";
import { banner } from "./assets";
import Footer from "./_components/Footer";
import BestSellingList from "./_components/BestSellingList";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()
  const productList = await GlobalApi.getAllProducts()
  const bestSellingList = await GlobalApi.getProduct()

  return (
    <div className="p-10 px-16">
    {/* <h2 className="text-5xl font-semibold ">Logo</h2> */}
    {/* <Button> Click here</Button> */}
    <Slider sliderList={sliderList} />
    <CategoryList categoryList={categoryList} />
    {/* <BestSellingList bestSellingList={bestSellingList} /> */}
    <ProductList productList={productList} />
    <Image 
      src={banner}
      width={1000}
      height={300}
      alt="banner"
      className="w-full h-[400px] object-contain mt-10"
    />
    <Footer />
    </div>
  );
}
