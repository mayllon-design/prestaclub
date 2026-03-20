"use client";

import { useMemo } from 'react';
import { useTrafficTracking } from '@/shared/hooks/useTrafficTracking';

export const useDesarrolloWhatsApp = () => {
    const { campaign } = useTrafficTracking();
    const phone = "51924274894";
    const baseMessage = "Hola *PrestaClub*. Deseo evaluar mi Proyecto para financiamiento.";

    const whatsappUrl = useMemo(() => {
        let message = baseMessage;
        if (campaign) {
            message = `["${campaign}"] ${baseMessage}`;
        }

        return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    }, [campaign]);

    return whatsappUrl;
};
