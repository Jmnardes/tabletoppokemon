import aguavBerryIcon from '@assets/images/berries/aguav_berry.png';
import cheriBerryIcon from '@assets/images/berries/cheri_berry.png';
import chestoBerryIcon from '@assets/images/berries/chesto_berry.png';
import pechaBerryIcon from '@assets/images/berries/pecha_berry.png';
import rawstBerryIcon from '@assets/images/berries/rawst_berry.png';
import aspearBerryIcon from '@assets/images/berries/aspear_berry.png';
import leppaBerryIcon from '@assets/images/berries/leppa_berry.png';
import oranBerryIcon from '@assets/images/berries/oran_berry.png';
import lumBerryIcon from '@assets/images/berries/lum_berry.png';
import sitrusBerryIcon from '@assets/images/berries/sitrus_berry.png';
import roseliBerryIcon from '@assets/images/berries/roseli_berry.png';
import persimBerryIcon from '@assets/images/berries/persim_berry.png';
import wacanBerryIcon from '@assets/images/berries/wacan_berry.png';
import yacheBerryIcon from '@assets/images/berries/yache_berry.png';
import liechiBerryIcon from '@assets/images/berries/liechi_berry.png';
import ganlonBerryIcon from '@assets/images/berries/ganlon_berry.png';
import salacBerryIcon from '@assets/images/berries/salac_berry.png';
import petayaBerryIcon from '@assets/images/berries/petaya_berry.png';
import apicotBerryIcon from '@assets/images/berries/apicot_berry.png';
import kebiaBerryIcon from '@assets/images/berries/kebia_berry.png';
import shucaBerryIcon from '@assets/images/berries/shuca_berry.png';
import cobaBerryIcon from '@assets/images/berries/coba_berry.png';
import payapaBerryIcon from '@assets/images/berries/payapa_berry.png';
import tangaBerryIcon from '@assets/images/berries/tanga_berry.png';
import chartiBerryIcon from '@assets/images/berries/charti_berry.png';
import kasibBerryIcon from '@assets/images/berries/kasib_berry.png';
import habanBerryIcon from '@assets/images/berries/haban_berry.png';
import colburBerryIcon from '@assets/images/berries/colbur_berry.png';
import babiriBerryIcon from '@assets/images/berries/babiri_berry.png';
import chilanBerryIcon from '@assets/images/berries/chilan_berry.png';
import micleBerryIcon from '@assets/images/berries/micle_berry.png';
import starfBerryIcon from '@assets/images/berries/starf_berry.png';
import enigmaBerryIcon from '@assets/images/berries/enigma_berry.png';
import jabocaBerryIcon from '@assets/images/berries/jaboca_berry.png';
import rowapBerryIcon from '@assets/images/berries/rowap_berry.png';
import marangaBerryIcon from '@assets/images/berries/maranga_berry.png';
import keeBerryIcon from '@assets/images/berries/kee_berry.png';
import lansatBerryIcon from '@assets/images/berries/lansat_berry.png';
import custapBerryIcon from '@assets/images/berries/custap_berry.png';
import watmelBerryIcon from '@assets/images/berries/watmel_berry.png';
import durinBerryIcon from '@assets/images/berries/durin_berry.png';
import belueBerryIcon from '@assets/images/berries/belue_berry.png';

const berryIcons = {
    aguav_berry: aguavBerryIcon,
    cheri_berry: cheriBerryIcon,
    chesto_berry: chestoBerryIcon,
    pecha_berry: pechaBerryIcon,
    rawst_berry: rawstBerryIcon,
    aspear_berry: aspearBerryIcon,
    leppa_berry: leppaBerryIcon,
    oran_berry: oranBerryIcon,
    lum_berry: lumBerryIcon,
    sitrus_berry: sitrusBerryIcon,
    roseli_berry: roseliBerryIcon,
    persim_berry: persimBerryIcon,
    wacan_berry: wacanBerryIcon,
    yache_berry: yacheBerryIcon,
    liechi_berry: liechiBerryIcon,
    ganlon_berry: ganlonBerryIcon,
    salac_berry: salacBerryIcon,
    petaya_berry: petayaBerryIcon,
    apicot_berry: apicotBerryIcon,
    kebia_berry: kebiaBerryIcon,
    shuca_berry: shucaBerryIcon,
    coba_berry: cobaBerryIcon,
    payapa_berry: payapaBerryIcon,
    tanga_berry: tangaBerryIcon,
    charti_berry: chartiBerryIcon,
    kasib_berry: kasibBerryIcon,
    haban_berry: habanBerryIcon,
    colbur_berry: colburBerryIcon,
    babiri_berry: babiriBerryIcon,
    chilan_berry: chilanBerryIcon,
    micle_berry: micleBerryIcon,
    starf_berry: starfBerryIcon,
    enigma_berry: enigmaBerryIcon,
    jaboca_berry: jabocaBerryIcon,
    rowap_berry: rowapBerryIcon,
    maranga_berry: marangaBerryIcon,
    kee_berry: keeBerryIcon,
    lansat_berry: lansatBerryIcon,
    custap_berry: custapBerryIcon,
    watmel_berry: watmelBerryIcon,
    durin_berry: durinBerryIcon,
    belue_berry: belueBerryIcon
};

export function getBerryIcon(berryType) {
    return berryIcons[berryType] || null;
}