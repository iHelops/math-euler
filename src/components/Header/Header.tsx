import React, {FC} from 'react';
import style from './Header.module.scss'
import { Typography } from "antd";

const { Title } = Typography

const Header: FC = () => {
    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.card}>
                    <Title level={3} className={style.title}>Метод Эйлера</Title>
                </div>
            </div>
        </div>
    );
};

export default Header;