import React from 'react';
import FooterBackground from '@/assets/footerBackground.png';
import { FinderLogo } from '@/components/FinderLogo';

import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { ButtonFinder } from '@/components/ButtonFinder';
import {
  FacebookIcon,
  FigmaIcon,
  GithubIcon,
  GitlabIcon,
  InstagramIcon,
  TelegramIcon,
} from '@/components/Icons';

const cx = classNames.bind(styles);

const Footer = () => {
  const footerClassName = cx('footer');

  return (
    <div className={footerClassName}>
      <FinderLogo />
      <div className='mt-2 mb-4'>
        High level experience in web design and development knowledge, producing
        quality work.
      </div>
      <ButtonFinder className={cx('footer__contact-us')}>
        Contact us
      </ButtonFinder>
      <div className={cx('footer__icons-container')}>
        <div className={cx('footer__icons-container__icon')}>
          <FacebookIcon />
        </div>
        <div className={cx('footer__icons-container__icon')}>
          <GitlabIcon />
        </div>
        <div className={cx('footer__icons-container__icon')}>
          <GithubIcon />
        </div>
        <div className={cx('footer__icons-container__icon')}>
          <TelegramIcon />
        </div>
        <div className={cx('footer__icons-container__icon')}>
          <InstagramIcon />
        </div>
        <div className={cx('footer__icons-container__icon')}>
          <FigmaIcon />
        </div>
      </div>
      <img src={FooterBackground} />
    </div>
  );
};

export default Footer;
