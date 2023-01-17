import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faFaceFrown } from '@fortawesome/free-solid-svg-icons'

import Item from './item.js'
import './style.scss'

const Slider = (props) => {
    const dispatch = useDispatch();
    const MovieStore = useSelector((state) => state.movie);

    useEffect(() => {
        if (!MovieStore[props.storeData] && !MovieStore[props.storeData + "Loading"] && MovieStore[props.storeData + "ErrorTry"] < 3) {
            dispatch(props.service());
        }
    }, [dispatch, MovieStore[props.storeData], MovieStore[props.storeData + "Loading"], MovieStore[props.storeData + "Error"]])

    return (
        <div className='slider'>
            <div className='slider__title'>
                <h2>{props.title}</h2>
                <button onClick={props.showAllHandler}>
                    Tout explorer
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className={"slider__content " + (!MovieStore[props.storeData + "Loading"] && MovieStore[props.storeData + "Error"] && MovieStore[props.storeData + "ErrorTry"] >= 3 ? "error" : "")}>
                {
                    MovieStore[props.storeData + "Loading"]
                    ? (
                        <>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </>
                    )
                    : (
                        MovieStore[props.storeData + "Error"] && MovieStore[props.storeData + "ErrorTry"] >= 3
                        ? <>
                            <FontAwesomeIcon icon={faFaceFrown} />
                            <p>Une erreur est survenue lors du chargement !</p>
                        </>
                        : MovieStore[props.storeData] && MovieStore[props.storeData].map((item, index) => (
                            <Item 
                                key={"slider__content__item_" + index}
                                data={item}
                                showHandler={props.showOneHandler}
                                myListHandler={props.myListHandler}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Slider
