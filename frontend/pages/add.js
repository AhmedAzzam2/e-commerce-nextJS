import Head from 'next/head'
import Image from 'next/image'
import Header from '../compont/Header'

import { useEffect } from 'react'

export default function Form() {
    //  register auth http://localhost:8080/api/users by POST  
    //  login auth http://localhost:8080/api/users/login by POST
    //  logout http://localhost:8080/api/users/logout by POST
    //  get user http://localhost:8080/api/users/me by GET
    useEffect(() => {
        // setter
        localStorage.setItem('myData', 'data');
        // getter
        localStorage.getItem('myData');
        console.log(localStorage.getItem('myData'));
    }, [])
    

   let registerUser = (e) => {
        e.preventDefault();
        
        const data = {
            name: e.target.name.value,
            price: e.target.price.value,
            category: e.target.category.value,
            stock: e.target.stock.value,
            offer: e.target.offer.value,
            image: e.target.image.value

        }
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                window.localStorage.setItem('token', res);
                console.log(res)
                // redirect to /
                window.location.href = '/';
            })
    }
    
    return (
        < div >
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
                
            </Head>
            <Header /> 
      <form onSubmit={registerUser}> 
 
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name"/>
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" id="price" placeholder="Enter price"/>
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" id="category" placeholder="Enter category"/>
            </div>
            <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input type="number" className="form-control" id="stock" placeholder="Enter stock"/>
            </div>
            <div className="form-group">
                <label htmlFor="offer">Offer</label>
                <input type="text" className="form-control" id="offer" placeholder="Enter offer"/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="text" className="form-control" id="image" placeholder="Enter image"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>

        </form>  
    </div >
    )
  }