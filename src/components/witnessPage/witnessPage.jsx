import React, { useState } from 'react' //useContext
import { toast } from "react-toastify";
// import { DataContext } from '../../context/userContext';
// import { Input, SelectPicker } from 'rsuite';
import './witnessPage.css';
import RecordCard from './recordCard/recordCard';
import RecordModal from './recordModal/recordModal';


const WitnessPage = () => {

    // const { user } = useContext(DataContext);
    //handlers to open the different modals
    const [openDetail, setOpenDetail] = useState(false);
    const handleCloseDetail = () => setOpenDetail(false);

    const cards = [
        {
            id: 1,
            witnessName: "Jane Doe Doe",
            witnessSite: "Notaria 5ta",
            dateTime: "14:32:12",
            votes: "32",
            inspector: "val-1",
            img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
        },
        {
            id: 2,
            witnessName: "Jane Doe Doe",
            witnessSite: "Colegio Loperena",
            votes: "20",
            inspector: "val-2",
            dateTime: "14:12:12",
            img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
        },
        {
            id: 3,
            witnessName: "Jane Doe Doe",
            witnessSite: "Mixto San joaquin",
            votes: "30",
            inspector: "val-1",
            dateTime: "15:10:00",
            img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
        },
        {
            id: 4,
            witnessName: "Jane Doe Doe",
            witnessSite: "Notaria 5ta",
            votes: "12",
            inspector: "val-3",
            dateTime: "16:24:00",
            img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
        },
        {
            id: 5,
            witnessName: "Jane Doe Doe",
            witnessSite: "Colegio Loperena",
            votes: "5",
            inspector: "val-1",
            dateTime: "16:45:00",
            img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
        },
        {
            id: 6,
            witnessName: "Jane Doe Doe",
            witnessSite: "Mixto San joaquin",
            votes: "30",
            inspector: "val-3",
            dateTime: "17:00:00",
            img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
        },
        

    ]
    const [mockCards, setMockCards] = useState(cards);

    const [detailRecord, setDetailRecord] = useState(null);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const data = mockCards
    //         data.push(
    //             {
    //                 id: data.length + 1,
    //                 witnessName: "Jane Doe Doe",
    //                 witnessSite: "Notaria 5ta",
    //                 dateTime: "14:32:12",
    //                 votes: Math.floor(Math.random() * 50).toString(),
    //                 img: "https://dummyimage.com/500x500/dedede/000.jpg&text=IMG+E14:500x500",
    //             }
    //         )
    //         setMockCards(data)
    //         console.log('new element', 'number of files:', mockCards.length)
    //     }, 5000)
    //     return () => { // clear up
    //         clearInterval(interval)
    //     }
    // }, [mockCards])


    const handleSuccess = (id) => {
        setMockCards((current) =>
            current.filter(
                (card) =>
                    card.id !== id
            )
        );

        toast.info(`Registro Aprobado correctamente.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    const handleDecline = (id) => {
        setMockCards((current) =>
            current.filter(
                (card) =>
                    card.id !== id
            )
        );
        toast.info(`Registro Rechazado correctamente.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    const handleOpenDetail = (id) => {
        const foundRecord = mockCards.find((record) => record.id === id)
        setDetailRecord(foundRecord)
        setOpenDetail(true)
    }

    return (
        <div>
            <div>

                <div className="container__component">
                    <div className="container__header">
                        <h2>Bandeja de verificación de votos</h2>
                    </div>
                    <div>
                        <div className='record__container'>
                            {mockCards.length > 0 ? mockCards.map((card) => {
                                return <RecordCard key={card.id} id={card.id} img={card.img} witnessName={card.witnessName} witnessSite={card.witnessSite} votes={card.votes} inspector={card.inspector} handleSuccess={handleSuccess} handleDecline={handleDecline} handleOpenDetail={handleOpenDetail} />

                            }) :
                                <>
                                    <h3>No se encontraron nuevos registros por evaluar.</h3>
                                </>}

                        </div>
                    </div>
                </div>
            </div>
            <RecordModal open={openDetail} handleClose={handleCloseDetail} data={detailRecord} handleSuccess={handleSuccess} handleDecline={handleDecline} />

        </div>
    )
}

export default WitnessPage
