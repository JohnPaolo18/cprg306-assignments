"use client";

import ItemList from "./item-List.js";
import NewItem from "./new-item.js";
import ItemsData from "./items.json";
import { useState } from "react";

export default function Page() {

  const [items, setItems] = useState(ItemsData);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };


  return (
    <main>
      <h1 className="text-3xl font-bold m-2">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />  
      <ItemList items={items} />
          
    </main>
  );
}