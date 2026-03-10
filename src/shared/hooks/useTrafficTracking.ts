"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export const useTrafficTracking = () => {
    const searchParams = useSearchParams();

    const [tracking, setTracking] = useState({
        isPaid: false,
        source: '',
        campaign: '',
    });

    useEffect(() => {
        // En Next.js, useSearchParams ya nos da los parámetros de la URL de forma reactiva.
        const utmSource = searchParams.get('utm_source');
        const utmCampaign = searchParams.get('utm_campaign');
        const utmMedium = searchParams.get('utm_medium');
        const gclid = searchParams.get('gclid');
        const fbclid = searchParams.get('fbclid');

        // Persistimos en localStorage si vienen en la URL
        if (utmSource) localStorage.setItem('pc_last_source', utmSource);
        if (utmCampaign) localStorage.setItem('pc_last_campaign', utmCampaign);

        // Recuperamos de localStorage para mantener la atribución
        const storedSource = localStorage.getItem('pc_last_source');
        const storedCampaign = localStorage.getItem('pc_last_campaign');

        // Determinamos si es tráfico pagado (URL actual o persistencia previa)
        const isPaidTraffic = !!(utmSource || utmCampaign || utmMedium || gclid || fbclid || storedSource || storedCampaign);

        setTracking({
            isPaid: isPaidTraffic,
            source: utmSource || storedSource || '',
            campaign: utmCampaign || storedCampaign || '',
        });
    }, [searchParams]);

    const getWhatsAppUrl = useCallback((customMessage?: string) => {
        if (tracking.isPaid) {
            const s = tracking.source?.trim() || '';
            const c = tracking.campaign?.trim() || '';

            // Construimos el prefijo: [facebook cyberwow] - 
            const sourcePart = [s, c].filter(Boolean).join(' ');
            const prefix = sourcePart ? `[${sourcePart}] - ` : '';

            // Mensaje final: Prefijo + (Mensaje Custom o Mensaje Base de Anuncio)
            const baseText = customMessage || 'Hola *PrestaClub*. Ingrese a su pagina. Necesito más información sobre financiamientos.';
            const finalMsg = `${prefix}${baseText}`;

            return `https://wa.me/51921010200?text=${encodeURIComponent(finalMsg)}`;
        } else {
            // Tráfico orgánico: Número predeterminado y mensaje base
            const msg = customMessage || 'Hola *PrestaClub*. Ingrese a su web. Necesito más información sobre financiamientos.';
            return `https://wa.me/51921010200?text=${encodeURIComponent(msg)}`;
        }
    }, [tracking.isPaid, tracking.source, tracking.campaign]);

    const whatsappUrl = useMemo(() => getWhatsAppUrl(), [getWhatsAppUrl]);
    const whatsappNumber = useMemo(() => tracking.isPaid ? '51921010200' : '51921010200', [tracking.isPaid]);

    const clearTracking = useCallback(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('pc_last_source');
            localStorage.removeItem('pc_last_campaign');
        }
        // Usamos un pequeño delay para que el navegador capture el href actual (con tracking)
        // antes de que el estado cambie y el componente se renderice con el link orgánico.
        setTimeout(() => {
            setTracking({ isPaid: false, source: '', campaign: '' });
        }, 500);
    }, []);

    return {
        whatsappUrl,
        getWhatsAppUrl,
        whatsappNumber,
        isPaid: tracking.isPaid,
        source: tracking.source,
        campaign: tracking.campaign,
        clearTracking
    };
};
