import React, { useState } from 'react'

const Signup = () => {

    let [form,setform]=useState({
        name:"",
        email:"",
        number:"",
        cpass:""
    })

    let handleChange=(e)=>{

        setform( { ...form , [e.target.name]:e.target.value })
    }

    let handleSubmit=(e)=>{

        e.preventDefault()

        let valid=true

        if(form.name.trim()==""){

            alert("Please enter name")
            valid=false
        }

        else if(isNaN(form.number)){
            alert("Please enter number only")
            valid=false
        }

        if(valid){

            let users= JSON.parse( localStorage.getItem('users')) || []

            let alreadyuser= users.find( (e)=>{

                return e.email == form.email
            })
            if(alreadyuser){

                alert('Already a user')
                return
            }

            users.push(form)

            localStorage.setItem('users', JSON.stringify(users) )

            alert("signup success")

        }
    }
  return (
    <>
    
        <form onSubmit={handleSubmit}>

        Enter Name: <input type="text" name='name' value={form.name} onChange={handleChange}/> <br /> <br />
        Enter Email: <input type="text" name='email' value={form.email} onChange={handleChange}/> <br /> <br />
        Enter Number: <input type="text" name='number' value={form.number} onChange={handleChange}/> <br /> <br />
        Enter Pass: <input type="text" name='pass' value={form.pass} onChange={handleChange}/> <br /> <br />
        Enter Cpass: <input type="text" name='cpass' value={form.cpass} onChange={handleChange}/> <br /> <br />

        <button type='submit'>Signup</button>


        </form>
    

    </>
  )
}

export default Signup