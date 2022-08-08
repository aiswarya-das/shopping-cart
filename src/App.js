import logo from "./logo.svg";
import data from "./data.json";
import { useEffect, useState } from "react";
//import image from "../images";
import "./App.css";

const SIZES = ["XS", "S", "M", "X", "L", "XL", "XXL"];

function App() {
  const [items, setItems] = useState(data.products);
  const [isCartOpen, setCart] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [arrayInit, setArray] = useState([]);
  // const [quantity,setQuantity] = useState([1]);
  // let arr = [];
  const setFilterSizes = (size) => {
    // setColor(!colour);
    if (arrayInit.includes(size)) {
      setArray(arrayInit.filter((item) => item !== size));
    } else {
      setArray([...arrayInit, size]);
    }

    // const filtered = data.products.filter((item) =>
    //   // item.availableSizes.includes([...arrayInit])
    //   arrayInit.some((el) => item.availableSizes.includes(el))
    // );
    // console.log("filtered", filtered);
    // console.log("arrayinit", arrayInit);
    // setItems(filtered);
  };
  const addToCart = (
    id,
    sku,
    title,
    currencyFormat,
    price,
    availableSize,
    style
  ) => {
    // let title = inputText;
    let newItem = {
      item: {
        id,
        title,
        sku,
        currencyFormat,
        price,
        availableSize,
        style,
      },
      qty: 1,
    };

    console.log(newItem);
    setListItems([...listItems, newItem]);
    // [{item:{sku:,title:},qty:1},{item:{product},qty:2}]

    // if (listItems.length) {
    //   listItems.map((items) => {
    //     if (items.item.id == newItem.item.id) {
    //       console.log("includes");
    //       // listItems.filter((item) => (item.quantity = +1)
    //       const qtyArray = [...items, (items.qty = +1)];
    //       setListItems([...listItems, qtyArray]);
    //     } else {
    //       console.log("doesn't include");
    //       setListItems([...listItems, newItem]);
    //     }
    //   });
    // } else {
    //   setListItems([...listItems, newItem]);
    // }

    // console.log(listItems);

    // if (listItems.item.includes(newItem.item)) {
    //   setListItems(["ammu"]);
    //   //setArray(listItems.filter((item) => (item.quantity = +1)));
    // } else {
    //   setListItems([...listItems, newItem]);
    // }

    // setInputText("");
    console.log(
      `title:${title},id:${id},sku:${sku},currency:${currencyFormat},price:${price},sizes:${availableSize},style:${style}`
    );
  };
  // console.log("arrayinit", filteredArray);

  useEffect(() => {
    // setFilteredArray(
    //   items.filter((product) =>
    //     product.availableSizes.some((size) => arrayInit.includes(size))
    //   )
    // );
    console.log(listItems);
  }, [listItems]);

  useEffect(() => {
    setFilteredArray(
      items.filter((product) =>
        product.availableSizes.some((size) => arrayInit.includes(size))
      )
    );
  }, [arrayInit]);

  // isSizePresent = (size) => {
  //   return ;
  // }

  const displayArray = arrayInit.length ? filteredArray : items;

  return (
    <div className="App">
      <div>
        <div>
          <h4>Sizes:</h4>
        </div>
        <div className="buttonClass">
          {SIZES.map((s) => (
            <button
              className={`buttons ${
                arrayInit.includes(s) ? " toggle-color" : ""
              }`}
              onClick={() => setFilterSizes(s)}
              key={s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="counter">
          <p>{displayArray.length} Product(s) found </p>
        </div>
        <div className="imageClass">
          {displayArray.map((item) => {
            return (
              <div className="container" key={item.id}>
                <div className="banner">
                  <img className="img" src={`./images/${item.sku}_1.jpg`}></img>
                  {item.isFreeShipping && (
                    <div className="ship">free shipping</div>
                  )}
                </div>
                <p>{item.title}</p>
                {item.currencyFormat}
                {item.price}
                <p id="installments">
                  {item.installments || item.installments > 0 ? (
                    <>
                      or {item.installments} x{item.currencyFormat}
                      <b> {(item.price / item.installments).toFixed(2)}</b>
                    </>
                  ) : (
                    <> </>
                  )}
                </p>

                <button
                  className="add"
                  onClick={() =>
                    addToCart(
                      item.id,
                      item.sku,
                      item.title,
                      item.currencyFormat,
                      item.price,
                      item.availableSizes,
                      item.style
                    )
                  }
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shoppingCart">
        <button className="cartButton" onClick={() => setCart(!isCartOpen)}>
          <div className={isCartOpen ? "cartClose" : "cart"}></div>
        </button>
        {isCartOpen ? (
          <div className="cartContainer">
            <div className="cart-parent">
              <div className="cart-btn">
                <div className="cart"></div>
                <div>
                  <p>
                    <b>Cart</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="todo">
              {listItems.length ? (
                <ul className="un-list">
                  {listItems.map((items) => {
                    return (
                      <li key={items.item.sku} className="list">
                        <img
                          className="img-2"
                          src={`./images/${items.item.sku}_2.jpg`}
                        ></img>
                        <div className="details">
                          <p>
                            {items.item.title}
                            <br />
                            {items.item.availableSize[0]}
                            <br />
                            {`Quantity:${items.qty}`}
                          </p>
                        </div>
                        <div className="text-color">
                          <button className="delete">
                            <b>X</b>
                          </button>
                          <p>
                            {items.item.currencyFormat}
                            {items.item.price}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>
                  Add some products in the cart
                  <br />
                  <br />
                  :)
                </p>
              )}
            </div>

            <div className="checkout-parent">
              <div className="checkout">
                <div className="price">
                  <p>SUBTOTAL</p>
                  <p>price</p>
                </div>
                <button className="submit">CHECKOUT</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
