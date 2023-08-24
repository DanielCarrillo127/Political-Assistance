import React, { useEffect, useState, useContext } from 'react'
import Cards from '../cardsHighlights/cards'
import { HiOutlineDocumentAdd, HiOutlineUserGroup, HiOutlineClipboardCheck } from "react-icons/hi"; //HiOutlineClipboardCheck
import "./homePage.css"
import { getCountData } from '../../api/requestUsers';
import { DataContext } from '../../context/userContext';

import ProfileCard from './profileCard'

const HomePage = () => {

  const { user } = useContext(DataContext);
  const [data, setData] = useState([])

  async function fetchData() {
    const resAllData = await getCountData(user?.cedula);
    if (resAllData?.status === 200) {
      setData(resAllData?.data?.result)
    } else {
      setData([])
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className="cards">
        <Cards title="Coordinadores Activos" number={data?.activeCoordinators ? data?.activeCoordinators : 0} icon={<HiOutlineDocumentAdd size={50} />} />
        <Cards title="Lideres Activos" number={data?.activeLeaders ? data?.activeLeaders : 0} icon={<HiOutlineUserGroup size={50} />} />
        {/* <Cards title="Personas Habilitadas Para Votar" number={'329.093'} icon={<HiOutlineClipboardCheck size={50} />} /> */}
        <Cards title={`Votantes Registrados`} number={data?.voters ? data?.voters : 0} icon={<HiOutlineClipboardCheck size={50} />} />
        {user.role === 'LEADER' ?
          <>
            <div className="card__single">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexDirection: 'column' }}>
                <span>Acceso al formulario de inscripción.</span>
                <button className='button_register' onClick={() => { window.open(`${window.location.origin}/registerForm?leaderid=${user?.cedula}`, '_blank') }}>Registro de Votantes</button>
              </div>
            </div>
          </>
          :
          <Cards title="Porcentaje de éxito vs la meta proyectada (3000)" number={data?.voters ? Math.round((data?.voters / 3000) * 100) + "%" : '0%'} icon={<HiOutlineClipboardCheck size={50} />} />}
      </div>

      <div className="home__grid">
        <div>
          <div style={{ minHeight: 500 }} className="container__component">
            <div className="container__header">
              <h2>Información del candidato</h2>
              <button disabled>Mas</button>
            </div>
            <ProfileCard />
          </div>

        </div>

        <div>
          <div className="container__component">
            <div className="container__header">
              <h2>Esquema de éxito</h2>
              <button disabled>Conoce Mas</button>
            </div>
            <div style={{ height: 400 }} className='container_event_body'>
              <h2 className='center' style={{ marginTop: 150 }}>Próximamente...</h2>
              {/* <div className="eventCard">
                <div className="info">
                  <div className='eventCircle'>
                    EV
                  </div>
                  <div>
                    <h4>Evento 1</h4>
                    <small>direccion</small>
                  </div>
                </div>
                <div>

                </div>
              </div> */}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default HomePage
