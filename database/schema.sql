-- ==========================================================
-- GONZALEZ-PRATO LABORATORIO: ESQUEMA RELACIONAL SUPABASE/POSTGRESQL
-- ==========================================================

-- 1. Catálogo Dinámico de Exámenes & Requisitos Preanalíticos
CREATE TABLE IF NOT EXISTS examenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria VARCHAR(50) NOT NULL, -- Hematología, Hormonas, Química, Microbiología, Marcadores
    nombre_examen VARCHAR(255) NOT NULL,
    sinonimos TEXT[] DEFAULT '{}', -- Sinónimos y términos populares para el NLP
    costo_usd NUMERIC(10,2) NOT NULL,
    costo_bs NUMERIC(15,2),
    tiempo_entrega VARCHAR(50) DEFAULT '24 horas',
    requisitos_preanaliticos TEXT NOT NULL, -- Ej: Ayuno 8-12h, primera orina
    tipo_muestra VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    notas TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Directorio de Leads & Pacientes WhatsApp
CREATE TABLE IF NOT EXISTS pacientes_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_id VARCHAR(50) UNIQUE NOT NULL,
    nombre_completo VARCHAR(255),
    documento_identidad VARCHAR(50),
    ultimo_mensaje TEXT,
    estado_atencion VARCHAR(50) DEFAULT 'BOT_ACTIVO', -- 'BOT_ACTIVO', 'ESCALADO_HUMANO', 'FINALIZADO'
    examenes_consultados UUID[] DEFAULT '{}',
    total_cotizado_usd NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Auditoría de Mensajes (Live Inbox)
CREATE TABLE IF NOT EXISTS mensajes_chat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES pacientes_leads(id) ON DELETE CASCADE,
    emisor VARCHAR(20) NOT NULL, -- 'PACIENTE', 'BOT', 'SECRETARIA'
    contenido TEXT NOT NULL,
    examenes_cotizados TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Función y Trigger de Handover para Notificaciones en Tiempo Real (pg_notify)
CREATE OR REPLACE FUNCTION notify_human_handover()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado_atencion = 'ESCALADO_HUMANO' AND (OLD.estado_atencion IS NULL OR OLD.estado_atencion != 'ESCALADO_HUMANO') THEN
        PERFORM pg_notify('handover_alarm', json_build_object(
            'lead_id', NEW.id,
            'nombre', NEW.nombre_completo,
            'whatsapp', NEW.whatsapp_id,
            'timestamp', NOW()
        )::text);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_human_handover ON pacientes_leads;
CREATE TRIGGER trg_human_handover
AFTER UPDATE ON pacientes_leads
FOR EACH ROW
EXECUTE FUNCTION notify_human_handover();