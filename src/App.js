import logo from "./logo.svg";
import data from "./data.json";
import { useState } from "react";
//import image from "../images";
import "./App.css";

function App() {
  const [items, setItems] = useState(data.products);
  const [isCartOpen, setCart] = useState(false);
  const [colour, setColor] = useState(false);

  const [arrayInit, setArray] = useState([]);
  let arr = [];
  const search = (e) => {
    setColor(!colour);
    let str = e.target.innerHTML;
    arr.push(str);
    setArray(arr);
    console.log(arrayInit);
    // console.log("arrayinit", arrayInit);

    // console.log(data.products);
    const filtered = data.products.filter((item) =>
      item.availableSizes.includes(str)
    );
    //console.log(filtered);
    setItems(filtered);
  };
  return (
    <div className="App">
      <div>
        <div>
          <h4>Sizes:</h4>
        </div>
        <div className="buttonClass">
          {/* className={`myoriginal classes ${condition} ? " new class" : " "`} */}
          <button
            className={"buttons " + (colour ? "toggle-color" : " ")}
            onClick={search}
          >
            XS
          </button>
          <button
            className={"buttons " + (colour ? "toggle-color" : " ")}
            onClick={search}
          >
            S
          </button>
          <button className="buttons" onClick={search}>
            M
          </button>
          <button className="buttons" onClick={search}>
            X
          </button>
          <button className="buttons" onClick={search}>
            L
          </button>
          <button className="buttons" onClick={search}>
            XL
          </button>
          <button className="buttons" onClick={search}>
            XXL
          </button>
        </div>
      </div>
      <div>
        <div className="counter">
          <p>{items.length} Product(s) found </p>
        </div>
        <div className="imageClass">
          {items.map((item) => {
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

                <button className="add">Add to cart</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shoppingCart">
        <button className="cartButton" onClick={() => setCart(!isCartOpen)}>
          <div className={isCartOpen ? "cartClose" : "cart"}></div>
        </button>
        {isCartOpen ? <div className="cartContainer"> </div> : null}
      </div>
    </div>
  );
}

export default App;
