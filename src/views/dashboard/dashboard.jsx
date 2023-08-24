import { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { Dropdown } from 'rsuite';
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/userContext";
import { HiOutlineMenu, HiOutlineHome, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineChatAlt2, HiOutlineCalendar, HiOutlineAtSymbol, HiOutlineInboxIn, HiOutlineLightningBolt } from "react-icons/hi";
// import RegisterForm from '../register/registerForm'
import HomePage from '../../components/homePage/homePage'
import FormTablePage from '../../components/votersPage/formTablePage';
import EventTablePage from '../../components/eventsPage/eventTablePage';
import StatisticsPage from '../../components/statisticsPage/statisticsPage';
import WitnessPage from '../../components/witnessPage/witnessPage';

import ProfileModal from '../../components/profileModal/profileModal';

const Dashboard = () => {

  const navigate = useNavigate();
  //set to global state 
  const { user, handelSession, saveHdl, Handleonclick, levelRestrictions, logOutUser } = useContext(DataContext);
  const Restrictions = levelRestrictions
  const [isChecked, setIsChecked] = useState(true)

  useEffect(() => {
    handelSession();
    let winSize = window.innerWidth;
    if (winSize < 765) {
      setIsChecked(!isChecked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openProfile, setOpenProfile] = useState(false);
  const handleCloseProfile = () => setOpenProfile(false);



  const SelectionView = () => {
    switch (Handleonclick) {
      case "home":
        return <HomePage />;
      case "formTable":
        return <FormTablePage />;
      case "eventTable":
        return <EventTablePage />;
      case "statisticsPage":
        return <StatisticsPage />;
      case "witnessPage":
        return <WitnessPage />;
      default:
        return <HomePage />;
    }
  };

  const renderUserContainer = (props, ref) => {
    return (
      <div className="user__wrapper" {...props} ref={ref}>
        <div className='iconConteainer'>
          {user?.name
            ? `${user?.name
              .substring(0, 1)
              .toUpperCase()}${user?.surnames
                .substring(0, 1)
                .toUpperCase()}`
            : "JD"}

        </div>
        <div className='userName'>
          <h4>{user?.name + " " + user?.surnames}</h4>
          <small>Role [{user?.role}]</small>
        </div>
      </div>
    );
  };


  return (
    <>
      <input type="checkbox" id="nav__toggle" checked={isChecked} readOnly />
      <div className="sidebar">
        <div className="sidebar__brand">
          <h1> <HiOutlineAtSymbol size={40} />  <span>As~Politico</span>
          </h1>
        </div>

        <div className="sidebar__menu">
          <ul>
            <li>
              <div className={`${Handleonclick === 'home' ? "active" : ""} itemMenu`} onClick={() => saveHdl('home')} >
                <HiOutlineHome size={25} className="icon" />
                <span>Incio</span>
              </div>
            </li>
            <li>
              <div className={`${Handleonclick === 'formTable' ? "active" : ""} itemMenu`} onClick={() => saveHdl('formTable')}>
                <HiOutlineDocumentText size={25} className='icon' />
                <span>Planillas</span>
              </div>
            </li>
            <li>
              <div className={` ${Handleonclick === 'statisticsPage' ? "active" : ""} ${Restrictions > 1 ? "disabled" : ""} disabled itemMenu`} onClick={() => saveHdl('statisticsPage')}>
                <HiOutlineChartBar size={25} className='icon' />
                <span>Estadisticas</span>
              </div>
            </li>
            <li>
              <div className={`${Handleonclick === 'eventTable' ? "active" : ""} ${Restrictions > 2 ? "disabled" : ""} itemMenu`} onClick={() => saveHdl('eventTable')}>
                <HiOutlineCalendar size={25} className='icon' />
                <span>Eventos</span>
              </div>
            </li>
            <li>
              <div className={`${Restrictions > 2 ? "disabled" : ""} disabled itemMenu`}>
                <HiOutlineChatAlt2 size={25} className='icon' />
                <span>Comunicaciones</span>
              </div>
            </li>
            <li>
              <div className={`${Handleonclick === 'witnessPage' ? "active" : ""}  ${Restrictions > 2 ? "disabled" : ""} disabled itemMenu`} onClick={() => saveHdl('witnessPage')}>
                <HiOutlineInboxIn size={25} className='icon' />
                <span>Testigos Electorales</span>
              </div>
            </li>
            <li>
              <div className={`disabled itemMenu`}>
                <HiOutlineLightningBolt size={25} className='icon' />
                <span>Extra</span>
              </div>
            </li>
          </ul>

        </div>
      </div>

      <div className="main__content">
        <header>
          <h2 onClick={() => setIsChecked(!isChecked)}>
            <label htmlFor="nav__toggle" >
              <HiOutlineMenu size={30} className="iconHeader" />
            </label>
            Panel principal 
          </h2>

          <Dropdown renderToggle={renderUserContainer} placement={'bottomEnd'}>
            <Dropdown.Item onClick={() => setOpenProfile(true)}>Perfil</Dropdown.Item>
            <Dropdown.Item disabled>Extra</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              logOutUser()
              navigate("/");
            }}>Cerrar sesión</Dropdown.Item>
          </Dropdown>

        </header >

        <main>
          <SelectionView />
        </main>
        <ProfileModal open={openProfile} handleClose={handleCloseProfile} />

      </div>
    </>
  )
}

export default Dashboard