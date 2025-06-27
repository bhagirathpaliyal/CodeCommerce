import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, addProduct } from "../store/feature/productSlice";
import Item from "./Item";
import {
  Input,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { v4 as uuid } from "uuid";
const AddProducts = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.myItems);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchProduct({ userId: user.uid }));
    }
  }, [user, dispatch]);

  const validateForm = () => {
    const newErrors = { name: "", price: "", image: "" };
    let isValid = true;

    if (!name) {
      newErrors.name = "Product name is required";
      isValid = false;
    }
    if (!price) {
      newErrors.price = "Product price is required";
      isValid = false;
    }
    if (!isChecked && !image) {
      newErrors.image = "Product image URL is required";
      isValid = false;
    }
    if (!category) {
      newErrors.category = "Product category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddProducts = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (user) {
        var imageUrl = isChecked
          ? `https://picsum.photos/id/${
              Math.floor(Math.random() * 1000) + 1
            }/200/300`
          : image;
        dispatch(
          addProduct({
            userId: user.uid,
            item: { name, price, image: imageUrl ,category, },
          })
        ).then(() => dispatch(fetchProduct(user.uid)));
        setName("");
        setPrice("");
        setImage("");
        setIsChecked(false);
       setCategory("")
        setErrors({ name: "", price: "", image: "",category:"" });
      }
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center gap-2">
      <form onSubmit={handleAddProducts}>
        <div className="border flex flex-col gap-2 p-4 rounded-md">
          <h2 className="text-center text-lg font-medium">Add Your Product</h2>

          <label htmlFor="Product">Product Name</label>
          <Input
            className="border rounded-md"
            type="text"
            id="Product"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}

          <label htmlFor="Price">Product Price</label>
          <Input
            className="border rounded-md"
            type="number"
            id="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          {errors.price && (
            <FormHelperText error>{errors.price}</FormHelperText>
          )}

          <label htmlFor="image">Product Image</label>
          <div className="flex items-center gap-2">
            <FormControlLabel
              control={
                <Checkbox
                  id="generate"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              }
              label="Random Image"
            />
          </div>

          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="border p-2 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewellery">Jewellery</option>
          </select>
          {errors.category && (
            <FormHelperText error>{errors.category}</FormHelperText>
          )}

          {!isChecked && (
            <Input
              className="border rounded-md"
              type="text"
              id="image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              placeholder="Enter image URL"
            />
          )}
          {errors.image && (
            <FormHelperText error>{errors.image}</FormHelperText>
          )}

          <button
            className="border p-2 rounded-md bg-blue-500 text-white"
            type="submit"
          >
            Add Product
          </button>
        </div>{" "}
      </form>

      <div className="mt-8 flex flex-col items-center gap-5">
        <div className="text-lg font-bold">Your Products</div>
        <ul className="flex flex-wrap gap-[20px] justify-center">
          {products.map((item, index) => (
            <Item key={index} index={index + 20} data={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddProducts;
