import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import Alert from "../alert/alert";
import axiosClient from "../../contextClient/config/axiosClient";
import imageLogo from "../../assets/trendy-spot-logo.png";
import "./styles.css";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmated, setAccountConfirmated] = useState(false);

  const params = useParams();
  const { id } = params; //desestructuramos extrayendo id de params

  useEffect(() => {
    const ConfirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        // const {data} = await clienteAxios(url)
        const {data} = await axiosClient.post(url)

        console.log(data);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setAccountConfirmated(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.error,
          error: true,
        });
      }
    };
    ConfirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <div>Confirm Account</div>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alert} />}

        <div className='columna'>
                  <NavLink to="/">
                      <img src={imageLogo} alt="logo-home" className='logoRegister' />  
                  </NavLink>
             </div> 

        {accountConfirmated && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/login"
          >
            Log In
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
