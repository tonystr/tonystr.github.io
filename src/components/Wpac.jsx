import React, { useEffect } from 'react';
import '../styles/wpac.scss';

export default function Wpac() {

    useEffect(() => {
        window.wpac_init = window.wpac_init || [];
        window.wpac_init.push({widget: 'Comment', id: 18172});
        if ('WIDGETPACK_LOADED' in window) return;
        window.WIDGETPACK_LOADED = true;
        var mc = document.createElement('script');
        mc.type = 'text/javascript';
        mc.async = true;
        mc.src = 'https://embed.widgetpack.com/widget.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(mc, s.nextSibling);

        setTimeout(() => {
            const lis = document.querySelectorAll('.wp-login-menu li');
            for (const li of lis) {
                if (li.innerText === 'Get WidgetPack') li.parentNode.removeChild(li);
            }
        }, 3100);
    }, []);

    return <div className='wpac-wrapper'><div id='wpac-comment' /></div>;
}
