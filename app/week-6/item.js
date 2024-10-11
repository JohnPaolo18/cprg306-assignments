
export default function Item({itemObj}) {
    const { name, quantity, category } = itemObj;
  
    return (
      <li className="p-3 border rounded-lg shadow-md mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-yellow-300">Category: {category}</p>
        </div>
        <span className="text-green-500 font-bold">{quantity}</span>
      </li>
    );
  }
  
  
  