import logo from "./logo.svg";
import data from "./data.json";
import { useState } from "react";
//import image from "../images";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const search = (e) => {
    // console.log(e.target.innerHTML);

    let str = e.target.innerHTML;
    console.log(data.products);
    const filtered = data.products.filter(
      (item) => item.availableSizes.includes(str)
      // item.value.toLowerCase().includes(str.toLowerCase())
    );
    console.log(filtered);
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

    // data.products.map((items) => {
    //   console.log(items.availableSizes);
    //   const filtered = items.filter((item) =>
    //     //item.value.toLowerCase().includes(str.toLowerCase())
    //     item.availableSizes.includes(str)
    //   );
    //   console.log(filtered);
    // });

    // populateList(filtered, ul);
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
      <div className="buttonClass">
        <h4>Sizes:</h4>
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
          ML
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
      <div className="imageClass">
        {items.map((item) => {
          return (
            <div className="container" key={item.id}>
              <div className="banner">
                <img className="img" src={item.sku}></img>
                <div className="ship">
                  {item.isFreeShipping && "free shipping"}
                </div>
              </div>
              <p>{item.title}</p>
              <p>
                {item.currencyFormat}
                {item.price}
              </p>
              <button className="add">Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
