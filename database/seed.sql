-- CARGA INICIAL DE EXÁMENES OFICIALES
INSERT INTO examenes (categoria, nombre_examen, sinonimos, costo_usd, requisitos_preanaliticos, tipo_muestra, tiempo_entrega)
VALUES
('Hematología', 'Hematología Completa', ARRAY['hemograma', 'recuento globular', 'formula leucocitaria'], 7.50, 'Ayuno 4 a 8 horas', 'Sangre total (EDTA)', '4 horas'),
('Hematología', 'Plaquetas', ARRAY['recuento plaquetario', 'trombocitos'], 4.00, 'Ayuno 4 horas', 'Sangre total (EDTA)', '4 horas'),
('Hematología', 'Velocidad de Sedimentación (VSG)', ARRAY['vsg', 'sedimentacion'], 4.00, 'Ayuno 4 horas', 'Sangre total citratada', '4 horas'),
('Hematología', 'Frotis de Sangre Periférica', ARRAY['frotis', 'morfologia sanguinea'], 6.00, 'Ayuno 4 a 8 horas', 'Sangre total', '24 horas'),
('Hematología', 'Grupo Sanguíneo y Factor Rh', ARRAY['tipiaje', 'tipo de sangre'], 6.00, 'Sin ayuno requerido', 'Sangre total', '2 horas'),
('Hematología', 'Tiempo de Protrombina (TP) e INR', ARRAY['tp', 'inr', 'coagulacion tp'], 7.00, 'Ayuno 4 a 8 horas', 'Plasma citratado', '4 horas'),
('Hematología', 'Tiempo de Tromboplastina (TPT)', ARRAY['tpt', 'ttpa'], 7.00, 'Ayuno 4 a 8 horas', 'Plasma citratado', '4 horas'),

('Química Sanguínea', 'Glicemia en ayunas', ARRAY['glicemia', 'glucosa', 'azucar en sangre', 'glicemia basal'], 4.50, '8 a 12 horas estrictas de ayuno', 'Suero', '4 a 6 horas'),
('Química Sanguínea', 'Glicemia Postprandial (PP)', ARRAY['glicemia pp', 'glucosa postprandial'], 4.50, 'Toma 2 horas exactas post comida', 'Suero', '4 a 6 horas'),
('Química Sanguínea', 'Urea / BUN', ARRAY['urea', 'bun', 'nitrogeno ureico'], 4.50, '8 a 12 horas de ayuno', 'Suero', '4 a 6 horas'),
('Química Sanguínea', 'Creatinina', ARRAY['creatinina serica', 'creatinina'], 4.50, '8 a 12 horas de ayuno', 'Suero', '4 a 6 horas'),
('Química Sanguínea', 'Perfil Lipídico Completo', ARRAY['colesterol y trigliceridos', 'lipidos', 'colesterol total'], 18.00, '12 horas estrictas de ayuno', 'Suero', '6 horas'),

('Hormonas', 'Insulina Basal', ARRAY['insulina', 'insulina en ayunas'], 14.00, '8 a 12 horas de ayuno', 'Suero', '24 horas'),
('Hormonas', 'Insulina Postprandial (PP)', ARRAY['insulina pp'], 25.00, '2 horas post comida', 'Suero', '24 horas'),
('Hormonas', 'TSH Ultrasensible', ARRAY['tsh', 'tirotropina', 'tiroides tsh'], 13.00, '8 horas ayuno (antes de 10 AM)', 'Suero', '24 horas'),
('Hormonas', 'T4 Libre', ARRAY['t4 libre', 'tiroxina', 't4'], 13.00, '8 horas ayuno (antes de 10 AM)', 'Suero', '24 horas'),
('Hormonas', 'T3 Libre', ARRAY['t3 libre', 'triyodotironina', 't3'], 13.50, '8 horas ayuno', 'Suero', '24 horas'),
('Hormonas', 'Cortisol Sérico 8 a.m.', ARRAY['cortisol 8am', 'cortisol am', 'hormona del estres'], 15.00, 'Reposo 20 min antes, toma estricta 8:00 AM', 'Suero', '24 horas'),
('Hormonas', 'Beta HCG Cuantitativa', ARRAY['beta hcg', 'embarazo en sangre', 'gonadotropina'], 12.00, 'Sin ayuno estricto', 'Suero', '4 horas'),

('Microbiología', 'Urocultivo con Antibiograma', ARRAY['urocultivo', 'cultivo de orina'], 35.00, 'Primera orina mañana, retencion 4h, sin antibioticos', 'Orina recolectada estéril', '48 a 72 horas'),
('Microbiología', 'Coprocultivo', ARRAY['cultivo de heces', 'coprocultivo'], 42.00, 'Muestra fecal en frasco estéril', 'Heces frescas', '72 horas'),
('Microbiología', 'Exudado Faríngeo con Antibiograma', ARRAY['exudado faringeo', 'cultivo de garganta'], 35.00, 'En ayunas, sin cepillarse los dientes', 'Hisopado faríngeo', '48 a 72 horas'),

('Marcadores', 'PSA Total', ARRAY['psa total', 'antigeno prostatico', 'psa', 'prostata'], 14.00, 'Ayuno 4-8h, abstinencia sexual 48h', 'Suero', '24 horas'),
('Marcadores', 'PSA Libre', ARRAY['psa libre', 'antigeno prostatico libre'], 14.00, 'Mismas condiciones que PSA Total', 'Suero', '24 horas'),
('Marcadores', 'CA-125 (Ovario)', ARRAY['ca125', 'ca 125', 'marcador ovario'], 12.00, 'Ayuno 4 a 8 horas', 'Suero', '24 horas'),
('Marcadores', 'Anti-CCP', ARRAY['anti ccp', 'artritis reumatoide'], 22.00, 'Ayuno 8 horas', 'Suero', '48 horas'),
('Marcadores', 'Gases Arteriales', ARRAY['gases arteriales', 'gasometria'], 68.00, 'Sin ayuno, reposo 15 min', 'Sangre arterial en jeringa heparinizada', '1 hora');