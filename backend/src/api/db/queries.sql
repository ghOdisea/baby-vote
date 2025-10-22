-- Totales por opcion

SELECT v.option_id, o.label, COUNT(*) AS count
FROM public.votes v
JOIN public.options o ON o.id = v.option_id
GROUP BY v.option_id, o.label
ORDER BY MIN(o.sort_order);

-- listado de votos por pais
SELECT v.option_id, v.name, v.country_code, c.flag_emoji
FROM public.votes v
JOIN public.countries c ON c.code = v.country_code
ORDER BY v.created_at DESC
LIMIT 500;  -- o pagina por opción
