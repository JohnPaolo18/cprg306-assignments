"use client";

import React, { useState } from "react";
import Item from "./item";

// Update the component definition to also receive onItemSelect prop
export default function ItemList({ items, onItemSelect }) {
    const [sortBy, setSortBy] = useState("name");
    const [groupByCategory, setGroupByCategory] = useState(false);

    // Sort items based on the "sortBy" state
    const sortedItems = [...items].sort((a, b) => {
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
        const newAcc = { ...acc };

        if (!newAcc[category]) {
            newAcc[category] = [];
        }
        newAcc[category] = [...newAcc[category], itemObj];
        
        return newAcc;
    }, {});

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Sort items by:</h1>
            <div className="space-x-2 mb-6">
                <button
                    onClick={() => {
                        setSortBy("name");
                        setGroupByCategory(false);
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
                        setGroupByCategory(false);
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
                    <div>
                        {Object.keys(groupedItems).sort().map((category) => (
                            <div key={category} className="mb-4">
                                <h2 className="text-xl font-semibold mb-2 capitalize">{category}</h2>
                                <ul className="space-y-2">
                                    {groupedItems[category].map((itemObj) => (
                                        // Pass the onSelect prop to each Item component
                                        <Item key={itemObj.id} itemObj={itemObj} onSelect={onItemSelect} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {sortedItems.map((itemObj) => (
                            // Pass the onSelect prop to each Item component
                            <Item key={itemObj.id} itemObj={itemObj} onSelect={onItemSelect} />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
