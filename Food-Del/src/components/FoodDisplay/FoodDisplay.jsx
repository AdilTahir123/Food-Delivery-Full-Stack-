
import './FoodDisplay.css'
import { StoreContext } from '../context/StoreContext';
import { useContext,useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext);
    const [sortBy,setSortBy]=useState("High-to-Low");
    const [filterProduct,setFilterProduct]=useState("");
              const filterProductList=food_list.filter((item)=>{
        return item.name.toLowerCase().includes(filterProduct.toLowerCase());
    }); 
    const sortFoodList=()=>{
        const copyFoodList=[...filterProductList];
        if(sortBy==="High-to-Low"){
            return copyFoodList.sort((a,b)=>b.price-a.price);
        }
        else{
            return copyFoodList.sort((a,b)=>a.price-b.price);
        }
    }
    
    const sortedFoodList=sortFoodList();

  return (
    <div className='food-display' id='food-display'>
        <select name="options" id="option1" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="High-to-Low">High-to-Low</option>
            <option value="Low-to-High">Low-to-High</option>
        </select>
        <input type="text" placeholder="Search food..." value={filterProduct} onChange={(e)=>setFilterProduct(e.target.value)}/>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
            {/* category===salad  category===item.category salad ===salad*/}
                {sortedFoodList.map((item,index)=>{
                    if(category==="All" || category===item.category){
                        return <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })}
        </div>
    </div>
  )
}

export default FoodDisplay