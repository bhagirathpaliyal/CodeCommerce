import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../store/feature/cartSlice";
import { createOrder } from "./../store/feature/orderSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Button } from "@mui/material";
import { getDoc } from "firebase/firestore";
import ConfirmationDialog from "./ConfirmationDialog";
import { Button } from "@/components/ui/button";
function Item(prop) {
  const [status, setStatus] = useState("Ordered");
  const [merchant, setMerchant] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function load() {
      if (prop.data.merchantId) {
        const merchantData = await getDoc(prop.data.merchantId);
        setMerchant(merchantData.data());
      } else {
        setMerchant(null);
      }
    }

    load();
  }, [prop.data?.merchantId]);

  const handleAction = (action) => {
    setDialogType(action); 
  };

  const handleConfirmAction = () => {
    if (dialogType === "addToCart") {
      dispatch(
        addToCart({
          userId: user.uid,
          productRef: prop.reference,
        })
      );
    } else if (dialogType === "buyNow") {
      dispatch(
        createOrder({
          userId: user.uid,
          merchantId: prop.data.merchantId,
          productRef: prop.data.productRef,
          status,
        })
      );
    }
    setDialogType(null); 
  };

  return (
    <div className="flex flex-col gap-[10px] border-[2px] border-solid border-brown-900  w-[200px] bg-secondary rounded-[6px] overflow-hidden p-[10px] relative">
      <div>
        <LazyLoadImage
          src={
            prop.data?.image
              ? prop.data?.image
              : `https://picsum.photos/id/${prop.index}/200/300`
          }
          alt="Image"
          className="bg-cover w-full h-[200px] rounded-[6px]"
        />
      </div>
      <div className="flex flex-col h-[100%] justify-between">
        <h2 className="text-[12px] md:text-[15px] font-medium">
          {prop.data?.name}
        </h2>
        <p className="text-[12px] md:text-[15px] font-medium">{prop?.name}</p>
        <h2 className="text-[12px] md:text-[15px] ">
          Price: <span className="font-medium">{prop.data?.price}</span>
        </h2>
        <h2 className="text-[12px] md:text-[15px] ">
          Merchant: <span className="font-medium">{merchant ? merchant.name : "Loading"}</span>
        </h2>
        <h2 className="text-[12px] md:text-[15px] ">
          category: <span className="font-medium">{prop.data?.category}</span>
        </h2>

        {!user?.isMerchant && !prop.isCart && (
          <Button  onClick={() => handleAction("addToCart")}>
            Add To Cart
          </Button>
        )}

        {prop.isCart && (
          <Button  onClick={() => handleAction("buyNow")}>
            Buy Now
          </Button>
        )}

        
        <ConfirmationDialog
          open={!!dialogType}
          title={dialogType === "addToCart" ? "Confirm Add to Cart" : "Confirm Purchase"}
          content={
            dialogType === "addToCart"
              ? "Are you sure you want to add this item to your cart?"
              : "Are you sure you want to purchase this item?"
          }
          onConfirm={handleConfirmAction}
          onCancel={() => setDialogType(null)}
        />
      </div>
    </div>
  );
}

export default Item;
