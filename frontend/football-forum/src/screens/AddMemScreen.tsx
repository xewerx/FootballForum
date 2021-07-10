import React, { useState } from 'react';

import MessageBox from '../components/MessageBox/MessageBox'
import { NewMem } from '../@types/memesTypes';
import { uploadMem } from '../actions/memesActions';
import { useDispatch } from 'react-redux';
function AddMemScreen(): JSX.Element {

    const [imagePreview, setImagePreview] = useState<any>('');
    const [base64, setBase64] = useState<string>('');
    const [size, setSize] = useState<string>();

    const [error, setError] = useState<string>('');

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const dispatch = useDispatch();
    // const [selectedFile, setSelectedFile] = useState<string>('');
    // const [file, setFile] = useState<string>();
    // const [name, setName] = useState<string>();

    const onChangeInput = (e: any) => {
        let file = e.target.files[0];
        if (file) {
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
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const onFileSubmit = (e: any) => {
        e.preventDefault()

        if (Number(size) > 5242880) { // wieksze niz 5MB
            setError("Zbyt duzy plik");
        }
        const payload: NewMem = {
            image: base64,
            title: title,
            description: description
        }
        dispatch(uploadMem(payload));
    }

    return (
        <div>
            <form className="form" onSubmit={(e) => onFileSubmit(e)} >
                <div>
                    <h1>Dodaj mema</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="title">Tytul</label>
                    <input type="text" id="title" placeholder="Podaj tytul" required onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="description">Opis</label>
                    <input type="text" id="description" placeholder="Podaj opis" required onChange={(e) => setDescription(e.target.value)}></input>
                </div>
                <div onChange={(e) => onChangeInput(e)}>
                    <label htmlFor="file">Plik</label>
                    <input type="file" name="avatar" id="file" accept=".jpef, .png, .jpg" onChange={photoUpload} src={imagePreview} />
                </div>
                <div>
                    <button className="primary" type="submit">Dodaj</button>
                </div>

            </form>

            <div>
                {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                <img className="viewMem" src={`data:image/png;base64,${base64}`}></img>
            </div>

        </div>
    )
}

export default AddMemScreen;