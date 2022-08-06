import logo from "./logo.svg";
import data from "./data.json";
import { useState } from "react";
//import image from "../images";
import "./App.css";

function App() {
  const [items, setItems] = useState(data.products);
  const search = (e) => {
    let str = e.target.innerHTML;
    // console.log(data.products);
    const filtered = data.products.filter((item) =>
      item.availableSizes.includes(str)
    );
    //console.log(filtered);
    setItems(filtered);
    // filtered.map((item) => {
    //   console.log(item.sku);
    //   return (
    //     <div className="container" key={item.id}>
    //       <h4>hello there</h4>
    //       <div className="banner">
    //         <img className="img" src={item.sku}></img>
    //         <div className="ship">{item.isFreeShipping && "free shipping"}</div>
    //       </div>
    //       <p>{item.title}</p>
    //       <p>
    //         {item.currencyFormat}
    //         {item.price}
    //       </p>
    //       <button className="add">Add to cart</button>
    //     </div>
    //   );
    // });

    // data.products.map((item) => {
    //   console.log(item.availableSizes[0]);
    //   //  const filtered = item.filter(() =>
    //   // //   item.value.toLowerCase().includes(str.toLowerCase())
    //   const filtered = item.filter(() =>
    //   item.value.toLowerCase().includes(str.toLowerCase())
    //   );

    // });

    // fetch("data.json")
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    // fetch("data.json")
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error("error fetching!");
    //   })
    //   .then((json) => {
    //     console.log(json);
    //   })
    //   .catch((e) => {
    //     console.log("error", e);
    //     alert(e);
    //   });
  };
  return (
    <div className="App">
      <div>
        <div>
          <h4>Sizes:</h4>
        </div>
        <div className="buttonClass">
          <button className="buttons" value="xs" onClick={search}>
            XS
          </button>
          <button className="buttons" onClick={search}>
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
                <p>
                  {item.currencyFormat}
                  {item.price}
                  <p id="installments">
                    {item.installments || item.installments > 0 ? (
                      <>
                        or {item.installments} x{item.currencyFormat}
                        <b> {(item.price / item.installments).toFixed(2)}</b>
                      </>
                    ) : (
                      <div> </div>
                    )}
                  </p>
                </p>
                <button className="add">Add to cart</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="shoppingCart">
        <button className="cartButton">
          <div className="cart"></div>
        </button>
      </div>
    </div>
  );
}

export default App;
