import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageBox from '../components/MessageBox/MessageBox';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import { NewMem } from '../@types/memesTypes';
import { uploadMem } from '../actions/memesActions';
import stateType from '../@types/globaStateType';
import { History } from 'history';
import { SET_INIT_STATE } from '../constants/memesConstants';

interface IProps {
    history: History
}

const AddMemScreen: React.FC<IProps> = (props) => {

    const [imagePreview, setImagePreview] = useState<string>();
    const [base64, setBase64] = useState<string>('');
    const [size, setSize] = useState<string>();
    const [fileName, setFileName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const user = useSelector((state: stateType) => state.userSignin);
    const { userInfo } = user;

    const memes = useSelector((state: stateType) => state.uploadMem);
    let { loading, response } = memes;

    const dispatch = useDispatch();
    // const [selectedFile, setSelectedFile] = useState<string>('');
    // const [file, setFile] = useState<string>();
    // const [name, setName] = useState<string>();

    const onChangeInput = (e: any) => {
        let file = e.target.files[0];
        if (file) {
            setFileName(file.name)
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded
            reader.readAsBinaryString(file)
        }
    }

    const _handleReaderLoaded = (readerEvt: any) => {
        let binaryString = readerEvt.target.result;
        setBase64(btoa(binaryString));
    }

    const photoUpload = (e: any) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                //setFile(file)
                setSize(file.size);
                //setName(file.name)
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file);
        }
    }

    const onFileSubmit = (e: any) => {
        e.preventDefault()
        if (!size) {
            setError("Dodaj plik");
            return
        } else if (Number(size) > 5242880) { // wieksze niz 5MB
            setError("Zbyt duzy plik");
        } else {
            setError("");
            const payload: NewMem = {
                image: base64,
                title: title,
                description: description
            }
            dispatch(uploadMem(payload));
        }
    }

    useEffect(() => {
        if(!userInfo) {
            props.history.push('/');
        }
        dispatch({ type: SET_INIT_STATE }) // SET INIT STATE IN ORDER TO DELETE ORDER MESSAGE BOX 
    }, [dispatch, props.history, userInfo]);

    return (
        <div className="screen-container">
            <form className="form" onSubmit={(e) => onFileSubmit(e)} >
            <div className="caption">
                <h2>Dodaj mema</h2>
            </div>
                <div>
                    <input type="text" id="title" placeholder="Podaj tytul" required onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div>
                    <input type="text" id="description" placeholder="Podaj opis" required onChange={(e) => setDescription(e.target.value)}></input>
                </div>
                <div onChange={(e) => onChangeInput(e)}>
                <label htmlFor="file" className="custom-file-upload">
                        <i className="fa fa-cloud-upload"></i> { fileName ? fileName : 'Wybierz plik'}
                    </label>
                    <input type="file" name="avatar" id="file" accept=".jpef, .png, .jpg" onChange={photoUpload} src={imagePreview} required />
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {response && <MessageBox variant="success">{response}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                <div>
                    <button className="primary" type="submit">Dodaj</button>
                </div>

            </form>

            {/* 
            <div>
                
                <img className="viewMem" src={`data:image/png;base64,${base64}`}></img>
            </div>
            */}

        </div>
    )
}

export default AddMemScreen;