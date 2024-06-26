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
  const [cartList, setCartlist] = useState([]);
  // const [InitialPrice, setPrice] = useState("0.00");
  const [arrayInit, setArray] = useState([]);

  const setFilterSizes = (size) => {
    // setColor(!colour);
    if (arrayInit.includes(size)) {
      setArray(arrayInit.filter((item) => item !== size));
    } else {
      setArray([...arrayInit, size]);
    }
  };
  const addToCart = (
    item
    // id,
    // sku,
    // title,
    // currencyFormat,
    // price,
    // availableSize,
    // style
  ) => {
    // let title = inputText;
    let newItem = {
      item,
      qty: 1,
    };

    //console.log(newItem);
    // setListItems([...listItems, newItem]);
    // [{item:{sku:,title:},qty:1},{item:{product},qty:2}]
    let productPresentFlag = false;

    let duplicateClone = cartList.map((items) => {
      if (items.item.id == item.id) {
        items.qty += 1;
        productPresentFlag = true;
      }
      return items;
    });
    if (!productPresentFlag) {
      duplicateClone = [...duplicateClone, newItem];
    }
    console.log("dup clone", duplicateClone);
    setCartlist(duplicateClone);

    if (cartList.length < 1) {
      setCart(true);
    }
  };

  const delt = (id) => {
    // alert(id);
    // let itemUpdatedClone = listItems.item.filter((items) => items.id != id);
    let itemUpdatedClone = cartList.filter((items) => items.item.id != id);
    setCartlist(itemUpdatedClone);

    console.log(itemUpdatedClone);
  };

  useEffect(() => {
    console.log("listItems", listItems);
  }, [listItems]);

  useEffect(() => {
    setFilteredArray(
      items.filter((product) =>
        product.availableSizes.some((size) => arrayInit.includes(size))
      )
    );
  }, [arrayInit]);

  const getPrice = () => {
    let price = 0;

    cartList.forEach((items) => {
      price = price + items.item.price * items.qty;
    });
    return `${price.toFixed(2)}`;
  };

  const getTotal = () => {
    let tqty = 0;
    cartList.forEach((items) => {
      tqty = tqty + items.qty;
    });
    return tqty;
  };

  const checkout = () => {
    let finalPrice = getPrice();
    console.log(finalPrice);
    if (finalPrice > 0) {
      alert(`Checkout - Subtotal: $${finalPrice}`);
    } else {
      alert("add some product in the cart!");
    }
  };

  const decrementItem = (id) => {
    let itemUpdatedClone = cartList.map((items) => {
      if (items.item.id == id && items.qty > 1) {
        items.qty -= 1;
      }
      return items;
    });
    setCartlist(itemUpdatedClone);
  };

  const incrementItem = (id) => {
    let itemUpdatedClone = cartList.map((items) => {
      if (items.item.id == id) {
        items.qty += 1;
      }
      return items;
    });
    setCartlist(itemUpdatedClone);
  };

  const displayArray = arrayInit.length ? filteredArray : items;

  return (
    <div className="App">
      <div className="button-parent">
        <div>
          <h4>Sizes:</h4>
        </div>
        <div className="buttonClass">
          {SIZES.map((s) => (
            <button
              className={`buttons ${
                arrayInit.includes(s) ? " toggle-color" : ""
              }`}
              onClick={() => {
                setFilterSizes(s);
                // setCart(true);
              }}
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
                <p className="title">{item.title}</p>
                {item.currencyFormat}
                {item.price}
                <p className="fade">
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
                      item
                      // item.sku,
                      // item.title,
                      // item.currencyFormat,
                      // item.price,
                      // item.availableSizes,
                      // item.style
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
          <div className={isCartOpen ? "cartClose" : "cart"}>
            {isCartOpen ? "" : <div className="total">{getTotal()}</div>}
          </div>
        </button>
        {isCartOpen ? (
          <div className="cartContainer">
            <div className="cart-parent">
              <div className="cart-btn">
                <div className="cart">
                  <div className="total">{getTotal()}</div>
                </div>
                {/* <div></div> */}
                <div>
                  <p>
                    <b>Cart</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="todo">
              {cartList.length ? (
                <ul className="un-list">
                  {cartList.map((items) => {
                    return (
                      <li key={items.item.sku} className="list">
                        <img
                          className="img-2"
                          src={`./images/${items.item.sku}_2.jpg`}
                        ></img>
                        <div className="details">
                          <p className="item-title">{items.item.title}</p>
                          <p className="details-fade">
                            {items.item.availableSizes[0]}
                            <br />
                            {`Quantity: ${items.qty}`}
                          </p>
                        </div>
                        <div className="addDelt">
                          <button
                            className="delete"
                            onClick={() => delt(items.item.id)}
                          >
                            <b>X</b>
                          </button>
                          <p className="text-color">
                            {items.item.currencyFormat}
                            {items.item.price}
                          </p>
                          <button
                            className="decre"
                            onClick={() => decrementItem(items.item.id)}
                          >
                            -
                          </button>
                          <button
                            className="incre"
                            onClick={() => incrementItem(items.item.id)}
                          >
                            +
                          </button>
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
                  <p className="fade">SUBTOTAL</p>
                  {/* <p>$ {InitialPrice}</p> */}
                  <p className="total-price">${getPrice()}</p>
                  {/* <div> </div> */}
                </div>
                <button className="submit" onClick={() => checkout()}>
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
