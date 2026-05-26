import { EkinBazasy } from './Ekinder';

export const hasaplaSuwarysh = (meýdan, ekinKey, Q_m3s) => {
  const ekin = EkinBazasy[ekinKey];
  const Q_litr = Q_m3s * 1000; // m³/s -> litr/s
  const jemiSuw = meýdan * ekin.norma; // Jemi gerek suw (m³)
  const sekundSany = (jemiSuw * 1000) / (Q_litr * ekin.kpd);
  
  const sagat = (sekundSany / 3600).toFixed(1);
  return {
    sagat: sagat,
    gerekliSuw: jemiSuw.toFixed(0),
    ekinAdy: ekin.ady
  };
};
