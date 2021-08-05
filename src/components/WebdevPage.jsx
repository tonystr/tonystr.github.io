import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import websites from '../data/websites';
import requestRawText from '../functions/requestRawText.jsx';
import { useWindowSize } from '@burst/react-use-window-size';
import A from '../components/A.jsx';

export default function WebDevPage() {
    const [codePreview, setCodePreview] = useState('loading...');
    const { viewportWidth } = useWindowSize();

    const mobile = viewportWidth <= 1162;

    useEffect(() => {
        if (!mobile && codePreview === 'loading...') {
            requestRawText('https://raw.githubusercontent.com/tonystr/tonystr.github.io/master/src/pages/home.jsx', res => {
                setCodePreview(`${res}\n${res}`);
                import('./../prism.js').then(Prism => Prism.highlightAll());
            });
        } else if (!mobile) {
            import('./../prism.js').then(Prism => Prism.highlightAll());
        }
    }, [mobile, codePreview]);

    const renderWebsites = () => {
        const list = [];

        for (let i = 0; i < websites.length; i++) {
            const site = websites[i];
            list.push(
                <div className='website' key={i}>
                    <a target='_blank' href={site.url} rel="noopener noreferrer">
                        <div className='name'>{site.name}</div>
                        <img alt={'image: ' + site.name} src={site.image} />
                        <div className='role'>{site.role}</div>
                    </a>
                </div>
            );
        }

        return list;
    }

    return (
        <section className={'page' + (mobile ? ' mobile' : '')} id='webdev'>
            {!mobile && (<div className='left'>
                <div className='codeWrapper'>
                    {codePreview && <pre><code className='prism language-jsx'>{codePreview}</code></pre>}
                </div>
            </div>)}
            <div className='right'>
                <div className='wrapper'>
                    <SectionTitle className='title' content='Web development' />
                    <div className='showcase'>
                        <div className='gridview'>{renderWebsites()}</div>
                    </div>
                    <div className='description'>
                        <div className='window'>
                            <img src='images/window.png' alt='window' />
                            <span className='name'>TonyStr</span>
                        </div>
                        <div className='inner'>
                            I specialize in <A to='https://reactjs.org/'>React.js</A> and <A to='https://sass-lang.com/'>SCSS</A> for
                            front-end web development, though I also have experience
                            with <A to='https://vuejs.org'>Vue.js</A> and <A to='https://www.styled-components.com/'>styled-components</A>, because
                            I love trying out new technologies. Some of the websites displayed above are also written in plain html/css/js
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
