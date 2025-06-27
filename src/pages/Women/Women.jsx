import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../store/feature/productSlice";
import ItemSkeleton from "../../components/ItemSkeleton";

function Women() {
  const dispatch = useDispatch();
  const { status, items: product } = useSelector((state) => state.product);
  const loading = !status || status === "loading" || status === "idle";

  useEffect(() => {
    if (!status || status === "idle" || status === "error") {
      dispatch(fetchProduct({}));
    }
  }, [dispatch, status]);

  const WomenProducts = product.filter((item) => item.category === "Women");

  return (
    <div className="bg-secondary flex flex-col pt-[50px] gap-[50px]">
      <div className="text-white text-2xl text-center font-bold">Women's Products</div>

      <div className="flex flex-wrap gap-[20px] justify-center">
        {loading ? (
          [...Array(12).keys()].map((_, i) => <ItemSkeleton key={i} />)
        ) : WomenProducts.length > 0 ? (
          WomenProducts.slice(0, 100).map((item, index) => (
            <Item
              key={index}
              index={index + 20}
              data={item}
              reference={item.productRef}
              name={item.merchant?.name}
            />
          ))
        ) : (
          <div className="text-white">No Women's Products Found</div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Women;
