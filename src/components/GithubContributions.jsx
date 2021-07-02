import React, { useState, useEffect } from 'react';

export default function GithubContributions() {
    const [contributions, setContributions] = useState(null);

    useEffect(() => {
        // If the website ever suddenly starts showing ads for tech support and viagra, this is why:
        fetch('https://urlreq.appspot.com/req?method=GET&url=https://github.com/users/tonystr/contributions').then(
            res => !res.bodyUsed && res.text().then(res => {
                let fillIndex = -1;
                let dataIndex = -1;
                let data = '';
                const colors = [
                    '30323F',
                    '63582F',
                    '967E20',
                    'C8A411',
                    'FFCC01'
                ];
                for (let i = 0; i < res.length; i++) {
                    if (res.substring(i, i + 6) === 'fill="') {
                        fillIndex = i;
                        i += 5;
                    }

                    if (res.substring(i, i + 12) === 'data-count="') {
                        dataIndex = i;
                        i += 12;
                    }

                    if (dataIndex >= 0) {
                        if (res[i] === '"') {
                            dataIndex = -1;
                            res = `${
                                res.slice(0, fillIndex + 7)
                            }${
                                colors[Math.clamp(
                                    Math.floor(+data / 3 + (+data > 0)),
                                    0,
                                    colors.length - 1
                                )]
                            }${
                                res.slice(fillIndex + 13)
                            }`;
                            data = '';
                        } else data += res[i];
                    }
                }
                setContributions(res);
            })
        );
    }, []);

    // <div className='github-contributions' dangerouslySetInnerHTML={{ __html: contributions }} />

    return (
        <div className='git-section'>

        </div>
    );
}
