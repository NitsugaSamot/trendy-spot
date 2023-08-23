import {useState} from 'react'
import ProfileNav from './profileNav'
import Alert from '../alert/alert'
import useAuth from '../../contextClient/hooks/useAuth'

const ChangePassword = () => {

  const {updatePassword} = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
      pwd_curr: '',
      pwd_new: ''
  })

  const handleSubmit = async e => {
      e.preventDefault()

      if(Object.values(password).some(campo => campo === '' )) {
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true             
        })
        return
    }

    if(password.pwd_new.length < 6) {
      setAlerta({
          msg: 'El Password debe tener al menos 6 caracteres',
          error: true             
      })
      return
  }

  const response = await updatePassword(password)

  setAlerta(response)

  }

  const {msg} = alert


  return (
    <>
      <ProfileNav/>

      {msg && <Alert alerta={alerta}/>}
      <form 
          onSubmit={handleSubmit}
          action="">
            <div>
                  <label htmlFor="">Current password</label>

                  <input type="password" 
                        className='inputPassword'
                        name='pwd_curr'
                        placeholder='Write your current password'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                  />
            </div>


            <div>
                  <label htmlFor="">New password</label>

                  <input type="password" 
                        className='inputPassword'
                        name='pwd_new'
                        placeholder='Write your current password'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                  />
            </div>

            <div>
              <input type="submit" value='Update password' />
            </div>



      </form>

    </>
  )
}

export default ChangePassword