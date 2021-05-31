import React, { Suspense } from 'react';
import Image from 'next/image';
import downloadStyle from '../../styles/Download.module.css';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';


const Download = () => {
    let { t } = useTranslation();

    return (
        <Suspense fallback="Loading...">
            <div className={downloadStyle.download}>
                <div className="row m-0">
                    <div className="col-md-6">
                        <div className={downloadStyle.image}>
                            <Image
                                src="/../public/assets/images/iPhone12.png"
                                alt="Picture of the author"
                                width={800}
                                height={800} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={downloadStyle.text}>
                            <h2 className="text-white"> {t("common:downloadMonomi")} </h2>
                            <p>{t("common:becomeMember")}</p>
                            <Button className={downloadStyle.button1}>
                                <Image
                                    src="/../public/assets/images/Group9.png"
                                    alt="PlayStore"
                                    width={180}
                                    height={50} />
                            </Button>
                            <Button className={downloadStyle.button2}>
                                <Image
                                    src="/../public/assets/images/Group9.png"
                                    alt="PlayStore"
                                    width={180}
                                    height={50} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Download;