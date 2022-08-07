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

  const [arrayInit, setArray] = useState([]);
  // let arr = [];
  const setFilterSizes = (size) => {
    // setColor(!colour);
    if(arrayInit.includes(size)){
      setArray(arrayInit.filter(item => item !== size))
    }
    else{
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
  console.log("arrayinit", filteredArray);

  useEffect(() => {
    setFilteredArray(
      items.filter(
        product => product.availableSizes.some(size => arrayInit.includes(size)  )
      )
    )
  }
  , [arrayInit]);

  // isSizePresent = (size) => {
  //   return ;
  // }

  const displayArray = arrayInit.length ? filteredArray : items

  return (
    <div className="App">
      <div>
        <div>
          <h4>Sizes:</h4>
        </div>
        <div className="buttonClass">
          {SIZES.map((s) => (
            <button className={`buttons ${arrayInit.includes(s) ? " toggle-color": ""}`} onClick={() => setFilterSizes(s)} key={s}> {s} </button>
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
