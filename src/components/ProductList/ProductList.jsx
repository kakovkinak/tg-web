import React, {useCallback, useEffect, useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hook/useTelegram";

const products = [
    {id: '1', img: 'img/Коверс_б.jpeg', title: 'Кеди', price: 1549, description: 'Білого кольору'},
    {id: '2', img: 'img/Туфлі_бе.jpeg', title: 'Туфлі', price: 4800, description: 'Бежевого кольору'},
    {id: '3', img: 'img/Кросівки_ч.jpeg',title: 'Кросівки', price: 2100, description: 'Чорного кольору'},
    {id: '4', img: 'img/Сланці_Ч.jpeg',title: 'Сланці', price: 990, description: 'Чорного кольору'},
    {id: '5', img: 'img/Черевики_беж.jpeg',title: 'Черевики', price: 5000, description: 'Бежевого кольору'},
    {id: '6', img: 'img/Мокасини_кор.jpeg',title: 'Мокасини', price: 1915, description: 'Коричневого кольору'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();
    const onSendData = useCallback(() => {
        const data = {
          products: addedItems,
            totalPrice: getTotalPrice(addedItems),
        }
        fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
           tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купити ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;