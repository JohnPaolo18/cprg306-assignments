"use client";

import { useState } from "react";

export default function NewItem({onAddItem}) {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const [category, setCategory] = useState('produce');
    const [itemName, setItemName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newId = Math.floor(Math.random() * 1000);
        const newItem = {id: newId, name: itemName, quantity: quantity, category: category};

        onAddItem(newItem);
        alert(`Added Item: ${itemName}\nQuantity: ${quantity}\nCategory: ${category}`);
        console.log('submitted');
    };

    return (
        <main className="flex justify-start p-4 bg-black">
            <div className="bg-black rounded-lg shadow-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Item name"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen">Frozen foods</option>
                        <option value="canned">Canned foods</option>
                        <option value="dry">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    decrement();
                                }}
                                className={`w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-800 rounded-2xl text-white font-bold ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <h1 className="w-5 text-lg font-normal text-white">{quantity}</h1>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    increment();
                                }}
                                className={`w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-800 rounded-2xl text-white font-bold ${quantity >= 20 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={quantity >= 20}
                            >
                                +
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-lg shadow"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}


