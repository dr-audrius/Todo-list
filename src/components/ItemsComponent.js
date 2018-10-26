import React from 'react'



const ItemsComponent=({items, all, done, action, addItem, changeItem, removeItem, inputRef})=> {
			let lis = []
      let mark;
      let status;
      for(let i in items){
        
        
        if (all) {
          status = items[i].completed;
        }
        else{
          status = done
        }
          
          mark = done === false ? '\u2713' : 'x';
          if(items[i].completed === status){ //all 
            lis.push(<li key={i}>{items[i].item} 
              <span>{mark}</span>
              <input type="button" value="CHANGE STATUS" onClick={ ()=> changeItem(i) }></input>
              <input type="button" value="REMOVE" onClick={ ()=> removeItem(i) }></input>
              </li>)
        }
        }
      
    return (
      <div>
        {done
          ? (<ul className="items"> {lis} </ul>)
          : (
          	<div>
	            <form  onSubmit={addItem}>
				 				<input ref={inputRef} type="text" /> 
				 			</form>
				 			<ul className="items"> {lis} </ul>
			 			</div>
          )}
      </div>
    );				     
}
export default ItemsComponent;

