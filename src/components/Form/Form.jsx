import React, {useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hook/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    useEffect(() =>  {
        tg.MainButton.setParams({
            text: 'Надіслати дані'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        }else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введіть свої дані</h3>
            <input className={'input'} type="text" placeholder={'Країна'} value={country} onChange={onChangeCountry}/>
            <input className={'input'} type="text" placeholder={'Вулиця'} value={street} onChange={onChangeStreet}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Фіз. особа</option>
                <option value={'legal'}>Юр. особа</option>
            </select>
        </div>
    );
};

export default Form;