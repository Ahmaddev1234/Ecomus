import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";

function AddProducts() {

    const [name,setname]=useState('');
    const [price,setprice]=useState('');
    const [file,setfile]=useState(null);
    const [description,setdescription]=useState('');
    const [stock,setstock]=useState('');
    const [discount,setdiscount]=useState('');
    const [category,setcategory]=useState('');

    const add=async()=>{
      const data=new FormData();
      data.append("name",name);
      data.append("price",price);
      data.append("file",file);
      data.append("description",description);
      data.append("stock",stock);
      data.append("discount",discount);
      data.append("category",category);
      try{

      const response=await fetch("http://localhost:3000/owners/addproducts",{
        method:"POST",
        body:data,
        credentials:'include'
      })
      const finaldata=await response.json();
        if(finaldata.success==false){
          
            toast.error(finaldata.message );

        }
        else{
        toast.success(finaldata.message  || "Product is added")
        }
      }
      catch(err){
        console.log(err);
        
      }

    }

  return (
    <div className='bg-gray-500 w-full md:h-[100vh] h-[100vh] flex justify-center items-center'>
      <div className=' px-7 bg-white md:w-[50%] w-[100%] md:h-[75%] h-[100%] justify-center  rounded-lg flex flex-col md:gap-4 gap-6'>
        <h1 className='text-3xl font-bold '>Add Products</h1>
        <div className='w-full flex md:flex-row md:gap-0 gap-4 flex-col justify-between'>
            <div className='md:w-[48%]   w-[100%] flex flex-col '>
                <label className='md:text-[1rem] text-[1.5rem]' htmlFor="name">Product Name</label>
                <input className='md:rounded-sm rounded-md px-2 md:text-sm text-lg  md:py-1 py-2 bg-transparent border border-gray-100 placeholder-gray-300' type="text" name='name' id='name' placeholder='Enter Product Name' value={name} onChange={(e)=>setname(e.target.value)}/>
            </div>
            <div className='md:w-[48%]  w-[100%] flex flex-col'>
                <label className='md:text-[1rem] text-[1.5rem]' htmlFor="price">Product Price</label>
                <input className='md:rounded-sm rounded-md px-2 md:text-sm text-lg  md:py-1 py-2 bg-transparent border border-gray-100 placeholder-gray-300' type="text" name='price' id='price' placeholder='Enter Product Price' value={price} onChange={(e)=>setprice(e.target.value)}/>
            </div>
        </div>
        <input type="file" name="" id="" onChange={(e) => setfile(e.target.files[0])}/>
        <textarea className='rounded-sm px-2 text-sm py-1 bg-transparent border border-gray-100 placeholder-gray-300' name="message" rows="2" cols="50" placeholder='Enter product description' value={description} onChange={(e)=>setdescription(e.target.value)}></textarea>
        <div className='flex justify-between md:gap-0 gap-4 md:flex-row flex-col'>
        <div className='md:w-[48%] w-[100%] flex flex-col'>
            <label className='md:text-[1rem] text-[1.5rem]' htmlFor="stock">Product Stock</label>
            <input className='md:rounded-sm rounded-md px-2 md:text-sm text-lg  md:py-1 py-2 bg-transparent border border-gray-100 placeholder-gray-300' type="text" name="stock" id="stock" placeholder='Enter Available Stock' value={stock} onChange={(e)=>setstock(e.target.value)}/>
        </div>
        <div className='md:w-[48%] w-[100%] flex flex-col'>
        <label className='md:text-[1rem] text-[1.5rem]' htmlFor="discount">Product Discount</label>
        <input className='md:rounded-sm rounded-md px-2 md:text-sm text-lg  md:py-1 py-2 bg-transparent border border-gray-100 placeholder-gray-300' type="text" name="discount" id="discount" placeholder='Enter Product Discount' value={discount} onChange={(e)=>setdiscount(e.target.value)}/>
        </div>
        </div>
        <div className='w-full flex flex-col'>
        <label className='md:text-[1rem] text-[1.5rem]' htmlFor="discount">Category</label>
        <input className='md:rounded-sm rounded-md px-2 md:text-sm text-lg  md:py-1 py-2 bg-transparent border border-gray-100 placeholder-gray-300' type="text" name="category" id="category" placeholder='Enter Product Category' value={category} onChange={(e)=>setcategory(e.target.value)}/>
        </div>
        <button className='bg-blue-500 text-white md:px-3 md:py-2 py-3 md:text-sm text-2xl rounded-md' onClick={add}>Add Product</button>
      </div>
    </div>
  )
}

export default AddProducts
