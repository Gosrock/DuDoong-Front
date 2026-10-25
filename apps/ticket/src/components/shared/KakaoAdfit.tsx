import { useResponsive } from '@dudoong/utils';
import { useEffect, useRef } from 'react';

export const KakaoAdFit = () => {
  const scriptElementWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://t1.daumcdn.net/kas/static/ba.min.js');
    scriptElementWrapper.current?.appendChild(script);

    return () => {
      const globalAdfit = window.adfit;
      if (globalAdfit) globalAdfit.destroy(MOBILE_AD_UNIT);
    };
  }, []);

  return (
    <div ref={scriptElementWrapper}>
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={MOBILE_AD_UNIT}
        data-ad-width={320}
        data-ad-height={50}
      ></ins>
    </div>
  );
};

export default KakaoAdFit;

const MOBILE_AD_UNIT = 'DAN-VLC9FkVziYKDw7p7';
const PC_AD_UNIT = 'DAN-yCtsOw04YWNgeowm';
