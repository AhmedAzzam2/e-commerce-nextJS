import { useEffect,useState } from "react";
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import img from '../images/icons8-buying-64.png'
import Image from 'next/image'

export default function Header() {
    const [State1, setState] = useState( '' );
  
let item;
    useEffect(() => {
        // Perform localStorage action
         setState(localStorage.getItem('token'));
         
      })    
      
      
     if ( null !== State1 ) {
         
         return (
             <div className="navbar">
                 <div className="navbar-inner">
                         <Link className="brand" href="/">
                            logo  
                         </Link>
                            <ul className="nav">
                                    <Link href="edit" className="">
   <Image src={img} alt="me" width="34" height="34" />
                                    </Link>
                                 <Link href="/add" className="">add</Link>
                                <Link href="/logout">logout</Link>
                            </ul>
                 </div>
             </div>
         )
     } else {
            return (
                <div className="navbar">
                    <div className="navbar-inner">
                            <Link className="brand" href="/">
                             logo
                            </Link>
                            <ul className="nav">
                                 <Link href="/singup">singup</Link>
                                <Link href="/login">login</Link>
                            </ul>
                    </div>
                </div>
            )
        }
}
//

