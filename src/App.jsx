import { useState } from "react";

function App() {


  const [data, setData] = useState({
    fullName: '',
    email: '',
    maritalStatus: '',
    genre: '',
  });

// contanto quantidade de itens no objeto data
   var qtd = 0;
   var key;

   for(key in data) {
       if(data.hasOwnProperty(key)) {
           qtd++;
     }
   }

// outra forma de contar 
const totalProperties = Object.keys(data).length;

  const handleChange = (event) =>{
    // console.log(event)
    const {name, value } = event.target;

    console.log({
      name,
      value
    })

    setData((prev)=>{
      const newData = { ...prev, [name]: value };
      // console.log(newData);
      return newData;
    })
  }

  const calcularProgress = () =>{

    let value = 0;
    let amountToAdd = 100/qtd;

    if(data.fullName){
       // validar se o usuário incluiu 2 nomes
      const validaName = data.fullName.split(' ');

      if(validaName[1]){
        value += amountToAdd;
      }
     
    }
    if(data.email){
      // regex para validar email
      let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
      if(regexEmail.test(data.email)){
        value += amountToAdd;
      }
    }
    if(data.maritalStatus){
      value += amountToAdd;
    }
    if(data.genre){
      value += amountToAdd;
    }

    // console.log({value});

    return value;

  }

  calcularProgress();

  const handleClick = () =>{
    alert('Formulario enviado com sucesso!')
    setData({
      fullName: '',
      email: '',
      maritalStatus: '',
      genre: ''
  
    })
  }



  return (
    <div className='App'>
      <h1>progresso do formulário</h1>

      <main>
       <div className="bar-container">
        <div className="bar" style={{width: `${calcularProgress()}%`}}> <smal className='porcent'>{calcularProgress()}%</smal> </div>
       </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input name="fullName" value={data.fullName} onChange={handleChange}/>
        </div>

        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input name={'email'}  value={data.email}  onChange={handleChange}  />
        </div>

        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select name="maritalStatus" value={data.maritalStatus} onChange={handleChange}>
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name="genre" value='masculino' onChange={handleChange} checked={data.genre === 'masculino'} /> Masculino
            </span>
            <span>
              <input type='radio'  name="genre" value='feminino'  onChange={handleChange} checked={data.genre === 'feminino'} /> Feminino
            </span>

          </div>
        </div>
        <button onClick={handleClick} disabled={calcularProgress() !== 100}>Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;
