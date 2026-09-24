import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

    const { id } = useParams()

    const [search, setSearch] = useState("")

    let productName

    switch (id) {
        case "1":
            productName = "Laptop"
            break

        case "2":
            productName = "Mobile"
            break

        case "3":
            productName = "Headphones"
            break

        case "4":
            productName = "Keyboard"
            break

        case "5":
            productName = "Mouse"
            break

        case "6":
            productName = "Monitor"
            break

        default:
            productName = "Product Not Found"
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <h2>Product ID: {id}</h2>
            <h1>{productName}</h1>

        </div>
    )
}

export default Product