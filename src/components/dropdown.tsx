"use client"
import React, { useEffect, useState } from 'react'
import useOutsideClick from './use-outside-click';
import { RiCheckboxBlankCircleLine, RiCheckboxBlankCircleFill } from "react-icons/ri";

function DropDown() {
    const [clicked, setClicked] = useState(false)
    const [items, setItems] = useState<string[]>([])
    const [input, setInput] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    const fetchItems = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            setItems(data.map((user: { name: string }) => user.name))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchItems()
    }
        , [])

   
    function toggleSelection(item: string) {
        setSelectedItems((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    }
const callback = () => {
    setClicked(false)
}

const ref = useOutsideClick(callback)

    return (
        <div>
            <div ref={ref} className="relative inline-block">

                <input onFocus={()=>setClicked(true)}  value={input} type="text" className="w-full p-2 border-b border-gray-300 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {
                    clicked && (

                        <div className="absolute left-0 w-48 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg  group-hover:block">
                            <ul className="p-2 space-y-2">
                               {
                                items.map((item, index) => (
                                    
                                    <div key={index} onClick={() => toggleSelection(item)} className='flex items-center'>
{
selectedItems?.includes(item)? (
    <div><RiCheckboxBlankCircleLine /></div>
) : (
    <div><RiCheckboxBlankCircleFill /></div>
)
}

                                        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1">{item}</li>
                                    </div>
                                ))
                               }

                               
                            </ul>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default DropDown