"use client";

import Item from "./item";
import { useState } from "react";
import itemsJson from "./items.json";

export default function ItemList() {
    const [sortBy, setSortBy] = useState("name");
    const [groupByCategory, setGroupByCategory] = useState(false);

    // Sort items based on the "sortBy" state
    const sortedItems = [...itemsJson].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    // Group items by category using the reduce function
    const groupedItems = sortedItems.reduce((acc, itemObj) => {
        const category = itemObj.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(itemObj);
        return acc;
    }, {});

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Sort items by: </h1>
            <div className="space-x-2 mb-6">
                
                <button
                    onClick={() => {
                        setSortBy("name");
                        setGroupByCategory(false); // Disable grouping when sorting by name
                    }}
                    className={`px-4 py-2 rounded ${
                        sortBy === "name" && !groupByCategory ? "bg-green-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Name
                </button>

                <button
                    onClick={() => {
                        setSortBy("category");
                        setGroupByCategory(false); // Disable grouping when sorting by category
                    }}
                    className={`px-4 py-2 rounded ${
                        sortBy === "category" && !groupByCategory ? "bg-green-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Category
                </button>

                <button
                    onClick={() => {
                        setGroupByCategory(true);
                        setSortBy(""); 
                    }}
                    className={`px-4 py-2 rounded ${
                        groupByCategory ? "bg-orange-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Group Category
                </button>
            </div>

            <main>
                {groupByCategory ? (
                    // Render items grouped by category
                    <div>
                        {Object.keys(groupedItems).sort().map((category) => ( //This sort the categories alphabetically
                            <div key={category} className="mb-4">
                                <h2 className="text-xl font-semibold mb-2 capitalize">{category}</h2> //This capitalize the first letter of the category
                                <ul className="space-y-2">
                                    {groupedItems[category].map((itemObj) => (
                                        <Item key={itemObj.id} itemObj={itemObj} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Render sorted items
                    <ul className="space-y-2">
                        {sortedItems.map((itemObj) => (
                            <Item key={itemObj.id} itemObj={itemObj} />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
