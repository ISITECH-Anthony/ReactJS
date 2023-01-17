import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart, faHeartbeat, faHeartCircleBolt, faPlus } from "@fortawesome/free-solid-svg-icons";

const Item = (props) => {
    const [style, setStyle] = useState({});
    const [information, setInformation] = useState({
        id: 0,
        title: '',
        overview: '',
        my_list: false
    });

    useEffect(() => {
        if (props.data) {
            if (props.data.backdrop_path) {
                setStyle({
                    backgroundImage: 'url(https://image.tmdb.org/t/p/original' + props.data.backdrop_path + ')'
                });
            }

            setInformation({
                id: props.data.id ? props.data.id : 0,
                title: props.data.title ? props.data.title : '',
                overview: props.data.overview ? props.data.overview : '',
                my_list: props.data.my_list ? props.data.my_list : false
            });
        }
    }, [props.data]);

    return (
        <div className={props.data ? "slider__content__item" : "slider__content__item slider__content__item__fake"} style={style}>
            <div className='slider__content__item__content'>
                <div className="slider__content__item__content__information">
                    <h3 className="information__title">{information.title}</h3>
                    <p className="information__overview">{information.overview.length > 40 ? information.overview.substring(0, 40) + '...' : information.overview}</p>
                </div>
                <div className='slider__content__item__content__buttons'>
                    <button className='button button__circle' onClick={() => props.myListHandler(information.id, information.my_list)}>
                        {
                            information.my_list ?
                                <FontAwesomeIcon icon={faCheck} />
                                : <FontAwesomeIcon icon={faPlus} />
                        }
                    </button>
                    <button className='button' onClick={() => props.showHandler(information.id)}>
                        Voir plus
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item;