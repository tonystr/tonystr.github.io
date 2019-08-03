import React, { useEffect } from 'react';

export default function Focus(props) {

    const handleClick = e => {
        if (!document.querySelector('.focus .content').contains(e.target)) {
            props.dismount();
        }
    }

    const videoRef = React.createRef();

    useEffect(() => {
        if (videoRef.current) videoRef.current.play();
    });

    return (
        <div className='focus' onClick={handleClick}>
            {props.video && <div className='video content'>
                <video controls ref={videoRef} >
                    <source src={props.video} />
                </video>
            </div>}
        </div>
    );
}
