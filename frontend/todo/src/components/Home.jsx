import React from 'react'


const Home = () => {
  return (
    <div className='backo'>
      <div className='topo'>
        <input type='text' placeholder='Add a new note'/>
        <button>ADD</button>
      </div>
      <p className='middo'> Todo List</p>
      <div className='boto'>
        <input type='text' />
        <button>Delete</button><br/><br/>
        <input type='text' />
        <button>Delete</button><br/><br/>
        <input type='text' />
        <button>Delete</button><br/><br/>
        <input type='text' />
        <button>Delete</button><br/><br/>
        </div>
    </div>
  )
}

export default Home
