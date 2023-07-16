import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const paginationHandler=(index)=>{
    setPage(index+1);
  }
  useEffect(
    function () {
      async function fetchData() {
        try {
          const res = await fetch("https://dummyjson.com/products?limit=100");
          const data = await res.json();
          setProducts(data.products);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    },
    []
  );

  useEffect(() => {
   const options = {
      top: 0,
      behavior: "smooth",
    };
    window.scrollTo(options); // Scroll to the top with smooth scrolling effect
  }, [page]);

  

  if (products?.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {products?.length > 0 && (
        <div className="products">
          {products.slice(page*10-10,page*10).map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt="" />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products?.length > 0 && (
        <div className="pagination">
          <span className={page===1? "disabled":""} onClick={()=>setPage(page-1)}> ◀ </span>

          {[...Array(products.length/10)].map((_,i)=>{
            return <span className={page===i+1? "pagination__selected":""} key={i} onClick={()=>paginationHandler(i)}>{i+1}</span>
          })}
          
          <span className={page===10? "disabled":""} onClick={()=>setPage(page+1)}>▶</span>
        </div>
      )}
    </div>
  );
}

export default App;
