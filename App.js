import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) { //if list exists in the local storage
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] =useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert]= useState({
    show:false, 
    msg: '', 
    type:''}); //instead of true or false its an object because alerts will have differrent colours etc. MSG - is message of the alert//
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
    //if name value is false or empty ?- then display alert// 
     showAlert(true,'danger','please enter value')
    }
    else if (name && isEditing) {
      //is name value is true and isEditing is true - then edit//
      setList(list.map((item)=> {
        if(item.id === editID) {
          return {...item, title: name }
        } 
        return item
       }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'item changed')
    }
    else {
      //create new item
      showAlert(true,'success','item added to the list')
      const newItem = {id:  new Date().getTime().toString(),  // not to deal with library where every item in the list should have an ID - we use time of creation as an ID here//
        title: name}; 
        setList([...list,newItem]); //previous list +new item
        setName('')
      }
  }

  const showAlert = (
      show=false,
      type='',
      msg=''
      ) => {
        setAlert({show,type,msg})
      }

  const clearList = () => {
    showAlert(true,'danger','you list is empty');
    setList ([])
  }
  const removeItem = (id) => {
    showAlert(true,'danger','item removed');
    setList(list.filter((item) => item.id !== id)) //if the item id is matching the item - then remove it, if not mathcing - then add it to the new array//
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

//local storage function to save the list
  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list))
  }, [list])

  return <section className='section-center'>
    <form className='grocery-form' 
          onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} // passing properties from stateAlert values  to the Alert component//
         removeAlert={showAlert} 
         list={list}/>}
      <h3>Grocery mate</h3>
      <div className='form-control'> 
        <input type='text' 
              className='grocery' 
              placeholder='e.g. avo' 
              value={name} 
              onChange={(e) => setName(e.target.value)
              }/>
        <button type='submit' 
                className='submit-btn'>
              {isEditing? 'edit': 'submit'}
        </button>
      </div> 
    </form>
    {list.length > 0 && ( //if the length of the list is bigger the 0 - then display the list and the Clear button//
         <div className='grocery-container'>
         <List items={list} 
               removeItem={removeItem}
               editItem={editItem}/>
         <button className='clear-btn'
         onClick={clearList}>
           Remove all items
         </button>
       </div>
    )}
 
  </section>
}

export default App
