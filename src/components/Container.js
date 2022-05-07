import React, { useEffect, useState } from 'react'
import {getProducts } from '../APIs/Products'
const Container = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getProducts().then((result) => {
            setData(result)
        }).catch((err) => {

        });
    })
    
    return (
        <div className='ml-[260px]'>
            <div class="flex-1 relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="title mt-30">PRODUCT INFORMATION</div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-30">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-7 py-3">
                                Barcode product
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product price
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product quantity
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product Image
                            </th>
                            <th scope="col" class="px-7 py-3">
                                Product category
                            </th>
                            <th scope="col" class="px-7 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data&& data.map((value,index) => {
                            return (
                                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {value.barcode?.current}
                                    </th>
                                    <td class="px-6 py-4">
                                    {value.name}
                                    </td>
                                    <td class="px-6 py-4">
                                    {value.price}
                                    </td>
                                    <td class="px-6 py-4">
                                    {value.quantity}
                                    </td>
                                    <td class="px-6 py-4">
                                        <img src = {value.image } alt="" style={
                                            {
                                                width:70,
                                            }
                                        }/>
                                    </td>
                                    <td class="px-6 py-4">
                                    {value.categoryProduct?.name}
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Container