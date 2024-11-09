
"use client"
import Link from 'next/link'
import { title } from 'process';
import React,{ useState} from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const navLinks=[
    {title:"About",path:"#about"},
    {title:"Portfolio",path:"#portfolio"},
    {title:"Linkedin",path:"#Stack"},
    {title:"Contact",path:"#contact"},
    {title:"Github",path:"#contact"}
]
export const Navbar=()=>{
    const [nav,setNav]=useState(false)
    const toggleNav=()=>{
        setNav(!nav)

        
    }
    const CloseNav=()=>{
        setNav(false)
    }
    return(
        <div className='z-50 fixed flex justify-center w-full text-white font-bold'>
            <div className='border border-white/20 mt-8 backdrop-blur-3xl rounded-3xl
                            hidden md:flex items-center justify-center p-2 max-w-[500px] mx-auto'>
                             <ul className='flex flex-row p-2 space-x-8'>
                                {
                                    navLinks.map((link,index)=>(
                                        <li key={index}>
                                            <Link href= {link.path} className='transform hover:text-white/50 transition-all duration-300 ease-in-out'>
                                            {link.title}
                                            </Link>

                                        </li>
                                    ))
                                }
                                </ul>   
                            </div>

        </div>
    )
}