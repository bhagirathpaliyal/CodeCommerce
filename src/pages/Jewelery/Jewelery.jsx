import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../store/feature/productSlice";
import ItemSkeleton from "../../components/ItemSkeleton";

function Jewelery() {
  const dispatch = useDispatch();
  const { status, items: product } = useSelector((state) => state.product);
  const loading = !status || status === "loading" || status === "idle";

  useEffect(() => {
    if (!status || status === "idle" || status === "error") {
      dispatch(fetchProduct({}));
    }
  }, [dispatch, status]);

  const JewelleryProducts = product.filter((item) => item.category === "Jewellery");

  return (
    <div className="bg-secondary flex flex-col pt-[50px] gap-[50px]">
      <div className="text-white text-2xl text-center font-bold">Jewellery Products</div>

      <div className="flex flex-wrap gap-[20px] justify-center">
        {loading ? (
          [...Array(12).keys()].map((_, i) => <ItemSkeleton key={i} />)
        ) : JewelleryProducts.length > 0 ? (
          JewelleryProducts.slice(0, 100).map((item, index) => (
            <Item
              key={index}
              index={index + 20}
              data={item}
              reference={item.productRef}
              name={item.merchant?.name}
            />
          ))
        ) : (
          <div className="text-white">No Jewellery's Products Found</div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Jewelery;
