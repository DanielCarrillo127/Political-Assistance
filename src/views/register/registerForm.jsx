import { useState, useEffect } from 'react'
import { optionsEconomicSector } from '../../utils/constant';
import { toast } from "react-toastify";
import { registerApi } from '../../api/requestUsers';
import { Input, InputGroup, Whisper, Tooltip, SelectPicker, Toggle, Button } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import { HiOutlineIdentification, HiOutlineUserCircle, HiOutlineMinusCircle, HiHashtag, HiOutlineCake, HiOutlineLocationMarker, HiOutlineInboxIn, HiOutlineLibrary } from "react-icons/hi";
import './register.css'


const RegisterForm = () => {

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const leaderid = urlParams.get('leaderid')
        if(leaderid) {
            setIsCustomLink(true)
            setLeaderid(leaderid)
        }
    }, [])


    const [isloading, setIsloading] = useState(false);
    const [name, setName] = useState("");
    const [surnames, setSurnames] = useState("");
    const [cedula, setCedula] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [votingBooth, setVotingBooth] = useState("");
    const [table, setTable] = useState("");
    const [leaderid, setLeaderid] = useState("");
    const [isCustomLink, setIsCustomLink] = useState(false);
    const [productiveSection, setProductiveSection] = useState("");

    const [checkPlace, setCheckPlace] = useState(false);
    const [checkTable, setCheckTable] = useState(false);

    //set handlers for inputs
    const handleChangeCedula = (e) => { setCedula(e) };
    const handleChangeName = (e) => { setName(e) };
    const handleChangeSurname = (e) => { setSurnames(e) };
    const handleChangePhoneNumber = (e) => { setPhoneNumber(e) };
    const handleChangeSex = (e) => { setSex(e) };
    const handleChangeAddress = (e) => { setAddress(e) };
    const handleChangeAge = (e) => { setAge(e) };
    const handleChangeVotingBooth = (e) => { setVotingBooth(e) };
    const handleChangeTable = (e) => { setTable(e) };
    const handleChangeLeaderid = (e) => { setLeaderid(e) };
    const handleChangeSection = (e) => { setProductiveSection(e) };

    const optionSex = [
        { key: 1, label: 'Hombre', value: '1' },
        { key: 2, label: 'Mujer', value: '2' },
        { key: 3, label: 'Prefiero no indicarlo', value: '3' },
    ]

    const size = 20;

    const styles = {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
    };

    const handleSubmit = async () => {
        setIsloading(true)
        if (name === "" || surnames === "" || cedula === "" || phoneNumber === "" || address === "" || sex === "" || age === "" || leaderid === "") {
            toast.warn(`Debes ingresar todos los campos marcados (*) para realizar el registro`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setIsloading(false)
        } else {
            if (4 < cedula.length && cedula.length <= 10) {
                const newUser = {
                    name: name,
                    surnames: surnames,
                    cedula: cedula,
                    phoneNumber: phoneNumber,
                    sex: sex,
                    address: address,
                    age: age,
                    votingBooth: votingBooth ? votingBooth : null,
                    table: table ? table : null,
                    leaderid: leaderid,
                    productiveSection: productiveSection ? productiveSection : "No identifica",
                }
                const req = await registerApi(newUser);
                if (req.status === 201) {
                    toast.success(`Usuario Registrado Correctamente`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsloading(false)
                } else {
                    if (req.response.status === 208) {
                        toast.warn(`El usuario ya se encuentra registrado`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (req.response.status === 404) {
                        toast.warn(`${req.response.data.message}`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    setIsloading(false)
                }
                //clear inputs
                setName("")
                setSurnames("")
                setCedula("")
                setPhoneNumber("")
                setSex("")
                setAge("")
                setAddress("")
                setVotingBooth("")
                setTable("")
                setLeaderid("")
                setProductiveSection("")
            } else {
                toast.warn(`Ingrese una Cedula Valida`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setIsloading(false)
            }

        };
    }

    return (
        <>
            <div className='container'>
                <div className='container__component'>
                    <div>
                        <h4 className='form__title'>
                            Registro de Votantes
                        </h4>
                    </div>
                    <div style={styles} >
                        <div style={styles}>
                            <InputGroup inside >
                                <InputGroup.Addon>
                                    <HiOutlineUserCircle size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input placeholder='Nombre*' value={name} onChange={handleChangeName} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineMinusCircle size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input placeholder='Apellidos*' value={surnames} onChange={handleChangeSurname} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineIdentification size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Cedula* [CC]' value={cedula} onChange={handleChangeCedula} />
                                <InputGroup.Addon>
                                    <Whisper placement="right" speaker={<Tooltip> Id sin espacios o separadores especiales ,-.</Tooltip>}>
                                        <InfoIcon />
                                    </Whisper>
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiHashtag size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Tel*' value={phoneNumber} onChange={handleChangePhoneNumber} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <SelectPicker placeholder="Sexo*" data={optionSex} searchable={false} block value={sex} onChange={handleChangeSex} />
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineCake size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Edad*' value={age} onChange={handleChangeAge} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineLocationMarker size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='text' placeholder='Dirección*' value={address} onChange={handleChangeAddress} />
                            </InputGroup>
                        </div>
                        <div style={{ padding: '1em' }}>
                            <div style={{ textAlign: 'left', color: 'rgba(34,36,38,.58)' }}>
                                Ingrese solo si conoce la localidad y la mesa exacta de votación.
                            </div>
                            <div className='grid__container'>
                                <Toggle style={{ marginTop: 5 }} defaultChecked={checkPlace} onChange={(e) => setCheckPlace(e)} />
                                <InputGroup inside style={{ marginBottom: 10 }}>
                                    <InputGroup.Addon>
                                        <HiOutlineLibrary size={size} className="register__icon" />
                                    </InputGroup.Addon>
                                    <Input disabled={!checkPlace} type='text' placeholder='Puesto de Votación' value={votingBooth} onChange={handleChangeVotingBooth} />
                                </InputGroup>
                                <Toggle style={{ marginTop: 5 }} defaultChecked={checkTable} onChange={(e) => setCheckTable(e)} />
                                <InputGroup inside>
                                    <InputGroup.Addon>
                                        <HiOutlineInboxIn size={size} className="register__icon" />
                                    </InputGroup.Addon>
                                    <Input disabled={!checkTable} type='text' placeholder='Mesa de Votación' value={table} onChange={handleChangeTable} />
                                </InputGroup>
                            </div>
                        </div>
                        <div style={styles}>
                            <SelectPicker placeholder={"Sector Economico"} placement="auto" data={optionsEconomicSector} block value={productiveSection} onChange={handleChangeSection} />
                        </div>

                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineIdentification size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Cedula del lider* [CC]' disabled={isCustomLink}  value={leaderid} onChange={handleChangeLeaderid} />
                            </InputGroup>
                        </div>


                        <Button appearance='primary' block loading={isloading} onClick={() => handleSubmit()} >
                            Registrar Votante
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}



export default RegisterForm

